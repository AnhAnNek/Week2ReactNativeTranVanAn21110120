import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '../utils/constants'; // Make sure you have the correct API_URL

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      showMessage('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password?email=${email}`);

      if (response.status === 200) {
        showMessage('OTP sent to your email.');
        navigation.navigate('ResetPassword'); // Navigate to ResetPassword screen after sending OTP
      }
    } catch (error) {
      console.log(error);
      showMessage('Failed to send OTP. Please try again.');
    }
  };

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          onPress={handleForgotPassword}
          style={styles.button}
        >
          Send OTP
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default ForgotPassword;
