import {windowWidth} from '@app/src/ultis/layout';
import {StyleSheet} from 'react-native';
import {heightVideo, widthVideo, widthVideoCollapse} from '../config';
import {paddingHorizontal} from '@app/src/config/layout';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
  videoPlayerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoPlayer: {
    width: widthVideo,
    height: heightVideo,
  },
  collapseInfor: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  titleVideoCollapse: {
    width: windowWidth - widthVideoCollapse - 130,
    marginRight: 15,
  },
  //
  inforWrap: {
    paddingHorizontal: paddingHorizontal,
    paddingTop: 10,
    paddingBottom: 15,
  },
  titleVideo: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    marginTop: 5,
    fontSize: 12,
  },
});

export {styles};
