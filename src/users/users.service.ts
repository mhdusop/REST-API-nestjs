import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { merge } from 'rxjs';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
   ){}

   // Get all user
   async findAllUser(): Promise<User[]> {
      return await this.userRepository.find();
   }

   // Get by id
   async findOne(id: number): Promise<User> {
      return await this.userRepository.findOne({ where: { id } });
   }

   // Create user
   async createUser(user: User): Promise<User> {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
   }

   // Update user
   async updateUser(id: number, user: User): Promise<User> {
      await this.userRepository.update(id, user);
      return await this.userRepository.findOne({ where: { id } });
   }

   // Delete user
   async deleteUser(id: number): Promise<void> {
      await this.userRepository.delete(id)
   }
}
