import { Action, createReducer, on } from '@ngrx/store';
import * as action from '../Store/action';

export interface State {
  imgList: any[];
  crntImgList:any[];
}

export const initialState: State = {
    imgList: [],
    crntImgList: [],
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
  );  