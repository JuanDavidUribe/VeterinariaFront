import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : '', component : LoginComponent},
  {path : 'home', component: HomeComponent,
    children :[
      {path: 'patients', component: PatientsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
