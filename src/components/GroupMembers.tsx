import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GroupMember } from './GroupMember';

//interface GroupProps {
//    groups: Group[];
//    onPressGroup: (id: string) => void;
//}

export const GroupMembers = ({ members }) => {
    //TODO GroupCard taking info
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
        <GroupMember member={members}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        rowGap: 12,
    },
});
