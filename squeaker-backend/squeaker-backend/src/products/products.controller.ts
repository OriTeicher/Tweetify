import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Patch
} from '@nestjs/common'
import { ProductsService } from './product.service'

@Controller('products')
export class ProducsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        )
        return { id: generatedId }
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('description') prodDesc: string,
        @Body('title') prodTitle: string,
        @Body('price') prodPrice: number
    ): any {
        this.productsService.updateProdact(
            prodId,
            prodTitle,
            prodDesc,
            prodPrice
        )
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        return this.productsService.removeProduct(prodId)
    }
}
