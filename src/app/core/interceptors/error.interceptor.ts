import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(

    catchError((error) => {

      let userMessage = 'Une erreur inattendue est survenue.';

      if (error.status === 0) {
        userMessage = 'Impossible de contacter le serveur.';
      }

      if (error.status === 404) {
        userMessage = 'La ressource demandée est introuvable.';
      }

      if (error.status === 500) {
        userMessage = 'Le serveur rencontre un problème.';
      }

      const formattedError = {
        ...error,
        userMessage
      };

      return throwError(() => formattedError);

    })

  );
};