import React from 'react';
import {View} from 'react-native';
import ShortVideoList from '@app/src/components/short-video-list/ShortVideoList';

function ShortVideo() {
  return (
    <View style={{flex: 1}}>
      <ShortVideoList />
    </View>
  );
}

export default ShortVideo;
