import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  //ViroConstants,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
import BottomTabNavigation from './Navigators/BottomTabNavigation';
import HelloWorldSceneAR from './Screens/HelloWorldSceneAR';

// const NavTab = BottomTabNavigation;

export default () => {
  return (
    <HelloWorldSceneAR />
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
