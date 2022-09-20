import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  fullname: string
  
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string
  

}
