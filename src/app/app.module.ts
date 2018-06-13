import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SongListComponent } from './song-list/song-list.component';

import { RouterModule, Routes } from '@angular/router';
import { DataDetailsComponent } from './data-details/data-details.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';

import * as $ from 'jquery';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'songList', component: SongListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home/:id', component: DataDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    HomeComponent,
    DataDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true }
    ),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
