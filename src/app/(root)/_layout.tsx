import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { Tabs, Redirect } from 'expo-router';
import { BottomNavigation, Icon } from 'react-native-paper';
import { useAuthentication } from '../../hooks/useAuthentication';
import { ROUTE } from '../../model/routes';

export default function HomeLayout() {
    const { user, isLoading } = useAuthentication();

    if (!user && !isLoading) {
        return <Redirect href="/auth/signup" />;
    }

    return (
        <Tabs
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(
                                    route.name,
                                    route.params
                                ),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({
                                focused,
                                color,
                                size: 24,
                            });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? (options.tabBarLabel as string)
                                : options.title !== undefined
                                  ? options.title
                                  : route.name;

                        return label;
                    }}
                />
            )}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon source="home" color={color} size={24} />
                    ),
                }}
            />

            <Tabs.Screen
                name={ROUTE.MEDICATIONS.BASE_NAME}
                options={{
                    title: 'Medications',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon source="pill" color={color} size={24} />
                    ),
                }}
            />

            <Tabs.Screen
                name={ROUTE.RECORDS.BASE_NAME}
                options={{
                    title: 'Records',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon source="account-circle" color={color} size={24} />
                    ),
                }}
            />

            <Tabs.Screen
                name={ROUTE.GROUPS.BASE_NAME}
                options={{
                    title: 'Groups',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon source="account-circle" color={color} size={24} />
                    ),
                }}
            />

            <Tabs.Screen
                name={ROUTE.SETTINGS.BASE_NAME}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <Icon source="cog" color={color} size={24} />
                    ),
                }}
            />
        </Tabs>
    );
}
