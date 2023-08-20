import {useTheme} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {ActivityIndicator, View} from 'react-native';

interface ILoading {
  colorLoading?: string;
  size?: 'small' | 'large';
}

function Loading(props: ILoading): ReactElement {
  const {colorLoading, size = 'small'} = props;

  const {colors} = useTheme();

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={size} color={colorLoading || colors.primary} />
    </View>
  );
}

export default Loading;
