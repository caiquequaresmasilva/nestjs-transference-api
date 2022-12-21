import { IsNotEmpty, IsPositive, Length } from 'class-validator';

export class CashOutDTO {
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @Length(3)
  toClientUsername: string;
}
