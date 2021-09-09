import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from '../users/users.repository';
import { UsersSourceSystemsRepository } from 'src/users-source-systems/users-source-systems.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private usersSourceSystemsRepository: UsersSourceSystemsRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.usersRepository.findOne({ email });
    const user_source_system = await this.usersSourceSystemsRepository.findOne(user.id)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user_source_system;
  }
}
