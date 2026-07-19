import DetailRow from "@/components/DetailRow";
import ErrorIndicator from "@/components/ErrorIndicator";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useGetCharacter } from "@/services/characterService";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function CharacterDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data: character, error, isPending } = useGetCharacter(id);

	if (isPending) {
		return <LoadingIndicator title="Loading character..." />;
	}

	if (error || !character) {
		return <ErrorIndicator error={error} />;
	}

	return (
		<ScrollView contentContainerStyle={styles.content}>
			<Image
				testID="character-image"
				source={{ uri: character.image }}
				style={styles.image}
				contentFit="contain"
				transition={200}
			/>
			<View style={styles.details}>
				<DetailRow label="Status" value={character.status} />
				<DetailRow label="Species" value={character.species} />
				<DetailRow label="Origin" value={character.origin.name} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		padding: 20,
	},
	image: {
		width: 300,
		height: 300,
		alignSelf: "center",
	},
	details: {
		paddingTop: 16,
		gap: 16,
	},
});
