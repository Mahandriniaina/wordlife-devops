import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([
        { id: 1, name: "Judicaël Randriampanalindahy", followers: 125, image: require('../../assets/images/logo.jpeg') },
        { id: 2, name: "Marc-André Dumont", followers: 230, image: require('../../assets/images/logo.jpeg') },
        { id: 3, name: "Alex Johnson", followers: 89, image: require('../../assets/images/logo.jpeg') },
        // Ajoutez plus de résultats ici
    ]);

    const handleSearch = (text) => {
        setQuery(text);
        // Logique pour filtrer les résultats en fonction de la requête
        // Pour l'exemple, on montre simplement tous les résultats
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 20 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 10,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: '#ddd'
            }}>
                <Icon name="search" size={20} color="#6200ea" />
                <TextInput
                    placeholder="Search..."
                    value={query}
                    onChangeText={handleSearch}
                    style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
                />
            </View>

            <FlatList
                data={results}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        backgroundColor: '#fff',
                        marginBottom: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#ddd'
                    }}>
                        <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}
                            </Text>
                            <Text style={{ color: 'gray', fontSize: 14 }}>{item.followers} followers</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Search;
