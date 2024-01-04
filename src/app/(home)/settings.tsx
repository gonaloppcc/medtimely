import * as React from 'react';

import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: 32,
  },
});

