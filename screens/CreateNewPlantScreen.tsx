import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Button } from 'react-native';
import { Title, Card, Paragraph, TextInput  } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';


export default function CreateNewPlantScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
  // const onSubmit = (data: any) => alert(`data ${data}`);

  return (
    <View style={styles.container}>
      <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Name"
              style={{
                position: "relative",
                height: 50,
                width: 200,
                marginTop: 100,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              left={<TextInput.Icon name="fountain-pen-tip" />}
              />
          )}
          name="name"
          defaultValue=""/>

      {errors.name && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Next watering"
            style={{
              position: "relative",
              height: 50,
              width: 200,
              marginTop: 10,
              marginBottom: 10,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            left={<TextInput.Icon name="water" />}/>
        )}
        name="watered"/>

      {errors.watered && <Text>This has to be a number!</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
