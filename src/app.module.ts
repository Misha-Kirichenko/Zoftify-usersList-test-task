import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from './db/config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      ...CONFIG,
      username: CONFIG.user,
      type: 'postgres',
      autoLoadEntities: false,
      synchronize: false,
      logging: true,
    })
  ]
})
export class AppModule { }
