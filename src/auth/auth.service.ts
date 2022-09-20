import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async createUser(authInfo: CreateUserDto) {
    return await this.userService.createUser(authInfo);
  }

  async validateUser(authInfo: LoginUserDto) {
    const user = await this.userService.findOneByEmail(authInfo.email)
    if(user){
      const validate = bcrypt.compareSync(authInfo.password, user.password)
      if(validate){
        delete user.password
        return {
          ...user,
          token: this.getJwtToken({ id: user.id }),
        };
      }else {
        throw new HttpException('Password is incorrect', HttpStatus.BAD_GATEWAY)
      }
    }else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }
}
