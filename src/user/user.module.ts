import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
