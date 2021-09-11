import React, { Component, } from "react";
import { StyleSheet, FlatList, View, StatusBar } from "react-native";
import { Title, Card, Paragraph, Button, useTheme, } from "react-native-paper";
import { usePlants } from "../components/usePlants";
import { Plant } from "../components/plant";
import { getPlant } from "../components/DBController";
import { tupleExpression } from "@babel/types";

function createCard(plant: Plant, navigation: any) {
    //const theme = useTheme();
    // let img_location:string = plant.img_location
    // console.log(img_location)
    // let img = require(img_location)
    let img = require('../assets/images/placeholder_plant.png')
    if (plant.last_watered) {
        var last_watered = "This plant was last watered on " +
            new Date(plant.last_watered.date).toDateString();
    } else {
        var last_watered = "This plant has never been watered";
    };
    return (
        <View style={styles.Card}>
            <Card onPress={() => navigation.navigate('Modal',{item: plant,})}>
                <Card.Cover source= {img} />
                <Card.Content>
                    <Title>{plant.name}</Title>
                    <Paragraph>{last_watered}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    )
}

function Library({ navigation}: any) {
    const theme = useTheme();
    //@ts-ignore
    const {plants, setPlants} = usePlants();
    const [refreshing, setRefreshing] = React.useState(false);
    const handleRefresh = () => {
        setRefreshing(true)
        getPlant("6a2c2de0-e0ee-485d-9cff-b41ebf61376a")
        setRefreshing(false)
    }

    return (
        <View style={{
            backgroundColor: theme?.colors.background,
            marginLeft: 0,
            marginRight: 0,
            marginTop: StatusBar.currentHeight || 0
        }}>
            <FlatList
                data={plants}
                renderItem={({ item }) => createCard(item, navigation)}
                keyExtractor={item => item.id}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </View>

    )
}

export default Library

const styles = StyleSheet.create({
    container: {
        flex: 0,
        //backgroundColor: theme?.colors.background,
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