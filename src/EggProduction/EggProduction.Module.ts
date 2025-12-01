import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EggProduction } from 'src/Core Models/EggProduction';
import { CreateEggProductionHandler } from './Commands/Handlers/CreateEggProductionHandler';
import { UpdateEggProductionHandler } from './Commands/Handlers/UpdateEggProductionHandler';
import { RemoveEggProductionHandler } from './Commands/Handlers/RemoveEggProductionHandler';
import { GetEggProductionHandler } from './queries/Handlers/GetEggProductionHandler';
import { GetEggProductionsHandler } from './queries/Handlers/GetEggProductionsHandler';
import { EggProductionController } from './EggProduction.Controller';
import { CqrsModule } from '@nestjs/cqrs';
import { Coop } from 'src/Core Models/Shedس';

const CommandHandlers = [
  CreateEggProductionHandler,
  UpdateEggProductionHandler,
  RemoveEggProductionHandler,
];
const QueryHandlers = [GetEggProductionHandler, GetEggProductionsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([EggProduction, Coop]), CqrsModule],
  controllers: [EggProductionController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class EggProductionModule { }
