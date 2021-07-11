import { ProductsModule } from './Product/products.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot('mongodb+srv://jagatguru31:TLHINiKvJP7kT6GV@cluster0.fucln.mongodb.net/nestjs-demo?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
