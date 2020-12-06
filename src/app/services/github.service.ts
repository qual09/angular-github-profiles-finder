import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private url: string;
  private token: string;
  private requestOptions: object;

  constructor(private http: HttpClient) {
    this.url = environment.githubUrl;
    this.token = environment.githubToken;
    this.requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token,
      })
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProfile(user: string): Observable<Profile> {
    const url = `${this.url}/${user}`;
    return this.http.get<Profile>(url, this.requestOptions).pipe(
      tap(() => console.log('### GithubService ### searchProfile')),
      catchError(this.handleError<Profile>('searchProfile'))
    );
  }
}
