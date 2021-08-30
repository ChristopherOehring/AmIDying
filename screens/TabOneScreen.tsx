import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Library from './Library';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button } from 'react-native-paper';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const navi = navigation
  return (
    <View style={styles.container} >
      <Library navigation={navi} path={'./Library'}/>
      <Button onPress={() => navigation.navigate('NewPlantButton')} >
        New Plant
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
