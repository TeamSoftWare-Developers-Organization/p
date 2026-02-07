import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteBiosecurityLogCommand } from '../Impi/delete-biosecurity-log.command';
import { BiosecurityLog } from 'src/Core Models/BiosecurityLog';

@CommandHandler(DeleteBiosecurityLogCommand)
export class DeleteBiosecurityLogHandler
  implements ICommandHandler<DeleteBiosecurityLogCommand> {
  constructor(
    @InjectRepository(BiosecurityLog)
    private readonly repository: Repository<BiosecurityLog>,
  ) { }

  async execute(command: DeleteBiosecurityLogCommand): Promise<void> {
    const { id } = command;
    await this.repository.delete({ LogID: id });
  }
}
