import { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function Login({ navigation }) {
    const [cpf, setCpf] = useState();
    const [senha, setSenha] = useState();

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
                        <Text style={styles.label}>CPF:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Digite aqui...'
                            onChangeText={(text) => setCpf(text)}
                            value={cpf}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.label}>Senha:</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Digite aqui...'
                            onChangeText={(text) => setSenha(text)}
                            value={senha}
                        />
                    </View>

                </View>

                <TouchableOpacity 
                style={styles.buttonEntrar} 
                onPress={() => navigation.navigate('TelaInicial')}
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
