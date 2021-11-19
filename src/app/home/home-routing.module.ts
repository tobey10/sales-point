import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component'
import { SettingsComponent } from './settings/settings.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'profile'},
  {path:'profile', component: ProfileComponent},
  {path:'settings', component: SettingsComponent},
  {path:'shop', component: ShopComponent},
  {path:'menu', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
