import * as React from 'react';
import { SafeAreaView, ScrollView, Text} from 'react-native';

export default () => {
    return(
        <SafeAreaView className="bg-zinc-900 h-full">
            <ScrollView>
                <Text className="text-white">This is the chat page</Text>
            </ScrollView>
        </SafeAreaView>
    );
}