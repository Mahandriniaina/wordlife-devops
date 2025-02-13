import React from "react"
import { View, Text, TextInput, Image } from "react-native"
import styles from "@/app/styles/starting";
import Textinput from "@/components/form/textinput";
import ButtonIcon from "@/components/form/button";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const SignUp2 = () => {
    const navigation = useNavigation()
    return <>
        <View style={styles.screen}>
            <View style={styles.center}>
                <Image source={require('../../assets/images/logo.jpeg')} style={{ width: '100%', height:'auto' }} />
            </View>
            <View style={styles.content}>
                <Text style={[styles.texttitle, { marginTop: 20 }]}>
                    S'inscrire
                </Text>
                <Text style={styles.textcenter}>
                    Veuillez Créer une compte
                </Text>

                <View style={{ marginTop: 40, paddingBottom: 500 }}>
                    <Textinput title="Email ou Phone" />
                    <Textinput title="Mot de passe " />
                    <Textinput title="Confirmé le mot de passe" />
                    
                    <TouchableOpacity onPress={()=>navigation.navigate('home')}>
                        <ButtonIcon.SubmitButton title="Sign Up" background="#520d44" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('signup')} style={{marginTop:20}}>
                        <ButtonIcon.SubmitButton title="Annuler" background="rgb(184, 53, 53)" />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    </>
}
export default SignUp2