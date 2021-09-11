import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect } from 'react';
import React from 'react';

const UsernameContext = createContext(null);
export const useUsername = () => React.useContext(UsernameContext);
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
      console.log("saving username:", username)
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