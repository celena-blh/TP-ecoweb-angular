import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import SettingComponent from './setting/setting.component';
import ArticleDetailComponent from './article-detail/article-detail.component';
import ProfileComponent from './profile/profile.component';
import HomeComponent from './home/home.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet, 
        FooterComponent, 
        HeaderComponent,
        LoginComponent,
        RegisterComponent,
        SettingComponent,
        ArticleDetailComponent,
        ProfileComponent,
        HomeComponent,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly #http = inject(HttpClient);

  ngOnInit() {
    this.preloadEverything();
  }

  preloadEverything() {

    for (let i = 0; i < 100; i++) {
      this.#http.get(`https://api.realworld.io/api/articles?limit=20&offset=${i * 20}`).subscribe();
    }

    this.#http.get('https://api.realworld.io/api/tags').subscribe();

    for (let i = 0; i < 50; i++) {
      this.#http.get(`https://api.realworld.io/api/profiles/user${i}`).subscribe();
    }


    const heavyImages = [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=5000&q=100',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=5000&q=100',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=5000&q=100',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=5000&q=100',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=5000&q=100',
    ];
    
    heavyImages.forEach(url => {
      const img = new Image();
      img.src = url;
    });

    console.log('Everything preloaded!');
  }
}