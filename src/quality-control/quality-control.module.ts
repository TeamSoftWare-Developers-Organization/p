import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityControl } from '../Core Models/QualityControl';
import { QualityControlController } from './quality-control.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QualityControl])],
  controllers: [QualityControlController],
  providers: [],
})
export class QualityControlModule {}