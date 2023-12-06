import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
   constructor(private readonly userService: UsersService) {}

   // Get all User
   @Get()
   async findAllUser(): Promise<User[]> {
      return await this.userService.findAllUser();
   }

   // Get all user
   @Get(':id')
   async findByidUser(@Param('id') id: number): Promise<User> {
      const user = await this.userService.findOne(id);
      if(!user) {
         throw new Error('User not found');
      }
      else {
         return user;
      }
   }

   // Create user
   @Post()
   async createuser(@Body() user: User): Promise<User> {
      return await this.userService.createUser(user)
   }

   // Update User
   @Put(':id')
   async updateuser(@Param() id: number, @Body() user: User ): Promise<User> {
      return this.userService.updateUser(id, user)
   }

   // Delete user
   @Delete(':id')
   async deleteUser(@Param('id') id: number): Promise<void> {
      const user = await this.userService.findOne(id)

      if(!user) {
         throw new Error('User not found')
      }
      
      return this.userService.deleteUser(id)
   }
}
