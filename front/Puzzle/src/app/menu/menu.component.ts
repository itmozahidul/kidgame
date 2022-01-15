import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { User } from '../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private notHome:boolean=false;
  private user :User;
  @Input('value') value:string;
  constructor(private router:Router, private location:Location, private activatedRoute:ActivatedRoute, private general:GeneralService) { 
    this.user = general.getUser();
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.routeConfig.component.name=="HomeComponent"){
      this.notHome=true;
    }else{
      this.notHome=false;
    }
  }

  back(){
    if(this.location.isCurrentPathEqualTo("/game")){
      this.router.navigate(["Start"]);
    }else if(this.location.isCurrentPathEqualTo("/Start")){
      this.router.navigate(["home"]);
    }else{
      this.router.navigate(["jhome"]);
    }
  }

}
