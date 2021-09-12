import * as React from 'react';
import { StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Title, Button, useTheme, Text, Banner } from "react-native-paper";
import { sendPlant } from '../components/DBController';
import { Plant, WateringEvent } from '../components/plant';
import { View, } from '../components/Themed';
import { usePlants } from '../components/usePlants';
import { useUsername } from '../components/username-context';

export default function ModalScreen({ navigation, route }: any) {
  const { item } = route.params;
  console.log(item)
  var im_dying_msg = "";
  var im_dying_time = "";

  //This calculates the message about when a plant is going to die
  const calc_time = () => {
    if(item.last_watered){
      var last_watered = new Date(item.last_watered.date);
    
      let currDate = new Date()
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

  // Function which is called when the user has watered a plant
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
  
  // Function to delete this Plant from the app
  const remove = () => {
    var plantList:Plant[] = [];
    Alert.alert(
      "Deleting Plant",
      "Are you shure you want to delet this plant from your device?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            for(var plant of plants) {
              if(plant.id != item.id){
                plantList.push(plant)
              }
            }
            setPlants(plantList)
            navigation.replace('Root');
          }
        },
        { text: "cancel", style: "cancel"}
      ] 
      );
    
    navigation.navigate('Root')
  }

  const theme = useTheme();
  
  const [bannerVisible, setBannerVisible] = React.useState(item.modified);
  // sync banner
  const sync = () => {
    setBannerVisible(false);
    const failed = () => {
      alert("We could not send your Plant to the server. \
      Please check your internet connection, or try again later")
      }
    sendPlant(item)
      .then((success:boolean) => {if(!success) failed(); })
      .catch(failed)
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
      backgroundColor: theme?.colors.background,
    }}>
      <Banner
        visible={bannerVisible}
        theme={theme}
        contentStyle={{
          width: Dimensions.get('window').width,
        }}
        style={{
        }}
        actions={[
          {
            label: 'Synchronize',
            onPress: () => sync()
          },
          {
            label: 'dismiss',
            onPress: () => setBannerVisible(false)
          }
        ]}
        icon={({size}) => (
          <Image 
            source={require('../assets/images/Refresh_icon.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        )}
        >
        This plant has unsynchronized changes
      </Banner>

      <Title
        style={{
          fontSize: 40,
          paddingTop: 20,
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
  text: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
  }
});
