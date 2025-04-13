import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Card({ item, type, seeMore }) {
    return (
        <View style={[seeMore == 'yes' ? styles.cardContainerSeeMore : styles.cardContainer, type == 'em andamento'? styles.cardContainerAndamento: styles.cardContainerConcluidas]}>
            <View style={{...styles.cardView, width: seeMore == 'yes' ? '100%' : 'auto'}}>
                <Text style={{fontWeight: '900', textAlign: 'center', fontSize: seeMore == 'yes' ? 20 : 15}}>{item.titulo}</Text>
                <Text style={{color: '#fff', width: seeMore == 'yes' ? '80%' : 'auto', alignSelf: seeMore == 'yes' ? 'center' : 'flex-start'}} ><Text style={{fontWeight: '900', color: '#000'}}>Denunciado em:</Text> {item.local}</Text>
                <Text style={seeMore == 'yes' ? styles.cardContainerDescriptionSeeMore : styles.cardContainerDescription} ><Text style={{fontWeight: '900', color: '#000'}}>Descrição:</Text> {item.descricao}</Text>
            </View>
            <View>
                <Image source={{ uri: `${item.imagemBase64}` }}   style={seeMore == 'yes' ? styles.cardContainerImageSeeMore : styles.cardContainerImage}  resizeMode="cover"/>

            </View>
        </View>
    )
}

export function TelaAndamento({navigation}) {
    const [buttonActivated, setButtonActivated] = useState('em andamento')
    const [solicitacoes, setSolicitacoes] = useState([])
    const [seeMore, setSeeMore] = useState('yes')

    useEffect(() => {
        console.log('teste')
        async function informations(){
            const idUsuario = await AsyncStorage.getItem('IdUsuario')
            try {
                const response = await fetch(`http://localhost:3000/denuncias?id=${idUsuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
          
              const json = await response.json();
              console.log('Resgatado do banco de dados com sucesso: ', json);
              setSolicitacoes(json)
              
            } catch (error) {
              console.error('Erro ao enviar denúncia:', error);
            }
          }
          informations()
        
    },[])
    
      
    function changeButtonActivated(type){
        type === 'concluidas' ? setButtonActivated('concluidas') : setButtonActivated('em andamento')
    }

    function changeSeeMore(){
        seeMore == 'yes' ? setSeeMore('no') : setSeeMore('yes')
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{alignSelf: 'flex-start', margin: 10}} onPress={() => navigation.goBack('')}>
                    <Text style={{fontWeight: '800'}}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>
                    Minhas Solicitações
                </Text>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => changeButtonActivated('em andamento')} style={[buttonActivated == 'em andamento' && styles.navButtonActivated]}>
                        <Text> EM ANDAMENTO </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeButtonActivated('concluidas')} style={[buttonActivated == 'concluidas' && styles.navButtonActivated]}>
                        <Text> CONCLUÍDAS </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.verMais} onPress={changeSeeMore}>
                    <Text style={seeMore == 'yes' ? styles.verMenosText : styles.verMaisText}>{seeMore == 'no' ? 'VER MAIS' : 'VER MENOS'}</Text>
                </TouchableOpacity>
                {buttonActivated == 'em andamento' &&
                    <FlatList
                        data={solicitacoes.filter(item => item.pendente == 'Sim')}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        renderItem={({ item }) => <Card item={item} type={'em andamento'} seeMore={seeMore} />}
                        style={{ width: '80%'}}  
                    />

                }
                {buttonActivated == 'concluidas' &&
                    <FlatList
                        data={solicitacoes.filter(item => item.pendente == 'Não')}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        renderItem={({ item }) => <Card item={item} seeMore={seeMore}/>}
                        style={{ width: '80%'}} 
                    />

                }
            </SafeAreaView>
        </SafeAreaProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#E8EEF1',
        justifyContent: "center",
        alignItems: 'center',
        gap: 40,
    },
    titulo: {
        fontSize: 32,
        fontWeight: "700",
        margin: 40,
    },
    nav:{
        gap: 15,
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: -10,
    },
    navButtonActivated:{
        backgroundColor: "#F1F6FC",
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 25,
        padding: 15,
    },
    verMais:{
        width: '80%',
        alignItems: 'flex-end',
        marginBottom: -20,
    },
    verMaisText:{
        backgroundColor: 'red',
        borderRadius: 15,
        fontSize: 12,
        padding: 10,
        fontWeight: '700',
        color: '#000',
        borderWidth: 1,
        borderColor: '#000'
    },
    verMenosText:{
        backgroundColor: 'blue',
        borderRadius: 15,
        fontSize: 12,
        padding: 10,
        fontWeight: '700',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#000'
    },
    cardContainer:{
        borderWidth: 1,
        borderColor: '#000',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cardContainerSeeMore:{
        borderWidth: 1,
        borderColor: '#000',
        padding: 20,
        borderRadius: 15,
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    cardContainerDescription:{
        color: '#fff', 
        width: 180, 
        height: 35, 
        overflow: 'hidden',
    },
    cardContainerDescriptionSeeMore:{
        width: '80%', 
        height: 'auto', 
        overflow: 'none',
        alignSelf: 'center'
    },
    cardContainerImage:{ 
        width: 100, 
        height: 100, 
        borderColor: '#000', 
        borderWidth: 1 
    },
    cardContainerImageSeeMore:{ 
        width: 150, 
        height: 150, 
    },
    cardContainerAndamento: {
        backgroundColor: "#929292"
    },
    cardContainerConcluidas:{
        backgroundColor: "#95b49d",
    },
    cardView:{
        gap: 3
    }



})

// MUDAR TEXT(HEIGHT, OVERFLOW,)