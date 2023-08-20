import * as React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {memo} from 'react';
// import {useColorScheme} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import MainStack from './MainStack';
import {darkTheme} from '../config/theme';

const Stack = createSharedElementStackNavigator();

function MyStack() {
  // const scheme = useColorScheme();

  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...darkTheme,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default memo(MyStack);
