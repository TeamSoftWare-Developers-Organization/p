
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralLedger } from 'src/Core Models/GeneralLedger';
import { UpdateGeneralLedgerCommand } from '../impl/update-general-ledger.command';

@CommandHandler(UpdateGeneralLedgerCommand)
export class UpdateGeneralLedgerHandler
  implements ICommandHandler<UpdateGeneralLedgerCommand> {
  constructor(
    @InjectRepository(GeneralLedger)
    private readonly generalLedgerRepository: Repository<GeneralLedger>,
  ) { }

  async execute(command: UpdateGeneralLedgerCommand): Promise<GeneralLedger | null> {
    const { ledgerId, updateGeneralLedgerDto } = command;
    await this.generalLedgerRepository.update(ledgerId, updateGeneralLedgerDto);
    return this.generalLedgerRepository.findOneBy({ LedgerID: ledgerId });
  }
}
