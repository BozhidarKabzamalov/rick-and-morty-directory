import HomeScreen from "@/app/(tabs)/index";
import { AppProviders } from "@/providers/AppProviders";
import { render } from "@testing-library/react-native";

jest.mock("react-native-safe-area-context", () => ({
	SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@/utils/favorites-storage", () => ({
	loadFavorites: () => [],
	saveFavorites: jest.fn(),
}));

jest.mock("@/services/characterService", () => ({
	useGetCharacters: () => ({
		data: undefined,
		isPending: true,
		isFetching: false,
		isFetchingNextPage: false,
		isRefetching: false,
		isError: false,
		hasNextPage: false,
		fetchNextPage: jest.fn(),
		refetch: jest.fn(),
	}),
}));

describe("<HomeScreen />", () => {
	test("shows the loading state while characters are fetched", async () => {
		const { getByText } = await render(
			<AppProviders>
				<HomeScreen />
			</AppProviders>,
		);

		getByText("Loading characters...");
	});
});
