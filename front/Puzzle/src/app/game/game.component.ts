import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { State } from '../Store/reducer';
import { selectTimer, selectwait } from '../Store/selector';
import * as action from '../Store/action';
import { UserRank } from '../model/UserRank';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  private v:string="Puzzle";
  private image:string = "apple";
  private $wait:Observable<boolean>;
  private wait:boolean;
  private userList:any[];  
  private $userList:Observable<any[]>;  
  private $timer:Observable<boolean>;
  private timer:boolean;
  constructor(private store:Store<State>, private general:GeneralService) {
    this.$wait = store.select(selectwait);
    this.$timer = store.select(selectTimer);
    //this.$userList = store.select(selectPuzzleUser);
    //this.$userList = general.getUser("puzzle");
    //console.log(puzzleUser);
    //store.dispatch(action.updatePuzzleUser({puzzleUser}));
    
   }

  ngOnInit() {
    console.log("In gameComponent");
    
    
    this.general.getUserList("puzzle_ranks").subscribe((d)=>{
      d.sort((a:UserRank,b:UserRank)=>{return Number.parseInt(a.time)-Number.parseInt(b.time);});
       this.userList = d;
       console.log("***************** getting user list **********************");
       console.log(this.userList);
       console.log(this.wait);
      },
      (err)=>{
        console.log(err);
      });
    this.$wait.subscribe((data)=>{
      console.log("***************** getting wait value **********************");
      this.wait = data;
    });
    this.$timer.subscribe((data)=>{
      console.log("***************** getting timer value **********************");
      this.timer = data;
    });
    
    
    
  }

  cleanRecord(){
    localStorage.removeItem("puzzle_ranks");
  }

}
