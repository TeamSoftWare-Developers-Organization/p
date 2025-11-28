import { CreateTreatmentScheduleDto } from "../dto/CreateTreatmentScheduleDto";

// الأمر الذي يتم إرساله إلى CommandBus
export class CreateTreatmentScheduleCommand {
  constructor(
    public readonly createTreatmentScheduleDto: CreateTreatmentScheduleDto,
  ) {}
}