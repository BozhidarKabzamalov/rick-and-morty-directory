import { useFavoritesStore } from "@/stores/favoritesStore";
import { Character as CharacterType } from "@/types/character";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type CharacterProps = {
	character: CharacterType;
};

const Character = memo(function Character({ character }: CharacterProps) {
	const favorite = useFavoritesStore((state) =>
		state.favorites.some(({ id }) => id === character.id),
	);
	const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

	const handlePress = useCallback(() => {
		router.push({
			pathname: "/character/[id]",
			params: { id: String(character.id) },
		});
	}, [character.id]);

	const handleToggleFavorite = useCallback(() => {
		toggleFavorite(character);
	}, [character, toggleFavorite]);

	return (
		<Pressable onPress={handlePress} style={styles.container}>
			<Image
				source={{ uri: character.image }}
				style={styles.image}
				contentFit="cover"
				transition={200}
			/>
			<Text style={styles.name}>{character.name}</Text>
			<Pressable onPress={handleToggleFavorite}>
				<Text style={[styles.star, favorite && styles.favoriteStar]}>
					{favorite ? "\u2605" : "\u2606"}
				</Text>
			</Pressable>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 8,
		paddingHorizontal: 4,
		borderRadius: 8,
	},
	image: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#e5e7eb",
	},
	name: {
		flex: 1,
		fontSize: 16,
	},
	star: {
		fontSize: 28,
		lineHeight: 32,
		color: "#9ca3af",
	},
	favoriteStar: {
		color: "#f59e0b",
	},
});

export default Character;
