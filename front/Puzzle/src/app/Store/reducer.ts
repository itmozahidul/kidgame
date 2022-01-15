import { Action, createReducer, on } from '@ngrx/store';
import * as action from '../Store/action';

export interface State {
  imgList: any[];
  crntImgList:any[];
  pSelectedImage:string;
  level:string;
  timer:boolean,
  playTime:number,
  wait:boolean,
  puzzleUser:any[];
}

export const initialState: State = {
    imgList: [],
    crntImgList: [],
    pSelectedImage:"assets/images/puzzle/pic_1.jpg",
    level:"Easy",
    timer:false ,
    playTime:1,
    wait:true,
    puzzleUser:[]
  };

  export const gameReducer = createReducer(
    initialState,
    on(action.updateImgList, (state,{imgList}) => {
        var newImgList = imgList;
        console.log("in dispatch img lst");
        return {
            ...state,
            imgList: newImgList,
        };
    }),
    on(action.updateCrntImgList, (state,{crntImgList}) => {
        var newCrntImgList = crntImgList;
        console.log("in dispatch crnt img lst ");
        return {
            ...state,
            crntImgList: newCrntImgList,
        };
    }),
    on(action.updateSelectedImage, (state,{selectedImg}) => {
      var newSelectedImg = selectedImg;
      console.log("in dispatch  selected Image ");
      return {
          ...state,
          pSelectedImage: newSelectedImg,
      };
    }),
    on(action.updateLevel, (state,{level})=>{
      var newLevel = level;
      return {
        ...state,
        level:newLevel,
      };
    }),
    on(action.updateTimerMode, (state,{timer})=>{
      var newTimer = timer;
      console.log("in dispatch Timer ");
      return {
        ...state,
        timer:newTimer,
      }
    }),
    on(action.updatePlayTime, (state,{timeToPlay})=>{
      var newTimeToPlay = timeToPlay;
      console.log("in dispatch play time ");
      console.log(timeToPlay);
    
    return {
      ...state,
      playTime:newTimeToPlay,
    }
  }),
  on(action.updatewait, (state,{wait})=>{
    var newwait = wait;
    console.log("in dispatch wait ");
  
  return {
    ...state,
    wait:newwait,
  }
}),
/* on(action.updatePuzzleUser, (state,{puzzleUser})=>{
  var newPuzzleUser = puzzleUser;
  console.log("in dispatch PuzzleUser ");
  console.log(newPuzzleUser);
return {
  ...state,
  puzzleUser:newPuzzleUser,
}
}) */
  );