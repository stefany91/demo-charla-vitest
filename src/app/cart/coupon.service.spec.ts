import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { CouponService } from './coupon.service';

describe('Servicio de Cupones (CouponService)', () => {
  let service: CouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponService);
  });

  it('Devuelve el 20% de descuento (0.2) aplicando el código es ANGULAR20', async () => {
    const discount = await firstValueFrom(service.validateCoupon('ANGULAR20'));
    expect(discount).toBe(0.2);
  });

  it('Rechaza la operación con error si el código de cupón no existe', async () => {
    await expect(firstValueFrom(service.validateCoupon('INVALIDO'))).rejects.toThrow();
  });
});
