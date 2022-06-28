import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentalsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영어, 숫자만 가능
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accept english and number',
  })
  password: string;
}
