import { Routes } from '@angular/router';
import { authGuard, nonAuthGuard } from './shared/guards';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import SettingComponent from './setting/setting.component';
import ArticleDetailComponent from './article-detail/article-detail.component';
import ProfileComponent from './profile/profile.component';
import HomeComponent from './home/home.component';
import { SplashComponent } from './splash/splash.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

export const routes: Routes = [
  { 
    path: 'splash', 
    component: SplashComponent 
  },
  { 
    path: 'welcome', 
    component: WelcomeComponent
  },
  { 
    path: 'newsletter', 
    component: NewsletterComponent
  },
  {
    path: 'login',
    component: LoginComponent, 
    title: 'Sign in',
    canMatch: [nonAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent, 
    title: 'Sign up',
    canMatch: [nonAuthGuard],
  },
  {
    path: 'settings',
    component: SettingComponent, 
    canMatch: [authGuard],
    title: 'Settings',
  },
  {
    path: 'article/:slug',
    component: ArticleDetailComponent, 
  },
  {
    path: '@:username',
    component: ProfileComponent, 
  },
  {
    path: '',
    component: HomeComponent, 
    title: 'Home',
  },
];