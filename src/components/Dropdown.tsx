import React from 'react';
import DropDown from 'react-native-paper-dropdown';
import { SafeAreaView, StyleSheet } from 'react-native';

interface DropdownProps {
    isVisible: boolean;
    onDismiss: () => void;
    showDropdown: () => void;
    value: string;
    setValue: (value: string) => void;
    list: { value: string; label: string }[];
    placeholder?: string;
    isDisabled?: boolean;
}

export const Dropdown = ({
    isVisible,
    onDismiss,
    showDropdown,
    value,
    setValue,
    list,
    placeholder,
    isDisabled,
}: DropdownProps) => {
    const styles = StyleSheet.create({
        dropdown: {
            width: '100%',
        },
        safeContainerStyle: {
            width: '100%',
            height: 50,
            flex: 1,
            justifyContent: 'center',
        },
    });

    return (
        <SafeAreaView style={styles.safeContainerStyle}>
            <DropDown
                visible={isVisible}
                onDismiss={onDismiss}
                showDropDown={showDropdown}
                value={value}
                setValue={setValue}
                list={list}
                placeholder={placeholder}
                mode="outlined"
                dropDownStyle={styles.dropdown}
                inputProps={{
                    disabled: isDisabled,
                }}
            />
        </SafeAreaView>
    );
};
