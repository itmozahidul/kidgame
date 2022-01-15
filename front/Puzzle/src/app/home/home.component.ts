import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private items= [
    'Start',
    'end',
    'setting',
    'help'
  ];
  private v:string = "Menu";
  constructor(private router:Router) {}

  ngOnInit() {}

  gotoSelectedComponent(value){
    this.router.navigate([value]);
  }

}
