import { Tabs } from 'expo-router';

/**
 * Layout component for the main tabs navigator
 * Sets up the tab bar with icons and labels
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
        }}
      />
      <Tabs.Screen
        name="design"
        options={{
          title: 'Design',
        }}
      />
    </Tabs>
  );
}