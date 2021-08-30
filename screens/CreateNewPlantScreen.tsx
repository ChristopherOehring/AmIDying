import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, TextInput, Button } from 'react-native';
import { Title, Card, Paragraph,  } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';

type Inputs = {
  example: string,
  exampleRequired: string,
};

export default function CreateNewPlantScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
  // const onSubmit = (data: any) => alert(`data ${data}`);

  return (
    <View style={styles.container}>
        {/* ADD FORM HERE */}
      <Controller
          control={control}
          rules={{
          required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{backgroundColor: '#C0C0C0'}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}/>
          )}
          name="firstName"
          defaultValue=""/>

      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{backgroundColor: '#C0C0C0'}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}/>
        )}
        name="lastName"
        defaultValue=""/>

      <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
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
