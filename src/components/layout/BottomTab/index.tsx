import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import styles from './styles';
import routerList from '@app/src/router/routerList';
import PressableGlobal from '@app/src/components/globals/PressableGlobal';
import HeaderBottomTab from '@app/src/components/layout/header/HeaderBottomTab';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabBar = memo((prop: BottomTabBarProps) => {
  const {state, navigation} = prop;

  const {colors} = useTheme();

  return (
    <View style={[styles.tabContainer, {backgroundColor: colors.card}]}>
      {routerList.map((route, index) => {
        if (!route.isBottom) {
          return;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate({
            name: route.name,
            key: undefined,
            params: undefined,
            merge: true,
          });

          const event = navigation.emit({
            type: 'tabPress',
            target: route.name,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              key: undefined,
              params: undefined,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.name,
          });
        };

        return (
          <PressableGlobal
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItemWrap}>
            <View style={styles.tabItemContent}>
              {route.icon?.({isFocused: isFocused})}
            </View>
          </PressableGlobal>
        );
      })}
    </View>
  );
});

function BottomTab() {
  const tabBar = useCallback(
    (prop: BottomTabBarProps) => <TabBar {...prop} />,
    [],
  );
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={tabBar}>
      {routerList.map(
        router =>
          router.isBottom && (
            <Tab.Screen
              key={router.name}
              name={router.name}
              component={router.component}
              options={{
                headerShown: router.isHeader,
                // eslint-disable-next-line react/no-unstable-nested-components
                headerTitle: () => <HeaderBottomTab title={router.label} />,
              }}
            />
          ),
      )}
    </Tab.Navigator>
  );
}

export default memo(BottomTab);
