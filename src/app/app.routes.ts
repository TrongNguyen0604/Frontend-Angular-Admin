import { createComponent } from '@angular/core';
import { Routes } from '@angular/router';
import { ListProjectsComponent } from './list/list-projects.component';
import { CreateComponent } from './create/create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditComponent } from './edit/edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "list",
    component: ListProjectsComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "edit/:id",
    component: EditComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {//nằm ở cuối
    path: "**",
    component: NotFoundComponent
  },
];
