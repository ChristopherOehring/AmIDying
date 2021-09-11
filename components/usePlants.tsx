import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect } from 'react';
import React from 'react';
import { Plant, WateringEvent} from "./plant";

//Test Data, currently not in use
let d = new Date(2021, 7, 13)
var date = d.getTime()
const watering = new WateringEvent(date, "Chris")
const data:Plant[] = [
    new Plant(
      'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      'Pflanziska',
      3,
      watering, 
    ),
    new Plant(
      '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      'Ingrids Monstera',
      6,
      null, 
    ),
    new Plant(
      '58694a0f-3da1-471f-bd96-145571e29d72',
      'Der Baum',
      10,
      null, 
    ),
  ];

const emptyList:Plant[] = [];
const PlantContext = createContext(null);
export const usePlants = () => useContext(PlantContext);

export function PlantController({ children }:any):any {
  const [plants, setPlants_] = React.useState(emptyList);

  useEffect(() => {
    console.log("loading Plants...")
    AsyncStorage.getItem('AM_I_DYING::Plants').then((value) => {
      if (value) {
        // setPlants(data)
        setPlants(JSON.parse(value));
        console.log(value)
      } else {
        //load example data
        //setPlants(data);
      }
    });
  }, []);

  const setPlants = (plants:Plant[]) => {
    setPlants_(plants)
    if (plants && (plants !== emptyList)) {
      console.log("Saving plants:", plants.length)
      AsyncStorage.setItem('AM_I_DYING::Plants', JSON.stringify(plants));
    }
  }

  return(
    //@ts-ignore
    <PlantContext.Provider value={{plants, setPlants}}>
      {children}
    </PlantContext.Provider>    
  );
};