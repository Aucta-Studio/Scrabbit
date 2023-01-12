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

export default () => {
  const [firstName, setfirstName] = useState('');
  const [middleName, setmiddleName] = useState('');
  const [lastName, setlastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {}

  function navigateToLogin(){}

  return (
    <SafeAreaView className="bg-orange-500 h-full">
      <ScrollView>
        {/* beginning of the form */}
        <View style={styles.formContainer}>
          {/* a title */}
          <Text style={styles.title}>Register</Text>
          {/* first name */}
          <Text className="text-white">First Name</Text>
          <TextInput
            value={firstName}
            style={styles.input}
            onChange={setfirstName}
            placeholder="Enter your first name"
          />
          {/* middle name */}
          <Text className="text-white">Middle Name</Text>
          <TextInput
            value={middleName}
            style={styles.input}
            onChange={setmiddleName}
            placeholder="Enter your middle name"
          />
          {/* lastname */}
          <Text className="text-white">Last Name</Text>
          <TextInput
            value={lastName}
            style={styles.input}
            onChange={setlastName}
            placeholder="Enter your last name"
          />
          {/* phone number */}
          <Text className="text-white">Phone Number</Text>
          <TextInput
            value={phoneNumber}
            style={styles.input}
            onChange={setPhoneNumber}
            placeholder="Enter your phone number"
          />
          {/* email address */}
          <Text className="text-white">Email Address</Text>
          <TextInput
            value={email}
            style={styles.input}
            onChange={setEmail}
            placeholder="Enter your email address "
          />
          {/* DOB */}
          <Text className="text-white">Date Of Birth</Text>
          <TextInput
            value={DOB}
            style={styles.input}
            onChange={setDOB}
            placeholder="Enter your date of birth"
          />
          {/* username */}
          <Text className="text-white">Username</Text>
          <TextInput
            value={username}
            style={styles.input}
            onChange={text => setUsername(text)}
            placeholder="Enter your username..."></TextInput>
          {/* password */}
          <Text className="text-white">Password</Text>
          <TextInput
            value={password}
            style={styles.input}
            onChange={text => setPassword(text)}
            placeholder="Enter your password..."></TextInput>
          {/* register button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text className="text-orange-500">Register</Text>
          </TouchableOpacity>
        </View>
        {/* in case of a new user with no account */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Have an account? </Text>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text className="text-orange-500">Login</Text>
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
    padding: 50,
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
});
