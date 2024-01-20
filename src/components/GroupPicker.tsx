import { ProgressBar } from 'react-native-paper';
import { useAuthentication } from '../hooks/useAuthentication';
import { useGroups } from '../hooks/useGroups';
import { ErrorMessage } from './ErrorMessage';
import * as React from 'react';
import DropDown from 'react-native-paper-dropdown';

export function GroupPicker({
    value,
    setValue,
}: {
    value: string;
    setValue: (string) => void;
}) {
    const uid = useAuthentication().user?.uid || '';
    const { groups, isSuccess, isLoading, isError, error } = useGroups(uid);

    const [visible, setVisible] = React.useState(false);

    if (isLoading) {
        return <ProgressBar />;
    } else if (isError) {
        return <ErrorMessage errorMessage={error.message} />;
    } else if (isSuccess && groups) {
        const totalGroups = [{ label: 'Personal', value: '' }].concat(
            groups.map((g) => {
                return { value: g.id, label: g.name };
            })
        );
        return (
            <DropDown
                visible={visible}
                onDismiss={() => setVisible(false)}
                showDropDown={() => setVisible(true)}
                value={value}
                setValue={setValue}
                list={totalGroups}
                mode="outlined"
                label="Group"
            />
        );
    }
}
