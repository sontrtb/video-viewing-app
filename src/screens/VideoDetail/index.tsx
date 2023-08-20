import TextGlobal from '@app/src/components/globals/TextGlobal';
import {RootStackParamList} from '@app/src/router/routerList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

function VideoDetail() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('gestureStart', e => {
      console.log(e);
      // do something
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <SharedElement id="image">
        <Animated.Image
          source={{
            uri: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg',
          }}
          style={{height: 300, width: 300}}
        />
      </SharedElement>

      <TextGlobal>home</TextGlobal>
    </View>
  );
}

export default VideoDetail;
