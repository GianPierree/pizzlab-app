import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsGuard } from './products.guard';

@Controller('products')
@UseGuards(ProductsGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: CreateProductDto, @Req() req: { user: string }) {
    return this.productsService.create({
      ...createProductDto,
      created_user: req.user,
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
