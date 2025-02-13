import React from "react"
import { View, Text, ScrollView, Image } from "react-native"
import Header from '@/components/header/header';
import Publication from "@/components/other/publication";
import Navbar from "@/components/header/navbar";
import { useState, useEffect } from "react";
import { firebase } from '../services/firebaseConfig'
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [user, setUser] = useState<any>(null);
    const navigation = useNavigation();
    const currentDate = new Date();
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (!user.emailVerified) {
                    navigation.navigate('email'); // Rediriger vers la page de vérification
                } else {
                    setUser(user); // Si l'email est vérifié, définir l'utilisateur
                }
            } else {
                navigation.navigate('email'); // Rediriger vers la page de signup si l'utilisateur n'est pas connecté
            }
        });
        return unsubscribe;
    }, [navigation]);
    
    console.log(user);
    
    return <>
        <View style={{ height: '100%', width: '100%' }}>
            <Navbar />

            <ScrollView>
                <Publication
                    contentText=" Minima reprehenderit incidunt cm aliquam, s magni nemo, quasi vel temporibus sint deleniti velit esse molestiae. Obcaecati, inventore."
                    date={currentDate.toString()}
                    imageSource={require('../../assets/images/ats.png')}
                    price={250}
                    userName="Judicaël Randriampanalindahy"
                />
                <Publication
                    contentText="lorem upsum"
                    date={currentDate.getDate().toString()}
                    imageSource={require('../../assets/images/logo.jpeg')}
                    price={250}
                    userName="Judicaël Randriampanalindahy"
                />

                <Publication
                    contentText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit incidunt corrupti et repellat ipsum aliquam, nihil, doloribus magni nemo, quasi vel temporibus sint deleniti velit esse molestiae. Obcaecati, inventore."
                    date={currentDate.toString()}
                    imageSource={require('../../assets/images/atlas.png')}
                    price={250}
                    userName="Judicaël Randriampanalindahy"
                />
                <Publication
                    contentText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit incidunt corrupti et repellat ipsum aliquam, nihil, doloribus magni nemo, quasi vel temporibus sint deleniti velit esse molestiae. Obcaecati, inventore."
                    date={currentDate.toString()}
                    imageSource={require('../../assets/images/atlas.png')}
                    price={250}
                    userName="Judicaël Randriampanalindahy"
                />
                <Publication
                    contentText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit incidunt corrupti et repellat ipsum aliquam, nihil, doloribus magni nemo, quasi vel temporibus sint deleniti velit esse molestiae. Obcaecati, inventore."
                    date={currentDate.toString()}
                    imageSource={require('../../assets/images/images.jpg')}
                    price={250}
                    userName="Judicaël Randriampanalindahy"
                />


            </ScrollView>
            <View style={{ backgroundColor: 'white' }}>
                <Header />
                <Image />
            </View>
        </View>

    </>
}
export default Home;