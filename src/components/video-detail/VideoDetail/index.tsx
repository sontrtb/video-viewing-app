import React, {useCallback, useEffect, useMemo, useState} from 'react';
import TextGlobal from '@app/src/components/globals/TextGlobal';
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
import {useAppDispatch} from '@app/src/hook/Redux';
import {clearVideoDetail} from '@app/src/redux/OpenVideoPlayer/slice';
import {styles} from './style';
import {BackHandler, View, useWindowDimensions} from 'react-native';
import VideoPlayer from '../VideoPlayer';
import {windowHeight} from '@app/src/ultis/layout';
import {
  heightVideo,
  heightVideoCollapse,
  widthVideo,
  widthVideoCollapse,
} from '../config';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import PressableGlobal from '@app/src/components/globals/PressableGlobal';
import {useVideoDetail} from '@app/src/redux/OpenVideoPlayer/hooks';
import VideoList from '@app/src/components/video-list/VideoList';
import {useTheme} from '@react-navigation/native';

const yOffsetCollapse = windowHeight - heightVideoCollapse - 20;
const yOffsetFull = 0;

function VideoDetail() {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {height, width} = useWindowDimensions();

  const dispatch = useAppDispatch();
  const dataVideo = useVideoDetail();
  const {colors} = useTheme();

  const [isFullscreen, setIsFullscreen] = useState(false);

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
    const heightVideoPlayer = interpolate(
      yOffset.value,
      [0, windowHeight],
      [heightVideo, heightVideoCollapse],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );
    const widthVideoPlayer = interpolate(
      yOffset.value,
      [windowHeight / 2, windowHeight],
      [widthVideo, widthVideoCollapse],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );

    return {
      height: heightVideoPlayer,
      width: widthVideoPlayer,
    };
  });

  // sự kiẹn kéo trang
  const startGesture = useSharedValue(0);
  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!isFullscreen)
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
        }),
    [isFullscreen, startGesture, yOffset],
  );

  // mở full màn
  const handleOpenFull = useCallback(() => {
    yOffset.value = withTiming(yOffsetFull, {
      easing: Easing.inOut(Easing.sin),
    });
    startGesture.value = yOffsetFull;
  }, [startGesture, yOffset]);

  // nếu video thay đổi thì mở full màn
  useEffect(() => {
    handleOpenFull();
  }, [dataVideo?.id, handleOpenFull]);

  // sự kiện nút back => thu nhỏ trình phát
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      yOffset.value = withTiming(yOffsetCollapse, {
        easing: Easing.inOut(Easing.sin),
      });
      startGesture.value = yOffsetCollapse;
      return true;
    });
  }, [startGesture, yOffset]);

  return (
    <Animated.View
      entering={FadeInDown.duration(100)}
      style={[
        styles.container,
        animatedVideoDetailStyles,
        {backgroundColor: colors.background, height: height, width: width},
      ]}>
      <GestureDetector gesture={gesture}>
        <PressableGlobal
          style={styles.videoPlayerWrap}
          onPress={handleOpenFull}>
          <Animated.View
            style={
              isFullscreen
                ? [{height: height, width: width}]
                : [styles.videoPlayer, animatedVideoPlayerStyle]
            }>
            <VideoPlayer
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
            />
          </Animated.View>
          <View style={styles.collapseInfor}>
            <TextGlobal style={styles.titleVideoCollapse} numberOfLines={2}>
              {dataVideo?.title}
            </TextGlobal>
            <PressableGlobal
              onPress={() => {
                dispatch(clearVideoDetail());
              }}>
              <IconAntDesign name="close" size={30} color={colors.text} />
            </PressableGlobal>
          </View>
        </PressableGlobal>
      </GestureDetector>

      <View style={styles.inforWrap}>
        <TextGlobal style={styles.titleVideo} numberOfLines={2}>
          {dataVideo?.title}
        </TextGlobal>
        <TextGlobal style={styles.description} numberOfLines={1}>
          {dataVideo?.title}
        </TextGlobal>
      </View>

      <VideoList />
    </Animated.View>
  );
}

export default VideoDetail;
