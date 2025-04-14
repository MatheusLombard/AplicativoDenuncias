// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/login';
import { TelaInicial } from './src/screens/tela-inicial';
import { TelaCamera } from './src/screens/camera';
import { Formulario } from './src/screens/formulario';
import { TelaAndamento } from './src/screens/andamento';
import { TelaInicialAdm } from './src/screens/adm';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown : false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TelaInicial" component={TelaInicial} />
      <Stack.Screen name="TelaInicialAdm" component={TelaInicialAdm} />
      <Stack.Screen name="Camera" component={TelaCamera} />
      <Stack.Screen name='Formulario' component={Formulario}/>
      <Stack.Screen name='Andamento' component={TelaAndamento}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}
