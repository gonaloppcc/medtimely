import { StackNavigationOptions } from '@react-navigation/stack';
import { useNav } from './useNav';
import { useEffect } from 'react';

export const useNavOptions = (options: Partial<StackNavigationOptions>) => {
    const nav = useNav();
    useEffect(() => {
        nav.setOptions(options);
    }, [nav, options]);
};
