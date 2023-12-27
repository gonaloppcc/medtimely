import { RouteProp, useRoute as useRouteNav } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/routes';

export const useRoute = <R extends keyof RootStackParamList>() =>
    useRouteNav<RouteProp<RootStackParamList, R>>();
