import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="newsletter-screen">
      <h1>One More Thing...</h1>
      <p>Subscribe to our newsletter to continue!</p>
      <input 
        type="email" 
        [(ngModel)]="email" 
        placeholder="Enter your email"
        class="form-control">
      <button 
        (click)="subscribe()" 
        [disabled]="!email"
        class="btn btn-success">
        Subscribe & Continue
      </button>
      <p><small>We promise to send you emails every day! 📧</small></p>
    </div>
  `,
  styles: [`
    .newsletter-screen {
      padding: 50px;
      max-width: 500px;
      margin: 100px auto;
      text-align: center;
      border: 2px solid #5cb85c;
      border-radius: 10px;
    }
    input {
      margin: 20px 0;
    }
    button {
      width: 100%;
      margin: 10px 0;
    }
  `]
})
export class NewsletterComponent {
  email = '';
  readonly #router = inject(Router);

  subscribe() {
    alert('Thanks! Redirecting...');
    setTimeout(() => {
      this.#router.navigate(['/']);
    }, 2000);
  }
}