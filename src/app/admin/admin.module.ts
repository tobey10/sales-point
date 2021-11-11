import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CatgoryComponent } from './catgory/catgory.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    CatgoryComponent,
    IngredientComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
