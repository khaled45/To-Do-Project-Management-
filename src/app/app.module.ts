import { ProjectService } from './services/project.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule, DatePipe } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';


const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "AddProject", component: AddProjectComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UpdateProjectComponent,
    AddProjectComponent,
    NavBarComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    DragDropModule

  ],

  providers: [DatePipe, ProjectService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
