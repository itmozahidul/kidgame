import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { nextTick } from 'process';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public user:User= new User();
  public needUserName:boolean = false;
  constructor(private router:Router) { 
    
  }
  getNeedUserName(){
    return this.needUserName;
  }
  getUser(){
   return this.user;
  }
  setUser(user:User){
   this.user= user;
  }
/*  getUserList(game):Observable<any[]>{
   return new Observable<any[]>(ob=>{
    var ans:any[]=null;
    try{var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/data/ranking.json", true);
    xhttp.send();
    xhttp.responseType= 'json';
    xhttp.onload = ()=>{
      ob.next(xhttp.response.puzzle);
    }
    }catch(err){
      ob.error(err);
      console.log(err);
    }
    
   });
 } */
 getUserList(game:string):Observable<any[]>{
  return new Observable<any>(ob=>{
   var ans:any[]=null;
   try{var xhttp = new XMLHttpRequest();
    let stringdata = localStorage.getItem(game);
    ob.next(JSON.parse(stringdata));
   }catch(err){
     ob.error(err);
     console.log(err);
   }
   
  });
}



  
}
