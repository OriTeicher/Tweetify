"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_model_1 = require("./product.model");
const common_2 = require("@nestjs/common");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor() {
        this.products = [];
    }
    insertProduct(title, desc, price) {
        const prodId = Math.random().toString();
        const newProduct = new product_model_1.Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }
    getProducts() {
        return [...this.products];
    }
    getSingleProduct(prodId) {
        const product = this.findProduct(prodId)[0];
        return { ...product };
    }
    updateProdact(prodId, prodTitle = 'untitled', prodDesc = 'no description', prodPrice = 0) {
        const [product, prodIdx] = this.findProduct(prodId);
        const updatedProd = { ...product };
        if (prodTitle)
            updatedProd.title = prodTitle;
        if (prodDesc)
            updatedProd.desc = prodDesc;
        if (prodPrice)
            updatedProd.price = prodPrice;
        this.products[prodIdx] = updatedProd;
    }
    removeProduct(prodId) {
        this.products = this.products.filter((prod) => prod.id !== prodId);
    }
    findProduct(prodId) {
        const prodIdx = this.products.findIndex((prod) => prod.id === prodId);
        const product = this.products[prodIdx];
        if (!product)
            throw new common_2.NotFoundException();
        return [product, prodIdx];
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=product.service.js.map