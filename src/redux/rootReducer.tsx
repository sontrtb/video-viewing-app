import {combineReducers} from 'redux';
import UserSlice from './slices/UserSlice';
import openVideoPlayerSlice from './OpenVideoPlayer/slice';

const rootReducer = combineReducers({
  user: UserSlice.reducer,
  open_video_player: openVideoPlayerSlice.reducer,
});

export default rootReducer;
