import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Platform, Alert} from 'react-native';
//import { Title, Card, Paragraph, Button, } from "react-native-paper";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import uuid from 'react-native-uuid'

import { Text, View, } from '../components/Themed';
import { useTheme, Button } from 'react-native-paper';
import { getPlant } from '../components/DBController';
import { usePlants } from '../components/usePlants';
import { Plant } from '../components/plant';

export default function BarCodeRefScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  //@ts-ignore
  const {plants, setPlants} = usePlants();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }:any) => {
    setScanned(true);
    console.log("Scanned code:", data)
    if(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
      .test(data))
    {
      console.log("found qr-code with id:", data)
      setLoading(true)
      var newPlant = await getPlant(data);
      console.log("found Plant: ", newPlant)
      setLoading(false)
      let already_in_library = false;
      for(const plant of plants){
        if(plant.id == data) already_in_library = true;
      }
      if(already_in_library) {
        alert("You already have this plant in your library!")
      }
      else if(newPlant){
        var plantList:Plant[] = plants;
        Alert.alert(
          "Plant found!",
          "Name: " + newPlant.name,
          [
            {
              text: "Add",
              onPress: () => {
                if(newPlant == null) throw "Plant is null. This should not be possible."
                plantList.push(newPlant);
                setPlants(plantList);
                navigation.replace('Root');
              }
            },
            { text: "discard", style: "cancel"}
          ] 
          );
      } else {
        console.log("could not find plant")
        alert('could not find this plant in the database')
        setScanned(false)
      }
    } else {
      setScanned(false)
      console.log(data, 'is not a uuid')
    }
    setScanned(false)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme?.colors.background,
    }}>
      <Text>Scan this QR</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && 
        <Button 
          mode="contained" 
          theme={theme} 
          onPress={() => {
            setScanned(false); 
            navigation.replace("Root")}
          }
        >
          Add Plant
        </Button>} */}
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
