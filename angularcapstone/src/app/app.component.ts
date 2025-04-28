import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  user: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) { // Inject Router here
    this.afAuth.authState.subscribe((user) => {
      console.log('Auth State:', user);
      this.user = user;
      if (user) {
        this.router.navigate(['/dashboard']); // Use the injected Router service
      }
    });
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']); // Use the injected Router service
  }
}