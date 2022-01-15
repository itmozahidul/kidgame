import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user:User = new User();
  constructor(private general:GeneralService, private router:Router) { }

  ngOnInit() {
    console.log("in login component");
    if(this.general.user.name!=""){
      console.log("name is empty redirecting to main");
      this.router.navigate(["Start"]);
    }else{
      console.log("In login page user:"+this.user.name);
    }
    
  }
  setUser(){
    this.general.user = this.user;
    console.log("user is set in service :"+this.general.user);
  }


}
