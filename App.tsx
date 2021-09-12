import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { PreferencesContext } from './hooks/PreferencesContext';
import { UsernameController, useUsername } from './components/username-context';
import { useForm, Controller } from "react-hook-form";


import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DefaultTheme,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Portal,
  Modal,
  Text,
  Button,
  useTheme,
  TextInput,
  Title,
} from 'react-native-paper';

import merge from 'deepmerge'
import { PlantController } from './components/usePlants';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? Darktheme : Lighttheme;

  const toggleTheme = React.useCallback(() => {
    if (isThemeDark){
      return setIsThemeDark(false);
    }
    else{
      return setIsThemeDark(true);
    }
    
    // return setIsThemeDark(isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PlantController>   
        <UsernameController>
          <PreferencesContext.Provider value={preferences}>
            {/* @ts-ignore */}
            <PaperProvider theme={theme}>
              <SafeAreaProvider>
                <ModalScreen/>
                <Navigation theme={theme} />
              </SafeAreaProvider>
            </PaperProvider>
          </PreferencesContext.Provider>
        </UsernameController>
      </PlantController>
    );
  }
}

const Darktheme = {
  ...PaperDarkTheme,
  mode: "exact",
  // roundness: 2,
  colors: {
  ...PaperDarkTheme.colors,
  primary: '#26b564',
  accent: '#26b564',
  background: "#121212",
  surface: "#1e1e1e"
  },
}
//theme?.colors.
const Lighttheme = {
  ...PaperDefaultTheme,
  // roundness: 2,
  colors: {
  ...PaperDefaultTheme.colors,
  primary: '#26b564',
  accent: '#26b564',
  background: "#f6f6f6",
  surface: "#ffffff",
  disabled: "#717171"
  },
}


function ModalScreen() {
  let theme = useTheme()

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: theme?.colors.surface, padding: 20};

  //TODO Chris
  let is_username_set = false;
  //@ts-ignore
  let {username, setUsername} = useUsername();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {setUsername(data.name), hideModal()};

  useEffect(() => {
    if(username == ''){
      showModal()
    }
  }, []);

  return(
    <Portal>
      <Modal visible={visible} contentContainerStyle={containerStyle}>
        <Title>
          Welcome to AmIDying!
        </Title>
        <Text>
          Set your username first:
        </Text>
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

        {errors.watered && <Text>This has to be a number!</Text>}

        <Button mode="contained" 
          style={{
            marginTop: 20,
          }}
          theme={theme} 
          onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button onPress={() => {setUsername("Anonymous User"), hideModal()}}>
          Stay Anonymous
        </Button>
      </Modal>
    </Portal>
  )
}