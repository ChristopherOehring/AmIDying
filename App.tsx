import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { PreferencesContext } from './hooks/PreferencesContext';

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
} from 'react-native-paper';

import merge from 'deepmerge'

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
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation theme={theme} />
          </SafeAreaProvider>
        </PaperProvider>
      </PreferencesContext.Provider>
    );
  }
}

const Darktheme = {
  ...PaperDarkTheme,
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