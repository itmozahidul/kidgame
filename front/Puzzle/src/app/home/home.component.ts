import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit() {}

}
