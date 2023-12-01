import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { movies } from './../../../../assets/data';
import { Movie } from 'src/app/core/models/movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.sass']
})
export class MovieInfoComponent {
  public nameFromRoute!: string;
  public movie!: Movie | any;
  public safeTrailerLink!: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nameFromRoute = params['moviename'];
      this.fetchData(String(this.nameFromRoute));
    });
  }

  fetchData(nameFromRoute: string) {
    try {
      let movieFound = movies.find((movie) => movie.title === nameFromRoute);
      if (movieFound) {
        this.movie = movieFound;
        this.safeTrailerLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer_Link);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }

  restartParam() {
    
    this.router.navigate(['/movie', '']);
  }

}
