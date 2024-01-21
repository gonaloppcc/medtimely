import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditProfile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editProfileText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default EditProfile;
