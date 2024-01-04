import { StackNavigationOptions } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export const useNavOptions = (options: Partial<StackNavigationOptions>) => {
    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions(options);
    }, [nav, options]);
};
