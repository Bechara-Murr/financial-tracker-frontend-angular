import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<TResponse>(
    url: string,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>
  ): Observable<TResponse> {
    return this.http
      .get<TResponse>(url, {
        params: this.buildHttpParams(params),
        headers: this.buildHttpHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  post<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    headers?: Record<string, string>
  ): Observable<TResponse> {
    return this.http
      .post<TResponse>(url, body, {
        headers: this.buildHttpHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  put<TResponse, TBody = unknown>(
    url: string,
    body: TBody,
    headers?: Record<string, string>
  ): Observable<TResponse> {
    return this.http
      .put<TResponse>(url, body, {
        headers: this.buildHttpHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  delete<TResponse>(
    url: string,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>
  ): Observable<TResponse> {
    return this.http
      .delete<TResponse>(url, {
        params: this.buildHttpParams(params),
        headers: this.buildHttpHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  private buildHttpParams(
    params?: Record<string, string | number | boolean>
  ): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return httpParams;
  }

  private buildHttpHeaders(headers?: Record<string, string>): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpHeaders = httpHeaders.set(key, value);
        }
      });
    }
    return httpHeaders;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error:', error);

    let errorMsg = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      errorMsg = `Server Error: ${error.status} - ${error.message}`;

      switch (error.status) {
        case 401:
          console.log('Unauthenticated');
          break;
        case 403:
          console.log('Unauthorized');
          break;
        case 0:
          console.log('Unable to connect to the server');
          break;
        default:
          console.log('An unknown error occurred');

          break;
      }
    }

    return throwError(() => new Error(errorMsg));
  }
}
