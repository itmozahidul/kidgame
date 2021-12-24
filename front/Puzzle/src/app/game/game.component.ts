import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private v:string="Puzzle";
  private image:string = "apple";
  constructor() { }

  ngOnInit() {
    console.log("In gameComponent");
  }

}
