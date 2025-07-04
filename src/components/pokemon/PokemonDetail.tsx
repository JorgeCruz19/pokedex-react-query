import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Heart, Ruler, Weight } from 'lucide-react';

import { TypeBadge } from './TypeBagde';
import { Card, CardContent } from '../ui/Card';
import { StatBar } from './StatBar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getTypeColor } from '../../utils/pokemonUtils';
import type { Pokemon } from '@/features/pokemons/pokemon';
import Loading from '../Loading';
import Alert from '../Alert';

type PokemonDetailProps = {
	pokemon: Pokemon | null;
	isLoading: boolean;
	isError: boolean;
	error: Error;
};

const PokemonDetail = ({ pokemon, isLoading, isError, error }: PokemonDetailProps) => {
	const navigate = useNavigate();
	const [isFavorite, setIsFavorite] = useState(false);

	if (isLoading) {
		return (
			<div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50'>
				<Loading />
			</div>
		);
	}

	if (isError) {
		return <Alert type='danger' message={error?.message ?? 'Error'} />;
	}

	if (!pokemon) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-red-600 mb-2'>Pokémon not found</h2>
					<Button onClick={() => navigate('/')} variant='outline'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to Pokédex
					</Button>
				</div>
			</div>
		);
	}

	const primaryType = pokemon?.types[0]?.type?.name;
	const typeColor = getTypeColor(primaryType ?? '');

	return (
		<div
			className='min-h-screen'
			style={{ background: `linear-gradient(135deg, ${typeColor}20 0%, ${typeColor}10 100%)` }}>
			{/* Header */}
			<header className='relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent'></div>
				<div className='relative max-w-4xl mx-auto px-4 py-6'>
					<div className='flex items-center justify-between mb-6'>
						<Button
							onClick={() => navigate(-1)}
							variant='ghost'
							size='sm'
							className='text-gray-700 cursor-pointer hover:text-gray-900 bg-white/80 hover:bg-white/90'>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Back
						</Button>
						<div className='flex gap-2'>
							<Button
								onClick={() => setIsFavorite(!isFavorite)}
								variant='ghost'
								size='sm'
								className={`${
									isFavorite ? 'text-red-500' : 'text-gray-700'
								} bg-white/80 hover:bg-white/90 cursor-pointer`}>
								<Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
							</Button>
						</div>
					</div>

					{/* Pokemon Header Info */}
					<div className='flex flex-col md:flex-row items-center gap-8'>
						<div className='relative'>
							<div className='w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl'>
								<img
									src={
										pokemon?.sprites.other?.['official-artwork']?.front_default ||
										pokemon?.sprites.front_default
									}
									alt={pokemon?.name}
									className='w-40 h-40 object-contain drop-shadow-lg'
								/>
							</div>
							<div className='absolute -top-2 -right-2 bg-white/90 rounded-full px-3 py-1 text-sm font-bold text-gray-700'>
								#{pokemon?.id.toString().padStart(3, '0')}
							</div>
						</div>

						<div className='text-center md:text-left'>
							<h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-2 capitalize'>
								{pokemon?.name}
							</h1>
							<div className='flex flex-wrap justify-center md:justify-start gap-2 mb-4'>
								{pokemon?.types.map((type) => (
									<TypeBadge key={type.type.name} type={type.type.name} />
								))}
							</div>
							<p className='text-gray-700 max-w-md'>
								{pokemon?.flavor_text || 'A mysterious and powerful Pokémon with unique abilities.'}
							</p>
						</div>
					</div>
				</div>
			</header>

			{/* Content */}
			<div className='max-w-4xl mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Basic Info */}
					<Card className='bg-white/80 backdrop-blur-sm shadow-lg border-0'>
						<CardContent className='p-6'>
							<h3 className='text-xl font-bold text-gray-800 mb-4'>Basic Information</h3>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
											<Ruler className='h-5 w-5 text-blue-600' />
										</div>
										<div>
											<p className='text-sm text-gray-600'>Height</p>
											<p className='font-semibold'>{pokemon?.height / 10} m</p>
										</div>
									</div>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
											<Weight className='h-5 w-5 text-green-600' />
										</div>
										<div>
											<p className='text-sm text-gray-600'>Weight</p>
											<p className='font-semibold'>{pokemon?.weight / 10} kg</p>
										</div>
									</div>
								</div>
								<div>
									<p className='text-sm text-gray-600 mb-2'>Abilities</p>
									<div className='flex flex-wrap gap-2'>
										{pokemon?.abilities.map((ability) => (
											<Badge key={ability.ability?.name} variant='secondary' className='capitalize'>
												{ability.ability?.name.replace('-', ' ')}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Stats */}
					<Card className='bg-white/80 backdrop-blur-sm shadow-lg border-0'>
						<CardContent className='p-6'>
							<h3 className='text-xl font-bold text-gray-800 mb-4'>Base Stats</h3>
							<div className='space-y-4'>
								{pokemon?.stats.map((stat) => (
									<StatBar
										key={stat.stat.name}
										name={stat.stat.name}
										value={stat.base_stat}
										maxValue={255}
									/>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetail;
