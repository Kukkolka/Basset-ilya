import { Component, OnInit, EventEmitter } from '@angular/core';
import { MovieAPIService } from './services/movie-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from "@app/shared/models/movie.model";
@Component({
  selector: 'app-movie-search-results',
  templateUrl: './movie-search-results.component.html',
  styleUrls: ['./movie-search-results.component.scss']
})
export class MovieSearchResultsComponent implements OnInit {
  movies$: Observable<Movie[]>;
  isLoading: boolean;
  constructor(private searchService: MovieAPIService) { }

  ngOnInit() {
    this.isLoading = false;
    this.searchService.loading.subscribe((isLoading:boolean)=> {
      this.isLoading = isLoading;
    });
    this.movies$ = this.searchService.movies$;
  }



}
