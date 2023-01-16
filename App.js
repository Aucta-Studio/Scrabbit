import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Profile';
import StackNavigator from './Navigators/Base';
import ProfileStack from './Navigators/ProfileStack';
import Base from './Navigators/Base';

export default () => {
  return (
    <Base/>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
