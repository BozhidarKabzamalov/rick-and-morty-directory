import "expo-sqlite/localStorage/install";

import { Character } from "@/types/character";

const FAVORITES_KEY = "favorite-characters";

const loadFavorites = (): Character[] => {
	try {
		const value = localStorage.getItem(FAVORITES_KEY);
		return value ? (JSON.parse(value) as Character[]) : [];
	} catch {
		return [];
	}
};

const saveFavorites = (favorites: Character[]): void => {
	localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export { loadFavorites, saveFavorites };
