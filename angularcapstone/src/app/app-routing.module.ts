import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SearchComponent} from './search/search.component';
import {MoveDetailsComponent} from './move-details/move-details.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'movie/:id', component: MoveDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
