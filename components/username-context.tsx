import setItem from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect } from 'react';
import React from 'react';

export const UsernameContext = createContext(null);

export function UsernameController({ children }:any):any {
  const [username, setUsername] = React.useState('');

  useEffect(() => {
    AsyncStorage.getItem('AM_I_DYING::USERNAME').then((value) => {
      if (value) {
        setUsername(value);
      } else {
        setUsername('')
      }
    });
  }, []);

  useEffect(() => {
    if (username !== null) {
      AsyncStorage.setItem('AM_I_DYING::USERNAME', username);
    }
  }, [username]);

  return(
    //@ts-ignore
    <UsernameContext.Provider value={{username, setUsername}}>
      {children}
    </UsernameContext.Provider>    
  );
};