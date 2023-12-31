import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie';

@Component({
  selector: 'app-poster-details',
  templateUrl: './poster-details.component.html',
  styleUrls: ['./poster-details.component.sass']
})
export class PosterDetailsComponent implements OnChanges {
  private _movies!: Movie[];
  public data: any = [];
  public watchlist!: string[];
  public isChecked: boolean = false;
  public _showWatchlist: boolean = false;

  constructor(private router: Router) { }

  @Output() resetWatchlistButton = new EventEmitter<boolean>;

  @Input()
  get movies(): Movie[] {
    return this._movies;
  }
  set movies(value: Movie[]) {
    this._movies = value;
    this.data = value;
  }

  @Input()
  get showWatchlist(): boolean {
    return this._showWatchlist;
  }
  set showWatchlist(value: boolean) {
    if (value) {
      let data: any[];
      this._showWatchlist = value;
      data = this.movies.filter((objeto: any) => objeto.watchlist === this._showWatchlist);
      this.data = data;
    } else {
      this.data = this._movies;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (localStorage.getItem('watchlist') === null) {
      if (changes) {
        this.data = this.movies;
      }
    } else if (localStorage.getItem('watchlist') !== null) {
      let watchlistProv: string[];
      let stringData = localStorage.getItem('watchlist');
      watchlistProv = this.transformLocalStToArr(stringData);
      this._movies.map(item => {
        for (let index = 0; index < watchlistProv.length; index++) {
          if (item.title === watchlistProv[index]) item['watchlist'] = true;
        }
      })
    }
  }

  addWatchlist(movieTitle: string) {
    let watchlist!: string[];
    let repeated: boolean = false;

    if (localStorage.getItem('watchlist') === null || localStorage.getItem('watchlist') === '[]') {
      watchlist = [];
      watchlist.push(movieTitle);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }

    if (localStorage.getItem('watchlist') !== '[]' && localStorage.getItem('watchlist') !== null) {
      let watchlistProv: string[];
      let stringData = localStorage.getItem('watchlist');

      if (stringData !== null) {
        watchlistProv = JSON.parse(stringData);

        for (let index = 0; index < watchlistProv.length; index++) {
          if (watchlistProv[index] === movieTitle) {
            repeated = true;
            break;
          }
        }

        if (repeated === false) {
          watchlistProv.push(movieTitle);
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlistProv));
      }
      this.updateListFromLocalStorage();
    }
    this.resetWatchlist();
  }

  removeWatchlist(movieTitle: string | null) {
    if (localStorage.getItem('watchlist') !== null) {
      let watchlistProv: string[] = JSON.parse(localStorage.getItem('watchlist')!);
      const index = watchlistProv.indexOf(movieTitle!);
  
      if (index !== -1) {
        watchlistProv.splice(index, 1);
        localStorage.setItem('watchlist', JSON.stringify(watchlistProv));
        this.updateListFromLocalStorage();
      }
  
      this.data = this.data.map((item: any) => {
        if (item.title === movieTitle) {
          item.watchlist = false;
        }
        return item;
      });
    }
    this.resetWatchlist();
  }

  updateListFromLocalStorage() {
    let stringData = localStorage.getItem('watchlist');
    if (stringData !== null) {
      const watchlistProv: string[] = JSON.parse(stringData);

      this.data = this.movies.map(item => {
        if (watchlistProv.includes(item.title)) {
          item.watchlist = true;
        }
        return item;
      });
    }
  }

  transformLocalStToArr(locStoItem: any) {
    return this.watchlist = JSON.parse(locStoItem);
  }
  
  navigateToInfo(nameFromThumbnail: string) {
    this.router.navigate(['/movie', nameFromThumbnail]);
  }

  turnToogle(movie: string, checked: boolean) {
    if (checked) {
      this.removeWatchlist(movie);
    } else if (!checked) {
      this.addWatchlist(movie);
    }
  }

  resetWatchlist() {
    this.resetWatchlistButton.emit(false);
  }
}