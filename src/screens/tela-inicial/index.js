import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function TelaInicial({ navigation }) {

  const [usuario, setUsuario] = useState('Otávio');

  useEffect(() => {
    async function pegarUsuario() {
      const id = await AsyncStorage.getItem('IdUsuario')
      console.log('O id recuperado na tela inicial: ', id)
      try {
        const response = await fetch('http://localhost:3000/listarUsuario', {
          method: 'POST',
          body: JSON.stringify({
            id: id
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });

        const json = await response.json();
        console.log('Pegando usuario: ', json);
        const dadosString = JSON.stringify(json.result[0])
        await AsyncStorage.setItem('Usuario', dadosString)
        setUsuario(json.result[0].nome)
      } catch (error) {
        console.error('Erro ao enviar denúncia:', error);
      }
    }
    pegarUsuario()
  }, [usuario])


  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Olá {usuario}...</Text>
        </View>

        <View style={styles.navigation}>
          <Text style={styles.navigationTitle}>Área de Navegação:</Text>

          <TouchableOpacity style={styles.navigationBox} onPress={() => navigation.navigate('Camera')}>
            <View style={{ width: '70%' }}>
              <Text style={styles.navigationBoxTitle}>Denunciar Riscos/Perigos</Text>
              <Text style={styles.navigationBoxSubtitle}>Denúncie os perigos aqui</Text>
            </View>
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../../../assets/favicon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBox} onPress={() => navigation.navigate('Andamento')}>
            <View style={{ width: '70%' }}>
              <Text style={styles.navigationBoxTitle}>Minhas Solicitações</Text>
              <Text style={styles.navigationBoxSubtitle}>Acompanhe suas denúncias</Text>
            </View>
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../../../assets/favicon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBox}>
            <View style={{ width: '70%' }}>
              <Text style={styles.navigationBoxTitle}>Qual EPI utilizar?</Text>
              <Text style={styles.navigationBoxSubtitle}>Aprimore seus conhecimentos e se proteja</Text>
            </View>
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../../../assets/favicon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationBox}>
            <View style={{ width: '70%' }}>
              <Text style={styles.navigationBoxTitle}>Perfil</Text>
              <Text style={styles.navigationBoxSubtitle}>Veja suas informações pessoais</Text>
            </View>
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../../../assets/favicon.png')} />
          </TouchableOpacity>

        </View>

        <View>
          <Image
            style={{ width: 90, height: 90 }}
            source={require('../../../assets/favicon.png')} />
        </View>

      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
    gap: 30,
  },
  header: {
    width: '100%',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    width: '100%',
  },
  navigation: {
    width: '100%',
    gap: 15,
  },
  navigationTitle: {
    marginLeft: 10,
    fontSize: 22,
    marginBottom: 20,
  },
  navigationBox: {
    backgroundColor: '#BDBDBD',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navigationBoxTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  navigationBoxSubtitle: {
    marginLeft: 20,
    letterSpacing: 1
  }

});
