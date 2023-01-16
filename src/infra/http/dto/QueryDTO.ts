import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn, IsDateString } from 'class-validator';

export class QueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ enum: ['cash-in', 'cash-out'] })
  @IsOptional()
  @IsIn(['cash-in', 'cash-out'])
  operation?: string;
}
