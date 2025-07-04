import { useEffect, useState, useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useGetAllPokemons } from '../../features/pokemons/pokemon.api';
import { pokemonService } from '../../features/pokemons/pokemon.service';

import PokemonCard from './PokemonCard';
import Loading from '../Loading';

import type { Pokemon } from '../../features/pokemons/pokemon';
import ArrowLeft from '../svg/ArrowLeft';
import ArrowRight from '../svg/ArrowRight';
import Alert from '../Alert';
import Search from '../Search';
import useDebounce from '../../hooks/useDebounce';

const LIMIT = 12; // Limit for the API request

const GridPokemon = () => {
	const [searchPokemon, setSearchPokemon] = useState<string>('');
	const valueToSearch = useDebounce(searchPokemon, 500);

	const queryClient = useQueryClient();

	const {
		pokemons,
		isError,
		isLoading,
		error,
		isPlaceholderData,
		totalPages,
		totalEntries,
		currentPage,
		hasNext,
		hasPrevious,
		goToNext,
		goToPrevious,
	} = useGetAllPokemons(LIMIT);

	const filteredPokemons = useMemo(() => {
		if (!pokemons || !valueToSearch) return pokemons;

		return pokemons.filter((pokemon: Pokemon) =>
			pokemon.name.toLowerCase().includes(valueToSearch.toLowerCase())
		);
	}, [pokemons, valueToSearch]);

	const handlePrevious = useCallback(() => {
		goToPrevious();
	}, [goToPrevious]);

	const handleNext = useCallback(() => {
		goToNext();
	}, [goToNext]);

	const handleSearchChange = useCallback((value: string) => {
		setSearchPokemon(value);
	}, []);

	useEffect(() => {
		if (!isPlaceholderData && (pokemons?.length ?? 0) > 0) {
			queryClient.prefetchQuery({
				queryKey: ['pokemons', currentPage + 1, LIMIT],
				queryFn: () => pokemonService.getAllPokemons(currentPage + 1, LIMIT),
			});
		}
	}, [pokemons, isPlaceholderData, currentPage, queryClient]);

	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return <Alert type='danger' message={error?.message ?? 'Error'} />;
	}

	return (
		<>
			<Search searchPokemon={searchPokemon} setSearchPokemon={handleSearchChange} />
			{filteredPokemons?.length === 0 && valueToSearch ? (
				<Alert type='warning' message='No se encontraron Pokémon con ese nombre.' />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
					{filteredPokemons?.map((pokemon: Pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</div>
			)}

			<div className='flex justify-center items-center mt-4 mb-2'>
				<span className='text-sm text-gray-700'>
					Mostrando <span className='font-semibold text-gray-900'>{currentPage}</span> de{' '}
					<span className='font-semibold text-gray-900'>{totalPages} </span> de{' '}
					<span className='font-semibold text-gray-900'>{totalEntries}</span> Entradas
				</span>
			</div>
			<div className='flex justify-center mt-4'>
				<button
					onClick={handlePrevious}
					disabled={currentPage === 0 || !hasPrevious}
					className='flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
					<ArrowLeft />
					Anterior
				</button>
				<button
					onClick={handleNext}
					disabled={isPlaceholderData || !hasNext}
					className='flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
					Siguiente
					<ArrowRight />
				</button>
			</div>
		</>
	);
};

export default GridPokemon;
