import React, {useCallback} from 'react';
import {NativeSyntheticEvent, View} from 'react-native';
import VideoList from '@app/src/components/video-list/VideoList';
import ListTag from '@app/src/components/globals/ListTag';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {NativeScrollEvent} from 'react-native';
import {styles} from './styles';
import {useTheme} from '@react-navigation/native';

function HomeScreen() {
  const {colors} = useTheme();

  const scrollY = useSharedValue(0);

  const animatedHeaderStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, -50],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        {
          translateY: translateY,
        },
      ],
    };
  });

  const handleScrollListVideo = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.value = e.nativeEvent.contentOffset.y;
    },
    [scrollY],
  );

  return (
    <View style={styles.homeScreen}>
      <Animated.View
        style={[
          styles.header,
          animatedHeaderStyles,
          {backgroundColor: colors.background},
        ]}>
        <ListTag />
      </Animated.View>

      <VideoList scrollHandler={handleScrollListVideo} />
    </View>
  );
}

export default HomeScreen;
