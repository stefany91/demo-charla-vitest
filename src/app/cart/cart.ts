import { Component, computed, inject, signal } from '@angular/core';
import { CouponService } from './coupon.service';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  imports: [],
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private couponService = inject(CouponService); 

  catalog: Product[] = [
    { id: 1, name: '⌨️ Teclado Mecánico', price: 60, quantity: 1 },
    { id: 2, name: '🖱️ Mouse Gamer', price: 40, quantity: 1 },
    { id: 3, name: '🖥️ Monitor 24"', price: 150, quantity: 1 },
    { id: 4, name: '🎧 Audífonos RGB', price: 85, quantity: 1 },
    { id: 5, name: '📷 Webcam Full HD', price: 95, quantity: 1 }
  ];


  items = signal<Product[]>([]);
  discountRate = signal<number>(0);
  errorMessage = signal<string>('');

  totalItems = computed(() =>
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.items().reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  total = computed(() => {
    const sub = this.subtotal();
    return sub - sub * this.discountRate();
  });

  addProduct(product: Product) {
    this.items.update(list => {
      const existing = list.find(item => item.id === product.id);
      if (existing) {
        return list.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...list, { ...product, quantity: 1 }];
    });
  }

  clearCart() {
    this.items.set([]);
    this.discountRate.set(0);
    this.errorMessage.set('');
  }

  applyCoupon(code: string) {
    this.errorMessage.set('');
    this.couponService.validateCoupon(code).subscribe({
      next: (rate) => this.discountRate.set(rate),
      error: (err) => this.errorMessage.set(err.message)
    });
  }
}
