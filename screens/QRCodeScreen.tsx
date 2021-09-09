import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {  StyleSheet,} from 'react-native';
import { Button, useTheme, Text, Snackbar } from "react-native-paper";
import { View, } from '../components/Themed';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import { useRef} from 'react';
import * as MediaLibrary from 'expo-media-library';

export default function QRCodeScreen({ navigation, route }: any) {
  const { item } = route.params;
  const theme = useTheme();
  const viewShotRef = useRef<any>()

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const save = async(uri:any) => {
    const {status} = await MediaLibrary.requestPermissionsAsync()
    if (status==="granted"){
      const assert = await MediaLibrary.createAssetAsync(uri)
      MediaLibrary.createAlbumAsync("AmIDying", assert)
    }else{
      console.log("Permissions fehlen")
    }
  }
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme?.colors.background,
    }}>
        <ViewShot ref={viewShotRef} options={{format: "jpg"}}>
            <View style={{
                backgroundColor: '#FFFFFF',
                padding: 4,
            }}>
                <QRCode
                    // TODO change value
                    value={item.id}
                    size={200}
                />
            </View>
        </ViewShot>
        <Button
            mode="contained"
            style={{
                marginTop: 10,
            }}
            onPress={() => viewShotRef.current.capture().then(
                (uri:string) => {
                    console.log("uri: ", uri)
                    save(uri)
                    onToggleSnackBar()
                    //alert(`Saved to files!`);
                } 
            )}>
            save to files
        </Button>
        <Snackbar
          theme={theme}
          visible={visible}
          onDismiss={onDismissSnackBar}>
          Saved to files
      </Snackbar>

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
