import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MovieAPIService } from '../services/movie-api.service';
import { debounceTime } from 'rxjs/operators';
import { Logger } from '@app/core';
const log = new Logger('SearchBarComponent');
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  
  searchField: FormControl = new FormControl();
  constructor(private movieService: MovieAPIService) { }

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(debounceTime(500))
      .subscribe(search => this.movieService.searchMoviesByName(search)
        .then(response => log.debug('Search complete.')));
  }

}
