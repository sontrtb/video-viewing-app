import React, {memo} from 'react';
import {FlatList, View} from 'react-native';
import VideoListItem from '../VideoListItem';
import {useTheme} from '@react-navigation/native';

interface IVideoListProps {
  param?: any;
}

function VideoList(props: IVideoListProps) {
  const {param} = props;

  const {colors} = useTheme();

  const DATA = [
    {
      id: 0,
      title: 'First Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail:
        'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg',
    },
    {
      id: 1,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail:
        'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg',
    },
    {
      id: 2,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail:
        'https://img2.thuthuatphanmem.vn/uploads/2019/01/04/anh-co-gai-de-thuong_025058983.jpg',
    },
    {
      id: 3,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail:
        'https://img2.thuthuatphanmem.vn/uploads/2019/01/04/anh-co-gai-de-thuong_025058983.jpg',
    },
    {
      id: 4,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail:
        'https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg',
    },
    {
      id: 5,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail:
        'https://scr.vn/wp-content/uploads/2020/08/T%E1%BA%A3i-h%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i.jpg',
    },
    {
      id: 6,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      thumbnail:
        'https://i.pinimg.com/736x/92/9a/70/929a70c61900974a4724f4fb8e04ff9d.jpg',
    },
    {
      id: 7,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-MuB8NJ0ILMkuN1i5OUd11WNFdwewaM9Mw&usqp=CAU',
    },
    {
      id: 8,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      thumbnail:
        'https://thegioionline.net/wp-content/uploads/2023/04/hinh-anh-gai-xinh-cap-2-3-1200x1643-1.jpg',
    },
    {
      id: 9,
      title: 'Second Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail:
        'https://toyotahungvuong.edu.vn/nhung-hinh-anh-dep-ve-hot-girl/imager_5338.jpg',
    },
    {
      id: 10,
      title: 'End Item',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJ6-GDx2BZEukcar1X9eCqbSjD0EJaV4e4g&usqp=CAU',
    },
  ];

  return (
    <View style={[{flex: 1}, {backgroundColor: colors.background}]}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <VideoListItem {...item} />}
        keyExtractor={item => `key_${item.id}`}
        ListFooterComponent={<View style={{height: 30}} />}
      />
    </View>
  );
}

export default memo(VideoList);
