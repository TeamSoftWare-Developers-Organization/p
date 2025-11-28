import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVaccinationScheduleCommand } from '../CreateVaccinationSchedule.Command';
import { VaccinationSchedule } from 'src/Core Models/VaccinationSchedule';

// هنا يتم وضع منطق العمل الفعلي لحفظ البيانات
@CommandHandler(CreateVaccinationScheduleCommand)
export class CreateVaccinationScheduleHandler implements ICommandHandler<CreateVaccinationScheduleCommand> {

  async execute(command: CreateVaccinationScheduleCommand): Promise<VaccinationSchedule | string> {
    const { createVaccinationScheduleDto } = command;

    // *** منطق وهمي (Mock Logic) - يحاكي حفظ جدول التطعيم ***
    const newEntry: VaccinationSchedule = {
        ScheduleID: Math.floor(Math.random() * 1000) + 1,
        ...(createVaccinationScheduleDto as any), // Cast to any to allow spread of properties
        ScheduledDate: new Date((createVaccinationScheduleDto as any).ScheduledDate),
    };

    console.log(`[CQRS]: Vaccination Scheduled: Medication ${newEntry.MedicationID} on ${newEntry.ScheduledDate.toISOString().split('T')[0]}`); // Use newEntry.MedicationID

    return `تم جدولة التطعيم بنجاح باللقاح رقم ${newEntry.MedicationID} (وهمي).`; // Use newEntry.MedicationID
  }
}