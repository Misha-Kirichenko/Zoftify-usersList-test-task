import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
