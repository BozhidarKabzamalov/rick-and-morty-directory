import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="index"
				options={{ title: "Characters", tabBarIcon: () => null }}
			/>
			<Tabs.Screen
				name="favorites"
				options={{ title: "Favorites", tabBarIcon: () => null }}
			/>
		</Tabs>
	);
}
