import { Character } from "@/types/character";
import { loadFavorites, saveFavorites } from "@/utils/favorites-storage";
import { create } from "zustand";

type FavoritesStore = {
	favorites: Character[];
	isFavorite: (characterId: number) => boolean;
	toggleFavorite: (character: Character) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
	favorites: loadFavorites(),
	isFavorite: (characterId) =>
		get().favorites.some(({ id }) => id === characterId),
	toggleFavorite: (character) => {
		set((state) => {
			const favorites = state.favorites.some(
				({ id }) => id === character.id,
			)
				? state.favorites.filter(({ id }) => id !== character.id)
				: [...state.favorites, character];

			saveFavorites(favorites);

			return { favorites };
		});
	},
}));
