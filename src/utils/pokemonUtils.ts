import type { EvolutionChain, Pokemon } from '../features/pokemons/pokemon';

export const getTypeColor = (type: string): string => {
	const typeColors: Record<string, string> = {
		normal: '#A8A878',
		fire: '#F08030',
		water: '#6890F0',
		electric: '#F8D030',
		grass: '#78C850',
		ice: '#98D8D8',
		fighting: '#C03028',
		poison: '#A040A0',
		ground: '#E0C068',
		flying: '#A890F0',
		psychic: '#F85888',
		bug: '#A8B820',
		rock: '#B8A038',
		ghost: '#705898',
		dragon: '#7038F8',
		dark: '#705848',
		steel: '#B8B8D0',
		fairy: '#EE99AC',
	};

	return typeColors[type] || '#68A090';
};

export const getWeaknesses = (pokemon: Pokemon): string[] => {
	const weaknesses: string[] = [];
	if (pokemon.types) {
		pokemon.types.forEach((type) => {
			switch (type.type.name) {
				case 'fire':
					weaknesses.push('water', 'ground', 'rock');
					break;
				case 'water':
					weaknesses.push('electric', 'grass');
					break;
				case 'grass':
					weaknesses.push('fire', 'ice', 'poison', 'flying', 'bug');
					break;
				case 'electric':
					weaknesses.push('ground');
					break;
				case 'ground':
					weaknesses.push('water', 'ice', 'grass');
					break;
				case 'rock':
					weaknesses.push('water', 'grass', 'fighting', 'ground', 'steel');
					break;
				case 'fighting':
					weaknesses.push('flying', 'psychic', 'fairy');
					break;
				case 'psychic':
					weaknesses.push('bug', 'ghost', 'dark');
					break;
				case 'bug':
					weaknesses.push('fire', 'flying', 'rock');
					break;
				case 'ice':
					weaknesses.push('fire', 'fighting', 'rock', 'steel');
					break;
				case 'dragon':
					weaknesses.push('ice', 'dragon', 'fairy');
					break;
				case 'fairy':
					weaknesses.push('poison', 'steel');
					break;
				case 'ghost':
					weaknesses.push('ghost', 'dark');
					break;
				case 'dark':
					weaknesses.push('fighting', 'bug', 'fairy');
					break;
				case 'steel':
					weaknesses.push('fire', 'fighting', 'ground');
					break;
				case 'flying':
					weaknesses.push('electric', 'ice', 'rock');
					break;
				case 'poison':
					weaknesses.push('ground', 'psychic');
					break;
				case 'normal':
					weaknesses.push('fighting');
					break;
				default:
					break;
			}
		});
	}

	// Remove duplicates and return
	return [...new Set(weaknesses)];
};

export const formatPokemonId = (id: number): string => {
	return id.toString().padStart(3, '0');
};

export const getSpeciesNames = (chain: EvolutionChain) => {
	const names: Record<string, string | number>[] = [];

	function traverse(node) {
		if (node.species && node.species.name) {
			names.push({
				name: node.species.name,
				min_level: node.evolution_details?.[0]?.min_level ?? null,
			});
		}

		if (Array.isArray(node.evolves_to)) {
			node.evolves_to.forEach((evo) => traverse(evo));
		}
	}

	traverse(chain.chain);
	return names;
};
