import { Component, OnInit, EnvironmentInjector, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { runInInjectionContext } from '@angular/core';
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
  userDataObservable$: any;
  private environmentInjector = inject(EnvironmentInjector);
  constructor(
    private db: AngularFirestore,
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userEmail = parsedUser.email;
    } else {
      console.error('No user found in local storage');
      return;
    }
    this.userDataObservable$ = this.getUserObservable(this.userEmail);
    this.userDataObservable$.subscribe((userData: any) => {
      console.log('User Data:', userData);
      this.myMovies = userData?.mymovies || [];
      this.watchlist = userData?.watchlist || [];
      console.log('My Movies:', this.myMovies);
      console.log('Watchlist:', this.watchlist);
    });
  }
  getUserObservable(email: string | null): Observable<any | undefined> {
    return runInInjectionContext(this.environmentInjector, () => {
      if (!email) {
        return new Observable<undefined>();
      }
      return this.db.doc<any>(`users/${email}`).valueChanges();
    });
  }
}