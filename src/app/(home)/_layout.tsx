import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';

export default function HomeLayout() {
  return <Tabs>
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        tabBarIcon: ({ color }) => (
          <Icon source="home" color={color} size={24} />
        ),
      }}
    />

    <Tabs.Screen
      name="medications"
      options={{
        title: "Medications",
        tabBarIcon: ({ color }) => (
          <Icon source="pill" color={color} size={24} />
        ),
      }}
    />

    <Tabs.Screen
      name="records"
      options={{
        title: "Records",
        tabBarIcon: ({ color }) => (
          <Icon source="account-circle" color={color} size={24} />
        ),
      }}
    />

    <Tabs.Screen
      name="groups"
      options={{
        title: "Groups",
        tabBarIcon: ({ color }) => (
          <Icon source="account-circle" color={color} size={24} />
        ),
      }}
    />

    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        tabBarIcon: ({ color }) => (
          <Icon source="cog" color={color} size={24} />
        ),
      }}
    />
  </Tabs>;
}