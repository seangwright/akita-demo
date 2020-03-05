import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Movie } from '../store/movie';
import { Observable } from 'rxjs';
import { MoviesService } from '../store/movies.service';
import { UiStatus } from '../store/movie';
import { MoviesQuery } from '../store/movies.query';

@Component({
  selector: 'ui-one',
  template: `
    <div>
      <ng-container
        *ngIf="(status | async) === 'Initializing'; then loading; else loaded"
      >
      </ng-container>

      <ng-template #loaded>
        <ng-container *ngIf="favorite | async as fav; else noFavoriteTmpl">
          <h1>{{ fav!.name }} is your favorite</h1>
        </ng-container>

        <ng-template #noFavoriteTmpl>
          <h1>Select a favorite</h1>
        </ng-template>
        <ng-container *ngIf="isLoading | async; then loading"></ng-container>
        <ng-container *ngIf="anyMovies | async; then hasMovies; else noMovies">
        </ng-container>
        <ng-template #hasMovies>
          <ul>
            <li *ngFor="let movie of movies | async">
              {{ movie.name }}
              <button
                (click)="onSelectFavorite(movie)"
                [disabled]="
                  (isLoading | async) || (favorite | async)?.id === movie.id
                "
              >
                Favorite
              </button>
            </li>
          </ul>
        </ng-template>
        <ng-template #noMovies>
          <h3>No movies are loaded</h3>
        </ng-template>
        <h3 *ngIf="error | async as e">There was an error: {{ e }}</h3>
      </ng-template>
    </div>

    <ng-template #loading>
      <h3>... Loading ...</h3>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiOneComponent {
  movies: Observable<Movie[]>;
  anyMovies: Observable<boolean>;
  favorite: Observable<Movie | undefined>;
  error: Observable<string>;
  status: Observable<UiStatus>;
  isLoading: Observable<boolean>;

  constructor(private service: MoviesService, query: MoviesQuery) {
    this.movies = query.movies;
    this.error = query.error;
    this.status = query.status;
    this.anyMovies = query.hasMovies;
    this.favorite = query.favorite;
    this.isLoading = query.isLoading;
  }

  ngOnInit() {
    this.service.get();
  }

  onSelectFavorite(movie: Movie) {
    this.service.updateFavorite(movie);
  }
}
