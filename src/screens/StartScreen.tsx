import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SignUp} from './SignUpScreen';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../../App';

function SignUpScreen({navigation}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) {
    const insets = useSafeAreaInsets();
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
            navigation.navigate('Login');
        }}>
            Already have an account?
        </Button>
    </View>;
}

export {SignUpScreen};
