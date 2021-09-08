import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Pressable, StyleSheet, Image } from 'react-native';
import { Title, Card, Paragraph, Button, useTheme, Text, Portal } from "react-native-paper";
import { format } from "date-fns";
import EditScreenInfo from '../components/EditScreenInfo';
import { View, } from '../components/Themed';

let d = new Date(2021, 7, 13)
var date_str = format(d, "dd. MMM. yyyy")

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Pflanziska',
    last_watered: date_str, 
    img_location: '../assets/images/placeholder_plant.png', 
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Ingrids Monstera',
    last_watered: date_str, 
    img_location: '../assets/images/placeholder_plant.png', 
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Der Baum',
    last_watered: date_str, 
    img_location: '../assets/images/placeholder_plant.png', 
  },
];

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
      <Image source={{uri: 'https://www.collinsdictionary.com/images/full/plant_108417266.jpg'}}
            style={{width: 200, height: 200}} />

      {/* CHANGE IMAGE BUTTON */}
      <Text theme={theme}>
        Time till I slowly die:
      </Text>
      <Text theme={theme}>
        15 days
      </Text>
      <Button 
        theme={theme} 
        mode="contained"
        onPress={() => console.log("Button Pressed!")}>
        watered today!
      </Button>
      <Button
        theme={theme}
        mode="contained"
        onPress={() => navigation.navigate("QRCode",{item: item,})}>
        Press to save QR-Code
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
