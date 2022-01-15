import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FailedComponent } from './failed/failed.component';
import { GameComponent } from './game/game.component';
import { GuardService } from './guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GeneralService } from './services/general.service';
import { SucessComponent } from './sucess/sucess.component';
import { TransitionComponent } from './transition/transition.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [GuardService],
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'Start',
    component: TransitionComponent,
    canActivate: [GuardService],
  },
  {
    path: 'game',
    component: GameComponent,
    //canActivate: [GuardService],
  }
  ,
  {
    path: 'success',
    component: SucessComponent,
    //canActivate: [GuardService],
  },
  {
    path: 'fail',
    component: FailedComponent,
    //canActivate: [GuardService],
  },
  {
    path:'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
