import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { Action, Store } from '@ngrx/store';
import { resolve } from 'dns';
import { element } from 'protractor';
import { Observable, timer } from 'rxjs';
import {Photos} from '../../assets/scripts/Photos';
import { GeneralService } from '../services/general.service';
import { State } from '../Store/reducer';
import * as action from '../Store/action';
import { selectCrntImgList, selectgameState, selectImgList } from '../Store/selector';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayGroundComponent implements OnInit, AfterViewInit {
  @Input('value') image:string="";
  @ViewChild('cnvs') cnvs:ElementRef;
  private blockx=0;
  private blocky=0;
  private imageUrl:any="";
  private blockno=3;
  private imageList=[];
  private gapNo = 1;
  private CimageList = [];
  private $CimageList:Observable<any[]>;
  private timeToplay = 120000;
  $imageList:Observable<any[]>;
  tempPot:any=null;
  emptyBlocks=[];
  img=new Image();
  tb:HTMLTableElement;
  strt=false;
  timeGone: string = "00:00";
  private timeObserver;
  
  constructor(private router:Router,private location:Location, private store:Store<State>, private photos:Photos, private file:File, private camera:Camera, private general:GeneralService) { 
    console.log("Start NgInit ");
    this.setWait();
    this.$imageList = store.select(selectImgList);
    this.$imageList.subscribe(res=>{
      console.log(res);
      this.imageList=res;});
    this.$CimageList = store.select(selectCrntImgList);
    this.$CimageList.subscribe(res=>{
      console.log(res);
      this.CimageList=res;});
    this.resetImgList();
    console.log("setting wait..");
    
  }

  


  ngOnInit() {
    
    console.log("ngonint");
    this.imageUrl = "assets/images/"+this.image+".jpg";
    this.img.onload=()=>{
      console.log("p image length:"+this.img.naturalWidth);
    console.log("p image width:"+this.img.naturalHeight);
    
    this.blockx=this.img.naturalWidth/this.blockno;
    this.blocky=this.img.naturalHeight/this.blockno;
    
    console.log("image length:"+this.blocky);
    console.log("image width:"+this.blockx);

    this.tb = document.createElement("table");
    var canvasSize = (window.screen.width*75)/100.00;
    console.log("canvas size: "+canvasSize);
    
    var serial = 0;
    var y = 0;
    while(y<this.img.naturalHeight){
      var x = 0;
      while(x<this.img.naturalWidth){
        //input Image, the size of the pic, start from x, and y, x length, y length
        var t = 0;
        this.cropImage("async",this.imageUrl, canvasSize, x, y, this.blockx, this.blocky,serial);
        
        
        x=x+this.blockx;
        serial++;
      }
      y=y+this.blocky;
    }
    }
    this.img.src=this.imageUrl;
    
    console.log("is list full?");
    console.log(this.imageList.length==(this.blockno*this.blockno));
    
    
    
      setTimeout( ()=>{
        console.log("######################################################################################## start ");
        console.log(this.compareTwoList(this.imageList,this.CimageList));
        if(this.imageList.length==(this.blockno*this.blockno)){
          if(window.navigator.appVersion.indexOf("Win") != -1){
              this.showCropedPic();
              
          }else{
              this.showCropedPicDuplicate();
          }

          document.getElementById("cnv").appendChild(this.tb);

              this.makeGap(this.gapNo);
              console.log("######################################################################################## 2");
              console.log(this.compareTwoList(this.imageList,this.CimageList));
         
         }
         this.unsetWait();
      }
      ,1000);
     
     //this.showCropedPic(this.cnvs.nativeElement);
    //console.log(this.imageList.length);
    console.log("end NgInit ");
     
  }
  ngAfterViewInit() {}
loadImage(){
  this.imageUrl = "assets/images/"+this.image+".jpg";
  this.img.src=this.imageUrl;
}

resetImgList(){
  var imgList = Object.assign([], []);
  this.store.dispatch(action.updateImgList({imgList}));
  
}

compareTwoList(a:any[], b:any[]){
  var ans = true;console.log("######## start ##############");
  for(let i =0;i<a.length;i++){
    
    if(a[i]!=b[i]){
      console.log(" not equal");
       ans = false;
    }else{
      console.log("  equal");
    }
   
  }
 console.log("#################################");
  return ans;
}


arrangeRight(){
  var crntImgList = this.imageList;
  this.store.dispatch(action.updateCrntImgList({crntImgList}));
}
getTimerValueMinSec(){
  var ans = "00:00";
  this.timeGone = ans;
  const numbers = timer(0, 1000);
  this.timeObserver=numbers.subscribe((t)=>{
    console.log("timer started");
    console.log(t);
    console.log(t/60);
    console.log(t%60);
    var minN = t/60;
    var secN = t%60;
    var min = minN.toString().split(".")[0];
    var sec = secN.toString();
    if(min.length == 1){
      min = "0"+min;
    }
    if(sec.length == 1){
      sec = "0"+sec;
    }
    this.timeGone = min+" : "+sec;
  });
  
}

rearange(){
  this.getTimerValueMinSec();
  console.log("######################################################################################## 3");
  console.log(this.compareTwoList(this.imageList,this.CimageList));
  this.strt=true;
  document.getElementById("cnv").setAttribute("style","pointer-events:auto;opacity:1;");
  var numlist = [];
  var crntImgList = [];
  var i = 0;
  while(numlist.length!=this.imageList.length){
    //console.log(this.imageList.length);
    var no = this.getRandomNumber(this.imageList.length);console.log(no);
    if(!numlist.includes(no)){
      console.log("####"+no+"####");
      crntImgList[i]=this.imageList[no];
      console.log(crntImgList);
      //crntImgList = Object.assign([], crntImgList);

      this.store.dispatch(action.updateCrntImgList({crntImgList}));
      var dt = document.getElementById("i_"+i.toString());
      if(dt.getAttribute("src") != ""){
        dt.setAttribute("src",this.imageList[no]);
      }else{
        console.log("####"+no+"####_");
        console.log("empty.block no :"+ (this.imageList.length-no-1).toString());
      }
      
      
      numlist.push(no);
      i++;
    }
    //console.log(this.CimageList);
    
  }
  console.log("######################################################################################## 4");
  console.log(this.compareTwoList(this.imageList,this.CimageList));
  setTimeout(()=>{
    this.timeObserver.unsubscribe();
    if(this.compareTwoList(this.CimageList,this.imageList)){
      console.log("#####################                    success ");
      this.router.navigateByUrl("Start");
    }else{
      console.log("#####################                    fail ");
    }
      this.endGame();
  },this.timeToplay);
  
}


endGame(){   
  this.strt=false;
   var ntr=document.createElement('div');
   var nt=document.createElement('div');
   ntr.setAttribute("id","ntid");
   var tb=document.createElement('table');
   var tr=document.createElement('tr');
   var th1=document.createElement('th');
   var th2=document.createElement('th');
   var btn1=document.createElement('ion-button');
   var btn2=document.createElement('ion-button');
   btn1.setAttribute("style","tex-align:center;");
   btn1.innerHTML="Retry";
   btn1.addEventListener("click",()=>{
     document.getElementById("ntid").remove();
     this.rearange();
   });
   btn2.setAttribute("style","tex-align:center;");
   btn2.innerHTML="Exit";
   btn2.addEventListener("click",()=>{
     console.log("exiting game and going to main page")
     document.getElementById("ntid").remove();
     this.location.back();
   });
   th1.appendChild(btn1);th2.appendChild(btn2);
   tr.appendChild(th1);tr.appendChild(th2);
   tb.appendChild(tr); nt.appendChild(tb);
   ntr.appendChild(nt);
   
   tb.setAttribute("style"," width: 100%; ");
   nt.setAttribute("style","background-color: #b3b1b1;top: 45%;left: 15%;width: 70%;padding: 2.8%;height: 10%; position: relative;border: 3px solid #5c5c5c;border-radius: 5px;"); 
   ntr.setAttribute("style","position: absolute;background-color:#ffffff94; width: 100%; height:100%;");
   document.body.appendChild(ntr);

}



  centeredTableOfPuzzle(){
    var tbl = document.getElementById("tbl");
    var w = (tbl.clientWidth/this.cnvs.nativeElement.clientWidth)*100.0;
    var rw = (100-w)/2.0;
    console.log(w);
    console.log(rw);
    this.updateCss("w",w.toString()+"%");
    this.updateCss("rw",rw.toString()+"%");
  }
  setWait(){
    console.log("##############################################   set wait ");
    var r:HTMLElement = document.querySelector(':root');
    var waitImage = new Image();
    waitImage.onload=()=>{
      var mrgn = (100-((waitImage.naturalHeight/window.screen.height)*100))/2.0;
      waitImage.setAttribute("id","wt");
      waitImage.setAttribute("style","position: absolute;background-color:grey; top: 10%;width: 100%; padding:5%; height:90%;");
      document.body.appendChild(waitImage);
    }
    waitImage.src="assets/images/app/background/wait.gif";
    console.log("##############################################   set wait  done ");
    
  }
  unsetWait(){
    console.log("################################## unset wait");
    document.getElementById("wt").remove();
    console.log("##############################################   unset wait done");
  }
  updateCss(k:any,v:any){
    var r:HTMLElement = document.querySelector(':root');
    r.style.setProperty("--"+k, v);

  }

  cropImage(ch,url, canvasSize:number, startInXaxis:number, startInYaxix:number, lengthOfPhotoX:number, lengthOfPhotoY:number, serial:number){
    console.log("in cropImae function");
     if(ch=="async"){
      this.photos.crop(url, canvasSize, startInXaxis, startInYaxix, lengthOfPhotoX, lengthOfPhotoY,serial).then(
        (ans:any)=>{
          console.log(this.imageList.length);
          var imgList = Object.assign([], this.imageList);
          var crntImgList = Object.assign([], this.imageList);
          imgList.push(ans.data.toDataURL("image/png"));
          crntImgList.push(ans.data.toDataURL("image/png"));
          this.store.dispatch(action.updateImgList({imgList}));
          this.store.dispatch(action.updateCrntImgList({crntImgList}));
          console.log("data is inserted in list");
          //console.log("length of list "+this.imageList.length.toString());
          //console.log(this.imageList);
          
          
         
        },
        err=>{
          console.log(err);
        }
       ); 
     

     }
     if(ch=="sync"){
       console.log("In sync part");
       this.imageList.push(this.photos.cropNotAsync(url, canvasSize, startInXaxis, startInYaxix, lengthOfPhotoX, lengthOfPhotoY).toDataURL("image/png"));
       console.log("inserted");
     }

  }

  showCropedPic(){
    
    console.log("in ShowCroppedPic function");
    let no = 0;
    this.tb.setAttribute("id","tbl");
    for( let i=1;i<=this.blockno;i++){
      var tr = document.createElement("tr");
     // r.setAttribute("style","");
      for(let j=1;j<=this.blockno;j++){
        var td = document.createElement("td");
        td.setAttribute("id","d_"+no.toString());
        var image = document.createElement("img");
        image.setAttribute("class","image");
        image.setAttribute("draggable","true");
        image.setAttribute("id","i_"+no.toString());
        image.addEventListener("dragstart",(ev:DragEvent)=>{
          console.log("drag started");
          ev.dataTransfer.setData("text", (<HTMLElement>ev.target).id);
          console.log((<HTMLElement>ev.target).id);
        });
        td.addEventListener("drop",(ev:DragEvent)=>{
          console.log("dropped");
          ev.preventDefault();
          var data = ev.dataTransfer.getData("text");
          console.log((<HTMLElement>ev.target).id);
          console.log("dragged "+data);
          var dele= document.getElementById(data);
          var dsrc = dele.getAttribute("src");
          var tele = (<HTMLElement>ev.target).children[0];
          var tsrc = tele.getAttribute("src");
          tele.setAttribute("src",dele.getAttribute("src"));
          var dindex = data.split("_")[1];
          console.log("vv "+dindex);
          var tindex = (tele.getAttribute("id")).split("_")[1];
          console.log("vv "+tindex);
          var crntImgList = [];

          if(tele.getAttribute("src")==""){
            tele.setAttribute("style","visibility:hidden");
            tele.parentElement.addEventListener("dragover",this.dragoverfunc);
          }else{
            tele.setAttribute("style","visibility:visible");
            tele.parentElement.removeEventListener("dragover",this.dragoverfunc);
          }
          dele.setAttribute("src",tsrc);
          if(dele.getAttribute("src")==""){
            dele.setAttribute("style","visibility:hidden");
            dele.parentElement.addEventListener("dragover",this.dragoverfunc);
          }else{
            dele.setAttribute("style","visibility:visible");
            dele.parentElement.removeEventListener("dragover",this.dragoverfunc);
          }
          if(this.compareTwoList(this.imageList,this.CimageList)){
            this.endGame();
          }else{
            console.log("not done matching..");
          }
        });
        console.log(no);
        //console.log(this.imageList[no]);
        image.src = this.CimageList[no];
        td.appendChild(image);
        tr.appendChild(td);
        no++;
      }
      
      this.tb.appendChild(tr);
      
     
    } 
    console.log("table data insertation..");
    console.log(tr);
    console.log(this.tb);

     
    
  }
  

  getRandomNumber(b:number){
    let ans = (Math.floor(Math.random()*100))%b;
    return ans;
  }

  makeGap(no:number){
    console.log("Ingapfunc");
    let numlist=[];
    for(let i=0;i<no;i++){
      let indx = this.getRandomNumber((this.blockno*this.blockno)-1);
      if(!numlist.includes(indx)){
        numlist.push(indx);
        console.log("i_"+indx.toString());
        let ele = document.getElementById("i_"+indx.toString());
        ele.setAttribute("src","");
        ele.setAttribute("style","visibility:hidden");
        ele.parentElement.addEventListener("dragover",this.dragoverfunc);
      }else{
        i--;
      }
      //this.emptyBlocks
      
      ;
    }
  }

  dragoverfunc(ev:DragEvent){
    console.log("being drag...")
    ev.preventDefault();
  }






  showCropedPicDuplicate(){
    console.log("in ShowCroppedPicDuplicate function");
    let no = 0;
    var tb = document.createElement("table");
    tb.setAttribute("id","tbl");
    for( let i=1;i<=this.blockno;i++){
      var tr = document.createElement("tr");
     // r.setAttribute("style","");
      for(let j=1;j<=this.blockno;j++){
        var td = document.createElement("td");
        td.setAttribute("id","d_"+no.toString());
        var image = document.createElement("img");
        image.setAttribute("class","image");
        image.setAttribute("draggable","true");
        image.setAttribute("id","i_"+no.toString());
        image.addEventListener("touchstart",(ev:TouchEvent)=>{
          console.log("touch started");
          this.tempPot= (<HTMLElement>ev.targetTouches[0].target).id;
          console.log(this.tempPot);
        });
        td.addEventListener("mouseup",(ev:MouseEvent)=>{
          console.log("dropped");
          ev.preventDefault();
          //var data = ev.dataTransfer.getData("text");
          console.log((<HTMLElement>ev.target).id);
          console.log("dragged "+this.tempPot);
          var dele= document.getElementById(this.tempPot);
          console.log((<HTMLElement>ev.target).children[0]);
          var tele = (<HTMLElement>ev.target).children[0];
          var tsrc = tele.getAttribute("src");
          var dindex = this.tempPot.split("_")[1];
          console.log("vv "+dindex);
          var tindex = (tele.getAttribute("id")).split("_")[1];
          console.log("vv "+tindex);
          var crntImgList = Object.assign([], this.CimageList);
          var tempImg = crntImgList[tindex];
          crntImgList[tindex] = crntImgList[dindex];
          crntImgList[dindex]= tempImg;
          this.store.dispatch(action.updateCrntImgList({crntImgList}));
          tele.setAttribute("src",dele.getAttribute("src"));
          if(tele.getAttribute("src")==""){
            tele.setAttribute("style","visibility:hidden");
            tele.parentElement.addEventListener("dragover",this.dragoverfunc);
          }else{
            tele.setAttribute("style","visibility:visible");
            tele.parentElement.removeEventListener("dragover",this.dragoverfunc);
          }
          dele.setAttribute("src",tsrc);
          if(dele.getAttribute("src")==""){
            dele.setAttribute("style","visibility:hidden");
            dele.parentElement.addEventListener("dragover",this.dragoverfunc);
          }else{
            dele.setAttribute("style","visibility:visible");
            dele.parentElement.removeEventListener("dragover",this.dragoverfunc);
          }
          if(this.compareTwoList(this.imageList,this.CimageList)){
            this.endGame();
          }else{
            console.log("not done matching..");
          }
        });
        console.log(no);
        image.src = this.CimageList[no];
        td.appendChild(image);
        tr.appendChild(td);
        no++;
      }
      
      this.tb.appendChild(tr);
     
    }
    console.log("table data insertation..");
      console.log(tr);
      console.log(this.tb); 
    //ele.appendChild(tb);
    
    //this.makeGap(this.gapNo);
  }
 

}
