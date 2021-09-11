import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Title, Button, useTheme, Text } from "react-native-paper";
import { Plant, WateringEvent } from '../components/plant';
import { View, } from '../components/Themed';
import { usePlants } from '../components/usePlants';
import { useUsername } from '../components/username-context';

export default function ModalScreen({ navigation, route }: any) {
  const { item } = route.params;
  console.log(item)
  var im_dying_msg = "";
  var im_dying_time = "";
  const calc_time = () => {
    if(item.last_watered){
      var last_watered = new Date(item.last_watered.date);
    
      let currDate = new Date()
      // const diffTime = currDate. - last_watered;
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      //@ts-ignore
      let diff_millisec = currDate - last_watered
      let diff_days = Math.ceil(diff_millisec / (1000 * 60 * 60 * 24));
      let time_until_death = item.water_freq - diff_days
      console.log("time_until_death: ", time_until_death)
      if(time_until_death >= 0) {
        im_dying_msg = "Time until I slowly die: ";
        im_dying_time = time_until_death + " days";
      } else{
        im_dying_msg = "Time I have been slowly dying for: "; 
        im_dying_time =  (-1 * time_until_death) + " days";
      }
    } else {
      im_dying_msg = "I have never been watered";
      im_dying_time = "";
    }
  }
  calc_time()
  //@ts-ignore
  const {username, setUsername} = useUsername();
  //@ts-ignore
  const {plants, setPlants} = usePlants();
  const [re, setRe] = React.useState(null);
  const watered_today = () => {
    let event = new WateringEvent(Date.now(), username)
    var plantList = [];
    for(var plant of plants) {
      if(plant.id == item.id){
        plant.last_watered = event;
      }
      plantList.push(plant)
    }
    item.last_watered = event;
    setPlants(plantList);
    //@ts-ignore
    navigation.navigate('Root')
  }

  const remove = () => {
    var plantList = [];
    for(var plant of plants) {
      if(plant.id != item.id){
        plantList.push(plant)
      }
    }
    setPlants(plantList)
    navigation.navigate('Root')
  }

  const theme = useTheme();
  
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
      backgroundColor: theme?.colors.background,
    }}>
      <Title
        style={{
          fontSize: 40,
          paddingTop: 40,
        }}>
        {item.name}
      </Title>
      <Image source={require("../assets/images/placeholder_plant.png")}
            style={{ height: 300}} />
      <View style={{
        flexDirection: "row",
        backgroundColor: theme?.colors.background,
        justifyContent: "center",
      }}>
        <Text 
          theme={theme}
          style={{
            marginTop: 10,
            textAlignVertical: "center",
            paddingLeft: 20,
            fontSize: 20,
            flex: 3,
          }}>
          {im_dying_msg}
        </Text>
        <Text 
          theme={theme}
          style={{
            marginTop: 10,
            textAlignVertical: "center",
            textAlign: "center",
            fontSize: 20,
            paddingLeft: 20,  
            flex: 2,    
          }}>
          {im_dying_time}
        </Text>
      </View>
      <Button 
        theme={theme} 
        style={{
          marginTop: 15,
          width: 200
        }}
        mode="contained"
        onPress={() => watered_today()}>
        watered today!
      </Button>
      <Button
        style={{
          marginTop: 10,
          width: 200
        }}
        theme={theme}
        mode="contained"
        onPress={() => navigation.navigate("QRCode",{item: item,})}>
        Show QR-Code
      </Button>
      <Button
        style={{
          marginTop: 10,
          width: 200
        }}
        color='#FF0000'
        theme={theme}
        mode="contained"
        onPress={() => remove()}>
        Remove
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
