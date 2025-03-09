import { useState } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function Formulario() {

  const [titulo, setTitulo] = useState();
  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.tituloView}>
          <Text style={styles.tituloText}>DESCREVA SUA DENÚNCIA</Text>
        </View>

        <View style={styles.inputBox}>
          <View style={styles.groupInput}>
            <Text style={styles.inputBoxLabel}>Titulo da Denúncia: {titulo}</Text>
            <TextInput
              style={styles.inputBoxTextInput}
              placeholder='Digite aqui...'
              value={titulo}
              onChangeText={(text) => setTitulo(text)}
            />
          </View>
          <View style={styles.groupInput}>
            <Text style={styles.inputBoxLabel}>Local do Perigo: {titulo}</Text>
            <TextInput
              style={styles.inputBoxTextInput}
              placeholder='Digite aqui...'
              value={titulo}
              onChangeText={(text) => setTitulo(text)}
            />
          </View>
          <View style={{...styles.groupInput, flex: 1}}>
            <Text style={styles.inputBoxLabel}>Descrição do Perigo: {titulo}</Text>
            <TextInput
              style={{...styles.inputBoxTextInput, flex: 1}}
              placeholder='Digite aqui...'
              value={titulo}
              onChangeText={(text) => setTitulo(text)}
            />
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ENVIAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    height: '100%',
    width: '100%',
    backgroundColor: '#E8EEF1',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },

  tituloText:{
    fontSize: 28,
    textAlign: 'center'
  },
  inputBox:{
    height: '60%',
    width: '80%',
    backgroundColor: '#F1F6FC',
    borderRadius: 25,
    padding: 30,
    gap: 20,
  },
  groupInput:{
    height: 90,

    gap: 10,
  },
  inputBoxLabel:{
    fontSize: 20,
    fontWeight: '700'
  },
  inputBoxTextInput:{
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 35,
    paddingHorizontal: 10,
  },
  buttonView:{
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    width: '70%',
    paddingVertical: 15,
    borderRadius: 20,

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  }

})