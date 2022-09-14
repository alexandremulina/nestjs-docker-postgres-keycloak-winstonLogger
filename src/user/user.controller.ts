import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Unprotected } from 'nest-keycloak-connect';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Unprotected()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.createDocx();
    return await this.userService.createUser(createUserDto);
  }

  @Unprotected()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
