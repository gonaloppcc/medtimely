import React from 'react';
import {Card, Icon, Text, useTheme} from 'react-native-paper';

interface MedCardProps {
    name: string;
    dosage: string;
    form: string;
    amount?: number;
    missed?: boolean;
}

const MedCard = (props: MedCardProps) => {
    const theme = useTheme();

    const title = (props.amount == null || props.amount == 1) ? props.name : `${props.name} (x${props.amount})`;
    const missed = props.missed || false;

    return (
        <Card mode='outlined'
            style={missed ? {backgroundColor: theme.colors.errorContainer} : {}}>
            <Card.Title title={title} titleVariant="titleMedium" subtitle={`${props.form}, ${props.dosage}`} left={
                (props) => <Icon source="pill" {...props} color={theme.colors.onSurface}/>
            }/>

            {missed && <Card.Content>
                <Text variant="labelLarge" style={{color: theme.colors.error}}>Not taken</Text>
            </Card.Content>}
        </Card>
    );
};

export default MedCard;
