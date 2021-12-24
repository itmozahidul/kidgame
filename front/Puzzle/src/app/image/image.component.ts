import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  
  @Input('value') value:string;
  url:string="";
  constructor() {}

  ngOnInit() {this.url="/assets/images/"+this.value+".jpg";
  }

}
