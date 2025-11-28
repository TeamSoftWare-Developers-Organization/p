import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Receipt } from 'src/Core Models/Receipt';
import { CreateReceiptCommand } from '../createReceipt.command';

// هنا يتم وضع منطق العمل الفعلي لحفظ البيانات
@CommandHandler(CreateReceiptCommand)
export class CreateReceiptHandler implements ICommandHandler<CreateReceiptCommand> {

  async execute(command: CreateReceiptCommand): Promise<Receipt | string> {
    const { createReceiptDto } = command;

    // *** منطق وهمي (Mock Logic) - يحاكي حفظ الإيصال ***
    const newEntry = {
        ReceiptID: Math.floor(Math.random() * 1000) + 1,
        ...createReceiptDto,
        ReceiptDate: new Date(createReceiptDto.ReceiptDate),
        // العلاقات الأخرى سيتم ملؤها في الخدمة الحقيقية
    } as unknown as Receipt; 

    console.log(`[CQRS]: Receipt created successfully for SaleID: ${newEntry.SaleID}`);
    
    return `تم تسجيل إيصال دفع بنجاح بمبلغ ${createReceiptDto.Amount} (وهمي).`;
  }
}