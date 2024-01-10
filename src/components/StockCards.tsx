import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PersonalStockItemCard } from './PersonalStockItemCard';
import { GroupStockItemCard } from './GroupStockItemCard';
import { OwnedMedication } from '../model/ownedMedication';

interface OwnedMedicationCardsProps {
    ownedMedications: OwnedMedication[];
    onPressOwnedMedication: (id: string) => void;
}

export const StockCards = ({
    ownedMedications,
    onPressOwnedMedication,
}: OwnedMedicationCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {ownedMedications.map((med, index) => {
                const isGroupStock = true; //isGroupStockItem(med); FIXME: Finish migrating this
                return (
                    <>
                        {!isGroupStock && (
                            <PersonalStockItemCard
                                {...med}
                                onPressStock={onPressOwnedMedication}
                                key={index}
                            />
                        )}

                        {isGroupStock && (
                            <GroupStockItemCard
                                {...med}
                                onPressStock={onPressOwnedMedication}
                                key={index}
                            />
                        )}
                    </>
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
