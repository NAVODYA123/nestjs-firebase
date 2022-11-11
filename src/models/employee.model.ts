import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsMobilePhone,
  Length,
  IsIn,
} from 'class-validator';

export class Employee {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  public firstname: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  public lastname: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  @ApiProperty()
  @IsMobilePhone('si-LK')
  public number: string;
  @ApiProperty()
  @Length(1)
  @IsIn(['F', 'M'])
  public gender: string;
  @ApiProperty()
  public photo: string;
}
