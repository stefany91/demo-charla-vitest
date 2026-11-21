import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { Cart } from './cart';
import { CouponService } from './coupon.service';

describe('Carrito de Compras (Demo Vitest)', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let couponService: CouponService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cart]
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    couponService = TestBed.inject(CouponService);
    fixture.detectChanges();
  });

  
  describe('1. Lógica y Signals', () => {
    it('Suma la cantidad y recalcula el subtotal si se agrega un producto repetido', () => {
      const mouse = { id: 2, name: '🖱️ Mouse Gamer', price: 40, quantity: 1 };

      component.addProduct(mouse);
      component.addProduct(mouse);

      expect(component.items().length).toBe(1);
      expect(component.items()[0].quantity).toBe(2);
      expect(component.subtotal()).toBe(80);
    });
  });


  describe('2. Interacción del Usuario (DOM)', () => {
    it('Actualiza el total a pagar en Bs. cuando se hace clic en agregar', () => {
      const html: HTMLElement = fixture.nativeElement;
      const botonTeclado = html.querySelector('#add-btn') as HTMLButtonElement;
      const textoTotal = html.querySelector('#total') as HTMLElement;

      expect(textoTotal.textContent).toContain('Bs. 0');

      botonTeclado.click();
      fixture.detectChanges();

      expect(textoTotal.textContent).toContain('Bs. 60');
    });

    it('Vacía el carrito y vuelve a Bs. 0 al presionar el botón Vaciar', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const addBtn = compiled.querySelector('#add-btn') as HTMLButtonElement;
      addBtn.click();
      fixture.detectChanges();

      expect(component.items().length).toBe(1);

      const clearBtn = compiled.querySelector('#clear-btn') as HTMLButtonElement;
      clearBtn.click();
      fixture.detectChanges();

      expect(component.items().length).toBe(0);
      expect(component.total()).toBe(0);
      expect(compiled.querySelector('.empty-message')?.textContent).toContain('Tu carrito está vacío');
    });

    it('Permite agregar varios productos distintos y aplicar el cupón ANGULAR20', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      (compiled.querySelector('#add-btn') as HTMLButtonElement).click();
      (compiled.querySelector('#add-btn-2') as HTMLButtonElement).click();
      (compiled.querySelector('#add-btn') as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(component.totalItems()).toBe(3);

      const couponBtn = compiled.querySelector('#coupon-btn') as HTMLButtonElement;
      couponBtn.click();
      fixture.detectChanges();

      expect(component.discountRate()).toBe(0.2);
    });
  });


  describe('3. Mocks y Manejo de Errores (vi.spyOn)', () => {
    it('Aplica un 50% de descuento simulando la respuesta del servidor', () => {
      const spy = vi.spyOn(couponService, 'validateCoupon').mockReturnValue(of(0.50));
      component.addProduct({ id: 3, name: '🖥️ Monitor 24"', price: 150, quantity: 1 });

      component.applyCoupon('SUPER50');

      expect(spy).toHaveBeenCalledWith('SUPER50');
      expect(component.total()).toBe(75);
    });

    it('Muestra una alerta roja en pantalla si el cupón ingresado está vencido', () => {
      vi.spyOn(couponService, 'validateCoupon').mockReturnValue(
        throwError(() => new Error('Cupón vencido'))
      );

      component.applyCoupon('VIEJO');
      fixture.detectChanges();

      const errorEl = fixture.nativeElement.querySelector('#error');
      expect(errorEl.textContent).toContain('Cupón vencido');
    });
  });
});
