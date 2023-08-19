import React from 'react';
import {ActivityIndicator, Pressable, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';
import TextGlobal from '../TextGlobal';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IButtonGlobal {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  onLongPress?: () => void;
  isLoading?: boolean;
}

function ButtonGlobal(props: IButtonGlobal) {
  const {style, onPress, onLongPress, title, isLoading} = props;

  const {colors} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.buttonGlobal, {backgroundColor: colors.primary}, style]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <TextGlobal style={styles.textButton}>{title}</TextGlobal>
      )}
    </TouchableOpacity>
  );
}

export default ButtonGlobal;
