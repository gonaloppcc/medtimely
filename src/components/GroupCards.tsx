import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GroupCard } from './GroupCard';

export const GroupCards = () => {
    //TODO GroupCard taking info 
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
