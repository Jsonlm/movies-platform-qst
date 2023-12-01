import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieInfoComponent } from './components/shared/movie-info/movie-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'movie/:moviename', component: MovieInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
