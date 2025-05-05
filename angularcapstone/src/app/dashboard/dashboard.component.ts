import { Component, OnInit, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { from } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, NgFor],
})
export class DashboardComponent implements OnInit {
  myMovies: string[] = [];
  watchlist: string[] = [];
  userEmail: string | null = null;
  private environmentInjector = inject(EnvironmentInjector);
  users: any;
  ngOnInit(): void {
    runInInjectionContext(this.environmentInjector, () => {
      return from(this.users.ref
        .where('email', '==', this.userEmail)
        .get().then((querySnapshot: any[]) => {
          querySnapshot.forEach((doc) => {
            this.myMovies = doc.data().myMovies || [];
            this.watchlist = doc.data().watchlist || [];
          });
        }));
    });
  }
}