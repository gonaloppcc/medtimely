import React from 'react';
import {Button as ButtonNative, GestureResponderEvent} from 'react-native';

interface ButtonProps {
    onClick: (event: GestureResponderEvent) => void;
}

export default function Button(props: ButtonProps) {
    return (
        <ButtonNative onPress={props.onClick} title={"Click me"}></ButtonNative>
    );
}
