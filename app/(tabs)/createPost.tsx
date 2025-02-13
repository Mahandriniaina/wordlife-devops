import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '../services/firebaseConfig';

const CreatePost = () => {
    const [contentText, setContentText] = useState("");
    const [price, setPrice] = useState("");
    const [place, setPlace] = useState("");
    const [image, setImage] = useState<string | null>(null); // Allow image to be either a string or null
    const [loading, setLoading] = useState(false); // Loading state during submission

    // Image Picker to select an image from the gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri); // Access the URI from the assets array
        }
    };

    // Function to handle the form submission and image upload to Firebase
    const handleSubmit = async () => {
        if (!contentText) {
            alert('Post content cannot be empty');
            return;
        }

        setLoading(true);

        try {
            const user = firebase.auth().currentUser; // Get the current authenticated user
            if (!user) {
                alert("You need to be logged in to create a post");
                return;
            }

            let imageUrl = null;
            if (image) {
                // Upload the image to Firebase Storage
                const response = await fetch(image);
                const blob = await response.blob();
                const storageRef = firebase.storage().ref().child(`posts/${user.uid}/${Date.now()}`);
                await storageRef.put(blob);
                imageUrl = await storageRef.getDownloadURL(); // Get the uploaded image's URL
            }

            // Save the post data to Firestore
            await firebase.firestore().collection('posts').add({
                contentText,
                price,
                place,
                imageUrl, // Store the image URL
                userId: user.uid, // Store user ID
                userEmail: user.email, // Optionally store the user email
                createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Timestamp
                userName: user.displayName || 'Anonymous' // Store user name if available
            });

            alert('Post created successfully!');
            // Clear the form after successful post
            setContentText('');
            setPrice('');
            setPlace('');
            setImage(null);

        } catch (error) {
            console.error("Error posting:", error);
            alert('Error creating post, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20, backgroundColor: '#f9f9f9', flex: 1 }}>
            <TextInput
                placeholder="What's on your mind?"
                value={contentText}
                onChangeText={setContentText}
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 15,
                    fontSize: 16,
                    height: 100,
                    textAlignVertical: 'top'
                }}
                multiline
            />
            <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', marginBottom: 15 }}>
                <View style={{
                    backgroundColor: '#e0e0e0',
                    width: '100%',
                    height: 150,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#c0c0c0'
                }}>
                    {image ? (
                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                    ) : (
                        <Icon name="camera" size={40} color="#6200ea" />
                    )}
                </View>
            </TouchableOpacity>

            <TextInput
                placeholder="Enter price (optional)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 15,
                    fontSize: 16,
                }}
            />
            <TextInput
                placeholder="Enter place (optional)"
                value={place}
                onChangeText={setPlace}
                style={{
                    backgroundColor: '#fff',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 15,
                    fontSize: 16,
                }}
            />

            <TouchableOpacity onPress={handleSubmit} style={{
                backgroundColor: '#6200ea',
                padding: 15,
                borderRadius: 10,
                alignItems: 'center'
            }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                    {loading ? 'Posting...' : 'Post'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreatePost;
