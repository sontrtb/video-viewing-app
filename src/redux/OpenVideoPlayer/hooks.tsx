import {useAppSelector} from '@app/src/hook/Redux';

export const useIsOpenVideoDetail = () => {
  const isOpen = useAppSelector(state => state.open_video_player).isOpen;
  return isOpen;
};

export const useVideoDetail = () => {
  const video = useAppSelector(state => state.open_video_player).video;
  return video;
};
