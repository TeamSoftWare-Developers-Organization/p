import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQualityControlCommand } from './create-quality-control.command';

@CommandHandler(CreateQualityControlCommand)
export class CreateQualityControlCommandHandler
  implements ICommandHandler<CreateQualityControlCommand>
{
  async execute(command: CreateQualityControlCommand) {
    console.log('CreateQualityControlCommand executed:', command);
    // Here you would typically interact with your repository or service
    // to persist the QualityControl entity.
    // For now, we'll just return a mock ID.
    return { QualityControlID: Math.floor(Math.random() * 1000) + 1 };
  }
}
