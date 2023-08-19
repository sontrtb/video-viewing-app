import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IOpenVideoDetail, IVideoDetail} from './type';

const initState: IOpenVideoDetail = {
  isOpen: false,
};

const openVideoPlayerSlice = createSlice({
  name: 'open_video_player',
  initialState: initState,
  reducers: {
    setVideoDetail: (state, action: PayloadAction<IVideoDetail>) => {
      return {...state, isOpen: true, video: action.payload};
    },
    clearVideoDetail: state => {
      return {...state, isOpen: false, video: undefined};
    },
  },
});

export const {setVideoDetail, clearVideoDetail} = openVideoPlayerSlice.actions;
export default openVideoPlayerSlice;
