import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component'
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'profile'},
  {path:'profile', component: ProfileComponent},
  {path:'settings', component: SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
