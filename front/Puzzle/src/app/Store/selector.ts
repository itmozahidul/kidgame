import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as gameStore from "../Store/reducer"

export const selectgameState = createFeatureSelector<gameStore.State>(
    'game'
  );
export const selectImgList = createSelector(selectgameState,(state)=>{
    return state.imgList;
});
export const selectCrntImgList = createSelector(selectgameState,(state)=>{
    return state.crntImgList;
}); 
export const selectSelectedImg = createSelector(selectgameState,(state)=>{
    return state.pSelectedImage;
});
export const selectLevel = createSelector(selectgameState,(state)=>{
    return state.level;
});
export const selectTimer = createSelector(selectgameState,(state)=>{
    return state.timer;
});