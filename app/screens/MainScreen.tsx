import React, { Component, } from "react";
import { StyleSheet, FlatList, View, StatusBar } from "react-native";
import Library from "../components/Library";

function MainScreen(props: any) {
    
    return Library(props)
}

export default MainScreen

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