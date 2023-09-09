import React, {
  ReactElement,
  useRef,
  useState,
  useCallback,
  useEffect,
  memo,
} from 'react';
import {BackHandler, Pressable, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Video, {
  OnLoadData,
  OnProgressData,
  OnBufferData,
} from 'react-native-video';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import TextGlobal from '@app/src/components/globals/TextGlobal';
import converSeconds from '@app/src/ultis/time/converSeconds';
import PressableGlobal from '@app/src/components/globals/PressableGlobal';
import {useTheme} from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Orientation from 'react-native-orientation-locker';
import LoadingGlobal from '@app/src/components/globals/LoadingGlobal';
import {isIos} from '@app/src/ultis/device';
import {useVideoDetail} from '@app/src/redux/OpenVideoPlayer/hooks';
import styles from './styles';
import {Slider} from 'react-native-awesome-slider';

interface VideoPlayerProps {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

function VideoPlayer(props: VideoPlayerProps): ReactElement {
  const {isFullscreen, setIsFullscreen} = props;

  const dataVideo = useVideoDetail();

  const {colors} = useTheme();
  const colorControll = colors.text;

  const videoPlayerRef = useRef<any>();

  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
  // // thời gian video xem trước ảnh trên thanh slide
  // const [timeBubble, setTimeBubble] = useState(0);

  // slider value
  const min = useSharedValue(0);
  const currentTimeAtimated = useSharedValue(0);
  const duration = useSharedValue(0);

  // opacity điều khiển video
  const opacityControlVal = useSharedValue(1);
  const animatedOpacityControlVideoStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityControlVal.value,
    };
  });

  // dùng width để ẩn hiện các action khi loading
  const maxWidthVal = useSharedValue(10000);
  const animatedMaxWidthStyles = useAnimatedStyle(() => {
    return {
      maxWidth: maxWidthVal.value,
    };
  });

  const showControler = useCallback(
    (autoHide?: boolean) => {
      if (autoHide) {
        opacityControlVal.value = withSequence(
          withTiming(1, {duration: 300}),
          withDelay(2000, withTiming(0, {duration: 300})),
        );
        maxWidthVal.value = 10000;
        maxWidthVal.value = withDelay(2600, withTiming(0, {duration: 0}));
      } else {
        opacityControlVal.value = withSequence(withTiming(1, {duration: 300}));
        maxWidthVal.value = 10000;
      }
    },
    [maxWidthVal, opacityControlVal],
  );

  const hideControler = useCallback(() => {
    opacityControlVal.value = withTiming(0, {duration: 300});
    maxWidthVal.value = withDelay(300, withTiming(0, {duration: 0}));
  }, [maxWidthVal, opacityControlVal]);

  const toggleShowControler = useCallback(() => {
    if (opacityControlVal.value === 0) {
      showControler(true);
    } else {
      hideControler();
    }
  }, [hideControler, opacityControlVal.value, showControler]);

  const onLoad = useCallback(
    (e: OnLoadData) => {
      showControler(true);
      duration.value = e.duration;
      setLoading(false);
    },
    [duration, showControler],
  );

  const onBuffer = (e: OnBufferData) => {
    setLoading(e.isBuffering);
  };

  const onProgress = useCallback(
    (data: OnProgressData): void => {
      setCurrentTime(data.currentTime);
      currentTimeAtimated.value = data.currentTime;
    },
    [currentTimeAtimated],
  );

  const onLoadStart = useCallback((): void => {
    setLoading(true);
  }, []);

  const togglePause = useCallback(() => {
    setPaused(!paused);
  }, [paused]);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      SystemNavigationBar.fullScreen(false);
      Orientation.lockToPortrait();
      if (isIos) {
        Orientation.lockToPortrait();
      }
    } else {
      SystemNavigationBar.stickyImmersive();
      Orientation.lockToLandscape();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen, setIsFullscreen]);

  const onSlidingStart = useCallback(() => {
    showControler();
    setPaused(true);
  }, [showControler]);

  const onSlidingComplete = useCallback(
    (seek: number): void => {
      showControler();
      videoPlayerRef?.current?.seek(seek);
      setPaused(false);
    },
    [showControler],
  );

  // handle back
  const backAction = useCallback(() => {
    if (isFullscreen) {
      toggleFullscreen();
    } else {
      SystemNavigationBar.navigationShow();
    }
    return true;
  }, [isFullscreen, toggleFullscreen]);

  // sự kiện nút back
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  const onError = useCallback(() => {
    // showToast('Không thể phát video');
  }, []);

  return (
    <View>
      <Video
        repeat
        style={styles.video}
        paused={paused}
        ref={videoPlayerRef}
        resizeMode="contain"
        source={{
          uri: dataVideo?.url,
        }}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onProgress={onProgress}
        onBuffer={onBuffer}
        onError={onError}
      />

      <Animated.View
        style={[styles.controlerOpacity, animatedOpacityControlVideoStyles]}>
        <Pressable style={styles.controlerWrap} onPress={toggleShowControler}>
          {/* Top content */}
          <View style={styles.top} />
          {loading ? (
            <LoadingGlobal colorLoading={colorControll} size="large" />
          ) : (
            <PressableGlobal style={styles.pauseIcon} onPress={togglePause}>
              <Animated.View style={animatedMaxWidthStyles}>
                <IconAntDesign
                  name={paused ? 'playcircleo' : 'pausecircleo'}
                  color={colorControll}
                  size={45}
                />
              </Animated.View>
            </PressableGlobal>
          )}

          <Animated.View style={[styles.bottom, animatedMaxWidthStyles]}>
            <View style={styles.timeWrap}>
              <TextGlobal style={styles.time}>
                {converSeconds(currentTime) +
                  ' / ' +
                  converSeconds(duration.value)}
              </TextGlobal>
              <PressableGlobal onPress={toggleFullscreen}>
                <MaterialIcon
                  name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                  color={colorControll}
                  size={25}
                />
              </PressableGlobal>
            </View>

            <Slider
              style={styles.slider}
              progress={currentTimeAtimated}
              minimumValue={min}
              maximumValue={duration}
              onSlidingStart={onSlidingStart}
              onSlidingComplete={onSlidingComplete}
              bubble={(b: number) => converSeconds(b)}
              // renderBubble={() => (
              //   <Video
              //     style={{height: 60, width: 80, backgroundColor: 'red'}}
              //     // paused={true}
              //     resizeMode="cover"
              //     source={{
              //       uri: dataVideo?.url,
              //     }}
              //   />
              // )}
            />
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default memo(VideoPlayer);
