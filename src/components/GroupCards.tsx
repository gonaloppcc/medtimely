import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GroupCard } from './GroupCard';
import { Group } from '../model/group';

interface GroupProps {
    groups: Group[];
}

export const GroupCards = ({ groups }: GroupProps) => {
    //TODO GroupCard taking info
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {groups.map((group, index) => {
                return <GroupCard key={index} {...group} />;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
