import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environment/environment';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchComponent } from './search/search.component';
import { MoveDetailsComponent } from './move-details/move-details.component';
import {provideHttpClient} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchComponent,
    MoveDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DashboardComponent,
    MatCardModule,
    MatButton,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInput,
    MatIconButton,
    MatIcon
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule { }
