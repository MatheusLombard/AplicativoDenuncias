import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function Login({ navigation }) {
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [resposta, setResposta] = useState()


    async function verificarLogin(){
        try {
          const response = await fetch('http://localhost:3000/loginUsuarios', {
            method: 'POST',
            body: JSON.stringify({
                nome: nome,
                cpf: cpf
            }),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          });

          const json = await response.json();
          console.log('Conferindo no banco: ', json);
          if(json){
            if(json.message === 'Usuario correto'){
                Alert.alert('Sucesso', 'Usuário correto, pode prosseguir...')
                console.log('O id do usuario é: ', json.result[0].id)
                navigation.navigate('TelaInicial')
                AsyncStorage.setItem('IdUsuario', json.result[0].id)
            }else{
                Alert.alert('Erro', 'Usuário não encontrado')
            }
          }
        } catch (error) {
          console.error('Erro ao enviar denúncia:', error);
        }
      }
    return (
        <SafeAreaProvider>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView style={styles.containerSafeArea}>
                <View style={styles.header}>
                    <Image style={styles.img} source={require('../../../assets/favicon.png')}/>
                    <Text style={styles.title}>SEJA BEM-VINDO(A)</Text>
                </View>

                <View style={styles.groupInputs}>
                    <Text style={styles.subtitle}>preencha suas informações abaixo: </Text>

                    <View style={styles.viewInput}>
                        <Text style={styles.label}>Nome Completo:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Digite aqui...'
                            onChangeText={(text) => setNome(text)}
                            value={nome}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.label}>CPF:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Digite aqui...'
                            onChangeText={(text) => setCpf(text)}
                            value={cpf}
                        />
                    </View>

                </View>

                <TouchableOpacity 
                style={styles.buttonEntrar} 
                onPress={() => verificarLogin()}
                >
                    <Text style={styles.textButtonEntrar}>ENTRAR</Text>
                </TouchableOpacity>
        </SafeAreaView>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    containerSafeArea:{
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8EEF1',
        paddingVertical: 50,
        paddingHorizontal: 30,
        overflow: 'scroll'
    },
    header:{
        alignItems: 'center',
        gap: 40,
    },
    img:{
        width: 100,
        height: 100,
    },
    title:{
        fontSize: 30
    },
    groupInputs: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 40,
    },
    subtitle:{
        color: '#666',
        textTransform: 'uppercase',
        fontSize: 18,
        textAlign: 'center'
    },
    viewInput:{
        width: '90%',
        gap: 10,
    },
    label: {
        fontSize: 15,
        marginLeft: 5,
    },
    textInput:{
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        height: 40
    },
    buttonEntrar: {
        backgroundColor: '#007BFF',
        width: '70%',
        height: 50,
        justifyContent:  'center',
        borderRadius: 13,
        marginTop: 30,
    },
    textButtonEntrar: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        color: '#fff',
    }
})
