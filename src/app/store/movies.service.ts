import { Injectable } from '@angular/core';
import { MoviesStore } from './movies.store';
import { from } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private store: MoviesStore) {}

  get() {
    this.store.setLoading(true);

    from<Promise<Movie[]>>(
      fetch('/api/movies')
        .then(resp => resp.json())
        .then(({ movies }) => movies)
    ).subscribe({
      next: movies => {
        this.store.set(movies);
        if (this.store.getValue().ui.status !== 'Stable') {
          this.store.update(state => ({
            ...state,
            ui: { ...state.ui, status: 'Stable' }
          }));
        }
      },
      error: e =>
        this.store.setError(
          `There was a problem with the request: ${JSON.stringify(e)}`
        ),
      complete: () => this.store.setLoading(false)
    });
  }

  updateFavorite(favorite: Movie) {
    this.store.setLoading(true);

    setTimeout(() => {
      this.store.setLoading(false);

      if (!(favorite.id % 2)) {
        this.store.setError(`No one really likes ${favorite.name}`);

        return;
      }

      this.store.update(state => ({
        ...state,
        ui: { ...state.ui, favorite }
      }));
      this.store.setError('');
    }, 1000);
  }
}
