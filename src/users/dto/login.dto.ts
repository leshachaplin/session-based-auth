import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { passwordExp } from '../../common/regex';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordExp, { message: 'Password too weak' })
  readonly password: string;
}
