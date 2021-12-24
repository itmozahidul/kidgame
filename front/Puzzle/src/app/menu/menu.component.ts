import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private notHome:boolean=false;
  @Input('value') value:string;
  constructor(private location:Location, private activatedRoute:ActivatedRoute) { 
    
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.routeConfig.component.name=="HomeComponent"){
      this.notHome=true;
    }else{
      this.notHome=false;
    }
  }

  back(){
    this.location.back();
  }

}
