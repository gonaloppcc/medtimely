import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GroupMember } from './GroupMember';
import { User } from '../model/user';

interface GroupMemberProps {
    groupMembers: User[];
    onPressGroupMember: (id: string) => void;
}

export const GroupMembers = ({
    groupMembers,
    onPressGroupMember,
}: GroupMemberProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {groupMembers.map((groupMember, index) => {
                return (
                    <GroupMember
                        key={index}
                        {...groupMember}
                        onPressGroupMember={onPressGroupMember}
                    />
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
