import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ProductDetailPageComponent} from "./product-detail-page/product-detail-page.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CategoryPageComponent} from "./category-page/category-page.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePageComponent },
  { path: 'product/:id', component: ProductDetailPageComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: 'category', component: CategoryPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
