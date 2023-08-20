import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextGlobal from '../../globals/TextGlobal';

interface IHeader {
  title: string;
}

function HeaderBottomTab(props: IHeader) {
  const {title} = props;

  return (
    <View>
      <TextGlobal style={styles.title}>{title}</TextGlobal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default HeaderBottomTab;
