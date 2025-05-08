import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

// Layouts
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';

// Client components
import { HomeComponent } from './(client)/home/home.component';
import { LoginComponent } from './(client)/login/login.component';
import { RegisterComponent } from './(client)/register/register.component';

// Admin components
import { DashboardComponent } from './(admin)/dashboard/dashboard.component';
import { ListProjectsComponent } from './(admin)/list/list-projects.component';
import { CreateComponent } from './(admin)/create/create.component';
import { EditComponent } from './(admin)/edit/edit.component';

export const routes: Routes = [

  // 👤 CLIENT
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  

  // 🔐 ADMIN
  {
    path: 'admin',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard], // nếu có
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list', component: ListProjectsComponent },
      { path: 'create', component: CreateComponent },
      { path: 'edit/:id', component: EditComponent }
    ]
  },

  // ❌ NOT FOUND
  { path: '**', component: NotFoundComponent }
];
