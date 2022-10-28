// import getConfig from 'next/config';

export class ProductService {
    constructor() {
        // this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getProductsSmall() {
        return fetch('public/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProducts() {
        return fetch('public/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('public/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
