import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="welcome-screen">
      <h1>Welcome to Conduit!</h1>
      <p>Before you continue, please accept our terms...</p>
      <div class="terms-box">
        <h3>Terms and Conditions</h3>
        <div class="terms-content">
          <p>Lorem ipsum dolor sit amet... (very long text)</p>
          <p>By using this service...</p>
          <p>We may collect your data...</p>
          <!-- Ajouter beaucoup de texte -->
        </div>
        <label>
          <input type="checkbox" [(ngModel)]="acceptedTerms">
          I accept the terms (scroll down first)
        </label>
      </div>
      <button 
        [disabled]="!acceptedTerms" 
        (click)="continue()"
        class="btn btn-primary">
        Continue
      </button>
      <p *ngIf="!acceptedTerms" class="warning">
        You must accept terms to continue
      </p>
    </div>
  `,
  styles: [`
    .welcome-screen {
      padding: 50px;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .terms-box {
      border: 2px solid #ddd;
      padding: 20px;
      margin: 30px 0;
      max-height: 300px;
      overflow-y: scroll;
      text-align: left;
    }
    .terms-content {
      height: 500px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .warning {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class WelcomeComponent {
  acceptedTerms = false;
  readonly #router = inject(Router);

  continue() {
    this.#router.navigate(['/newsletter']);
  }
}