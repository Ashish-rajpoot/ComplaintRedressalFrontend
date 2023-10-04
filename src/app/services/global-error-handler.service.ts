import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor(private router: Router) {}

  handleError(error: Error | HttpErrorResponse): void {
    // Custom error handling logic goes here

    if (error instanceof HttpErrorResponse) {
      if (error.status === 403) {
        console.error('Forbidden Error (403):', error);
        // Access the error message
        console.error('Error Message:', error.error);

        // Handle 403 Forbidden error here
        // ...
      }
    }

    // Optionally, you can redirect to an error page or display a generic error message
    this.router.navigate(['/error']);
  }
}
