import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
const Friends = () => {
    const friendsList = [
        { id: 1, name: 'Judicaël Randriampanalindahy', followers: 125 },
        { id: 2, name: 'John Doe', followers: 200 },
        { id: 3, name: 'Jane Smith', followers: 150 },
        { id: 4, name: 'Albert Johnson', followers: 300 },
        { id: 5, name: 'Emma Watson', followers: 180 },
    ];

    const [following, setFollowing] = useState(friendsList.map(friend => ({ id: friend.id, isFollowing: false })));

    const handleFollowToggle = (id) => {
        setFollowing(prevState =>
            prevState.map(item =>
                item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
            )
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <View style={{
                padding: 15,
                backgroundColor: '#6200ea',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    Friends
                </Text>
                <Icon name="user" size={20} color="white" />
            </View>
            <ScrollView>
                {friendsList.map(friend => {
                    const isFollowing = following.find(f => f.id === friend.id)?.isFollowing;

                    return (
                        <View key={friend.id} style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white', marginVertical: 5, marginHorizontal: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Image
                                    source={require('../../assets/images/logo.jpeg')}
                                    style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1 }}
                                />
                                <View style={{ paddingLeft: 10, maxWidth: 200 }}>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: 'bold' }}>
                                        {friend.name}
                                    </Text>
                                    <Text style={{ color: 'gray', fontSize: 12 }}>{friend.followers} followers</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleFollowToggle(friend.id)}
                                style={{ minWidth: 100, paddingVertical: 5, paddingHorizontal: 15, backgroundColor: isFollowing ? 'gray' : 'blue', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default Friends;
