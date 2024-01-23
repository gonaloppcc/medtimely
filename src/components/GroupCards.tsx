import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { GroupCard } from './GroupCard';
import { Group } from '../model/group';

interface GroupProps {
    groups: Group[];
    onPressGroup: (id: string) => void;
    isRefreshing: boolean;
    onRefresh?: () => void;
}

export const GroupCards = ({
    groups,
    onPressGroup,
    isRefreshing,
    onRefresh,
}: GroupProps) => {
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                ></RefreshControl>
            }
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {groups.map((group, index) => {
                return (
                    <GroupCard key={index} {...group} onPress={onPressGroup} />
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
