import { Product } from './product.model';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService{
    private products: Product[] = [];
    
    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

    async insertProduct(title:string, description:string, price:number):Promise<string>{
        //const product = new Product(Math.random().toString(), title, description, price);
        //this.products.push(product);
        //return product.id;

        const product = new this.productModel({title, description, price})
        const result = await product.save();
        return result.id;
    }

    async getProducts():Promise<Product[]>{
        //return [...this.products];
        const products = await this.productModel.find().exec();
        return products.map(prod => ({id:prod.id, title: prod.title, description: prod.description, price:prod.price}));
    }

    async getProduct(id:string):Promise<Product>{    
       //return {...this.products[this.findProductIndex(id)]};
       try{
        const product = await this.productModel.findById(id).exec();
        if(!product){
            throw new NotFoundException('data not found for id '+id); 
        }
        return { id:product.id,title:product.title,description:product.description,price:product.price };
       }catch(error){
        throw new NotFoundException('data not found for id '+id); 
       }       
    }

    async updateProduct(id:string, title:string, description:string, price:number){
        /*const index = this.findProductIndex(id);
        const product = this.products[index];
        product.title = title ? title: product.title;
        product.description = description ? description :product.description;
        product.price = price ? price : product.price;
        this.products[index] = { ...product};*/
        const product = await this.productModel.findById(id).exec();
        product.title = title ? title: product.title;
        product.description = description ? description :product.description;
        product.price = price ? price : product.price;
        await product.save();
    }

    async deleteProduct(id:string){
        //const index = this.findProductIndex(id);
        //this.products.splice(index,1);
        const deleted = await this.productModel.deleteOne({_id:id});
        if(deleted.deletedCount == 0){
            throw new NotFoundException('data not found for id '+id);
        }
    }

    private findProductIndex(id:string):number{
        const productIndex = this.products.findIndex( x => x.id === id);
        if(productIndex == -1){
            throw new NotFoundException('data not found for id '+id);            
        }
        return productIndex;
    }
}