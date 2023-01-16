import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/EditProfile';
import FFF from '../Screens/FFF';

function ProfileStack(){
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='Edit Profile' component={EditProfile}/>
            <Stack.Screen name='FFF' component={FFF}/>
        </Stack.Navigator>
    );
}

export default()=>{
    return(
        // <NavigationContainer>
            <ProfileStack/>
        // </NavigationContainer>
    );
}