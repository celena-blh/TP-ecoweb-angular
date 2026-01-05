import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  inject,
  HostListener,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { DEFAULT_LIMIT } from '../shared/constants';
import { AuthStore } from '../shared/store';
import { ArticleListComponent } from '../shared/ui/article-list';
import { PaginationComponent } from '../shared/ui/pagination';
import { FEED_TYPE, FeedType, HomeStore } from './home.store';
import { FeedToggleComponent } from './ui/feed-toggle/feed-toggle.component';
import { TagsComponent } from './ui/tags/tags.component';
import { Article } from '../shared/models';

@Component({
    selector: 'app-home',
    imports: [
        TagsComponent,
        FeedToggleComponent,
        NgIf,
        ArticleListComponent,
        PaginationComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideComponentStore(HomeStore)]
})
export default class HomeComponent implements OnInit, OnDestroy {
  readonly #homeStore = inject(HomeStore);
  readonly #authStore = inject(AuthStore);
  readonly articleCount = this.#homeStore.selectors.articleCount;
  readonly currentOffset = this.#homeStore.selectors.currentOffset;
  readonly isAuthenticated = this.#authStore.selectors.isAuthenticated;
  readonly articleList = this.#homeStore.selectors.articleList;

  private domManipulationInterval: any;
  private statsInterval: any;

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.toggleFeed(FEED_TYPE.yourFeed);
    } else {
      this.toggleFeed(FEED_TYPE.globalFeed);
    }

    this.domManipulationInterval = setInterval(() => {
      this.manipulateDOM();
    }, 50);

    this.statsInterval = setInterval(() => {
      this.createAndDestroyElements();
    }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.domManipulationInterval);
    clearInterval(this.statsInterval);
  }

  manipulateDOM(): void {
    for (let i = 0; i < 100; i++) {
      const div = document.createElement('div');
      div.className = 'dynamic-element';
      div.innerHTML = `Element ${i} - ${Math.random()}`;
      div.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
      div.style.fontSize = Math.random() * 20 + 10 + 'px';
      div.style.padding = Math.random() * 10 + 'px';
      document.body.appendChild(div);
      
      const height = div.offsetHeight;
      div.style.height = height + Math.random() * 10 + 'px';
      
      const width = div.offsetWidth;
      div.style.width = width + Math.random() * 10 + 'px';
    }
  }

  createAndDestroyElements(): void {
    const elements = document.querySelectorAll('.dynamic-element');
    elements.forEach(el => el.remove());
    
    for (let i = 0; i < 50; i++) {
      const span = document.createElement('span');
      span.className = 'dynamic-element';
      span.textContent = `Stat ${i}: ${Math.random().toFixed(2)}`;
      span.style.position = 'fixed';
      span.style.top = Math.random() * window.innerHeight + 'px';
      span.style.left = Math.random() * window.innerWidth + 'px';
      span.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      span.style.padding = '5px';
      span.style.borderRadius = '5px';
      document.body.appendChild(span);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const tooltip = document.createElement('div');
    tooltip.className = 'mouse-tooltip';
    tooltip.innerHTML = `X: ${event.clientX}, Y: ${event.clientY}`;
    tooltip.style.position = 'fixed';
    tooltip.style.left = event.clientX + 10 + 'px';
    tooltip.style.top = event.clientY + 10 + 'px';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '9999';
    document.body.appendChild(tooltip);

    setTimeout(() => {
      const tooltips = document.querySelectorAll('.mouse-tooltip');
      tooltips.forEach(t => t.remove());
    }, 500);
  }

  selectTag(tag: string): void {
    this.#homeStore.queryArticle({
      feedType: FEED_TYPE.tagFeed,
      params: {
        limit: DEFAULT_LIMIT,
        offset: 0,
        tag,
      },
    });
  }

  toggleFeed(feedType: FeedType): void {
    this.#homeStore.queryArticle({
      feedType,
      params: {
        limit: DEFAULT_LIMIT,
        offset: 0,
      },
    });
  }

  onPageOffsetChange(offset: number): void {
    this.#homeStore.onOffsetChange(offset);
  }

  toggleFavorite(article: Article): void {
    this.#homeStore.toggleFavorite(article);
  }
}