import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, useTheme } from 'react-native-paper';

export default function TabTwoScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const theme = useTheme();
  return (
    <View style={{
      flex: 0,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: theme?.colors.background,
    }} >
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="flat"
            label="Your Name"
            style={{
              position: "relative",
              height: 50,
              marginTop: 30
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
      <Pressable onPress={handleSubmit(onSubmit)}>
        <Button 
          icon="arrow-collapse-down"
          mode="contained"
          style={{
            marginTop: 20
          }}>
            Save
        </Button>
      </Pressable>
      {/* <Button 
        title="Save" 
        onPress={handleSubmit(onSubmit)}
        
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingLeft: 20,
    paddingRight: 20,
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
