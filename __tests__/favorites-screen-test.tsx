import FavoritesScreen from "@/app/(tabs)/favorites";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Character } from "@/types/character";
import { render } from "@testing-library/react-native";

jest.mock("@/utils/favorites-storage", () => ({
	loadFavorites: () => [],
	saveFavorites: jest.fn(),
}));

const character: Character = {
	id: 2,
	name: "Morty Smith",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: { name: "Earth", url: "" },
	location: { name: "Earth", url: "" },
	image: "https://example.com/morty.png",
	episode: [],
	url: "",
	created: "",
};

describe("<FavoritesScreen />", () => {
	beforeEach(() => {
		useFavoritesStore.setState({ favorites: [] });
	});

	test("shows an empty state when no characters are favorited", async () => {
		const screen = await render(<FavoritesScreen />);

		expect(screen.getByText("No favorites yet")).toBeTruthy();
	});

	test("renders saved favorites", async () => {
		useFavoritesStore.setState({ favorites: [character] });

		const screen = await render(<FavoritesScreen />);

		expect(screen.getByText(character.name)).toBeTruthy();
		expect(screen.getByText("★")).toBeTruthy();
	});
});
