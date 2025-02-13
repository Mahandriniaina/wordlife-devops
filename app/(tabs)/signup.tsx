import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Image } from "react-native";
import { firebase } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';

// Définition des types pour la navigation
type RootStackParamList = {
  home: undefined;
  email: undefined;
};

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [pays, setPays] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Nouvel état pour confirmer le mot de passe
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [gender, setGender] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        navigation.navigate('home');
      }
    });
    return unsubscribe;
  }, [navigation]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access images is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfilePhoto(uri);
    }
  };

  const uploadImageToFirebase = async (uri: string, userId: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = firebase.storage().ref().child(`profilePhotos/${userId}`);
    await storageRef.put(blob);

    const downloadURL = await storageRef.getDownloadURL();
    return downloadURL;
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!email || !password || !firstName || !lastName || !address || !gender || !pays) {
      setError("All fields are required!");
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        await user.sendEmailVerification();

        let profilePhotoURL = '';
        if (profilePhoto) {
          profilePhotoURL = await uploadImageToFirebase(profilePhoto, user.uid);
        }

        await firebase.firestore().collection('users').doc(user.uid).set({
          firstName,
          lastName,
          address,
          profilePhoto: profilePhotoURL,
          email: user.email,
          gender,
          pays,
        });

        Alert.alert(
          "Email Verification",
          "A verification email has been sent to your email address. Please check your inbox."
        );
        navigation.navigate('email');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigation.navigate('index')}}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.centerHeader}>
          <Text style={styles.personName}>Sign Up</Text>
        </View>
        <Icon name="ellipsis-v" size={20} color="white" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Adresse"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <TextInput
            placeholder="Pays"
            value={pays}
            onChangeText={setPays}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />

          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Sélectionner le genre" value="" />
            <Picker.Item label="Masculin" value="male" />
            <Picker.Item label="Féminin" value="female" />
          </Picker>

          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Choisir une photo de profil</Text>
          </TouchableOpacity>

          {profilePhoto && (
            <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  centerHeader: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#6200ea',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default SignUp;
