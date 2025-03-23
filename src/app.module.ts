import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from './db/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONFIG,
      username: CONFIG.user,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    AuthModule,
    UsersModule
  ]
})
export class AppModule { }
