import { Module} from '@nestjs/common';
import  {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './product/product.module';
import { ConfigModule } from './config/config.module';
import { SubscribersModule } from './subscribers/subscribers.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'), ConfigModule, ProductsModule, SubscribersModule,],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
