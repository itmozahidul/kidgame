import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../Store/reducer';
import * as action from '../Store/action';
import { Observable, throwError } from 'rxjs';
import { selectLevel, selectSelectedImg, selectTimer, selectTimeToPlay } from '../Store/selector';
import { GeneralService } from '../services/general.service';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss'],
})
export class TransitionComponent implements OnInit, AfterViewInit {
  private images = [];
  private pth = "assets/images/puzzle/pic_";
  private imageNo = 10;
  private selectedImage="";
  private $selectedImage:Observable<string>;
  private levelSrcPth = "assets/images/app/background/";
  private levelSrc = "";
  private $level:Observable<string>;
  private level:string ="";
  private $timer:Observable<boolean>;
  private timer:boolean= false;
  private timerd:boolean = false;
  private $timeToPlay:Observable<number>;
  private timeToPlay;
  private timeToPlayScaler = 1;
  private needUserName:boolean=false;
  private user:string="";
  private v:string = "Puzzle";
  @ViewChild("btlst") lvEleParent:HTMLElement;
  private levels = [
    { val: 'Easy', isChecked: true, url:this.levelSrcPth+"bButton.png" },
    { val: 'Medium', isChecked: false, url:this.levelSrcPth+"bButton.png" },
    { val: 'Hard', isChecked: false, url:this.levelSrcPth+"bButton.png" },
    //{ val: 'Custom', isChecked: false, url:this.levelSrcPth+"bButton.png" },
  ];
  constructor(private store:Store<State>, private general:GeneralService) { 
    this.$selectedImage = store.select(selectSelectedImg);
    this.$level = store.select(selectLevel);
    this.$timer = store.select(selectTimer);
    this.$timeToPlay = store.select(selectTimeToPlay);
  }

  ngOnInit() {
    this.setComponentHeight();
    this.loadImages();
    this.$selectedImage.subscribe(d=>{this.selectedImage=d;});
    this.$level.subscribe(d=>{this.level=d;});
    this.$timer.subscribe(d=>{this.timer=d;});
    this.levelSrc = this.levelSrcPth+"level.gif";
    this.$timeToPlay.subscribe(d=>{this.timeToPlay=d;})
    console.log(this.level);
    console.log(this.timer);
    /* let ele:HTMLElement; 
    let btns = document.getElementById("btnlst").childNodes;
    btns.forEach((d:HTMLElement) => {
      console.log(d);
      ele = d.innerHTML==this.level?d:null;
    });

    if(ele!=null){
      this.setLevel(ele);
    } */
  }

  ngAfterViewInit(){
     if(this.lvEleParent!=null ||this.lvEleParent != undefined){
       console.log(this.lvEleParent.children);
       let parentElement = this.lvEleParent;
       let buttonsEle =parentElement.children;
       console.log(buttonsEle);
      //this.setLevel(this.lvEleParent.nativeElement);
     }else{
       console.log("Level element is null/undefined");
     }
  }

  loadImages(){
    for(let i=1;i<=this.imageNo;i++){
      this.images.push(this.pth+i.toString()+".jpg");
    }
  }



  changeTimerValue(){
    console.log("here in change timer value");
    let timeToPlay = this.timeToPlayScaler;
    this.store.dispatch(action.updatePlayTime({timeToPlay}));
    console.log(this.timeToPlayScaler);
    console.log(this.timeToPlay);
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

  setLevel(value:string){
    console.log("setting the Level");
    let ele = document.getElementById(value);
    let level = value;
    console.log(ele);
     console.log(value);
    switch (value) {
      case "Easy":
        this.levels.forEach(v=>{v.isChecked=v.val=="Easy"?true:false;});
        
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
  changeTimer(){
    let timer = this.timerd;
    this.store.dispatch(action.updateTimerMode({timer}));
    console.log(this.timer);
  }
  
 
  setPlayDuration(){
    console.log("######## in setPlayDuration ###############");
   var  timeToPlay = this.timeToPlay;
   this.store.dispatch(action.updatePlayTime({timeToPlay}))
  }
  
  setComponentHeight(){
    var r:HTMLElement = document.querySelector(':root');
    r.style.setProperty('--h',document.documentElement.clientHeight.toString()+"px");
  }
  
  

}
