import DropDown from 'react-native-paper-dropdown';
import React from 'react';
import { useMedications } from '../hooks/useMedications';
import { ProgressIndicator } from './ProgressIndicator';
import { db } from '../firebase';

export function MedicationsDropdown({
    setValue,
    value,
}: {
    setValue: (_: string) => void;
    value: string;
}) {
    const [visible, setVisible] = React.useState(false);

    const { isLoading, medications } = useMedications(db);

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
