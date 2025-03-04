import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@react-navigation/elements';
import { FontAwesome } from '@expo/vector-icons'

export function TelaCamera({ navigation }) {
  const camRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [qtdZoom, setQtdZoom] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [uriImage, setUriImage] = useState();

  if (!permission) {
    return <View />
  }
  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View style={styles.containerMessage}>
  //       <Text style={styles.message}>Precisamos da sua permissão para acessar sua câmera</Text>
  //       <TouchableOpacity style={styles.button} onPress={requestPermission}>
  //         <Text style={styles.buttonText}>
  //           CONCEDER PERMISSÃO
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  async function tirarFoto() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync({ base64: true, flash: 'on' });
      setUriImage(data.uri)
    }
  }

  function trocarCamera() {
    console.log('passando aqui')
    if (facing === 'back') {
      setFacing('front')
    } else {
      setFacing('back')
    }
  }

  function zoom(tipo) {
    if (tipo === 'aumentar' && qtdZoom < 0.9) {
      setQtdZoom(qtdZoom + 0.10)
    } else if (tipo === 'diminuir' && qtdZoom > 0.1) {
      setQtdZoom(qtdZoom - 0.10)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {!permission.granted &&
          <View style={styles.containerMessage}>
            <Text style={styles.message}>Precisamos da sua permissão para acessar sua câmera</Text>
            <TouchableOpacity style={styles.button} onPress={requestPermission}>
              <Text style={styles.buttonText}>
                CONCEDER PERMISSÃO
              </Text>
            </TouchableOpacity>
          </View>
        }{permission.granted &&
          <CameraView style={styles.visorCamera} facing={facing} ref={camRef} zoom={qtdZoom}>
            <View style={styles.actionsCamera}>
              <TouchableOpacity onPress={trocarCamera} style={styles.buttonRefresh}>
                <FontAwesome name='refresh' color={'#fff'} size={25} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, }}>
                <TouchableOpacity onPress={() => zoom('diminuir')} style={styles.buttonZoom}>
                  <FontAwesome name='search-minus' color={'#fff'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={tirarFoto} style={styles.buttonTirarFoto}>
                  <View style={styles.buttonTirarFotoDentro} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => zoom('aumentar')} style={styles.buttonZoom}>
                  <FontAwesome name='search-plus' color={'#fff'} size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </CameraView>

        }
        {uriImage &&
          <View style={styles.containerCardImage}>
            <View style={styles.cardImage}>
              <Image source={{ uri: uriImage }} style={styles.image} />
              <TouchableOpacity onPress={() => navigation.navigate('Formulario')} style={styles.button}>
                <Text style={styles.buttonText}>Prosseguir com a Imagem</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  containerMessage: {
    padding: 40,
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BDBDBD'

  },
  message: {
    fontSize: 20,
    textAlign: 'justify'
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E8EEF1',
    justifyContent: 'center',
  },
  visorCamera: {
    height: '50%',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20
  },
  actionsCamera: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
  },
  buttonRefresh: {
    position: 'absolute',
    left: 0,
  },
  buttonTirarFoto: {
    height: 70,
    width: 70,
    borderRadius: '50%',
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTirarFotoDentro: {
    backgroundColor: 'white',
    height: 55,
    width: 55,
    borderRadius: '50%',
  },
  containerCardImage: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    height: '80%',
    width: '80%',
    backgroundColor: '#BDBDBD',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '70%',
    marginBottom: 15,
    borderRadius: 25
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }

})