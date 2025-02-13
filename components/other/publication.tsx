import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from "@/app/styles/publication";

const Publication = ({
     userName, date, contentText, price, imageSource, comments }:
    {
        userName: string, 
        date: string,
        contentText: string,
        price: number,
        imageSource: string,
        comments: Array<{userName: string, commentText: string}>
    }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('PublicationDetails', {
            userName,
            date,
            contentText,
            price,
            imageSource,
            comments
        });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={Style.content}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Image 
                        source={require('../../assets/images/logo.jpeg')} 
                        style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'blue' }} 
                    />
                    <View style={{ paddingLeft: 10 }}>
                        <Text>{userName}</Text>
                        <Text style={{ color: 'gray', fontSize: 12 }}>{date}</Text>
                    </View>
                </View>
                
                <Text style={{ marginBottom: 10 }}>
                    {contentText} {'\n'}
                    Prix : {price} Ar
                </Text>
                
                <Image 
                    source={imageSource} 
                    style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10 }} 
                />
                
                <View style={Style.container}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Icon name="heart" size={15} color="black" />
                        <Text>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Icon name="comment" size={15} color="black" />
                        <Text>Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Icon name="link" size={15} color="black" />
                        <Text>Link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Icon name="share" size={15} color="black" />
                        <Text>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Publication;
