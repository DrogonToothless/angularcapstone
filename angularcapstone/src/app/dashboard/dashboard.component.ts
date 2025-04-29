import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  myMovies: any[] = [];
  watchlist: any[] = [];
  userEmail: string | null = null; 
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}
  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.firestore
          .collection('users', (ref) => ref.where('email', '==', this.userEmail))
          .valueChanges()
          .subscribe((movies) => {
            this.myMovies = movies;
          });
        this.firestore
          .collection('users', (ref) => ref.where('email', '==', this.userEmail))
          .valueChanges()
          .subscribe((watchlist) => {
            this.watchlist = watchlist;
          });
      }
    });
  }
}