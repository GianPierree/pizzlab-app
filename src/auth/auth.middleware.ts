import { 
  Injectable, 
  NestMiddleware, 
  UnauthorizedException 
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.contants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const request = req.headers['authorization'];
    const token = request ? request.split(' ')[1] : null;

    if (!token) {
      throw new UnauthorizedException('No se envió el token');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      req['user'] = decoded.email;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    next();
  }
}