import { useNavigate } from 'react-router';
import { memo } from 'react';
import { Card, CardContent } from '../ui/Card';
import { TypeBadge } from './TypeBagde';

import { getTypeColor } from '../../utils/pokemonUtils';

import type { Pokemon } from '../../features/pokemons/pokemon';

type PokemonProps = {
	pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonProps) => {
	const navigate = useNavigate();
	const primaryType = pokemon.types[0].type.name;
	const typeColor = getTypeColor(primaryType);

	return (
		<Card
			className='group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-sm border-0 overflow-hidden'
			onClick={() => navigate(`/pokemon/${pokemon.id}`)}
			style={{
				background: `linear-gradient(135deg, ${typeColor}20 5%, white 50%)`,
			}}>
			<CardContent className='p-4'>
				<div className='relative'>
					{/* Pokemon Number */}
					<div className='absolute top-0 right-0 bg-black/10 rounded-full px-2 py-1 text-xs font-bold text-gray-600'>
						#{pokemon.id.toString().padStart(3, '0')}
					</div>

					{/* Pokemon Image */}
					<div className='w-full h-32 flex items-center justify-center mb-3'>
						<img
							src={
								pokemon?.sprites?.other?.['official-artwork']?.front_default ||
								pokemon.sprites.front_default
							}
							alt={pokemon.name}
							className='w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg'
							loading='lazy'
						/>
					</div>

					{/* Pokemon Name */}
					<h3 className='text-lg font-bold text-gray-800 text-center mb-2 capitalize'>
						{pokemon.name}
					</h3>

					{/* Pokemon Types */}
					<div className='flex justify-center gap-1 flex-wrap'>
						{pokemon.types.map((type) => (
							<TypeBadge key={type.type.name} type={type.type.name} size='sm' />
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default memo(PokemonCard);
