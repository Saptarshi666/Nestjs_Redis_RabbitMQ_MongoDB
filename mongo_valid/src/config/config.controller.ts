import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Patch, 
  Delete,
} from "@nestjs/common";
import { ConfigService } from "./config.service";
import mongoose from "mongoose";


@Controller('configs')
export class ConfigController {
 constructor(private readonly configsService: ConfigService){}
  @Post('')
  async addConfig(
      @Body('Platform') Platform: string, 
      @Body('data') data: string, 
      @Body('status') status: number,
      @Body('product') product: string
      ) {
        try{
          return await this.configsService.insertConfig({Platform, data, status,product});
        }catch(e){
          
          throw e;
          return e;
        }
      
      
  }

  @Get()
  async getAllConfigs() {
     const configs = await this.configsService.getConfigs(); 
     return configs;
  }


  @Get(':id')
  getConfig(@Param('id') configId: string,) {
       return this.configsService.getSingleConfig(configId);
  }

  @Patch(':id')
  async updateConfig(
      @Param('id') configId: string, 
      @Body('Platfprm') configPlatform: string, 
      @Body('data') configdata: string, 
      @Body('status') configstatus: number,
      @Body('product') configproduct : mongoose.ObjectId 
      ) {
          await this.configsService.updateConfig(configId,configPlatform,configdata,configstatus,configproduct);
          return null;
      }

      @Delete(':id')
      async removeConfig(@Param('id') configId: string, ){
          await this.configsService.deleteConfig(configId);
          return null;
      }
}
