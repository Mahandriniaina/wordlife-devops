import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const discussions = [
    { id: '1', name: 'Alice', lastMessage: 'How are you?', active: true, profilePic: '👩' },
    { id: '2', name: 'Bob', lastMessage: 'Let’s catch up!', active: false, profilePic: '👨' },
    { id: '3', name: 'Charlie', lastMessage: 'See you soon!', active: true, profilePic: '👨‍🦱' },
    // Add more users as needed
];

const DiscussionList = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const filteredDiscussions = discussions.filter(discussion =>
        discussion.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handlePress = (item) => {
        navigation.navigate('DiscussionDetail', { discussion: item });
    };

    return (
        <View style={styles.container}>
            {/* Notification Bar */}
            <View style={styles.notificationBar}>
                <Text style={styles.notificationText}>
                    Messages
                </Text>
                <Icon name="bell" size={20} color="white" />
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search"
                    style={styles.searchInput}
                />
                <Icon name="envelope" size={20} color="gray" style={styles.envelopeIcon} />
            </View>

            {/* Discussion List */}
            <FlatList
                data={filteredDiscussions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.discussionItem} onPress={() => handlePress(item)}>
                        <View style={[styles.profilePic, item.active && styles.activeProfilePic]}>
                            <Text style={styles.profilePicText}>{item.profilePic}</Text>
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                        </View>
                        {item.active && (
                            <View style={styles.activeIndicator} />
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f9',
    },
    notificationBar: {
        padding: 15,
        backgroundColor: '#6200ea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    notificationText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 10,
        margin: 15,
        borderRadius: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        padding: 5,
        borderRadius: 5,
        fontSize: 16,
    },
    envelopeIcon: {
        marginLeft: 10,
    },
    discussionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginRight: 15,
    },
    activeProfilePic: {
        backgroundColor: '#d1c4e9',
    },
    profilePicText: {
        fontSize: 30,
    },
    messageContainer: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    lastMessage: {
        color: 'gray',
        fontSize: 14,
    },
    activeIndicator: {
        width: 10,
        height: 10,
        backgroundColor: '#34c759',
        borderRadius: 5,
    },
});

export default DiscussionList;
