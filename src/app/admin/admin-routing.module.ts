import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'profile'},
  {path:'profile', component: ProfileComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'ingredient', component: IngredientComponent},
  {path: 'shop', component: ShopComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
