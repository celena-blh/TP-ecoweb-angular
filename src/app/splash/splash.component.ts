import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="splash-screen">
      <h1 class="animate-pulse">Conduit</h1>
      <div class="loader"></div>
      <p>Loading your experience...</p>
      <p class="timer">{{ countdown }}s</p>
    </div>
  `,
  styles: [`
    .splash-screen {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      z-index: 10000;
    }
    h1 {
      font-size: 72px;
      margin-bottom: 30px;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    .loader {
      border: 8px solid rgba(255,255,255,0.3);
      border-top: 8px solid white;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      animation: spin 1s linear infinite;
      margin: 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .timer {
      font-size: 24px;
      margin-top: 20px;
    }
  `]
})
export class SplashComponent implements OnInit {
  countdown = 8;
  readonly #router = inject(Router);

  ngOnInit() {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.#router.navigate(['/welcome']);
      }
    }, 1000);
  }
}