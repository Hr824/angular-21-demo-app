import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const router: Router = inject(Router);

  return next(req).pipe(
    catchError((error:any) => {
      console.log()
      if(error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 0:
            console.log("Network error");
            router.navigate(['/errorOccurred']);
            break;
          case 400:
            console.log("400 Bad Request");
            router.navigate(['/errorOccurred']);
            break;
          case 401:
            console.log("401 Unauthorized");
            router.navigate(['/errorOccurred']);
            break;
          case 403:
            console.log("403 Forbidden");
            router.navigate(['/errorOccurred']);
            break;
          case 404:
              console.log("404 Not Found");
              router.navigate(['/pageNotFound']);
              break;
          case 500:
            console.log("500 Internal Server Error");
            router.navigate(['/errorOccurred']);
            break;
          case 503:
              console.log("503 Service Unavailable");
              router.navigate(['/errorOccurred']);
              break;
          default:
            console.log(error.name + ', ' + error.message);
            router.navigate(['/errorOccurred']);
            break;
        } 
      }
      else {
        // if(error.status === 404 && error.statusText === 'Not Found' && error.url.includes('api/movies/')){
        //   //Dans MovieService, erreur getMovieById(id: number) quand l'id n'existe pas
        //   //L'erreur est gérée dans le component (MovieDetailsComponent) qui appelle la méthode du service         
        //   //console.log("404 Movie Not Found");
        // }
        // else{
        //   console.log('Not HTTP error', JSON.stringify(error) + ', Name: ' + error.name + ', Message: ' + error.message);
        //   router.navigate(['/errorOccurred']);
        // }
        console.log('Not HTTP error', JSON.stringify(error) + ', Name: ' + error.name + ', Message: ' + error.message);
        router.navigate(['/errorOccurred']);
      }

      //return throwError(() => error);
      return next(req);
    })
  )
};
