import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ProductDetailPageComponent} from "./product-detail-page/product-detail-page.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {AddNewProductComponent} from "./add-new-product/add-new-product.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthGuard} from "./api/guards/auth-guard.service";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePageComponent },
  { path: 'product/:id', component: ProductDetailPageComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: 'category/all', component: CategoryPageComponent },
  { path: 'category/men', component: CategoryPageComponent },
  { path: 'category/women', component: CategoryPageComponent },
  { path: 'add-product', component: AddNewProductComponent,
    canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'edit-product/:id', component: AddNewProductComponent,
    canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
