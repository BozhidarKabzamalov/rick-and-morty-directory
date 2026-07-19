import CharacterDetailScreen from "@/app/character/[id]";
import { Character } from "@/types/character";
import { render } from "@testing-library/react-native";

const mockUseGetCharacter = jest.fn();

jest.mock("@/services/characterService", () => ({
	useGetCharacter: (...args: unknown[]) => mockUseGetCharacter(...args),
}));

jest.mock("expo-router", () => ({
	Stack: { Screen: () => null },
	useLocalSearchParams: () => ({ id: "1" }),
}));

const character: Character = {
	id: 1,
	name: "Rick Sanchez",
	status: "Alive",
	species: "Human",
	type: "",
	gender: "Male",
	origin: { name: "Earth (C-137)", url: "" },
	location: { name: "Earth", url: "" },
	image: "https://example.com/rick.png",
	episode: [],
	url: "",
	created: "",
};

describe("<CharacterDetailScreen />", () => {
	test("shows a loading state", async () => {
		mockUseGetCharacter.mockReturnValue({
			data: undefined,
			error: null,
			isPending: true,
		});

		const screen = await render(<CharacterDetailScreen />);

		expect(screen.getByText("Loading character...")).toBeTruthy();
	});

	test("shows request errors", async () => {
		mockUseGetCharacter.mockReturnValue({
			data: undefined,
			error: new Error("Character unavailable"),
			isPending: false,
		});

		const screen = await render(<CharacterDetailScreen />);

		expect(screen.getByText("Something went wrong")).toBeTruthy();
		expect(screen.getByText("Character unavailable")).toBeTruthy();
	});

	test("renders a character's details", async () => {
		mockUseGetCharacter.mockReturnValue({
			data: character,
			error: null,
			isPending: false,
		});

		const screen = await render(<CharacterDetailScreen />);

		expect(screen.getByText("Status")).toBeTruthy();
		expect(screen.getByText("Alive")).toBeTruthy();
		expect(screen.getByText("Earth (C-137)")).toBeTruthy();
		expect(screen.getByTestId("character-image").props.style).toEqual(
			expect.objectContaining({
				width: 300,
				height: 300,
				alignSelf: "center",
			}),
		);
	});
});
