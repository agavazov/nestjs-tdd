import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DummyDb } from '../common/services/dummy-db.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [DummyDb, UsersService],
})
export class UsersModule {}
