import { createAction, props } from '@ngrx/store';

export const updateImgList = createAction('[puzzle] updateImgList', props<{imgList:any[]}>());
export const updateCrntImgList = createAction('[puzzle] updateCrntImgList', props<{crntImgList:any[]}>());
export const updateSelectedImage = createAction('[puzzle] updateSelecteImage', props<{selectedImg:string}>());
export const updateLevel = createAction('[puzzle] updateLevel', props<{level:string}>());
export const updateTimerMode = createAction('[puzzle] updateTimerMode', props<{timer:string}>());