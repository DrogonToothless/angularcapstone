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
  myMovies: string[] = [];
  watchlist: string[] = [];
  userEmail: string | null = null;
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}
  ngOnInit(): void {
    this.firestore.collection('users').valueChanges().subscribe((data) => {
      console.log('Firestore users:', data);
    });
  }
  
}