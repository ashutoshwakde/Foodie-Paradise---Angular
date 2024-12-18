import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealListComponent } from './component/meal-list/meal-list.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminComponent } from './component/admin/admin.component';


const routes: Routes = [
  { path: '', component: MealListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
