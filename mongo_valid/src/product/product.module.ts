import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { ProductSchema } from './product.model';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),
],
    controllers: [ProductsController],
     providers: [ProductsService],
    })
export class ProductsModule {}