import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { pokemonService } from './pokemon.service';
import { useSearchParams } from 'react-router';
import { useCallback } from 'react';

export const useGetAllPokemons = (limit: number) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 0;

	const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
		queryKey: ['pokemons', currentPage, limit],
		queryFn: () => pokemonService.getAllPokemons(currentPage, limit),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5, // 5 minute
		retry: 3,
		placeholderData: keepPreviousData,
	});

	const totalPages = Math.floor((data?.count || 0) / limit);

	const goToPage = useCallback(
		(page: number) => {
			if (page >= 0 && page <= totalPages) {
				setSearchParams((prev) => {
					const params = new URLSearchParams(prev);
					params.set('page', page.toString());
					return params;
				});
			}
		},
		[totalPages, setSearchParams]
	);

	return {
		pokemons: data?.results,
		currentPage,
		totalPages,
		totalEntries: data?.count || 0,
		goToPage,
		hasNext: data?.next,
		hasPrevious: data?.previous,
		goToNext: () => currentPage < totalPages && goToPage(currentPage + 1),
		goToPrevious: () => currentPage > 0 && goToPage(currentPage - 1),
		isLoading,
		isPlaceholderData,
		isError,
		error,
	};
};

export const useGetPokemonById = (id: number) => {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['pokemon', id],
		queryFn: () => pokemonService.getPokemonById(id),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
		retry: 3,
	});
	return {
		pokemon: data,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export const useGetPokemonByName = (name: string) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['pokemon', name],
		queryFn: () => pokemonService.getPokemonByName(name),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
		retry: 3,
	});
	return {
		pokemon: data,
		isLoading,
		isError,
		error,
	};
};
