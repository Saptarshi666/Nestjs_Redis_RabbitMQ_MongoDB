import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Inject } from "@nestjs/common";
import { Product } from './product.model'
import { ProductsModule } from "./product.module";
import { Model } from "mongoose";
import Redis from "ioredis"

@Injectable()
export class ProductsService {
    private products: Product[] = [];

constructor(
    @InjectModel('Product')  private readonly  productModel: Model<Product>,
    ) {
        
    }

    // Redis = require("ioredis");
   
    readonly redis = new Redis({
        host:'localhost',
        port:6379,
     }) ;
    async insertProduct(data){
        
        const newProduct = new this.productModel(data);
        const result = await newProduct.save();
        if(result) { await this.redis.set(result.id,JSON.stringify(result));}
        return result.id;
    }

    async getProducts(){
       const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id, 
            title: prod.title, 
            description: prod.description, 
            price: prod.price 
        }));
    }

    async getSingleProduct(productId: string){

        const  result = await this.redis.get(productId)
        if(result == null)
        {
            return await this.findProduct(productId);
        }
        else
        {
            const result1 = JSON.parse(result);
            return result1;
        }
        
}

     async updateProduct(
        productId: string, 
        title: string, 
        desc: string, 
        price: number 
        ){
        const updatedProduct = await this.findProduct(productId);
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price = price;
        }

        updatedProduct.save();
        await this.redis.set(updatedProduct.id,JSON.stringify(updatedProduct));
    }
  
    async deleteProduct(prodId: string){
       const result = await this.productModel.deleteOne({_id: prodId}).exec();
       this.redis.del(prodId);
       console.log(result);
    }

    private async findProduct(id: string): Promise<Product> {
       let product;
        try{
        product = await this.productModel.findById(id);
        } catch(error){
            throw new NotFoundException('Could not find product. id not available');
        }
        if(!product){
            throw new NotFoundException('Could not find product.');
        }
        return product; 
    }

}