import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoles } from 'common/enum-roles.enum';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @ApiBearerAuth()
  @Auth(UserRoles.ADMIN)
  @Get('/findUsers')
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('findUserId/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('findUserEmail/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch('updateUser/:id')
  update(@Param('id') id: string, @Body() newUser: UpdateUserDto) {
    return this.userService.update(id, newUser);
  }

  @Delete('deleteUser/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
