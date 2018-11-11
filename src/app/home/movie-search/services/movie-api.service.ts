import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Movie } from "@app/shared/models/movie.model";
import { Observable } from 'rxjs';
import { Logger } from '@app/core';
const log = new Logger('MovieAPIService');

@Injectable({
  providedIn: 'root'
})

// Idea: Once the data store is updated we push the new list of movies with _movies  
// Because this is a Singleton. This is where I will store movie data in memory. In this case.
export class MovieAPIService {
  private _movies: BehaviorSubject<Movie[]>;
  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  private dataStore: {
    _movies: Movie[]
  };
  constructor() {
    this.dataStore = { _movies: [] };
    this._movies = <BehaviorSubject<Movie[]>>new BehaviorSubject([]);
  }
  errorHandler(error: string): void {
    log.error('API error:', error);
  }
  searchMoviesByName(source: String) {
    this.loading.emit(true);
    let _movie_resuls: Promise<any>;
    return fetch(`${environment.apiUrl}?s=${source}&apikey=${environment.apiKey}`)
      .then(response => _movie_resuls = response.json())
      .then(data => {
        if (data.Search) {
          this.dataStore._movies = data.Search.map((movie: Movie) => new Movie().deserialize(movie))
          // Push a new copy of movie list to all Subscribers.
          this._movies.next(Object.assign({}, this.dataStore)._movies);
          this.loading.emit(false);
        } else if (data.Error) {
          this.errorHandler(data.Error);
          this.loading.emit(false);
        }
      })
  }

  // GETTERS AND SETTERS 
  get movies$() {
    return this._movies.asObservable();
  }

}
