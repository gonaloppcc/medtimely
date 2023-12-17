import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/routes';

export const useNav = useNavigation<StackNavigationProp<RootStackParamList>>;
