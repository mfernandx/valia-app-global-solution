import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';

type InicioNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Inicio'>;

export function InicioScreen() {

    const navigation = useNavigation<InicioNavigationProp>();

    return (

        <ImageBackground source={require('../../../assets/background-telainicial.png')} style={styles.background} resizeMode="cover">
        
            <View style={styles.conteudo}>

                <Image source={require('../../../assets/logo-valia.png')} style={styles.logo} resizeMode="contain"/>
                
                <View style={styles.slogan}>
                    <Text style={styles.textoSlogan}>Seu tempo tem valor.{"\n"}Seus direitos também.</Text>
                </View>

                <Image source={require('../../../assets/imagem-telainicial.png')} style={styles.imagem} resizeMode="contain"/>

                    <TouchableOpacity style={styles.buttonCadastro} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.buttonCadastroText}>Começar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonLoginText}>Já tenho uma conta</Text>
                    </TouchableOpacity>

            </View>

        </ImageBackground>
    
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    conteudo: {
        flex: 1,
        padding: 24,
    },
  
    logo: {
        width: 420,
        height: 170,
        alignSelf: "center",
        marginTop: 80,
    },

    slogan: {
        alignItems: 'center',
        marginTop: 5,
    },

    textoSlogan: {
        fontSize: 25,
        lineHeight: 37,
        fontWeight: '200',
        color: '#FFFFFF',
        textAlign: 'center',
    },

    imagem: {
        width: 420,
        height: 190,
        alignSelf: "center",
        marginTop: 120,
    },
  
    buttonCadastro: {
        backgroundColor: '#542039',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 14,
    },

    buttonCadastroText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonLogin: {
        borderWidth: 1,
        borderColor: '#542039',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
    },

    buttonLoginText: {
        color: '#542039',
        fontSize: 16,
        fontWeight: 'bold',
    },

});