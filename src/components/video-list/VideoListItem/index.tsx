import React from 'react';
import {styles} from './styles';
import TextGlobal from '@app/src/components/globals/TextGlobal';
import {View} from 'react-native';
import ImageGlobal from '@app/src/components/globals/ImageGlobal';
import {windowHeightByPercentage, windowWidth} from '@app/src/ultis/layout';
import PressableGlobal from '@app/src/components/globals/PressableGlobal';
import {useAppDispatch} from '@app/src/hook/Redux';
import {setVideoDetail} from '@app/src/redux/OpenVideoPlayer/slice';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '@react-navigation/native';
import {layout} from '@app/src/styles/layout';

interface IVideoListItemProps {
  thumbnail: string | undefined;
  id: number;
  title: string;
  url: string;
}

function VideoListItem(props: IVideoListItemProps) {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  return (
    <PressableGlobal
      onPress={() => {
        dispatch(setVideoDetail(props));
      }}
      style={styles.container}>
      <ImageGlobal
        height={windowHeightByPercentage(0.5)}
        width={windowWidth}
        source={{
          uri: props.thumbnail,
        }}
      />
      <View style={styles.inforWrap}>
        <View style={layout.row}>
          <ImageGlobal
            rounded={20}
            height={40}
            width={40}
            source={{
              uri: props.thumbnail,
            }}
          />
          <View>
            <TextGlobal style={styles.title} numberOfLines={2}>
              {props.title}
            </TextGlobal>
            <TextGlobal style={styles.infor} numberOfLines={1}>
              {props.title}
            </TextGlobal>
          </View>
        </View>
        <PressableGlobal>
          <IconEntypo
            name="dots-three-vertical"
            color={colors.text}
            size={18}
          />
        </PressableGlobal>
      </View>
    </PressableGlobal>
  );
}

export default VideoListItem;
