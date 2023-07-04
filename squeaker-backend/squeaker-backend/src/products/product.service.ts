import { Injectable } from '@nestjs/common'
import { Product } from './product.model'
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class ProductsService {
    private products: Product[] = []

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString()
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct)
        return prodId
    }

    getProducts() {
        return [...this.products]
    }

    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0]
        return { ...product }
    }

    updateProdact(
        prodId: string,
        prodTitle: string = 'untitled',
        prodDesc: string = 'no description',
        prodPrice: number = 0
    ) {
        const [product, prodIdx] = this.findProduct(prodId)
        const updatedProd = { ...product }
        if (prodTitle) updatedProd.title = prodTitle
        if (prodDesc) updatedProd.desc = prodDesc
        if (prodPrice) updatedProd.price = prodPrice
        this.products[prodIdx] = updatedProd
    }

    removeProduct(prodId: string) {
        this.products = this.products.filter((prod) => prod.id !== prodId)
    }

    private findProduct(prodId: string): [Product, number] {
        const prodIdx = this.products.findIndex((prod) => prod.id === prodId)
        const product = this.products[prodIdx]
        if (!product) throw new NotFoundException()
        return [product, prodIdx]
    }
}
