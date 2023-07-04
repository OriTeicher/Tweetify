import { Product } from './product.model';
export declare class ProductsService {
    private products;
    insertProduct(title: string, desc: string, price: number): string;
    getProducts(): Product[];
    getSingleProduct(prodId: string): {
        id: string;
        title: string;
        desc: string;
        price: number;
    };
    updateProdact(prodId: string, prodTitle?: string, prodDesc?: string, prodPrice?: number): void;
    removeProduct(prodId: string): void;
    private findProduct;
}
