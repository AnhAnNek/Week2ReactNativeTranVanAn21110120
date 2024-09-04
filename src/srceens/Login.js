// components/Login.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '../utils/constants'; // Make sure you have the correct API_URL

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleLogin = async () => {
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

        // Check if username and password are provided
        if (!username || !password) {
            showMessage('Please fill in both fields.');
            return;
        }

        setLoading(true);

        try {
            // Make a POST request to the login endpoint
            const response = await axios.post(`${API_URL}/auth/login?username=${username}&password=${password}`);

            // Handle successful login
            if (response.status === 200) {
                showMessage('Login successful!', 'success');
                navigation.navigate('Introduction', { username }); // Pass username to Introduction screen
            }
        } catch (error) {
            console.log(error);
            showMessage('Login unsuccessful!', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (message) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.button}
                    loading={loading}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>
                    Don't have an account? Register here
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>
                    Forgot your password? Reset it here
                </Text>
            </TouchableOpacity>
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
    registerText: {
        marginTop: 15,
        textAlign: 'center',
        color: 'blue',
    },
    forgotPasswordText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'blue',
    },
});

export default Login;
