// components/Introduction.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, Snackbar, Button } from 'react-native-paper';
import axios from 'axios';
import { API_URL } from '../utils/constants'; // Ensure this points to your API URL

function Introduction({ navigation }) {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Function to fetch user data by username
    const fetchUserByUsername = async () => {
        if (!username) {
            setSnackbarMessage('Please enter a username.');
            setSnackbarVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/get-user/${username}`);
            if (response.status === 200) {
                setUser(response.data); // Assume response.data contains user details
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Example: Set default username to fetch user data when component mounts
        setUsername('exampleUser'); // Replace with dynamic logic as needed
        fetchUserByUsername();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>User Information</Text>
            <View style={styles.inputContainer}>
                {user ? (
                    <View style={styles.userInfo}>
                        <Text style={styles.userText}>Username: {user.username}</Text>
                        <Text style={styles.userText}>Email: {user.email}</Text>
                        <Text style={styles.userText}>Phone: {user.phone}</Text>
                    </View>
                ) : (
                    <Text style={styles.messageText}>No user found. Please enter a username.</Text>
                )}
                <Button mode="contained" onPress={fetchUserByUsername} loading={loading} style={styles.button}>
                    Fetch User
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
    userInfo: {
        marginBottom: 20,
    },
    userText: {
        fontSize: 16,
        marginBottom: 5,
    },
    messageText: {
        textAlign: 'center',
        color: 'gray',
    },
    button: {
        marginTop: 20,
    },
});

export default Introduction;
