import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotal();  // Recalculate total after removal
  }

  calculateTotal(): void {
    this.totalPrice = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateQuantity(index: number, quantity: number): void {
    this.cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotal();  // Recalculate total after updating quantity
  }

  clearCart(): void {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = 0; // Reset the total price
  }
  

}
