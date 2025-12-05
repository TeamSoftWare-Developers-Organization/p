
import { IsNumber, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreatePerformanceMetricDto {
  @IsNumber()
  BatchId: number;

  @IsDateString()
  Date: Date;

  @IsString()
  MetricName: string;

  @IsNumber()
  Value: number;
}
