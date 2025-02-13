import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from "../../app/services/firebaseConfig"; // Ensure Firebase is configured

const Navbar = () => {
    const navigation = useNavigation();
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null); // State for user's profile photo

    useEffect(() => {
        const fetchUserProfile = async () => {
            // Get the current logged-in user
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
                // Fetch user details from Firestore
                const userDoc = await firebase.firestore().collection('users').doc(currentUser.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    if (userData && userData.profilePhoto) {
                        setProfilePhoto(userData.profilePhoto); // Set the profile photo if available
                    }
                }
            }
        };

        fetchUserProfile(); // Call function to get user profile

    }, []); // Empty dependency array to run only on mount

    return (
        <View style={{ backgroundColor: '#ffffff', paddingVertical: 10, paddingHorizontal: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6200ea' }}>Hientsena</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginLeft: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('notification')}>
                            <Icon name="bell" size={20} color="#6200ea" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('DiscussionList')}>
                            <Icon name="envelope" size={20} color="#6200ea" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        {/* Display user's profile photo or a default image */}
                        {profilePhoto ? (
                            <Image source={{ uri: profilePhoto }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 15 }} />
                        ) : (
                            <Image source={require('../../assets/images/logo.jpeg')} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 15 }} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Navbar;
