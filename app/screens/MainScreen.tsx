import React, { Component, } from "react";
import { StyleSheet, FlatList, View, StatusBar } from "react-native";
import { Title, Card, Paragraph, } from "react-native-paper";
import { format } from "date-fns";

let d = new Date(2021, 7, 13)
var date_str = format(d, "dd. MMM. yyyy")

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Pflanziska',
      last_watered: date_str, 
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Ingrids Monstera',
      last_watered: date_str, 
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Der Baum',
      last_watered: date_str, 
    },
  ];

export default class MainScreen extends Component {
    

    createCard = function (item: any) {
        let plant = item.item 
        console.log(plant)
        return (
            <View style={styles.Card}>
                <Card>
                    <Card.Title title={plant.name}/>
                    <Card.Cover source={{ uri: './app/assets/placeholder_plant.svg' }} />
                    <Card.Content>
                        {/* <Title>{plant.name}</Title> */}
                        <Paragraph>This plant was last watered on {plant.last_watered}</Paragraph>
                    </Card.Content>
                </Card>
            </View>
        )
    }
    
    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={DATA}
                    renderItem={this.createCard}
                    keyExtractor={item => item.id}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#676767',
        marginTop: StatusBar.currentHeight || 0,
    },
    Card: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    
  });