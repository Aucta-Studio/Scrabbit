import React, {useState} from 'react';
import { Button, SafeAreaView, ScrollView, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView className="bg-zinc-900 h-full">
            <ScrollView>
                <Text className="text-white">This is the Profile page</Text>
                <Button title='Edit' onPress={() => navigation.navigate('Edit Profile')}>
                </Button>
                <Button title='FFF' onPress={() => navigation.navigate('FFF')}></Button>
            </ScrollView>
        </SafeAreaView>
    );
}