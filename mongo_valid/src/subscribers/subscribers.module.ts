import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule,{
      exchanges:[
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
      channels:{
        'channel-1':{
          prefetchCount: 15,
          default: true,
        },
        'channel-2':{
          prefetchCount: 2,
        },
      },
    }),
    SubscribersModule,
  ],
  controllers: [SubscribersController],
  providers: [SubscribersService]
})
export class SubscribersModule {}
