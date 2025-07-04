import { useParams } from 'react-router';
import PokemonDetail from '../components/pokemon/PokemonDetail';

import { useGetPokemonById } from '../features/pokemons/pokemon.api';

const Pokemon = () => {
	const params = useParams<{ id: string }>();

	const { pokemon, error, isError, isLoading } = useGetPokemonById(parseInt(params.id ?? '1'));

	return (
		<PokemonDetail
			pokemon={pokemon ?? null}
			isLoading={isLoading}
			isError={isError}
			error={error ?? new Error('Unknown error')}
		/>
	);
};

export default Pokemon;
