import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest().headers.authorization;
    // const token = request ? request.split(' ')[1] : null;

    console.log('ProductsGuard...');
    return true;
  }
}
