import { Text } from 'react-native-paper';
import { useAuthentication } from '../hooks/useAuthentication';
import DropDown from 'react-native-paper-dropdown';
import React from 'react';
import { useMedications } from '../hooks/useMedications';
import { ProgressIndicator } from './ProgressIndicator';

export function MedicationsDropdown({
    setValue,
    value,
}: {
    setValue: (_: string) => any;
    value: string;
}) {
    const uid = useAuthentication().user?.uid || '';
    const [visible, setVisible] = React.useState(false);

    const { isLoading, medications } = useMedications(uid);

    return isLoading ? (
        <ProgressIndicator />
    ) : (
        <DropDown
            visible={visible}
            onDismiss={() => setVisible(false)}
            showDropDown={() => setVisible(true)}
            value={value}
            setValue={setValue}
            list={medications.map((med) => {
                return { label: med.name, value: med.id };
            })}
            mode="outlined"
            placeholder="Select a medication"
        />
    );
}
