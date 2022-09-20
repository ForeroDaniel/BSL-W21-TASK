import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {User} from "../user/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
          UserModule,
          TypeOrmModule.forFeature([User]),
          PassportModule.register({ defaultStrategy: 'jwt' }),
          JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              return {
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                  expiresIn: configService.get('JWT_EXPIRE'),
                },
              };
            },
          }),
      ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
