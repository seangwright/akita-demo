import { Injectable } from '@angular/core';
import { MoviesQuery } from './movies.query';
import { map } from 'rxjs/operators';
import { Movie, UiStatus } from './movie';
import { combineQueries } from '@datorama/akita';
import { Observable } from 'rxjs';

export interface UiState {
  movies: Movie[];
  anyMovies: boolean;
  favorite: Movie | undefined;
  error: string;
  status: UiStatus;
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesFacade {
  constructor(private query: MoviesQuery) {}

  uiState = combineQueries([
    this.query.movies,
    this.query.error,
    this.query.status,
    this.query.favorite,
    this.query.isLoading
  ]).pipe(
    map(([movies, error, status, favorite, isLoading]) => ({
      movies,
      anyMovies: !!movies.length,
      error,
      status,
      favorite,
      isLoading
    }))
  );
}
