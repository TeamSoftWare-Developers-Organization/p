import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTreatmentScheduleCommand } from '../CreateTreatmentSchedule.Command';
import { TreatmentSchedule } from 'src/Core Models/TreatmentSchedule';

// هنا يتم وضع منطق العمل الفعلي لحفظ البيانات
@CommandHandler(CreateTreatmentScheduleCommand)
export class CreateTreatmentScheduleHandler implements ICommandHandler<CreateTreatmentScheduleCommand> {

  async execute(command: CreateTreatmentScheduleCommand): Promise<TreatmentSchedule | string> {
    const { createTreatmentScheduleDto } = command;

    // *** منطق وهمي (Mock Logic) - يحاكي حفظ جدول العلاج ***
    const newEntry = {
        ScheduleID: Math.floor(Math.random() * 1000) + 1,
        ...createTreatmentScheduleDto,
        ScheduledDate: new Date(createTreatmentScheduleDto.ScheduledDate),
    } as TreatmentSchedule; 

    console.log(`[CQRS]: Treatment Scheduled: Medication ${newEntry.MedicationID} for Coop ${newEntry.CoopID} on ${newEntry.ScheduledDate.toISOString().split('T')[0]}`);
    
    return `تم جدولة العلاج بنجاح للحظيرة رقم ${createTreatmentScheduleDto.CoopID} (وهمي).`;
  }
}