import * as React from "react";
import {Text, View, Button} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import World from "../Screens/World";
import Forum from "../Screens/Forum";
import Camera from "../Screens/Camera";
import Feed from "../Screens/Feed";
import Profile from "../Screens/Profile";
import HelloWorldSceneAR from "../Screens/HelloWorldSceneAR";

const Tab = createBottomTabNavigator;

function NavTab(){
}

export default () => {
    return(
        <NavigationContainer>
            <NavTab />
        </NavigationContainer>
    );
}