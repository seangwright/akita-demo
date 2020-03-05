import { QueryEntity } from '@datorama/akita';
import { MoviesState, MoviesStore } from './movies.store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesQuery extends QueryEntity<MoviesState> {
  favorite = this.select(({ ui }) => ui.favorite);
  error = this.selectError<string>();
  movies = this.selectAll();
  hasMovies = this.selectCount().pipe(map(count => count > 0));
  status = this.select(({ ui }) => ui.status);
  isLoading = this.selectLoading();

  constructor(protected store: MoviesStore) {
    super(store);
  }
}
