
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralLedger } from 'src/Core Models/GeneralLedger';
import { GetGeneralLedgerQuery } from '../impl/get-general-ledger.query';

@QueryHandler(GetGeneralLedgerQuery)
export class GetGeneralLedgerHandler
  implements IQueryHandler<GetGeneralLedgerQuery> {
  constructor(
    @InjectRepository(GeneralLedger)
    private readonly generalLedgerRepository: Repository<GeneralLedger>,
  ) { }

  async execute(query: GetGeneralLedgerQuery): Promise<GeneralLedger | null> {
    const { ledgerId } = query;
    return this.generalLedgerRepository.findOneBy({ LedgerID: ledgerId });
  }
}
