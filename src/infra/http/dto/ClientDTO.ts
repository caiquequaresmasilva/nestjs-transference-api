import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class ClientDTO {
  @IsNotEmpty()
  @Length(3)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  @ApiProperty()
  password: string;
}
