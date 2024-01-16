import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Member } from '../model/member';
import { GroupMember } from './GroupMember';


interface GroupMemberProps {
    groupMembers: Member[]
    onPressGroupMember: (id: string) => void;
}

export const GroupMembers = ({ groupMembers, onPressGroupMember }: GroupMemberProps) => {
    //TODO GroupCard taking info


    return ( 
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
        {groupMembers.map((groupMember, index) => {
            const onPressGroupMemberHandler = () => {
                console.log(groupMember.id)
                onPressGroupMember(groupMember.id)
            }
            return (
                <GroupMember key={index} {...groupMember} onPressGroupMember={onPressGroupMemberHandler} />
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
