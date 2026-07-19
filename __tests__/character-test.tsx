import Character from "@/components/Character";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Character as CharacterType } from "@/types/character";
import { act, fireEvent, render } from "@testing-library/react-native";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
	router: { push: (...args: unknown[]) => mockPush(...args) },
}));

jest.mock("@/utils/favorites-storage", () => ({
	loadFavorites: () => [],
	saveFavorites: jest.fn(),
}));

const character: CharacterType = {
	id: 1,
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: { name: "Earth", url: "" },
	location: { name: "Earth", url: "" },
	image: "https://example.com/rick.png",
	episode: [],
	url: "",
	created: "",
};

describe("<Character />", () => {
	beforeEach(() => {
		useFavoritesStore.setState({ favorites: [] });
		mockPush.mockClear();
	});

	test("updates its star when the character becomes a favorite", async () => {
		const screen = await render(<Character character={character} />);

		expect(screen.getByText("☆")).toBeTruthy();

		await act(async () => {
			useFavoritesStore.getState().toggleFavorite(character);
		});

		expect(screen.getByText("★")).toBeTruthy();
	});

	test("toggles a character from its favorite button", async () => {
		const screen = await render(<Character character={character} />);

		await act(async () => {
			fireEvent.press(screen.getByText("\u2606"));
		});

		expect(screen.getByText("\u2605")).toBeTruthy();
		expect(mockPush).not.toHaveBeenCalled();
	});

	test("opens the character details when its row is pressed", async () => {
		const screen = await render(<Character character={character} />);

		fireEvent.press(screen.getByText("Rick Sanchez"));

		expect(mockPush).toHaveBeenCalledWith({
			pathname: "/character/[id]",
			params: { id: "1" },
		});
	});
});
