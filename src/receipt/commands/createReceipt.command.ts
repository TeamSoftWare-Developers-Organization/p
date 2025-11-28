import { CreateReceiptDto } from "../dto/CreateReceipt.dto";

// الأمر الذي يتم إرساله إلى CommandBus
export class CreateReceiptCommand {
  constructor(
    public readonly createReceiptDto: CreateReceiptDto,
  ) {}
}