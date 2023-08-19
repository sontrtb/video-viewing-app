import * as React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import routerList from '@app/src/router/routerList';
import BottomTab from '@app/src/components/layout/BottomTab';
import {useAppSelector} from '@app/src/hook/Redux';
import HeaderBottomTab from '@app/src/components/layout/header/HeaderBottomTab';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import VideoPlayer from '../components/video-detail/VideoDetail';
import {useIsOpenVideoDetail} from '../redux/OpenVideoPlayer/hooks';

const Stack = createSharedElementStackNavigator();

function MainStack() {
  const user = useAppSelector(state => state.user);
  const isOpen = useIsOpenVideoDetail();
  return (
    <>
      <Stack.Navigator initialRouteName={user.token ? 'HomeScreen' : 'Login'}>
        <Stack.Screen
          name="HomeScreen"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />

        {routerList.map(router => (
          <Stack.Screen
            key={router.name}
            name={router.name}
            component={router.component}
            // sharedElements={(route, otherRoute, showing) => {
            //   return ['image'];
            // }}
            options={{
              headerShown: router.isHeader,
              headerTitle: () => <HeaderBottomTab title={router.label} />,
              gestureEnabled: true,
              gestureDirection: router.isModal ? 'vertical' : 'horizontal',
              cardStyleInterpolator: router.isModal
                ? CardStyleInterpolators.forBottomSheetAndroid
                : CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        ))}
      </Stack.Navigator>
      {isOpen && <VideoPlayer />}
    </>
  );
}

export default MainStack;
