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
import { ListProjectsComponent } from './(admin)/Products/list/list-projects.component';

import { ListCateComponent } from './(admin)/Categorys/list-cate/list-cate.component';
import { EditCateComponent } from './(admin)/Categorys/edit-cate/edit-cate.component';
import { CreateCateComponent } from './(admin)/Categorys/create-cate/create-cate.component';
import { DetailCateComponent } from './(admin)/Categorys/detail-cate/detail-cate.component';
import { DetailProductsComponent } from './(client)/detail-products/detail-products.component';
import { CreateProductComponent } from './(admin)/Products/create/create.component';
import { EditProductComponent } from './(admin)/Products/edit/edit.component';
import { CartClientComponent } from './(client)/cart-client/cart-client.component';
import { HeartComponent } from './(client)/heart/heart.component';
import { AccountComponent } from './(admin)/account/account.component';
import { SizeComponent } from './(admin)/size/size.component';
import { ColorComponent } from './(admin)/color/color.component';
import { PayComponent } from './(client)/pay/pay.component';
import { CommentComponent } from './(admin)/comment/comment.component';
import { ProfileComponent } from './(client)/profile/profile.component';
import { OrdersComponent } from './(admin)/orders/orders.component';

export const routes: Routes = [

  // 👤 CLIENT
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'detail/:id', component: DetailProductsComponent },
      { path: 'cart', component: CartClientComponent },
      { path: 'heart', component: HeartComponent },
      { path: 'cart/pay', component: PayComponent },
      { path: 'profile', component: ProfileComponent },
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
      { path: 'create', component: CreateProductComponent },
      { path: 'edit/:id', component: EditProductComponent },

      { path: 'CateList', component: ListCateComponent },
      { path: 'CateCreate', component: CreateCateComponent },
      { path: 'Cateedit/:id', component: EditCateComponent },
      { path: 'CateDetail/:id', component: DetailCateComponent },

      { path: 'account', component: AccountComponent },

      { path: 'size', component: SizeComponent },
      { path: 'color', component: ColorComponent },

      { path: 'comment', component: CommentComponent },
      { path: 'Order', component: OrdersComponent },



    ]
  },

  // ❌ NOT FOUND
  { path: '**', component: NotFoundComponent }
];
