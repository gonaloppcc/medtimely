import React from 'react';
import { useState } from 'react';
import { MedicationRecordForm } from '../model/medicationRecord';
import { Dropdown } from './Dropdown';

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
        <Dropdown
            isVisible={visible}
            onDismiss={() => setVisible(false)}
            showDropdown={() => setVisible(true)}
            value={value}
            setValue={setValue}
            list={medicationFormList}
            isDisabled={disabled}
        />
    );
}
