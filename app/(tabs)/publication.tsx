import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Button, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Style from "@/app/styles/publication";

const CommentItem = ({ comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState(comment.replies || []);

    const handleReply = () => {
        if (replyText.trim()) {
            setReplies([...replies, { userName: "CurrentUser", commentText: replyText, likes: 0 }]);
            setReplyText("");
        }
    };

    return (
        <View style={{ marginTop: 10, paddingLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, marginRight: 10 }}>👤</Text>
                <Text style={{ fontWeight: 'bold' }}>{comment.userName}</Text>
            </View>
            <Text style={{ marginLeft: 40 }}>{comment.commentText}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 40 }}>
                <TouchableOpacity style={{ marginRight: 15 }}>
                    <Icon name="heart" size={15} color="black" />
                    <Text>{comment.likes} Like{comment.likes !== 1 ? 's' : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
                    <Text>{showReplies ? "Hide Replies" : "View Replies"}</Text>
                </TouchableOpacity>
            </View>

            {showReplies && (
                <View style={{ marginLeft: 20, marginTop: 10 }}>
                    <FlatList
                        data={replies}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ marginTop: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 25, marginRight: 10 }}>👤</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.userName}</Text>
                                </View>
                                <Text style={{ marginLeft: 35 }}>{item.commentText}</Text>
                            </View>
                        )}
                    />
                    <TextInput
                        value={replyText}
                        onChangeText={setReplyText}
                        placeholder="Write a reply..."
                        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, marginTop: 5, padding: 5 }}
                    />
                    <Button title="Reply" onPress={handleReply} />
                </View>
            )}
        </View>
    );
};

const PublicationDetails = ({ route }) => {
    const { userName, date, contentText, price, imageSource ,place} = route.params;

    const sampleComments = [
        {
            userName: "Alice",
            commentText: "Great post! Love the insights.",
            likes: 10,
            replies: [
                {
                    userName: "Bob",
                    commentText: "I agree with you, Alice!",
                    likes: 3
                }
            ]
        },
        {
            userName: "Charlie",
            commentText: "Interesting content. Keep it up!",
            likes: 5,
            replies: []
        }
    ];

    const [commentText, setCommentText] = useState("");
    const [commentList, setCommentList] = useState(sampleComments);

    const handleAddComment = () => {
        if (commentText.trim()) {
            setCommentList([...commentList, { userName: "CurrentUser", commentText, likes: 0, replies: [] }]);
            setCommentText("");
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
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
                Place : {place}{'\n'}
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

            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Comments:</Text>
            <FlatList
                data={commentList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CommentItem comment={item} />}
            />

            <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write a comment..."
                style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, marginTop: 10, marginBottom: 10,padding: 5, }}
            />
            <Button title="Add Comment" onPress={handleAddComment} />
        </ScrollView>
    );
};

export default PublicationDetails;
