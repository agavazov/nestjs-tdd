import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ClientModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
