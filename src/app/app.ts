import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Cart],
  styleUrl: './app.css',
  templateUrl: './app.html',
  
})
export class App {
 
}
