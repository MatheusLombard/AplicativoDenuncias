import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@react-navigation/elements';
import {FontAwesome} from '@expo/vector-icons'

export function TelaCamera({ navigation }) {
  const camRef = useRef(null);
  const [hasPermition, setHasPermition] = useCameraPermissions();
  const [uriImage, setUriImage] = useState();

  if (!hasPermition) {
    return <View />
  }
  if (!hasPermition.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  async function tirarFoto() {
    if(camRef){
      const data = await camRef.current.takePictureAsync({ base64 : true});
      setUriImage(data.uri)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <CameraView style={styles.visorCamera} facing={'back'} flash={"on"} ref={camRef}>
          <TouchableOpacity onPress={tirarFoto} style={styles.buttonCamera}>
            <View style={styles.buttonCameraInside}/>
          </TouchableOpacity>
        </CameraView>
          {uriImage && <Image source={{ uri: uriImage }} style={{ width: '100%', height: 300, marginTop: 40, }} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  visorCamera: {
    height: 500,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonCamera:{
    height: 70,
    width: 70,
    borderRadius: '50%',
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCameraInside:{
    backgroundColor: 'white',
    height: 55,
    width: 55,
    borderRadius: '50%',
  }
})