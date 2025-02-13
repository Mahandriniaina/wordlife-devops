import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from '../(tabs)/index';
import Home from './home'; // Un seul import pour l'écran home
import SignUpScreen from '../(tabs)/signup';
import SignUp2 from './signup2';
import Friends from './friends';
import CreatePost from './createPost';
import Search from './Search';
import Notifications from './notification';
import { LoadingProvider } from '@/components/header/loading';
import SettingsScreen from './setting';
import PublicationDetails from './publication';
import DiscussionList from './message';
import DiscussionDetail from './discussion';
import ProfilePage from './profile';
import { firebase } from '../services/firebaseConfig';
import EmailVerification from './EmailVerification';
import { useState, useEffect } from 'react';

type User = firebase.User | null;

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <LoadingProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='index'>
          {
            !user ? (
              <>
                <Stack.Screen name='index' component={IndexScreen} options={{ headerShown: false }} />
                <Stack.Screen name='signup' component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name='signup2' component={SignUp2} options={{ headerShown: false }} />
              </>
            ) : (
              !user.emailVerified ? (
                <Stack.Screen name='email' component={EmailVerification} options={{ headerShown: true }} />
              ) : (
                <>
                  <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
                  <Stack.Screen name='friends' component={Friends} options={{ headerShown: false }} />
                  <Stack.Screen name='create' component={CreatePost} options={{ headerShown: false }} />
                  <Stack.Screen name='search' component={Search} options={{ headerShown: false }} />
                  <Stack.Screen name='notification' component={Notifications} options={{ headerShown: false }} />
                  <Stack.Screen name='setting' component={SettingsScreen} options={{ headerShown: false }} />
                  <Stack.Screen name='PublicationDetails' component={PublicationDetails} options={{ headerShown: false }} />
                  <Stack.Screen name='DiscussionList' component={DiscussionList} options={{ headerShown: false }} />
                  <Stack.Screen name='DiscussionDetail' component={DiscussionDetail} options={{ headerShown: false }} />
                  <Stack.Screen name='profile' component={ProfilePage} options={{ headerShown: false }} />
                </>
              )
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </LoadingProvider>
  );
};

export default App;
