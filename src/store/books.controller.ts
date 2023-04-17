import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('/store/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): ReturnType<BooksService['findAll']> {
    return await this.booksService.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): ReturnType<BooksService['get']> {
    return await this.booksService.get(id);
  }

  @Post()
  async create(@Body() data: CreateBookDto): ReturnType<BooksService['create']> {
    return await this.booksService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateBookDto
  ): ReturnType<BooksService['update']> {
    return await this.booksService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): ReturnType<BooksService['delete']> {
    return await this.booksService.delete(id);
  }
}
