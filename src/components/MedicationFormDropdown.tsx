import React from 'react';
import { useState } from 'react';
import DropDown from 'react-native-paper-dropdown';
import { MedicationRecordForm } from '../model/medicationRecord';

const medicationFormList = Object.values(MedicationRecordForm).map((v) => {
    return {
        label: v,
        value: v,
    };
});

interface MedicationFormDropdownProps {
    value: MedicationRecordForm;
    setValue: (medication: MedicationRecordForm) => void;
    disabled?: boolean;
}

export function MedicationFormDropdown({
    value,
    setValue,
    disabled,
}: MedicationFormDropdownProps) {
    const [visible, setVisible] = useState(false);
    return (
        <DropDown
            visible={visible}
            onDismiss={() => setVisible(false)}
            showDropDown={() => setVisible(true)}
            value={value}
            setValue={setValue}
            list={medicationFormList}
            mode="outlined"
            label="Form"
            inputProps={{ disabled: disabled }}
        />
    );
}
