import { Module } from '@nestjs/common'
import { ProducsController } from './products.controller'
import { ProductsService } from './product.service'

@Module({
    controllers: [ProducsController],
    providers: [ProductsService]
})

export class ProductsModule {}
