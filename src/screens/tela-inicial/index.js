import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function TelaInicial({navigation}) {

  const [usuario, setUsuario] = useState('Otávio');
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olá {usuario}...</Text>
      </View>

      <View style={styles.navigation}>
        <Text style={styles.navigationTitle}>Área de Navegação:</Text>

        <TouchableOpacity style={styles.navigationBox} onPress={() => navigation.navigate('Camera')}>
          <View style={{width: '70%'}}>
            <Text style={styles.navigationBoxTitle}>Denunciar Riscos/Perigos</Text>
            <Text style={styles.navigationBoxSubtitle}>Denúncie os perigos aqui</Text>
          </View>
          <Image 
          style={{width:  70, height: 70}}
          source={require('../../../assets/favicon.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationBox}>
          <View style={{width: '70%'}}>
            <Text style={styles.navigationBoxTitle}>Minhas Solicitações</Text>
            <Text style={styles.navigationBoxSubtitle}>Acompanhe suas denúncias</Text>
          </View>
          <Image 
          style={{width:  70, height: 70}}
          source={require('../../../assets/favicon.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationBox}>
          <View style={{width: '70%'}}>
            <Text style={styles.navigationBoxTitle}>Qual EPI utilizar?</Text>
            <Text style={styles.navigationBoxSubtitle}>Aprimore seus conhecimentos e se proteja</Text>
          </View>
          <Image 
          style={{width:  70, height: 70}}
          source={require('../../../assets/favicon.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationBox}>
          <View style={{width: '70%'}}>
            <Text style={styles.navigationBoxTitle}>Perfil</Text>
            <Text style={styles.navigationBoxSubtitle}>Veja suas informações pessoais</Text>
          </View>
          <Image 
          style={{width:  70, height: 70}}
          source={require('../../../assets/favicon.png')}/>
        </TouchableOpacity>

      </View>

      <View>
        <Image 
        style={{width:  90, height: 90}}
        source={require('../../../assets/favicon.png')}/>
      </View>

    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
    paddingBottom: 0,
  },
  header:{
    width: '100%',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    height: 100,
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Cor da sombra
    textShadowOffset: { width: 50, height: 37 }, // Posição da sombra
    textShadowRadius: 18, // Desfoque da sombra
  },
  navigation:{
    width: '100%',
    gap: 15,
  },
  navigationTitle: {
    marginLeft: 10,
    fontSize: 22,
    marginBottom: 20,
  },
  navigationBox:{
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
  navigationBoxSubtitle:{
    marginLeft: 20,
    letterSpacing: 1
  }

});
