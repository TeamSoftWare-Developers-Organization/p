import { PartialType } from '@nestjs/mapped-types';
import { CreatePoultryBatchDto } from './create-poultry-batch.dto';

export class UpdatePoultryBatchDto extends PartialType(CreatePoultryBatchDto) { }