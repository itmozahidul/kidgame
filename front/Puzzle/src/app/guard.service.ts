import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GeneralService } from './services/general.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private router:Router, private general:GeneralService) { }
  ngOnInit(){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    var ans:boolean=false;
    if(this.general.user.name!=""){
      ans=true;
    }else{
      ans=false;
      this.router.navigate(['/login']);
    }
    return ans;
  }
}
