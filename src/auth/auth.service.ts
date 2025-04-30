import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findUsername(username);
      if (!user) {
        throw new UnauthorizedException(`El usario ${username} no existe`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const passwordValidated = await bcrypt.compare(password, user.password);

      if (!passwordValidated) {
        throw new UnauthorizedException('La contraseña es incorrecta');
      }

      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error: unknown) {
      this.logger.error('Error en el proceso de login', error);
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
  }
}
