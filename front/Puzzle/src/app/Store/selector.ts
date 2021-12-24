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