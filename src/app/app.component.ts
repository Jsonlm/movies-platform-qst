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

  constructor(private formBuilder: FormBuilder  ) {}

  ngOnInit() {
    this.data = movies;
    this.filteredMovies = this.data;

    this.filterForm = this.formBuilder.group({
      movieFilter: [''] // Initialize the form control with an empty string
    });

    this.filterForm.get('movieFilter')?.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
  }

  applyFilter(filterValue: string) {
    this.filteredMovies = this.data.filter(movie =>
      movie.title.toLowerCase().includes(filterValue.toLowerCase()) ||
      movie.released_date.toLowerCase().includes(filterValue.toLowerCase()) 

    );

    console.log(this.filteredMovies);
    
  }
}
