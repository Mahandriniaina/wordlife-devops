import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '../services/firebaseConfig'
const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('User signed out!');
      })
      .catch(error => console.log(error.message));
  };
const settingsOptions = [
    { id: 1, title: "Profile", icon: "user" },
    { id: 2, title: "Notifications", icon: "bell" },
    { id: 3, title: "Privacy", icon: "shield-alt" },
    { id: 4, title: "Language", icon: "globe" },
    { id: 5, title: "About", icon: "info-circle" },
    { id: 6, title: "logout", icon: "siconnect" ,callback: handleSignOut },
    // Ajoutez plus d'options ici si nécessaire
];

const SettingsOption = ({ title, icon ,callback}) => (
    <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff'
    }}  
    onPress={callback}
    >
        <Icon name={icon} size={20} color="#6200ea" />
        <Text style={{ fontSize: 16, marginLeft: 15 }}>{title}</Text>
    </TouchableOpacity>
);

const SettingsScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <View style={{
                padding: 15,
                backgroundColor: '#6200ea',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    Setting
                </Text>
                <Icon name="cog" size={20} color="white" />
            </View>

            <FlatList
                data={settingsOptions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <SettingsOption title={item.title} icon={item.icon} callback={item.callback}/>}
            />
        </View>
    );
};

export default SettingsScreen;
