import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const notifications = [
    { id: 1, type: 'like', message: "Judicaël a aimé votre publication.", time: "Il y a 2 heures", image: require('../../assets/images/logo.jpeg') },
    { id: 2, type: 'follow', message: "Marc-André vous suit maintenant.", time: "Il y a 5 heures", image: require('../../assets/images/logo.jpeg') },
    { id: 3, type: 'comment', message: "Alex a commenté votre photo.", time: "Il y a 1 jour", image: require('../../assets/images/logo.jpeg') },
    // Ajoutez plus de notifications ici
];

const NotificationItem = ({ item }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd'
        }}>
            <Image
                source={item.image}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
            />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: 'gray', fontSize: 12 }}>{item.time}</Text>
            </View>
            <Icon name="chevron-right" size={15} color="#6200ea" />
        </TouchableOpacity>
    );
};

const Notifications = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
            <View style={{
                padding: 15,
                backgroundColor: '#6200ea',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    Notifications
                </Text>
                <Icon name="bell" size={20} color="white" />
            </View>

            <FlatList
                data={notifications}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <NotificationItem item={item} />}
            />
        </View>
    );
};

export default Notifications;
