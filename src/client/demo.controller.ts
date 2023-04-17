import { Controller, Get } from '@nestjs/common';

@Controller()
export class DemoController {
  @Get()
  async findAll(): Promise<string> {
    return `
      <style>
        * { font-family: Consolas, Monaco, monospace; }
        body { max-width: 500px; margin: 20px auto; }
      </style>

      <h2>Create a book &mdash; [post]/store/books/</h2>

      <hr/>

      <form action='/store/books' method='post'>
        <p><label>Name: <input type='text' name='name' /></label></p>
        <p><label>Description: <input type='text' name='description' /></label></p>
        <p><label>Price: <input type='number' name='price' step='0.1' /></label></p>
        <p><button type='submit'>Create</button></p>
      </form>
    `;
  }
}
