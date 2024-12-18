import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [
    { id: 1, name: 'Mobile', price: 19000},
    { id: 2, name: 'Laptop', price: 70000 },
    { id: 3, name: 'TV', price: 3000 }
  ];

  constructor() { }

  getProducts() {
    return this.products;
  }
}
