import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGraudService } from './services/routing-service/auth-graud.service';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:''},
  {path:'', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path:'home',
    component: HomeComponent,
    canActivate:[AuthGraudService],
    children:[
    {
      path:'',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
