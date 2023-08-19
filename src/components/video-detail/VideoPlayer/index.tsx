import React from 'react';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Video from 'react-native-video';
import {styles} from './styles';

function VideoPlayer() {
  return (
    <Animated.View>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={styles.video}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

export default VideoPlayer;
