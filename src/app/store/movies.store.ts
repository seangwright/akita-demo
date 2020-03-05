import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Movie, UiStatus } from './movie';
import { Injectable } from '@angular/core';

export interface MoviesState extends EntityState<Movie> {
  ui: {
    favorite?: Movie;
    status: UiStatus;
  };
}

function setInitialState(): MoviesState {
  return {
    ui: {
      favorite: undefined,
      status: 'Initializing'
    }
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'movies' })
export class MoviesStore extends EntityStore<MoviesState> {
  constructor() {
    super(setInitialState());
  }
}
