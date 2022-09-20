import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateProductDto {
  
  @ApiProperty({example:'SAMSUNG Portable Projector'})
  @IsString()
  title: string;

  @ApiProperty({example:'SAMSUNG 30- 100 The FreestyleFHD HDR Smart Portable Projector for Indoor and Outdoor'})
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({example: 1550})
  @IsInt()
  @IsPositive()
  stock: number

  @ApiProperty({example: 697.99})
  @IsNumber()
  @IsPositive()
  price: number

  @Exclude()
  user: User
}