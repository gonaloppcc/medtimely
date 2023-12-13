import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Login, SignUp} from '../components/auth';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

//const Stack = createStackNavigator();

function WelcomeScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    return <View style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 16,
        marginHorizontal: 16,
    }}>
        <Text variant="headlineMedium">Welcome to MedTimely</Text>

        <SignUp/>

        {/* don't have an account? */}
        <Button mode="text" onPress={() => {
            navigation.navigate('login');
        }}>
            Already have an account?
        </Button>
    </View>;
}

function LogInScreen() {
    return <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 16,
        marginHorizontal: 16,
    }}>
        <Login/>
    </View>;
}

export {WelcomeScreen, LogInScreen};
