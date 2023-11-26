import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Button from "./src/components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" style="dark"  />
      <Text>Open up App.js to start working on your app 27!</Text>
      <Button onClick={() => alert('Button clicked')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
