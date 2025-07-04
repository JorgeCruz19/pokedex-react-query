import { memo, useCallback } from 'react';

type SearchProps = {
	searchPokemon: string;
	setSearchPokemon: (value: string) => void;
};

const Search = ({ searchPokemon, setSearchPokemon }: SearchProps) => {
	const handleSearchClick = useCallback(() => {
		// Focus the input field when search button is clicked
		const searchInput = document.getElementById('search') as HTMLInputElement;
		if (searchInput) {
			searchInput.focus();
		}
	}, []);

	return (
		<div className='relative mb-10'>
			<input
				type='search'
				id='search'
				value={searchPokemon}
				onChange={(e) => setSearchPokemon(e.target.value)}
				className='bg-white border border-white text-gray-500 text-sm rounded-lg shadow-md outline-0 focus:ring-[#FF5350] focus:border-[#FF5350] block w-full px-4 py-6'
				placeholder='Search your Pokémon!'
				required
			/>
			<button
				onClick={handleSearchClick}
				className='absolute top-1/2 -translate-1/2 right-0 rounded-sm p-1 bg-[#FF5350] shadow-lg shadow-[#FF5350]/50 cursor-pointer'>
				<svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-white' viewBox='0 0 24 24'>
					<path
						fill='currentColor'
						d='M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3s3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3s-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2'
					/>
				</svg>
			</button>
		</div>
	);
};

export default memo(Search);
