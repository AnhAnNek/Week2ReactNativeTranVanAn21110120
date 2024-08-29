import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Card, Title, Paragraph, Text } from 'react-native-paper';

function Home() {
    // Replace these values with your own personal information
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const phone = '+1234567890';
    const address = '123 Main Street, City, Country';

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title={name}
                    subtitle="Personal Information"
                    left={(props) => <Avatar.Text {...props} label="JD" />}
                />
                <Card.Content>
                    <Paragraph>Email: {email}</Paragraph>
                    <Paragraph>Phone: {phone}</Paragraph>
                    <Paragraph>Address: {address}</Paragraph>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        padding: 10,
        elevation: 4,
    },
});

export default Home;
