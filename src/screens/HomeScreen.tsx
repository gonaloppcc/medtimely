import * as React from "react";

import { Avatar, BottomNavigation, Button, Card, Icon, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import MedCard from "../components/MedCard";
import { medication } from "../model/medication";
import { Login } from "../components/auth";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home</Text>

      <MedCard name="Ibuprofen" dosage="400mg" form="Tablet" amount={3} missed={true} />

      <Login />
    </View>
  )
}

export default function HomeNav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    // TODO: custom icon
    { key: 'medications', title: 'Medications', focusedIcon: 'pill' },
    { key: 'records', title: 'Records', focusedIcon: 'account-circle' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog' },
  ])
  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    medications: HomeScreen,
    records: HomeScreen,
    settings: HomeScreen,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
