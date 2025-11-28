import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SpoilageLoss } from 'src/Core Models/SpoilageLoss';
import { CreateSpoilageLossCommand } from '../CreateSpoilageLoss.Command';

// هنا يتم وضع منطق العمل الفعلي لحفظ البيانات
@CommandHandler(CreateSpoilageLossCommand)
export class CreateSpoilageLossHandler implements ICommandHandler<CreateSpoilageLossCommand> {

  async execute(command: CreateSpoilageLossCommand): Promise<SpoilageLoss | string> {
    const { createSpoilageLossDto } = command;

    // *** منطق وهمي (Mock Logic) - يحاكي حفظ سجل الخسارة ***
    const newEntry = {
        SpoilageLossID: Math.floor(Math.random() * 1000) + 1,
        ...createSpoilageLossDto,
        LossDate: new Date(createSpoilageLossDto.LossDate),
    } as SpoilageLoss; 

    console.log(`[CQRS]: Spoilage Loss record created: ${newEntry.QuantityLost} of ${newEntry.ItemType}`);
    
    return `تم تسجيل خسارة ${createSpoilageLossDto.QuantityLost} من صنف ${createSpoilageLossDto.ItemType} بنجاح (وهمي).`;
  }
}