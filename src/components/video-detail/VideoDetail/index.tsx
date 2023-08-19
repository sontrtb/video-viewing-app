import React from 'react';
import TextGlobal from '@app/src/components/TextGlobal';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import ButtonGlobal from '../../ButtonGlobal';
import {useAppDispatch} from '@app/src/hook/Redux';
import {clearVideoDetail} from '@app/src/redux/OpenVideoPlayer/slice';
import {styles} from './style';
import {View} from 'react-native';
import VideoPlayer from '../VideoPlayer';
import {windowHeight} from '@app/src/ultis/layout';
import {
  heightVideo,
  heightVideoCollapse,
  widthVideo,
  widthVideoCollapse,
} from '../config';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import PressableGlobal from '../../PressableGlobal';

const yOffsetCollapse = windowHeight - heightVideoCollapse - 20;
const yOffsetFull = 0;

function VideoDetail() {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  // y của cả trang
  const yOffset = useSharedValue(yOffsetFull);
  const animatedVideoDetailStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: yOffset.value}],
    };
  });

  // xử lý các kích thước theo yOffset
  // chiều cao video
  const animatedVideoPlayerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      yOffset.value,
      [0, windowHeight],
      [heightVideo, heightVideoCollapse],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );
    const width = interpolate(
      yOffset.value,
      [windowHeight / 2, windowHeight],
      [widthVideo, widthVideoCollapse],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );

    return {
      height,
      width,
    };
  });

  // sự kiẹn kéo trang
  const startGesture = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onUpdate(e => {
      // chặn vuốt lên trên khi màn full
      if (yOffset.value <= yOffsetFull && e.translationY < 0) {
        return;
      }
      yOffset.value = e.translationY + startGesture.value;
    })
    .onEnd(e => {
      // thu nhỏ khi vuốt nhanh xuống dưới
      if (e.velocityY > 1500) {
        yOffset.value = withTiming(yOffsetCollapse, {
          easing: Easing.inOut(Easing.sin),
        });
        startGesture.value = yOffsetCollapse;
        return;
      }

      // phóng khi vuốt nhanh lên trên
      if (e.velocityY < -1300) {
        yOffset.value = withTiming(yOffsetFull, {
          easing: Easing.inOut(Easing.sin),
        });
        startGesture.value = yOffsetFull;
        return;
      }

      // tự động full khi ở nửa trên màn hình
      // ngược lại: thu nhỏ khi ở nửa dưới màn hình
      if (yOffset.value < windowHeight / 2) {
        yOffset.value = withTiming(yOffsetFull, {
          easing: Easing.inOut(Easing.sin),
        });
        startGesture.value = yOffsetFull;
      } else {
        yOffset.value = withTiming(yOffsetCollapse, {
          easing: Easing.inOut(Easing.sin),
        });
        startGesture.value = yOffsetCollapse;
      }
    });

  return (
    <Animated.View
      entering={FadeInDown.duration(100)}
      style={[styles.container, animatedVideoDetailStyles]}>
      <GestureDetector gesture={gesture}>
        <View style={styles.videoPlayerWrap}>
          <Animated.View style={[styles.videoPlayer, animatedVideoPlayerStyle]}>
            <VideoPlayer />
          </Animated.View>
          <View style={styles.collapseInfor}>
            <TextGlobal style={styles.titleVideo} numberOfLines={2}>
              hello hello hello hello hello hello hello hello
            </TextGlobal>
            <PressableGlobal
              onPress={() => {
                dispatch(clearVideoDetail());
              }}>
              <IconAntDesign name="close" size={30} />
            </PressableGlobal>
          </View>
        </View>
      </GestureDetector>

      <TextGlobal>VideoPlayer</TextGlobal>
    </Animated.View>
  );
}

export default VideoDetail;
