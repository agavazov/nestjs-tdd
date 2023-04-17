import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { DummyDb } from '../common/services/dummy-db.service';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [DummyDb, BooksService],
})
export class StoreModule {}
