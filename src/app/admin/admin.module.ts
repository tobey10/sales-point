import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryComponent } from './category/category.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin.component';
import { ShopComponent } from './shop/shop.component';


@NgModule({
  declarations: [
    CategoryComponent,
    IngredientComponent,
    NavbarComponent,
    ProfileComponent,
    AdminComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    CategoryComponent,
    IngredientComponent,
    NavbarComponent,
    ProfileComponent
  ]
})

export class AdminModule { }
