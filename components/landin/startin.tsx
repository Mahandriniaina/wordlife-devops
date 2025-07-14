import React, { useState } from "react";
import { Image, Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../../app/services/firebaseConfig'
import { Alert } from 'react-native';


const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  const [error, setError] = useState<string>('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
  
        if (user) {
          // Vérifier si l'utilisateur a vérifié son email seulement si 'user' n'est pas null
          if (user.emailVerified) {
            Alert.alert("Bienvenue", "Vous êtes connecté !");
          } else {
            Alert.alert(
              "Vérification requise",
              "Votre email n'a pas encore été vérifié. Veuillez vérifier votre boîte de réception."
            );
            // Optionnel : Déconnecter l'utilisateur si l'email n'est pas vérifié
            firebase.auth().signOut();
          }
        }
      })
      .catch(error => {
        console.error("Erreur lors de la connexion:", error);
        setError(error.message);
      });
  };
  
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.jpeg')} style={styles.logo} />
      </View>

      {/* Titre */}
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Veuillez vous connecter pour continuer </Text>

      {/* Formulaire d'email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {/* Formulaire de mot de passe */}
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Text style={{color:'blue',marginBottom:10}} >
          Mot de passe Oublié ?
      </Text>
      {/* Bouton Se connecter */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>
        {  error ? <Text style={{color:'red'}}>Mot de passe ou Email Incorect</Text> : ""}
      {/* Ou se connecter avec */}
      <Text style={styles.orText}>ou se connecter avec</Text>

      {/* Bouton Facebook */}
      <TouchableOpacity style={styles.facebookButton}>
        <Icon name="facebook" size={20} color="white" />
        <Text style={styles.facebookButtonText}>Continuer avec Facebook</Text>
      </TouchableOpacity>

      {/* Lien pour créer un compte */}
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signupText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#6200ea',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  facebookButton: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  facebookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  signupText: {
    color: '#6200ea',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SignIn;