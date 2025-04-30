import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.contants';

@Injectable()
export class ProductsMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ProductsMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const request = req.headers['authorization'];
    const token = request ? request.split(' ')[1] : null;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded: { email: string } = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      req['user'] = decoded.email;
    } catch (error) {
      this.logger.error('Error verifying token', error);
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
