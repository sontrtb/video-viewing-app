import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

function PressableGlobal(props: TouchableOpacityProps) {
  return <TouchableOpacity {...props} activeOpacity={0.7} />;
}

export default PressableGlobal;
