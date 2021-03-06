import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UsersSourceSystemsRepository } from 'src/users-source-systems/users-source-systems.repository';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    passportModule,
    JwtModule.register({
      secretOrPrivateKey: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository,UsersSourceSystemsRepository]),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
