import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { DummyDb } from '../common/services/dummy-db.service';

@Injectable()
export class UsersService {
  constructor(private db: DummyDb) {}

  async findAll(): Promise<User[]> {
    return this.db.findAll<User>('users');
  }

  async get(id: string): Promise<User> {
    return {
      id,
      ...(await this.db.get<User>('users', id)),
    };
  }

  async create(user: User): Promise<User> {
    if (!user.email) {
      throw new HttpException({ error: 'Enter valid email' }, HttpStatus.BAD_REQUEST);
    }

    if (!user.password) {
      throw new HttpException({ error: 'Enter valid password' }, HttpStatus.BAD_REQUEST);
    }

    const recordId = await this.db.insert('users', user);

    // Return
    return this.get(recordId);
  }

  async update(id: string, user: User): Promise<User> {
    await this.db.update('users', id, user);
    return this.get(id);
  }

  async delete(id: string): Promise<boolean> {
    return await this.db.delete('users', id);
  }
}
