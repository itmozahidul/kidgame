import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../Store/reducer';
import { selectSelectedImg } from '../Store/selector';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  
  private $url:Observable<string>;
  private url="";
  constructor(private store:Store<State>) {
    this.$url = store.select(selectSelectedImg);
  }

  ngOnInit() {
    this.$url.subscribe(d=>{
      this.url=d;
    })
  }

}
