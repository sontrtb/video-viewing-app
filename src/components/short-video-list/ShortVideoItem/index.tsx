import React, {ReactElement, useState, useCallback, memo} from 'react';
import {Pressable, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Video, {OnProgressData, OnBufferData} from 'react-native-video';
import Animated, {useSharedValue} from 'react-native-reanimated';
import TextGlobal from '@app/src/components/globals/TextGlobal';
import {useTheme} from '@react-navigation/native';
import LoadingGlobal from '@app/src/components/globals/LoadingGlobal';
import {styles} from './styles';
import {Slider} from 'react-native-awesome-slider';

interface ShortVideoItemProps {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

function ShortVideoItem(props: ShortVideoItemProps): ReactElement {
  const {colors} = useTheme();
  const colorControll = colors.text;

  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  // // thời gian video xem trước ảnh trên thanh slide
  // const [timeBubble, setTimeBubble] = useState(0);

  // slider value
  const min = useSharedValue(0);
  const currentTimeAtimated = useSharedValue(0);
  const duration = useSharedValue(0);

  const onBuffer = (e: OnBufferData) => {
    setLoading(e.isBuffering);
  };

  const onProgress = useCallback(
    (data: OnProgressData): void => {
      currentTimeAtimated.value = data.currentTime;
    },
    [currentTimeAtimated],
  );

  const onLoadStart = useCallback((): void => {
    setLoading(true);
  }, []);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const togglePause = useCallback(() => {
    if (loading) {
      return;
    }

    setPaused(!paused);
  }, [paused, loading]);

  return (
    <View style={styles.container}>
      <Video
        repeat
        style={styles.video}
        paused={paused}
        resizeMode="contain"
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        }}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onBuffer={onBuffer}
      />

      <Pressable style={styles.controlerWrap} onPress={togglePause}>
        <View style={styles.top} />
        {loading ? (
          <LoadingGlobal colorLoading={colorControll} size="large" />
        ) : (
          paused && (
            <IconAntDesign name="playcircleo" color={colorControll} size={45} />
          )
        )}

        <Animated.View style={styles.bottom}>
          <Slider
            style={styles.slider}
            progress={currentTimeAtimated}
            minimumValue={min}
            maximumValue={duration}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export default memo(ShortVideoItem);
