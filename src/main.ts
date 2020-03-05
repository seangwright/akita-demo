import { enableProdMode } from '@angular/core';
import { enableAkitaProdMode } from '@datorama/akita';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { server } from './app/server/api';

console.log(server);

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
