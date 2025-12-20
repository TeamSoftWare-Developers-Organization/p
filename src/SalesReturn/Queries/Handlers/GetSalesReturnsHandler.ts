import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesReturn } from 'src/Core Models/SalesReturn';
import { Repository } from 'typeorm';

import { GetSalesReturnsQuery } from '../Impl/GetSalesReturnsQuery';

@QueryHandler(GetSalesReturnsQuery)
export class GetSalesReturnsHandler
  implements IQueryHandler<GetSalesReturnsQuery> {
  constructor(
    @InjectRepository(SalesReturn)
    private readonly salesReturnRepository: Repository<SalesReturn>,
  ) { }

  async execute(query: GetSalesReturnsQuery): Promise<SalesReturn[]> {
    return this.salesReturnRepository.find({
      relations: ['SalesReturnDetails', 'Customer', 'Sale'],
    });
  }
}
