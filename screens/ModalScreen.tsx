import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Title, Card, Paragraph, Button, useTheme, } from "react-native-paper";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';

export default function ModalScreen({ navigation, route }: any) {
  const { item } = route.params;
  const theme = useTheme();
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme?.colors.background,
    }}>
      <Text style={styles.title}>Details</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Text>
        Hier bist du auf der Detail-Ansicht von {item.name}!!
      </Text>
      <Button onPress={() => navigation.replace('Root')}>
        Back
      </Button>
      {/* <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
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
