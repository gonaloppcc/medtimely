import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type InputType =
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined;

interface InputProps {
    children?: React.ReactNode;
    label: string;
    id?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: () => void;
    type?: InputType;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    keyboardType?:
        | 'default'
        | 'number-pad'
        | 'decimal-pad'
        | 'numeric'
        | 'email-address'
        | 'phone-pad'
        | undefined;
}

const MODE = 'outlined';

export const Input = ({
    children,
    label,
    id,
    placeholder,
    value,
    onChangeText,
    onSubmitEditing,
    type,
    autoCapitalize,
    keyboardType,
}: InputProps) => {
    return (
        <TextInput
            style={styles.input}
            mode={MODE}
            label={label}
            id={id}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            textContentType={type}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
        >
            {children}
        </TextInput>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
    },
});
