import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductsComponent } from './components/create-products/create-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', redirectTo:'login',pathMatch: 'full'},
  {path:'list-products', component: ListProductsComponent},
  {path:'create-products', component: CreateProductsComponent},
  {path:'edit-products/:id', component: CreateProductsComponent},
  /*{path: '**', redirectTo:'list-products',pathMatch: 'full'},*/
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
