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

      <h2>Register new user &mdash; [post]/users/registration</h2>

      <hr/>

      <form action='/users/registration' method='post'>
        <p><label>Email: <input type='email' name='email' /></label></p>
        <p><label>Password: <input type='password' name='password' /></label></p>
        <p><button type='submit'>Register</button></p>
      </form>

      <pre id='log'></pre>
      
      <script>
      (async () => {
        const response = await fetch('/users');
        const responseText = await response.json();
        document.getElementById('log').innerHTML = JSON.stringify(responseText, null, 2);
      })();
      </script>
    `;
  }
}
