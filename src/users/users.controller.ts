import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): ReturnType<UsersService['findAll']> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<User> {
    return this.usersService.get(id);
  }

  @Post('/registration')
  async create(@Body() data: any): Promise<User> {
    return this.usersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<User> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }
}
