import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  validateCoupon(code: string): Observable<number> {
    if (code === 'ANGULAR20') {
      return of(0.20);
    }
    return throwError(() => new Error('Cupón inválido o expirado'));
  }

}