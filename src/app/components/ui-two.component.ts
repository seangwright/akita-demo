import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Movie } from '../store/movie';
import { Observable } from 'rxjs';
import { MoviesService } from '../store/movies.service';
import { MoviesFacade, UiState } from '../store/movies.facade';

@Component({
  selector: 'ui-two',
  template: `
    <div *ngIf="uiState | async as state">
      <ng-container
        *ngIf="state.status === 'Initializing'; then loading; else loaded"
      >
      </ng-container>

      <ng-template #loaded>
        <ng-container *ngIf="state.favorite; else noFavoriteTmpl">
          <h1>{{ state.favorite!.name }} is your favorite</h1>
        </ng-container>

        <ng-template #noFavoriteTmpl>
          <h1>Select a favorite</h1>
        </ng-template>

        <ng-container *ngIf="state.isLoading; then loading"></ng-container>
        <ng-container *ngIf="state.anyMovies; then hasMovies; else noMovies">
        </ng-container>
        <ng-template #hasMovies>
          <ul>
            <li *ngFor="let movie of state.movies">
              {{ movie.name }}
              <button
                (click)="onSelectFavorite(movie)"
                [disabled]="state.isLoading || state.favorite?.id === movie.id"
              >
                Favorite
              </button>
            </li>
          </ul>
        </ng-template>
        <ng-template #noMovies>
          <h3>No movies are loaded</h3>
        </ng-template>
        <h3 *ngIf="state.error">There was an error: {{ state.error }}</h3>
      </ng-template>
    </div>

    <ng-template #loading>
      <h3>... Loading ...</h3>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTwoComponent {
  uiState: Observable<UiState>;

  constructor(private service: MoviesService, facade: MoviesFacade) {
    this.uiState = facade.uiState;
  }

  ngOnInit() {
    this.service.get();
  }

  onSelectFavorite(movie: Movie) {
    this.service.updateFavorite(movie);
  }
}
