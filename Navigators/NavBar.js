import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HelloWorldSceneAR from '../Screens/HelloWorldSceneAR';
import {NavigationContainer} from '@react-navigation/native';
import Chat from '../Screens/Chat';
import World from '../Screens/World';
import Feed from '../Screens/Feed';
import Profile from '../Screens/Profile';
import Camera from '../Screens/Camera';
import { StyleSheet } from 'react-native';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false,
        tabBarStyle:{backgroundColor: '#000',},
        tabBarShowLabel: false,
      }}
      initialRouteName="Scrabbit">
      <Tab.Screen name="World" component={World} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Scrabbit" component={Camera} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default () => {
  return (
    // <NavigationContainer>
      <MyTabs />
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navtab:{
    backgroundColor: '#000',
  },
});