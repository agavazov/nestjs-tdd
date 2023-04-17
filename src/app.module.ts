import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [ClientModule, StoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
