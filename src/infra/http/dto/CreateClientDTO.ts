import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateClientDTO {
  @IsNotEmpty()
  @Length(3)
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;
}
