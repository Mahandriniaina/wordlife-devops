import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { firebase } from '../services/firebaseConfig';
import { useNavigation } from "@react-navigation/native";

interface User {
  emailVerified: boolean;
  sendEmailVerification: () => Promise<void>;
  reload: () => Promise<void>;
}

const EmailVerification = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserAuthState = async () => {
      try {
        const currentUser = firebase.auth().currentUser as User | null;
        if (!currentUser) {
          throw new Error("Utilisateur non connecté");
        }
        await currentUser.reload();
        setUser(currentUser);
        setIsVerified(currentUser.emailVerified);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    checkUserAuthState();

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user: User | null) => {
      if (user) {
        await user.reload();
        setUser(user);
        setIsVerified(user.emailVerified);
      } else {
        setUser(null);
        setIsVerified(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isVerified && !isLoading) {
      const interval = setInterval(async () => {
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            setIsVerified(true);
          }
        }
      }, 3000); // Vérifier toutes les 3 secondes

      return () => clearInterval(interval);
    }
  }, [user, isVerified, isLoading]);

  useEffect(() => {
    if (isVerified && !isLoading) {
      navigation.navigate('home'); // Navigation simple
    }
  }, [isVerified, isLoading, navigation]);

  const sendVerificationEmail = async () => {
    if (user) {
      try {
        await user.sendEmailVerification();
        alert("Email de vérification envoyé !");
      } catch (error: any) {
        setError("Erreur lors de l'envoi de l'email : " + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ea" style={{ marginTop: 20 }} />
      ) : (
        <>
          {error ? (
            <Text style={[styles.text, { color: 'red' }]}>Erreur : {error}</Text>
          ) : null}

          {!isVerified ? (
            <>
              <Text style={styles.text}>Veuillez vérifier votre adresse email pour continuer.</Text>
              <Button title="Renvoyer l'email de vérification" onPress={sendVerificationEmail} />
              <Text style={styles.text}>Nous vérifions si votre email est confirmé...</Text>
            </>
          ) : (
            <Button title="Commencer" onPress={() => navigation.navigate('home')} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default EmailVerification;
