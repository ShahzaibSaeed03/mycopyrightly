import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './interceptors/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    // provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        (req, next) => tokenInterceptor(req, next)
      ])
    ),
    importProvidersFrom(BrowserAnimationsModule),
    
  ],
};
