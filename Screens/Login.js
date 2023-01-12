import * as React from 'react';
import {SafeAreaView, Text, View, Button} from 'react-native';

export default () => {
  return (
    <SafeAreaView className='bg-orange-500 h-full'>
        <View className='bg-black'>
            <Text className='text-white'>Username</Text>
            <Text className='text-white'>Password</Text>
            <Button title='Login'>Login</Button>
        </View>
    </SafeAreaView>
  );
};
