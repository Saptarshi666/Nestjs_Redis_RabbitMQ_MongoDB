import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import {Config, ConfigDocument, ConfigSchema}   from './config.model'
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import Redis from "ioredis";



@Injectable()
export class ConfigService {
    constructor(
        @InjectModel(Config.name)
        private ConfigModel: Model<ConfigDocument>,
      ) {}
    readonly redis = new Redis({
        host:'localhost',
        port:6379,
     }) ;

    async insertConfig(payload):Promise<ConfigDocument>{
        try{
           const redisData =  JSON.stringify(payload)
            const createdConfig = new this.ConfigModel(payload);
            const id = createdConfig.save();
            this.redis.set(createdConfig.id,redisData);
            return createdConfig.id;
        }
        catch(e){
            console.log(e);
        }
    }

    async getConfigs(){
       const configs = await this.ConfigModel.find().exec();
        return configs.map((config) => ({
            id: config.id, 
            platform: config.platform, 
            data: config.data, 
            status: config.status,
            product: config.product 
        }));
    }

     async getSingleConfig(configId: string){
        const  result = await this.redis.get(configId)
        if(result == null)
        {
            return await this.ConfigModel.findById(configId);
        }
        else
        {
            return JSON.parse(result);
        } }

     async updateConfig(
        configId: string, 
        platform: string, 
        data: any, 
        status: number,
        product: mongoose.ObjectId
        ){
        const updatedConfig = await this.ConfigModel.findById(configId);
        if(platform){
            updatedConfig.platform = platform;
        }
        if(data){
            updatedConfig.data = data;
            let r
        try{
         r = JSON.stringify(updatedConfig.data);}
        catch(error){
            throw new NotFoundException("invalid json string");
        }
        }
        if(status){
            updatedConfig.status = status;
        }
        if(product){
            updatedConfig.product = product;
        }

        updatedConfig.save();
        this.redis.set(updatedConfig.id,JSON.stringify(updatedConfig));
    }
  
    async deleteConfig(configId: string){
       const result = await this.ConfigModel.deleteOne({_id: configId}).exec();
       this.redis.del(configId);
       console.log(result);
    }

   /* private async findConfig(id: string): Promise<Config> {
       let config;
        try{
        config = await this.configModel.findById(id);
        } catch(error){
            throw new NotFoundException('Could not find config. id not available');
        }
        if(!config){
            throw new NotFoundException('Could not find config.');
        }
        return config; 
    }*/

}