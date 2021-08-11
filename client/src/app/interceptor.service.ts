import { LoadingService } from './loading.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loader: LoadingService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('items/category/')) {
      this.loader.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.loader.isLoading.next(false);
        }
      )
    );
    } else
      return next.handle(req);
  }
}
