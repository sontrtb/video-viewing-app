import {StyleSheet} from 'react-native';
// import {paddingHorizontal} from '@app/src/config/layout';

const layout = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowJustifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {layout};
