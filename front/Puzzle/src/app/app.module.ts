import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { ImageComponent } from './image/image.component';
import { Crop } from '@ionic-native/crop/ngx'
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { PlayGroundComponent } from './play-ground/play-ground.component';
import { Photos } from 'src/assets/scripts/Photos';
import { GeneralService } from './services/general.service';
import { StoreModule } from '@ngrx/store';
import * as gameReducer from './Store/reducer';
import { EffectsModule } from "@ngrx/effects";
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SucessComponent } from './sucess/sucess.component';
import { FailedComponent } from './failed/failed.component';
import { TransitionComponent } from './transition/transition.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,HomeComponent,MenuComponent,GameComponent,ImageComponent,PlayGroundComponent,SucessComponent,FailedComponent,TransitionComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      StoreModule.forRoot({'game':gameReducer.gameReducer},{
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production
      }),
    ],
  providers: [
    Crop,
    Camera,
    File,
    Photos,
    GeneralService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
