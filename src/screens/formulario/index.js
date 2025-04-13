import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function Formulario({ navigation, route }) {
  const [titulo, setTitulo] = useState();
  const [local, setLocal] = useState();
  const [descricao, setDescricao] = useState();
  const { imagem } = route.params

  async function enviar() {
    const idUsuario = await AsyncStorage.getItem('IdUsuario')
    try {
      const response = await fetch('http://localhost:3000/denuncias', {
        method: 'POST',
        body: JSON.stringify({
          idUsuario: idUsuario,
          titulo: titulo,
          local: local,
          descricao: descricao,
          imagem: imagem,
          pendente: true
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      const json = await response.json();
      console.log('Enviado para o banco de dados com sucesso: ', json);
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error);
    }
  }

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={{ alignSelf: 'flex-start', margin: 10 }} onPress={() => navigation.goBack('')}>
          <Text style={{ fontWeight: '800' }}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.tituloView}>
          <Text style={styles.tituloText}>DESCREVA SUA DENÚNCIA</Text>
        </View>

        <View style={styles.inputBox}>
          <View style={styles.groupInput}>
            <Text style={styles.inputBoxLabel}>Titulo da Denúncia:</Text>
            <TextInput
              style={styles.inputBoxTextInput}
              placeholder='Digite aqui...'
              value={titulo}
              onChangeText={(text) => setTitulo(text)}
            />
          </View>
          <View style={styles.groupInput}>
            <Text style={styles.inputBoxLabel}>Local do Perigo:</Text>
            <TextInput
              style={styles.inputBoxTextInput}
              placeholder='Digite aqui...'
              value={local}
              onChangeText={(text) => setLocal(text)}
            />
          </View>
          <View style={{ ...styles.groupInput, flex: 1 }}>
            <Text style={styles.inputBoxLabel}>Descrição do Perigo:</Text>
            <TextInput
              style={{ ...styles.inputBoxTextInput, flex: 1 }}
              placeholder='Digite aqui...'
              value={descricao}
              onChangeText={(text) => setDescricao(text)}
            />
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={() => enviar()}>
            <Text style={styles.buttonText}>ENVIAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E8EEF1',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },

  tituloText: {
    fontSize: 28,
    textAlign: 'center'
  },
  inputBox: {
    height: '60%',
    minHeight: 500,
    width: '80%',
    backgroundColor: '#F1F6FC',
    borderRadius: 25,
    padding: 30,
    gap: 20,
  },
  groupInput: {
    height: 90,
    gap: 10,
  },
  inputBoxLabel: {
    fontSize: 20,
    fontWeight: '700'
  },
  inputBoxTextInput: {
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
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