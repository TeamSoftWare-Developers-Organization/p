
// الأمر الذي يتم إرساله إلى CommandBus
export class CreateVaccinationScheduleCommand {
  constructor(
    public readonly createVaccinationScheduleDto: CreateVaccinationScheduleCommand,
  ) {}
}