import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource, Repository } from 'typeorm';
import { CreateSaleCommand } from '../impl/create-sale.command';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Sale } from 'src/Core Models/Sale ';
import { SaleDetail } from 'src/Core Models/sale-detail';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';
import { EggInventory } from 'src/Core Models/EggInventory';
import { Product } from 'src/Core Models/Product';

@CommandHandler(CreateSaleCommand)
export class CreateSaleHandler implements ICommandHandler<CreateSaleCommand> {
  constructor(private dataSource: DataSource) { }

  async execute(command: CreateSaleCommand): Promise<Sale> {
    const { createSaleDto } = command;

    return this.dataSource.transaction(async (manager) => {
      // 1. حساب الإجمالي
      const totalAmount = createSaleDto.saleDetails.reduce(
        (sum, detail) => sum + detail.quantity * detail.unitPrice,
        0,
      );

      // 2. تحديث المخزون لكل عنصر في المبيعات
      const inventoryRepository = manager.getRepository(FrozenPoultryInventory);
      const eggInventoryRepository = manager.getRepository(EggInventory);
      const productRepository = manager.getRepository(Product);

      for (const detail of createSaleDto.saleDetails) {
        if (detail.itemType === 'Egg') {
          // Egg Logic: FIFO Deduction
          // 1. Get all available egg inventory sorted by date (Oldest first)
          const eggStock = await eggInventoryRepository.find({
            // where: { CoopID: detail.itemID }, // Generic or specific coop? ItemID 99999 from frontend suggests generic.
            // If itemID is not a valid CoopID, let's just fetch all.
            // For now, we fetch ALL stock > 0 ordered by date.
            where: {},
            order: { InventoryDate: 'ASC' },
          });

          const availableStock = eggStock.filter(e => e.Quantity > 0);

          let remainingToDeduct = detail.quantity;
          let totalAvailable = availableStock.reduce((sum, item) => sum + item.Quantity, 0);

          if (totalAvailable < remainingToDeduct) {
            throw new BadRequestException(`Insufficient egg stock. Available: ${totalAvailable}, Requested: ${remainingToDeduct}`);
          }

          for (const stockItem of availableStock) {
            if (remainingToDeduct <= 0) break;

            const deduction = Math.min(stockItem.Quantity, remainingToDeduct);
            stockItem.Quantity -= deduction;
            remainingToDeduct -= deduction;

            await eggInventoryRepository.save(stockItem);
          }

        } else if (detail.itemType === 'Product') {
          // General Product Logic
          const product = await productRepository.findOne({
            where: { ProductID: detail.itemID }
          });

          if (!product) {
            throw new NotFoundException(`Product with ID ${detail.itemID} not found.`);
          }

          if (product.StockQuantity < detail.quantity) {
            throw new BadRequestException(`Insufficient stock for product '${product.ProductName}'. Available: ${product.StockQuantity}, Requested: ${detail.quantity}`);
          }

          product.StockQuantity -= detail.quantity;
          await productRepository.save(product);

        } else {
          // Poultry Logic (Existing)
          const inventoryItem = await inventoryRepository.findOne({
            where: { PoultryTypeID: detail.itemID },
          });

          if (!inventoryItem) {
            throw new NotFoundException(
              `Item with ID ${detail.itemID} not found in poultry inventory.`,
            );
          }

          if (inventoryItem.Quantity < detail.quantity) {
            throw new BadRequestException(
              `Insufficient stock for poultry item with ID ${detail.itemID}.`,
            );
          }

          inventoryItem.Quantity -= detail.quantity;
          await inventoryRepository.save(inventoryItem);
        }
      }

      // 3. إنشاء سجل المبيعات
      const sale = manager.create(Sale, {
        ...createSaleDto,
        TotalAmount: totalAmount,
      });

      const savedSale = await manager.save(sale);

      // 4. إنشاء تفاصيل المبيعات
      const saleDetailsList = createSaleDto.saleDetails.map((detail) =>
        manager.create(SaleDetail, {
          ...detail,
          SaleID: savedSale.SaleID,
        }),
      );
      await manager.save(saleDetailsList);

      return savedSale;
    });
  }
}
