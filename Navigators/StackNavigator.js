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
import BottomTabNavigation from './BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../Screens/Login';
import Register from '../Screens/Register';

function MyStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="app" component={BottomTabNavigation}/>
    </Stack.Navigator>
  );
}

export default () => {
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
  );
};
