import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.contants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const request = req.headers['authorization'];
    const token = request ? request.split(' ')[1] : null;

    if (!token) {
      throw new UnauthorizedException('No se envió el token');
    }

    try {
      const decoded: { email: string } = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      console.log('decoded: ', decoded);
      req['user'] = decoded.email;
    } catch (error) {
      this.logger.error('Error al verificar el token', error);
      throw new UnauthorizedException('Token inválido');
    }

    next();
  }
}
