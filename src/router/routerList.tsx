import React, {ComponentType, ReactElement} from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '@app/src/screens/bottom/HomeScreen';
import VideoDetail from '../screens/VideoDetail';

export interface IRouterList {
  name: string;
  label: string;
  component: ComponentType<ReactElement>;
  isBottom?: boolean;
  isHeader?: boolean;
  isModal?: boolean;
  icon?: ({isFocused}: {isFocused?: boolean}) => ReactElement;
}

export type RootStackParamList = {
  VideoDetail: undefined;
};

const routerList: IRouterList[] = [
  {
    name: 'MainScreen',
    label: 'Trang chủ',
    component: HomeScreen,
    isBottom: true,
    isHeader: true,
    icon: props => (
      <IconAntDesign
        name="home"
        size={25}
        // color={props.isFocused ? CONFIG.color.main : CONFIG.color.secondaryIcon}
      />
    ),
  },
  {
    name: 'Fluctuation',
    label: 'Biến động số dư',
    component: HomeScreen,
    isBottom: true,
    isHeader: true,
    icon: props => (
      <IconAntDesign
        name="areachart"
        size={25}
        // color={props.isFocused ? CONFIG.color.main : CONFIG.color.secondaryIcon}
      />
    ),
  },
  {
    name: 'NotificationScreen',
    label: 'Thông báo',
    component: HomeScreen,
    isBottom: true,
    isHeader: true,
    icon: props => (
      <IconFontAwesome
        name="bell"
        size={25}
        // color={props.isFocused ? CONFIG.color.main : CONFIG.color.secondaryIcon}
      />
    ),
  },
  {
    name: 'SettingScreen',
    label: 'Cài đặt',
    component: HomeScreen,
    isBottom: true,
    isHeader: true,
    icon: props => (
      <IconAntDesign
        name="setting"
        size={28}
        // color={props.isFocused ? CONFIG.color.main : CONFIG.color.secondaryIcon}
      />
    ),
  },
  {
    name: 'VideoDetail',
    label: 'Chi tiết video',
    isModal: true,
    isHeader: false,
    component: () => <VideoDetail />,
  },
  // {
  //   name: 'RegisterScreen',
  //   label: 'Đăng ký',
  //   isHeader: false,
  //   component: Register,
  // },
  // {
  //   name: 'MediaViewScreen',
  //   label: 'Chi tiết ảnh/video',
  //   isHeader: false,
  //   isModal: true,
  //   component: MediaView,
  // },
  // {
  //   name: 'FluctuationDetailScreen',
  //   label: 'Chi tiết',
  //   component: FluctuationDetail,
  // },
  // {
  //   name: 'NotificationDetailScreen',
  //   label: 'Chi tiết thông báo',
  //   component: NotificationDetail,
  // },
  // {
  //   name: 'NotificationCreateScreen',
  //   label: 'Tạo thông báo',
  //   component: NotificationCreate,
  // },
];

export default routerList;
