import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import login from '../assets/images/login.png';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  function handleLogin() {
    navigation.navigate('app');
  }

  function navigateToRegister() {
    navigation.navigate('register');
  }

  return (
    <SafeAreaView className="bg-orange-500 h-full">
      {/* The photo */}
      <View className="pt-20 h-1/3 w-4/6 self-center items-center">
        <Image source={login} style={styles.images} resizeMode="contain" />
      </View>
      <ScrollView>
        {/* beginning of the form */}
        <View style={styles.formContainer}>
          {/* a title */}
          <Text style={styles.title}>Login</Text>
          {/* the username part */}
          <Text className="text-white">Username</Text>
          <TextInput
            value={username}
            style={styles.input}
            onChangeText={text => setUsername(text)}
            placeholder="Enter your username..."></TextInput>
          {/* the password part */}
          <Text className="text-white">Password</Text>
          <TextInput
            value={password}
            style={styles.input}
            onChangeText={text => setPassword(text)}
            placeholder="Enter your password..."></TextInput>
          {/* The login button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text className="text-orange-500">Login</Text>
          </TouchableOpacity>
          {/* in case of a new user with no account */}
          <TouchableOpacity
            className="pt-10 self-center"
            onPress={navigateToRegister}>
            <Text className="text-white">
              Dont have an account? Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
  },
  formContainer: {
    marginTop: 20,
    marginHorizontal: 25,
    paddingHorizontal: 50,
    // backgroundColor: '#000',
    borderRadius: 50,
    // opacity: 0.75,
  },
  input: {
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
    opacity: 0.2,
  },
  button: {
    // backgroundColor: '#4CAF50',
    backgroundColor: '#FFF',
    // color : "#F97316",
    // borderColor: "#000",
    // borderWidth: 2,
    borderRadius: 50,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  images: {
    width: 200,
    height: 270,
  },
});
