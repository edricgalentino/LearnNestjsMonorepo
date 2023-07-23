import { IsString, IsEmail, IsDate, IsBoolean, Length } from 'class-validator';

export class RegisterDTO {
  @IsString()
  username: string;

  @IsString()
  @Length(8)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  avatar: string;

  @IsString()
  created_by: string;

  @IsBoolean()
  is_admin: boolean;

  // create json object based on this class
  // {
  //   "username": "edric",
  //   "password": "12345678",
  //   "email": "edric@gmail",
  //   "phone": "08123456789",
  //   "address": "jakarta",
  //   "avatar": "https://www.google.com",
  //   "created_by": "edric",
  //   "is_admin": true
  // }
}
