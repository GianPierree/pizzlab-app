import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto): Promise<{ access_token: string }> {
    
    const user = await this.usersService.findUsername(username);
    if (!user) throw new UnauthorizedException(`El usario ${username} no existe`);

    const passwordValideted = await bcrypt.compare(password, user.password);
    if (!passwordValideted) throw new UnauthorizedException('La contraseña es incorrecta');

    const payload = { 
      username: user.username,
      email: user.email, 
      role: user.role,
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
