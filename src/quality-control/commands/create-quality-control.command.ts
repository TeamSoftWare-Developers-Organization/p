import { ICommand } from '@nestjs/cqrs';

export class CreateQualityControlCommand implements ICommand {
  constructor(
    public readonly TestDate: Date,
    public readonly ItemID: number,
    public readonly ItemType: string,
    public readonly Result: string,
    public readonly Notes?: string,
  ) {}
}
