import React from 'react';
import { SignUpScreen } from '../screens/SignUpScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/authenticated/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RecordScreen } from '../screens/authenticated/records/RecordScreen';
import { MedicationsScreen } from '../screens/authenticated/MedicationsScreen';
import { RecordsScreen } from '../screens/authenticated/records/RecordsScreen';
import { SettingsScreen } from '../screens/authenticated/SettingsScreen';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { Icon } from 'react-native-paper';
import { EditRecordScreen } from '../screens/authenticated/records/EditRecordScreen';
import { ProfileHeader } from '../components/ProfileHeader';
import { CreateRecordScreen } from '../screens/authenticated/records/CreateRecordScreen';
import { AddRecordHeader } from '../components/AddRecordHeader';
import { GroupsScreen } from '../screens/authenticated/groups/GroupsScreen'
import { AddGroupHeader } from '../components/AddGroupHeader';
import { CreateGroupScreen } from '../screens/authenticated/groups/CreateGroupScreen';
import { GroupScreen } from '../screens/authenticated/groups/GroupScreen';

export type RootStackParamList = {
    // Unauthenticated screens
    SignUp: undefined;
    Login: undefined;

    Base: undefined;

    // Authenticated screens
    Home: {
        day?: string; // Day string since Date is not serializable
    };
    Medications: undefined;
    Records: undefined;
    Settings: undefined;

    Record: { id: string };
    EditRecord: { id: string };
    CreateRecord: undefined;

    Groups: undefined;
    Group: { id: string };
    GroupsScreen: undefined;
    CreateGroup: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator();

// Screens that don't require authentication
const NotLoggedInScreens = () => {
    return (
        <>
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerTransparent: true }}
            />
        </>
    );
};

// Only shows if the user is logged in
const HomeScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Records"
                component={HomeScreen}
                options={{
                    headerRight: () => <ProfileHeader />,
                    headerLeft: () => <AddRecordHeader />,
                }}
            />
            <Stack.Screen name="Record" component={RecordScreen} />
            <Stack.Screen
                name="EditRecord"
                component={EditRecordScreen}
                options={{ headerTitle: 'Edit Medication Record' }}
            />
            <Stack.Screen
                name="CreateRecord"
                component={CreateRecordScreen}
                options={{ headerTitle: 'Add Record' }}
            />
        </Stack.Navigator>
    );
};

const GroupsScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GroupsScreen"
                component={GroupsScreen}
                options={{
                    headerLeft: () => <AddGroupHeader />,
                }}
            />
            <Stack.Screen name="Group" component={GroupScreen}/>
            <Stack.Screen
                name="CreateGroup"
                component={CreateGroupScreen}
                options={{}}
            />
        </Stack.Navigator>
    )
}


const HomeNav = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={HomeScreens}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="home" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Medications"
            component={MedicationsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="pill" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Records"
            component={RecordsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="account-circle" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Groups"
            component={GroupsScreens}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="account-circle" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Icon source="cog" color={color} size={24} />
                ),
            }}
        />
    </Tab.Navigator>
);

// Screens that require authentication
const LoggedInScreens = () => {
    return (
        <>
            <Stack.Screen
                name="Base"
                component={HomeNav}
                options={{ headerShown: false }}
            />
        </>
    );
};

export { Stack, LoggedInScreens, NotLoggedInScreens };
