import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    height: '100%',
    width: '100%',
  },

  controlerOpacity: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  controlerWrap: {
    padding: 10,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
  },
  bottom: {
    height: 60,
    justifyContent: 'center',
  },
  pauseIcon: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  timeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    color: '#fff',
    fontSize: 12,
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

export default styles;
