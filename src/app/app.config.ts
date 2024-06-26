import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: environment.firebase.projectId,
          appId: environment.firebase.appId,
          storageBucket: environment.firebase.storageBucket,
          apiKey: environment.firebase.apiKey,
          authDomain: environment.firebase.authDomain,
          messagingSenderId: environment.firebase.messagingSenderId,
        })
      )
    ),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
