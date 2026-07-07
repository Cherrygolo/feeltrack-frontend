import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, delay } from 'rxjs';
import { ColdStartNotifierService } from '../services/cold-start-notifier.service';

export const coldStartInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/api/')) {
    return next(req);
  }

  const notifier = inject(ColdStartNotifierService);

  /* Start the cold start notifier. It will show a message to the user
     if the server takes more than 3 seconds to start */
  notifier.start();

  /* Stop the cold start notifier when the request is completed,
     whether it was successful or not */
  return next(req).pipe(
    finalize(() => {
      notifier.stop();
    })
  );
};