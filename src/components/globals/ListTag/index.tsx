import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import TextGlobal from '../TextGlobal';
import PressableGlobal from '../PressableGlobal';

const DATA = [
  {
    id: 1,
    name: 'ssdsds',
  },
  {
    id: 2,
    name: 'ssdsds',
  },
  {
    id: 3,
    name: 'ssdsds',
  },
  {
    id: 4,
    name: 'ssdsds',
  },
  {
    id: 5,
    name: 'ssdsds',
  },
  {
    id: 6,
    name: 'ssdsds',
  },
  {
    id: 7,
    name: 'ssdsds',
  },
  {
    id: 8,
    name: 'ssdsds',
  },
];

interface ListTagProps {}

function ListTag(props: ListTagProps) {
  return (
    <View style={styles.listTag}>
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <PressableGlobal style={styles.tagItem}>
            <TextGlobal>{item.name}</TextGlobal>
          </PressableGlobal>
        )}
        keyExtractor={item => `key_${item.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listTag: {
    marginVertical: 5,
  },
  tagItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export {styles};

export default ListTag;
