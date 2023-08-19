import ButtonGlobal from '@app/src/components/ButtonGlobal';
import TextGlobal from '@app/src/components/TextGlobal';
import {useAppDispatch} from '@app/src/hook/Redux';
import {setVideoDetail} from '@app/src/redux/OpenVideoPlayer/slice';
import {RootStackParamList} from '@app/src/router/routerList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  return (
    <View>
      <TextGlobal>home</TextGlobal>
      <TextGlobal>home</TextGlobal>
      <TextGlobal>home</TextGlobal>
      <TextGlobal>home</TextGlobal>

      <ButtonGlobal
        title="Open VideoDetail"
        onPress={() => {
          navigation.push('VideoDetail');
        }}
      />

      <ButtonGlobal
        title="Open video player"
        onPress={() => {
          dispatch(setVideoDetail({id: 1}));
        }}
      />

      <Animated.Image
        source={{
          uri: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg',
        }}
        style={{height: 100, width: 100}}
      />
    </View>
  );
}

export default HomeScreen;
