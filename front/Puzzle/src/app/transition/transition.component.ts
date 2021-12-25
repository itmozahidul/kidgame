import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../Store/reducer';
import * as action from '../Store/action';
import { Observable, throwError } from 'rxjs';
import { selectLevel, selectSelectedImg, selectTimer } from '../Store/selector';
@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss'],
})
export class TransitionComponent implements OnInit {
  private images = [];
  private pth = "assets/images/puzzle/pic_";
  private imageNo = 10;
  private selectedImage="";
  private $selectedImage:Observable<string>;
  private levelSrcPth = "assets/images/app/background/";
  private levelSrc = "";
  private $level:Observable<string>;
  private level:string ="";
  private $timer:Observable<string>;
  private timer=";"
  private levels = [
    { val: 'Easy', isChecked: true, url:this.levelSrcPth+"bButton.png" },
    { val: 'Medium', isChecked: false, url:this.levelSrcPth+"bButton.png" },
    { val: 'Hard', isChecked: false, url:this.levelSrcPth+"bButton.png" },
    { val: 'Custom', isChecked: false, url:this.levelSrcPth+"bButton.png" },
  ];
  constructor(private store:Store<State>) { 
    this.$selectedImage = store.select(selectSelectedImg);
    this.$level = store.select(selectLevel);
    this.$timer = store.select(selectTimer);
  }

  ngOnInit() {
    this.setComponentHeight();
    this.loadImages();
    this.$selectedImage.subscribe(d=>{this.selectedImage=d;});
    this.$level.subscribe(d=>{this.level=d;});
    this.$timer.subscribe(d=>{this.timer=d;});
    this.levelSrc = this.levelSrcPth+"level.gif";
    console.log(this.level);
    this.setLevel(document.getElementById(this.level) ,this.level);
    
  }

  loadImages(){
    for(let i=1;i<=this.imageNo;i++){
      this.images.push(this.pth+i.toString()+".jpg");
    }
  }

  selectPhoto(ele:HTMLElement){
    console.log("in select pic function");
    console.log(ele);
    //document.getElementById("sm").setAttribute("src",ele.getAttribute("src"));
    let selectedImg = ele.getAttribute("src");
    console.log(selectedImg);
    this.store.dispatch(action.updateSelectedImage({selectedImg}));
    console.log(this.selectedImage);
   // ele.setAttribute("style"," box-shadow: none");
  }

  setLevel(ele:HTMLElement,value){
    console.log("setting the Level");
     console.log(value);
    switch (value) {
      case "Easy":
        this.levels.forEach(v=>{v.isChecked=v.val=="Easy"?true:false;});
        let level = value;
        console.log(value);
        this.store.dispatch(action.updateLevel({level}));
        if(ele!=null){
          ele.setAttribute("style"," box-shadow: 0px 0px 20px #ccff00;");
        }else{console.log("null element");}
        break;
      case "Medium":
        this.levels.forEach(v=>{v.isChecked=v.val=="Medium"?true:false;});
        console.log(value);
        this.store.dispatch(action.updateLevel({level}));
        if(ele!=null){
          ele.setAttribute("style"," box-shadow: 0px 0px 20px #ccff00;");
        }else{console.log("null element");}
        break;
      case "Hard":
        this.levels.forEach(v=>{v.isChecked=v.val=="Hard"?true:false;});
        console.log(value);
        this.store.dispatch(action.updateLevel({level}));
        if(ele!=null){
          ele.setAttribute("style"," box-shadow: 0px 0px 20px #ccff00;");
        }else{console.log("null element");}
        break;
      case "Custom":
        this.levels.forEach(v=>{v.isChecked=v.val=="Custom"?true:false;});
        ele.setAttribute("style"," box-shadow: 0px 0px 20px #ccff00;");
        console.log(value);
        if(ele!=null){
          ele.setAttribute("style"," box-shadow: 0px 0px 20px #ccff00;");
        }else{console.log("null element");}
        break;      
    
      default:
        break;
    } 
    this.levels.forEach(v=>{console.log(v)});
  }

  setComponentHeight(){
    var r:HTMLElement = document.querySelector(':root');
    r.style.setProperty('--h',document.documentElement.clientHeight.toString()+"px");
  }
  
  

}
