import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, ImageBackground } from "react-native";
import Publication from "@/components/other/publication";
import Icon from 'react-native-vector-icons/FontAwesome5';
import{firebase} from  '../services/firebaseConfig'

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('posts');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null); // State for user's profile photo
  const [userName, setUserName] = useState<string | null>(null); 
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
                    if (userData && userData.name) {
                      setUserName(userData.name); // Set the user's name
                    }
                }
            }
        };

        fetchUserProfile(); // Call function to get user profile

    }, [])

  const userProfile = {
    name: userName,
    bio: 'Passionate developer. Love coding and coffee. Always learning new technologies.',
    followers: 125,
    following: 180,
    posts: 34,
    profileImage: profilePhoto,
    coverPhoto: require('../../assets/images/ats.png')
  };

  const publications = [
    { id: '1', contentText: "Minima reprehenderit incidunt cm aliquam...", date: new Date(), image: require('../../assets/images/ats.png'), price: 250 },
    { id: '2', contentText: "lorem upsum", date: new Date(), image: require('../../assets/images/logo.jpeg'), price: 250 },
    { id: '3', contentText: "Lorem ipsum dolor sit amet consectetur...", date: new Date(), image: require('../../assets/images/atlas.png'), price: 250 },
  ];

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

  const renderTabContent = () => {
    if (selectedTab === 'posts') {
      return (
        <FlatList
          data={publications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Publication
              contentText={item.contentText}
              date={item.date.toString()}
              imageSource={item.image}
              price={item.price}
              userName={userProfile.name}
            />
          )}
        />
      );
    } else if (selectedTab === 'friends') {
      return (
        <ScrollView>
          {friendsList.map(friend => {
            const isFollowing = following.find(f => f.id === friend.id)?.isFollowing;
            return (
              <View key={friend.id} style={styles.friendContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Image
                    source={require('../../assets/images/logo.jpeg')}
                    style={styles.friendImage}
                  />
                  <View style={styles.friendInfo}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.friendName}>
                      {friend.name}
                    </Text>
                    <Text style={styles.friendFollowers}>{friend.followers} followers</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleFollowToggle(friend.id)}
                  style={[styles.followButton, isFollowing ? styles.following : styles.notFollowing]}>
                  <Text style={styles.followButtonText}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={userProfile.coverPhoto} style={styles.coverPhoto}>
        <View style={styles.coverOverlay} />
      </ImageBackground>
      <Image source={userProfile.profileImage} style={styles.profileImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.bio}>{userProfile.bio}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('posts')} style={[styles.tab, selectedTab === 'posts' && styles.activeTab]}>
          <Text style={styles.tabText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('friends')} style={[styles.tab, selectedTab === 'friends' && styles.activeTab]}>
          <Text style={styles.tabText}>Friends</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  coverOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text contrast
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    top: 150,
    left: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  infoContainer: {
    marginTop: 80,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark text color for better visibility
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  postContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  friendContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  friendInfo: {
    paddingLeft: 10,
    maxWidth: 200,
  },
  friendName: {
    fontWeight: 'bold',
    color: '#333',
  },
  friendFollowers: {
    color: 'gray',
    fontSize: 12,
  },
  followButton: {
    minWidth: 100,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  following: {
    backgroundColor: 'gray',
  },
  notFollowing: {
    backgroundColor: 'blue',
  },
  followButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfilePage;
