import React from 'react';
import {View} from 'react-native';
import VideoList from '@app/src/components/video-list/VideoList';

function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <VideoList />
    </View>
  );
}

export default HomeScreen;
