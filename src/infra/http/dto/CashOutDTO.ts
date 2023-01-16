import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Length } from 'class-validator';

export class CashOutDTO {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @Length(3)
  @ApiProperty()
  toClientUsername: string;
}
