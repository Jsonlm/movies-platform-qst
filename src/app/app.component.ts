import { Component } from '@angular/core';
import { Movie } from './core/models/movie';
import { movies } from '../assets/data'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'qst-movies-angulartest';
  public data: Movie[] = [];
  public filteredMovies: Movie[] = [];
  public filterForm!: FormGroup;
  public watchlistSelected!: boolean;
  public disabledWatchlist!: boolean;

  constructor(private formBuilder: FormBuilder  ) {}

  ngOnInit() {
    this.data = movies;
    this.filteredMovies = this.data;

    this.filterForm = this.formBuilder.group({
      movieFilter: ['']
    });

    this.filterForm.get('movieFilter')?.valueChanges.subscribe(value => {
      this.applyFilter(value);
      this.watchlistSelected = false;
    });

    localStorage.getItem('watchlist') === '[]' || localStorage.getItem('watchlist') === null
    ? this.disabledWatchlist = true
    : this.disabledWatchlist = false
  }

  applyFilter(filterValue: string) {
    this.filteredMovies = this.data.filter(movie =>
      movie.title.toLowerCase().includes(filterValue.toLowerCase()) ||
      movie.released_date.toLowerCase().includes(filterValue.toLowerCase()) 
    );
  }

  applyWatchlist() {
    this.watchlistSelected === true ? this.watchlistSelected = false :  this.watchlistSelected = true;
  }

  verifyStatus(event: boolean) {
    if (localStorage.getItem('watchlist') === '[]' || localStorage.getItem('watchlist') === null) {
      this.disabledWatchlist = true;
      this.watchlistSelected = false;
    } else if (localStorage.getItem('watchlist') !== '[]' || localStorage.getItem('watchlist') !== null) {
      this.disabledWatchlist = false;
      this.watchlistSelected = event;
    }
  }
}
