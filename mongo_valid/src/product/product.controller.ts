import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Patch, 
  Delete,
} from "@nestjs/common";
import { ProductsService } from "./product.service";


@Controller('products')
export class ProductsController {
 constructor(private readonly productsService: ProductsService){}
  // @Inject('SUBSCRIBERS_SERVICE') private subscribersService:ClientProxy,
  // ) {}
 
  // @Post()
  // async createPost(@Body() subscriber: CreateSubscriberDto) {
  //     return this.subscribersService.send({
  //       cmd: 'add-subscriber'
  //     }, subscriber)
  //   }
  @Post('')
  async addProduct(
      @Body('title') title: string, 
      @Body('description') description: string, 
      @Body('price') price: number
      ) {
      return await this.productsService.insertProduct({title, description, price});
      
  }

  @Get()
  async getAllProducts() {
     const products = await this.productsService.getProducts(); 
     return products
  }


  @Get(':id')
   async getProduct(@Param('id') prodId: string,) {
      return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
      @Param('id') prodId: string, 
      @Body('title') prodTitle: string, 
      @Body('description') prodDesc: string, 
      @Body('price') prodPrice: number, 
      ) {
          await this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
          return null;
      }

      @Delete(':id')
      async removeProduct(@Param('id') prodId: string, ){
          await this.productsService.deleteProduct(prodId);
          return null;
      }
}
