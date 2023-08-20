import React, {memo} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import styles from './styles';

interface IImageGlobalProps extends FastImageProps {
  width: number;
  height: number;
  rounded?: number;
}

function ImageGlobal(props: IImageGlobalProps) {
  return (
    <FastImage
      style={[
        styles.background,
        props.style,
        {width: props.width, height: props.height, borderRadius: props.rounded},
      ]}
      {...props}
    />
  );
}

export default memo(ImageGlobal);
