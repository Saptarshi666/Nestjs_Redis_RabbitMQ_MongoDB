import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema} from './config.model'


@Module({
  imports:[MongooseModule.forFeature([{name: Config.name, schema: ConfigSchema, collection:'Config'
},
]),
],
  controllers: [ConfigController],
  providers: [ConfigService]
})
export class ConfigModule {}
