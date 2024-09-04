import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '../utils/constants'; // Make sure you have the correct API_URL

function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleResetPassword = async () => {
    if (!email || !otp || !newPassword) {
      showMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/auth/reset-password`, null, {
        params: {
          email,
          otp,
          newPassword
        }
      });

      if (response.status === 200) {
        showMessage('Password reset successful!');
        navigation.navigate('Login'); // Navigate to Login screen after successful password reset
      }
    } catch (error) {
      console.log(error);
      showMessage('Failed to reset password. Please try again.');
    }
  };

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="OTP"
          value={otp}
          onChangeText={setOtp}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          onPress={handleResetPassword}
          style={styles.button}
        >
          Reset Password
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

export default ResetPassword;
