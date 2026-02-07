import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPoultryTypesQuery } from './queries/impl/get-poultry-types.query';

@Controller('poultry-types')
export class PoultryTypeController {
    constructor(private readonly queryBus: QueryBus) { }

    @Get()
    async getAll() {
        return this.queryBus.execute(new GetPoultryTypesQuery());
    }
}
