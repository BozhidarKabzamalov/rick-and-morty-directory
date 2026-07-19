import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useGetCharacters } from "@/services/characterService";
import { Character as CharacterType } from "@/types/character";
import { useCallback, useMemo, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Character from "./Character";
import ErrorIndicator from "./ErrorIndicator";
import ListFooterComponent from "./ListFooterComponent";
import LoadingIndicator from "./LoadingIndicator";

const keyExtractor = (character: CharacterType) => String(character.id);
const renderCharacter: ListRenderItem<CharacterType> = ({ item }) => (
	<Character character={item} />
);

const Characters = () => {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebouncedValue(search);

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isError,
		isFetching,
		isFetchingNextPage,
		isPending,
		isRefetching,
		refetch,
	} = useGetCharacters(debouncedSearch);

	const characters = useMemo(
		() => data?.pages.flatMap((page) => page.results) ?? [],
		[data],
	);

	const isInitialLoading = isPending && !data;
	const isSearchLoading =
		isFetching && !isFetchingNextPage && !isInitialLoading && !isRefetching;

	const handleLoadMore = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	const handleRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	if (isInitialLoading) {
		return <LoadingIndicator title="Loading characters..." />;
	}

	if (isError && characters.length === 0) {
		return <ErrorIndicator error={error} />;
	}

	return (
		<View style={styles.container}>
			<TextInput
				value={search}
				onChangeText={setSearch}
				accessibilityLabel="Search characters"
				placeholder="Search by name"
				autoCapitalize="none"
				autoCorrect={false}
				clearButtonMode="while-editing"
				style={styles.searchInput}
			/>

			{isSearchLoading ? (
				<View style={styles.searchLoading}>
					<ActivityIndicator />
					<Text style={styles.message}>Searching...</Text>
				</View>
			) : null}

			{characters.length === 0 ? (
				<View style={styles.centered}>
					<Text style={styles.message}>
						{debouncedSearch.trim()
							? `No characters found for "${debouncedSearch.trim()}".`
							: "No characters found."}
					</Text>
				</View>
			) : (
				<FlatList
					testID="characters-list"
					data={characters}
					keyExtractor={keyExtractor}
					renderItem={renderCharacter}
					refreshing={isRefetching}
					onRefresh={handleRefresh}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.4}
					ListFooterComponent={
						isFetchingNextPage ? (
							<ListFooterComponent title="Loading more..." />
						) : hasNextPage ? (
							<ListFooterComponent title="Scroll to load more" />
						) : (
							<ListFooterComponent title="No more characters" />
						)
					}
					contentContainerStyle={styles.listContent}
					contentInsetAdjustmentBehavior="automatic"
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	searchInput: {
		borderWidth: 1,
		borderColor: "#d1d5db",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginBottom: 12,
		fontSize: 16,
		backgroundColor: "#fff",
	},
	searchLoading: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 12,
	},
	listContent: {
		paddingBottom: 24,
	},
	message: {
		fontSize: 14,
		color: "#6b7280",
		textAlign: "center",
	},
});

export default Characters;
