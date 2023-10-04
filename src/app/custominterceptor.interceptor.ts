import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable, catchError, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';

@Injectable()
export class CustominterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private sharedService: SharedService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localToken}`,
        },
      });
    }
    if(!localToken){
      this.sharedService.setIsLoggedIn(false);
      localStorage.clear();
    }

    return next.handle(request).pipe(
      catchError((error,caught) => {
        if (error.status ===403){
          localStorage.clear();
         
        }
        throw error;
      })
    );
  }
}
  /*
  *
  *  
  Wrong way to implement
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken= localStorage.getItem('token');
    request = request.clone({headers:request.headers.set('Authorization','Bearer ' + localToken)});
    return next.handle(request);
  }
  *
  *
  */

  /*
 *
 *  
 Right Way to implement
 *
 *
 */
//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const localToken = localStorage.getItem('token');
//     if (localToken) {
//       request.clone({
//         headers: request.headers.set('Authorization', 'Bearer ' + localToken),
//       });
//     }

//     const expirytokentime = 1080000000;
//     setTimeout(() => {
//       localStorage.removeItem('token');
//       this.sharedService.setIsLoggedIn(false);
//       this.router.navigate(['/login']);
//       alert('Logged Out');
//     }, expirytokentime);

//     return next.handle(request).pipe(
//       catchError((err, caught) => {
//         if (err.status === 401) {
//           localStorage.removeItem('token');
//         }
//         if (err.status === 403) {
//           // localStorage.removeItem('token');
//           // this.router.navigate(['/login']);
//         }
//         throw err;
//       })
//     );
//   }
// }
