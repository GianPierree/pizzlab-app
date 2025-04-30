import {
  Inject,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject('PIZZLAB_SERVICE') private kafkaService: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaService.subscribeToResponseOf('order-created');
    await this.kafkaService.connect();
  }

  async create({ product_code, quantity }: CreateOrderDto, user: string): Promise<Order> {
    const product = await this.productRepository.findOne({ where: { code: product_code } });

    if (!product) {
      throw new NotFoundException(`El producto ${product_code} no existe`);
    }

    if (!product.status) {
      throw new NotAcceptableException(`El producto ${product_code} no está disponible`);
    }

    const orderData = this.orderRepository.create({
      quantity,
      mount: product.price * quantity,
      product: product,
      created_user: user,
    });

    const order = await this.orderRepository.save(orderData);

    if (order) {
      // TODO: Publicar evento
      this.kafkaService.emit('order-created', { order_id: order.id });
      this.logger.log('Evento order-created publicado');
    }

    return order;
  }
}
