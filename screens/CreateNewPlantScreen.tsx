import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, } from 'react-native';
import { Title, Card, Paragraph, TextInput, useTheme, Button  } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';


export default function CreateNewPlantScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const theme = useTheme();
  // const onSubmit = (data: any) => alert(`data ${data}`);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme?.colors.background,
    }}>
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
            label="Watering interval"
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

      <Button mode="contained" theme={theme} onPress={handleSubmit(onSubmit)}>Submit</Button>
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
