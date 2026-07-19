import Character from "@/components/Character";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Character as CharacterType } from "@/types/character";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

const keyExtractor = (character: CharacterType) => String(character.id);
const renderCharacter: ListRenderItem<CharacterType> = ({ item }) => (
	<Character character={item} />
);

const FavoritesScreen = () => {
	const favorites = useFavoritesStore((state) => state.favorites);

	return (
		<View style={styles.container}>
			{favorites.length === 0 ? (
				<View style={styles.emptyState}>
					<Text style={styles.emptyTitle}>No favorites yet</Text>
					<Text style={styles.emptyMessage}>
						Tap a character&apos;s star on the Characters tab to
						save them here.
					</Text>
				</View>
			) : (
				<FlatList
					data={favorites}
					keyExtractor={keyExtractor}
					renderItem={renderCharacter}
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={styles.listContent}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	listContent: { paddingBottom: 24 },
	emptyState: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		padding: 24,
	},
	emptyTitle: { fontSize: 18, fontWeight: "600" },
	emptyMessage: { color: "#6b7280", fontSize: 14, textAlign: "center" },
});

export default FavoritesScreen;
