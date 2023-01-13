import React,{useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default ({pfp, user, caption, state, image}) =>{
    return (
      // The whole post
      <View className=" bg-black rounded-xl content-center">
        {/* username display */}
        <View className="p-1 flex-row items-center">
          <Image source={{uri: pfp}} className="h-10 w-10" />
          <Text className="text-white pl-2">{user}</Text>
        </View>
        {/* thumbnail photo/location */}
        <View className="flex flex-col">
          <Image
            // style={styles.image}
            className="w-full h-[30vh]"
            // resizeMode="contain"
            source={{uri: image}}
          />
        </View>
        {/* Like comment and save buttons */}
        <View className="bg-black flex-row w-full justify-evenly">
          <Text className="text-white">Like</Text>
          <Text className="text-white">Comment</Text>
          <Text className="text-white">Bookmark</Text>
        </View>
        {/* Caption and comments link */}
        <View className="p-2">
          <Text className="text-white">{caption}</Text>
        </View>
      </View>
    );
}