import { ProductsService } from './products.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('products')
export class ProductsController {

    constructor(private readonly productService:ProductsService){

    }

    @Post()
    async addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc:string, 
        @Body('price') prodPrice:number):Promise<{}>{
        return {id: await this.productService.insertProduct( prodTitle, prodDesc, prodPrice)};
    }

    @Get()
    async getAllProducts(){
        return await this.productService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id:string){
        return await this.productService.getProduct(id);
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: string, 
                  @Body('title') prodTitle: string, 
                  @Body('description') prodDesc:string, 
                  @Body('price') prodPrice:number){
            await this.productService.updateProduct(id,prodTitle, prodDesc, prodPrice);
            return {"message":"successfull"};
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string){
        await this.productService.deleteProduct(id);
        return {"message":"successfull"};
    }
}