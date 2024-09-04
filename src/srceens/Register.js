// components/Register.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '../utils/constants'; // Ensure this points to your API URL

function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleRegister = async () => {
        const registerRequest = {
            username: username,
            password: password,
            fullName: fullName,
            email: email,
        };

        try {
            const response = await axios.post(`${API_URL}/auth/register`, registerRequest);

            if (response.status === 200) {
                setSnackbarMessage('Registration successful!');
                navigation.navigate('Login'); // Navigate to Login screen after successful registration
            }
        } catch (error) {
            console.log(error?.message);
        } finally {
            setSnackbarVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Full name"
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  autoCapitalize="none"
                />
                <Button mode="contained" onPress={handleRegister} style={styles.button}>
                    Register
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Already have an account? Login here</Text>
                </TouchableOpacity>
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
        padding: 20,
        justifyContent: 'center',
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
    loginText: {
        marginTop: 15,
        textAlign: 'center',
        color: 'blue',
    },
});

export default Register;
