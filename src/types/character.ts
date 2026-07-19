export type CharactersResponse = {
	info: Info;
	results: Character[];
};

export type Info = {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
};

export type Character = {
	id: number;
	name: string;
	status: CharacterStatus;
	species: string;
	type: string;
	gender: CharacterGender;
	origin: LocationReference;
	location: LocationReference;
	image: string;
	episode: string[];
	url: string;
	created: string;
};

export type LocationReference = {
	name: string;
	url: string;
};

export type CharacterStatus = "Alive" | "Dead" | "unknown";

export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";
