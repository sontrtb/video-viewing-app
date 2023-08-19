import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {memo} from 'react';
import {useColorScheme} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import MainStack from './MainStack';

const Stack = createSharedElementStackNavigator();

function MyStack() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
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
