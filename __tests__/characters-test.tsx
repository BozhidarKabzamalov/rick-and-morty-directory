import Characters from "@/components/Characters";
import { Character } from "@/types/character";
import { act, fireEvent, render } from "@testing-library/react-native";

jest.mock("@/utils/favorites-storage", () => ({
	loadFavorites: () => [],
	saveFavorites: jest.fn(),
}));

const mockUseGetCharacters = jest.fn();

jest.mock("@/services/characterService", () => ({
	useGetCharacters: (...args: unknown[]) => mockUseGetCharacters(...args),
}));

const character: Character = {
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

const createQueryResult = (overrides = {}) => ({
	data: undefined,
	error: null,
	fetchNextPage: jest.fn(),
	hasNextPage: false,
	isError: false,
	isFetching: false,
	isFetchingNextPage: false,
	isPending: false,
	isRefetching: false,
	refetch: jest.fn(),
	...overrides,
});

describe("<Characters />", () => {
	beforeEach(() => {
		mockUseGetCharacters.mockReturnValue(createQueryResult());
	});

	test("shows a loading state before the first page arrives", async () => {
		mockUseGetCharacters.mockReturnValue(
			createQueryResult({ isPending: true }),
		);

		const screen = await render(<Characters />);

		expect(screen.getByText("Loading characters...")).toBeTruthy();
	});

	test("shows an error when the initial request fails", async () => {
		mockUseGetCharacters.mockReturnValue(
			createQueryResult({ isError: true, error: new Error("Offline") }),
		);

		const screen = await render(<Characters />);

		expect(screen.getByText("Something went wrong")).toBeTruthy();
		expect(screen.getByText("Offline")).toBeTruthy();
	});

	test("renders characters and requests the next page when available", async () => {
		const fetchNextPage = jest.fn();
		mockUseGetCharacters.mockReturnValue(
			createQueryResult({
				data: { pages: [{ results: [character] }] },
				hasNextPage: true,
				fetchNextPage,
			}),
		);

		const screen = await render(<Characters />);

		expect(screen.getByText(character.name)).toBeTruthy();
		await act(async () => {
			fireEvent(screen.getByTestId("characters-list"), "onEndReached");
		});
		expect(fetchNextPage).toHaveBeenCalledTimes(1);
	});

	test("does not request another page while one is already loading", async () => {
		const fetchNextPage = jest.fn();
		mockUseGetCharacters.mockReturnValue(
			createQueryResult({
				data: { pages: [{ results: [character] }] },
				hasNextPage: true,
				isFetchingNextPage: true,
				fetchNextPage,
			}),
		);

		const screen = await render(<Characters />);
		fireEvent(screen.getByTestId("characters-list"), "onEndReached");

		expect(fetchNextPage).not.toHaveBeenCalled();
	});

	test("refreshes the character list", async () => {
		const refetch = jest.fn();
		mockUseGetCharacters.mockReturnValue(
			createQueryResult({
				data: { pages: [{ results: [character] }] },
				refetch,
			}),
		);

		const screen = await render(<Characters />);
		fireEvent(screen.getByTestId("characters-list"), "onRefresh");

		expect(refetch).toHaveBeenCalledTimes(1);
	});

	test("explains when no characters are available", async () => {
		mockUseGetCharacters.mockReturnValue(
			createQueryResult({ data: { pages: [{ results: [] }] } }),
		);

		const screen = await render(<Characters />);

		expect(screen.getByText("No characters found.")).toBeTruthy();
	});
});
