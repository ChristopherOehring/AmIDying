import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, useTheme, TouchableRipple, Switch, Surface  } from 'react-native-paper';
import { useUsername } from '../components/username-context';
import { PreferencesContext } from '../hooks/PreferencesContext';

export default function TabTwoScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  //@ts-ignore
  const {username, setUsername} = useUsername();
  const onSubmit = (data: any) => {
    setUsername(data.name);
  };
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <View style={{
      flex: 0,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: theme?.colors.background,
    }} >
      <View style={{
        flexDirection: "row",
        backgroundColor: theme?.colors.surface,
        alignContent: "flex-end",
        justifyContent: "center",
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
      }}>
        <Text style={{
          color: theme?.colors.text,
          marginRight: 25,
          height: 28,
          textAlignVertical: "center",
          zIndex: -1,
        }}>Darkmode</Text>
        <Switch
          style={[{ 
            //position: "absolute",
            backgroundColor: theme.colors.surface,
            right: 0,
            zIndex: 1,
          }]}
          color={'red'}
          value={isThemeDark}
          onValueChange={toggleTheme}
        />
      </View>
      
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="flat"
            label={username}
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
