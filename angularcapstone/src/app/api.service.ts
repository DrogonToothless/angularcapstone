import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { environment } from '../environment/environment';
import {Movie} from './movie';
import {SearchResults} from './search-results';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }

  constructor(
    private http: HttpClient
  ) { }

  searchMovies(params:HttpParams): Observable<SearchResults> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + environment.tmdbApi.apiKey,
      },
      params: params.append('include_adult', false)
    }
    return this.http.get<SearchResults>(`${this.apiUrl}/search/movie`, options)
      .pipe(
        tap((data) => {
          console.log('Search Results:', data);
        }),
        catchError(this.handleError)
      );
  }

  getPopularMovies(): Observable<SearchResults> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + environment.tmdbApi.apiKey,
      },
    params: new HttpParams().set('include_adult', false)
    }

    return this.http.get<SearchResults>(`${this.apiUrl}/movie/popular`, options)
      .pipe(
        tap((data) => {
          console.log('Popular Movies:', data);
        }),
        catchError(this.handleError)
      );
  }

  getMovieDetails(id: string) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + environment.tmdbApi.apiKey,
      }
    }
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`, options);
  }
}
