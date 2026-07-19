import axiosInstance from "@/axiosInstance";
import { Character, CharactersResponse } from "@/types/character";
import {
	keepPreviousData,
	useInfiniteQuery,
	useQuery,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";

type GetCharactersParams = {
	pageParam?: number;
	name?: string;
};

export const getCharacters = async ({
	pageParam = 1,
	name = "",
}: GetCharactersParams = {}) => {
	const params: Record<string, string | number> = { page: pageParam };

	if (name.trim()) {
		params.name = name.trim();
	}

	try {
		const { data } = await axiosInstance.get<CharactersResponse>(
			"/character",
			{ params },
		);

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 404) {
			return {
				info: { count: 0, pages: 0, next: null, prev: null },
				results: [],
			};
		}

		throw error;
	}
};

export const useGetCharacters = (name = "") => {
	return useInfiniteQuery({
		queryKey: ["characters", name],
		queryFn: ({ pageParam }) => getCharacters({ pageParam, name }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = allPages.length + 1;

			return nextPage <= lastPage.info.pages ? nextPage : undefined;
		},
		placeholderData: keepPreviousData,
	});
};

export const getCharacter = async (id: string | number) => {
	const { data } = await axiosInstance.get<Character>(`/character/${id}`);

	return data;
};

export const useGetCharacter = (id: string) => {
	return useQuery({
		queryKey: ["character", id],
		queryFn: () => getCharacter(id),
		enabled: Boolean(id),
	});
};
