import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Library from './Library';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button, FAB, Portal, Provider, useTheme } from 'react-native-paper';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [state, setState] = React.useState({ open: false });
  const theme = useTheme();
  const onStateChange = ({ open }:any) => setState({ open });

  const { open } = state;
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme?.colors.background,
    }} >
      <Library navigation={navigation} path={'./Library'}/>
      <Provider>
        <Portal theme={theme}>
          <FAB.Group
            open={open}
            icon={open ? "close" : "plus"}
            visible={true}
            theme={theme}
            // color={"green"}
            // style={{
            //   backgroundColor: "green"
            // }}
            actions={[
              { 
                icon: "plus", 
                onPress: () => navigation.navigate('CreateNewPlant'),
                style: {
                  backgroundColor: theme?.colors.text
                }
              },
              {
                icon: 'qrcode-scan',
                onPress: () => navigation.navigate('BarCodeRef'),
                style: {
                  backgroundColor: theme?.colors.text
                }
              }
            ]}
            onStateChange={onStateChange}
            // onPress={() => {
            //   if (open) {
            //     // do something if the speed dial is open
            //   }
            // }}
          />
        </Portal>
      </Provider>
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
