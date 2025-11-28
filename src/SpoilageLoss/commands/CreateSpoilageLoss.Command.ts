import { CreateSpoilageLossDto } from "../dto/createSpoilageLoss.dto";

// الأمر الذي يتم إرساله إلى CommandBus
export class CreateSpoilageLossCommand {
  constructor(
    public readonly createSpoilageLossDto: CreateSpoilageLossDto,
  ) {}
}