import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
    GroupStockItem,
    PersonalStockItem,
    isGroupStockItem,
} from '../model/stock';
import { PersonalStockItemCard } from './PersonalStockItemCard';
import { GroupStockItemCard } from './GroupStockItemCard';

interface StockCardsProps {
    stock: (PersonalStockItem | GroupStockItem)[];
    onPressStock: (id: string) => void;
}

export const StockCards = ({ stock, onPressStock }: StockCardsProps) => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            alwaysBounceVertical={false}
        >
            {stock.map((med, index) => {
                const isGroupStock = isGroupStockItem(med);
                return (
                    <>
                        {!isGroupStock && (
                            <PersonalStockItemCard
                                {...med}
                                onPressStock={onPressStock}
                                key={index}
                            />
                        )}

                        {isGroupStock && (
                            <GroupStockItemCard
                                {...med}
                                onPressStock={onPressStock}
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
