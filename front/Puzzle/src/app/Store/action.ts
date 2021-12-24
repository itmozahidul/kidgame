import { createAction, props } from '@ngrx/store';

export const updateImgList = createAction('[puzzle] updateImgList', props<{imgList:any[]}>());
export const updateCrntImgList = createAction('[puzzle] updateCrntImgList', props<{crntImgList:any[]}>());