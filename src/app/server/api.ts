import { Server } from 'miragejs';

export const server = new Server({
  routes() {
    this.namespace = 'api';

    this.get('/movies', () => {
      return {
        movies: [
          { id: 1, name: 'Inception', year: 2010 },
          { id: 2, name: 'Interstellar', year: 2014 },
          { id: 3, name: 'Dunkirk', year: 2017 },
          { id: 4, name: 'The Devil Wears Prada', year: 2006 }
        ]
      };
    });
  }
});
