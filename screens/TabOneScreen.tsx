import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Library from './Library';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button, FAB, Portal, Provider } from 'react-native-paper';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }:any) => setState({ open });

  const { open } = state;
  return (
    <View style={styles.container} >
      <Library navigation={navigation} path={'./Library'}/>
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? "arrow-down" : "plus"}
            visible={true}
            theme={{ colors: { backdrop: 'transparent' } }}
            style={{
              
            }}
            actions={[
              { 
                icon: "plus", 
                onPress: () => navigation.navigate('CreateNewPlant'),
              },
              {
                icon: 'qrcode-scan',
                onPress: () => navigation.navigate('BarCodeRef'),
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
