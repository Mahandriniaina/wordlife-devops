import React from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from "moment";

const DiscussionDetail = ({ route }) => {
    const { discussion } = route.params;

    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: discussion.lastMessage,
            sender: discussion.name,
            timestamp: moment().subtract(10, 'minutes').format('LT')
        },
    ]);

    const sendMessage = () => {
        if (messageText.trim()) {
            setMessages([...messages, { id: Date.now().toString(), text: messageText, sender: 'You', timestamp: moment().format('LT') }]);
            setMessageText('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-left" size={20} color="white" />
                <View style={styles.centerHeader}>
                    <Text style={styles.personName}>{discussion.name}</Text>
                </View>
                <Icon name="ellipsis-v" size={20} color="white" />
            </View>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={item.sender === 'You' ? styles.myMessageContainer : styles.theirMessageContainer}>
                        {item.sender !== 'You' && <Text style={styles.senderName}>{item.sender}</Text>}
                        <View style={item.sender === 'You' ? styles.myMessage : styles.theirMessage}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                )}
                style={styles.messageList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type your message..."
                    style={styles.messageInput}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f9',
    },
    header: {
        padding: 15,
        backgroundColor: '#6200ea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centerHeader: {
        flex: 1,
        alignItems: 'center',
    },
    personName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    messageList: {
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e0e0e0',
    },
    messageInput: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 10,
    },
    myMessageContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    theirMessageContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 5,
    },
    myMessage: {
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 10,
        maxWidth: '75%',
    },
    theirMessage: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 10,
        maxWidth: '75%',
    },
    messageText: {
        color: 'white',
    },
    senderName: {
        fontWeight: 'bold',
        color: '#6200ea',
        marginBottom: 2,
    },
    timestamp: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
});

export default DiscussionDetail;
