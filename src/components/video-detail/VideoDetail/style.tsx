import {windowHeight, windowWidth} from '@app/src/ultis/layout';
import {StyleSheet} from 'react-native';
import {heightVideo, widthVideo, widthVideoCollapse} from '../config';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
    height: windowHeight,
    width: windowWidth,
  },
  videoPlayerWrap: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoPlayer: {
    width: widthVideo,
    height: heightVideo,
    backgroundColor: 'blue',
  },
  collapseInfor: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  titleVideo: {
    width: windowWidth - widthVideoCollapse - 130,
    marginRight: 15,
  },
});

export {styles};
