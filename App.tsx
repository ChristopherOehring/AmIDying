import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UsernameController } from './components/username-context';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UsernameController>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          {/* <StatusBar /> */}
        </SafeAreaProvider>
      </UsernameController>
    );
  }
}

