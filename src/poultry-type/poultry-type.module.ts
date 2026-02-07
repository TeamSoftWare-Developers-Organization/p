import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoultryType } from 'src/Core Models/PoultryType';
import { PoultryTypeController } from './poultry-type.controller';
import { GetPoultryTypesHandler } from './queries/handlers/get-poultry-types.handler';

const QueryHandlers = [GetPoultryTypesHandler];

@Module({
    imports: [TypeOrmModule.forFeature([PoultryType]), CqrsModule],
    controllers: [PoultryTypeController],
    providers: [...QueryHandlers],
})
export class PoultryTypeModule { }
