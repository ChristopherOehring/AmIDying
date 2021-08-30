import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Title, Card, Paragraph, Button, } from "react-native-paper";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';

export default function NewPlantButtonScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Select</Text>
        <Button onPress={() => navigation.navigate('CreateNewPlant')}>
            Create new Plant
        </Button>
        <Button>
            Scan QR-Code
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
