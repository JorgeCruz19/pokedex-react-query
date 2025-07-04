import { getSpeciesNames } from '../../utils/pokemonUtils';
import type { EvolutionChain, Pokemon, PokemonSpecies } from './pokemon';

type PokemonResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Pokemon[];
};

type evolution_chain = {
	id: number;
	name: string;
	min_level?: number | null;
	sprites: {
		other: {
			'official-artwork': {
				front_default: string;
			};
		};
		front_default: string;
	};
};

type PokemonWithEvolution = Pokemon & {
	evolution_chain: evolution_chain[];
};

const getAllPokemons = async (page = 0, limit = 12): Promise<PokemonResponse> => {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page * limit}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch pokemons');
	}
	const pokemons = await response.json();
	const data = [];

	for (const pokemon of pokemons.results) {
		const pokemonData = await getPokemonByName(pokemon.name);
		data.push(pokemonData);
	}

	return {
		count: pokemons.count,
		next: pokemons.next,
		previous: pokemons.previous,
		results: data,
	};
};

const getPokemonById = async (id: number): Promise<PokemonWithEvolution> => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch pokemon with id ${id}`);
	}
	const data = await response.json();

	const species = await getPokemonSpecies(data.species.url);
	const evolutionChain = await getPokemonEvolutionChain(species?.evolution_chain?.url);

	const evolutionPokemons = getSpeciesNames(evolutionChain);

	const evolvesArr = [];
	for (const pokemon of evolutionPokemons) {
		const { name, min_level } = pokemon;
		const evolutionSpecies = await getPokemonByName(name as string);
		evolvesArr.push({
			id: evolutionSpecies.id,
			name: evolutionSpecies.name,
			min_level: min_level ?? null,
			sprites: evolutionSpecies.sprites,
		});
	}

	return {
		...data,
		evolution_chain: evolvesArr,
	} as PokemonWithEvolution;
};

const getPokemonByName = async (name: string): Promise<Pokemon> => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch pokemon with name ${name}`);
	}
	const data = await response.json();
	return data;
};

const getPokemonSpecies = async (url: string): Promise<PokemonSpecies> => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch pokemon species from ${url}`);
	}
	const data = await response.json();

	return data;
};

const getPokemonEvolutionChain = async (url: string): Promise<EvolutionChain> => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch pokemon evolution chain from ${url}`);
	}
	const data = await response.json();
	return data;
};

export const pokemonService = {
	getAllPokemons,
	getPokemonById,
	getPokemonByName,
};
