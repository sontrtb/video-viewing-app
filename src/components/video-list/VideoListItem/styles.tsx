import {paddingHorizontal} from '@app/src/config/layout';
import {windowWidth} from '@app/src/ultis/layout';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inforWrap: {
    padding: paddingHorizontal,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    width: windowWidth - 135,
    marginLeft: 15,
  },
  infor: {
    fontSize: 14,
    width: windowWidth - 135,
    marginLeft: 15,
  },
});

export {styles};
