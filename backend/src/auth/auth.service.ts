import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(createAuthDto: CreateAuthDto) {
    const mockUser = { id: 1, email: 'user@example.com' };
    return this.generateTokens(mockUser);
  }

  generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email };

    const access_token = this.jwtService.sign(payload, {
      secret: 'accessSecret',
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: 'refreshSecret',
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
    };
  }
}