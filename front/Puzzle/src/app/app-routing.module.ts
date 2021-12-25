import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FailedComponent } from './failed/failed.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { SucessComponent } from './sucess/sucess.component';
import { TransitionComponent } from './transition/transition.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
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
  },
  {
    path: 'game',
    component: GameComponent,
  }
  ,
  {
    path: 'success',
    component: SucessComponent,
  },
  {
    path: 'fail',
    component: FailedComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
