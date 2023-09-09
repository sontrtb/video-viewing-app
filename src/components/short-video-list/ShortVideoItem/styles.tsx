import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '@app/src/ultis/layout';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  video: {
    height: windowHeight,
    width: windowWidth,
  },

  controlerWrap: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'space-between',
  },
  bottom: {
    height: 60,
    justifyContent: 'center',
  },
  top: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  slider: {
    width: '100%',
  },
});

export {styles};
