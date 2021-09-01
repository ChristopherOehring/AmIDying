import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={CombinedDarkTheme}>
        <SafeAreaProvider>
          <Navigation theme={CombinedDarkTheme} />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}

const theme = {
  ...DefaultTheme,
  // roundness: 2,
  colors: {
  ...DefaultTheme.colors,
  primary: '#3498db',
  accent: '#f1c40f',
  },
}

