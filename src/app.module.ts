import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsMiddleware } from './products/products.middleware';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pizzlab_db'),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'pizzlab_db',
      autoLoadEntities: true,
      synchronize: true, //TODO: Solo en desarrollo, en producción no se debe usar
    }),
    AuthModule,
    ProductsModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProductsMiddleware)
      .forRoutes(ProductsController)
  }
}
