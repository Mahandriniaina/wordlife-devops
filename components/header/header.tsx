import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "expo-router";

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#ddd', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 }}>
            {[
                { name: 'home', action: () => navigation.navigate('home') },
                { name: 'user', action: () => navigation.navigate('friends') },
                { name: 'plus', action: () => {navigation.navigate('create')} },
                { name: 'search', action: () => {navigation.navigate('search')} },
                { name: 'cog', action: () => {navigation.navigate('setting')} }
            ].map((icon, index) => (
                <TouchableOpacity key={index} onPress={icon.action} style={{ padding: 15, borderRadius: 50, backgroundColor: '#6200ea20' }}>
                    <Icon name={icon.name} size={18} color="#6200ea" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Header;
