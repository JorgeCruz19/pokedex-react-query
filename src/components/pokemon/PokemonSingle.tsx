import { useMemo, useCallback, memo, useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';

import { useGetPokemonById } from '../../features/pokemons/pokemon.api';

import Alert from '../Alert';
import Loading from '../Loading';
import StatCircle from './StatCircles';
import { TypeBadge } from './TypeBagde';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

import { getTypeColor, getWeaknesses } from '../../utils/pokemonUtils';

const getRandomPokemonId = () => Math.floor(Math.random() * 1000) + 1;

// Initialize a stable Pokemon ID outside the component to prevent re-initialization
let initialPokemonId: number | null = null;

const PokemonSingle = () => {
	// Use a stable initial value that doesn't change on re-renders
	const [currentPokemonId, setCurrentPokemonId] = useState(() => {
		if (initialPokemonId === null) {
			initialPokemonId = getRandomPokemonId();
		}
		return initialPokemonId;
	});

	const { pokemon, isLoading, isError, error, refetch } = useGetPokemonById(currentPokemonId);

	// Memoize expensive calculations
	const pokemonData = useMemo(() => {
		if (!pokemon) return null;

		const primaryType = pokemon.types[0]?.type?.name ?? 'water';
		const typeColor = getTypeColor(primaryType);
		const weaknesses = getWeaknesses(pokemon);
		const totalStats = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);

		return {
			primaryType,
			typeColor,
			weaknesses,
			totalStats,
		};
	}, [pokemon]);

	// Memoize refetch callback
	const handleRefetch = useCallback(() => {
		const randomId = getRandomPokemonId();
		setCurrentPokemonId(randomId);
		// Update the external variable to keep it in sync
		initialPokemonId = randomId;
		refetch();
	}, [refetch]);

	// Memoize navigation handlers
	const handlePrevious = useCallback(() => {
		const randomId = getRandomPokemonId();
		setCurrentPokemonId(randomId);
		// Update the external variable to keep it in sync
		initialPokemonId = randomId;
	}, []);

	const handleNext = useCallback(() => {
		const randomId = getRandomPokemonId();
		setCurrentPokemonId(randomId);
		// Update the external variable to keep it in sync
		initialPokemonId = randomId;
	}, []);

	const typeColor = pokemonData?.typeColor ?? getTypeColor('water');

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return (
			<>
				<Alert type='danger' message={error?.message ?? 'Error fetching Pokémon'} />
				<Button variant='outline' onClick={handleRefetch} className='mt-4 w-full'>
					<RefreshCcw className='mr-2 h-4 w-4' />
					Refresh
				</Button>
			</>
		);
	}

	if (!pokemon) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-red-600 mb-2'>Pokémon not found</h2>
					<Button variant='outline' onClick={handleRefetch} className='cursor-pointer'>
						<RefreshCcw className='mr-2 h-4 w-4' />
						Refresh
					</Button>
				</div>
			</div>
		);
	}

	return (
		<Card className='max-w-sm mx-auto bg-white/80 backdrop-blur-sm border-0'>
			<CardContent
				className='relative px-6 pb-2 pt-30 text-center'
				style={{
					background: `linear-gradient(135deg, ${typeColor}20 5%, white 50%)`,
				}}>
				<div className='w-48 h-48 mx-auto mb-4 absolute -top-20 left-0 right-0'>
					<img
						src={
							pokemon.sprites?.other?.['official-artwork']?.front_default ||
							pokemon.sprites?.front_default
						}
						alt={pokemon?.name}
						width={192}
						height={192}
						className='object-contain'
					/>
				</div>
				<div className='text-sm text-gray-500 mb-1'>#{pokemon?.id.toString().padStart(3, '0')}</div>
				<h1 className='text-2xl capitalize font-bold text-gray-900 mb-1'>{pokemon?.name}</h1>
				<div className='flex justify-center gap-2'>
					{pokemon?.types?.map((type) => (
						<TypeBadge key={type.type.name} type={type.type.name} size='sm' />
					))}
				</div>
			</CardContent>

			{/* Pokédex Entry */}
			<CardContent className='px-6 py-2'>
				{/* Abilities */}
				<h2 className='text-sm font-bold text-gray-900 mb-3 tracking-wider'>ABILITIES</h2>
				<div className='flex gap-2 mb-6'>
					{pokemon?.abilities.map((ability) => (
						<Badge
							key={ability.ability?.name}
							variant='outline'
							className='capitalize border-gray-300'>
							{ability.ability?.name.replace('-', ' ')}
						</Badge>
					))}
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-2 gap-4 mb-6'>
					<div>
						<div className='text-xs font-bold text-gray-900 mb-1 tracking-wider'>HEIGHT</div>
						<div className='text-lg font-semibold'>{pokemon?.height}m</div>
					</div>
					<div>
						<div className='text-xs font-bold text-gray-900 mb-1 tracking-wider'>WEIGHT</div>
						<div className='text-lg font-semibold'>{pokemon?.weight}kg</div>
					</div>
					<div>
						<div className='text-xs font-bold text-gray-900 mb-1 tracking-wider'>WEAKNESSES</div>
						<div className='flex gap-1 flex-wrap'>
							{pokemonData?.weaknesses?.map((weakness: string) => (
								<Badge
									key={weakness}
									variant='default'
									className='capitalize text-white font-bold'
									style={{ backgroundColor: getTypeColor(weakness) }}>
									{weakness}
								</Badge>
							))}
						</div>
					</div>
					<div>
						<div className='text-xs font-bold text-gray-900 mb-1 tracking-wider'>BASE EXP</div>
						<div className='text-lg font-semibold'>{pokemon?.base_experience}</div>
					</div>
				</div>

				{/* Detailed Stats */}
				<h2 className='text-sm font-bold text-gray-900 mb-3 tracking-wider'>STATS</h2>
				<div className='grid grid-cols-7 gap-2 text-center mb-6'>
					{pokemon.stats.map((stat) => (
						<StatCircle key={stat.stat.name} name={stat?.stat?.name} value={stat?.base_stat} />
					))}
					<StatCircle key='total' name='total' value={pokemonData?.totalStats ?? 0} />
				</div>

				{/* Evolution */}
				<h2 className='text-sm font-bold text-gray-900 mb-3 tracking-wider'>EVOLUTION</h2>
				<div className='flex items-start justify-center flex-wrap gap-2 mb-6'>
					{pokemon?.evolution_chain?.map((evolution) => (
						<div key={evolution.id} className='text-center'>
							<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2'>
								<img
									src={
										evolution?.sprites?.other?.['official-artwork']?.front_default ||
										evolution?.sprites?.front_default
									}
									alt={evolution?.name}
									width={40}
									height={40}
									className='object-contain'
								/>
							</div>
							{evolution?.min_level ? (
								<div className='text-xs text-gray-600'>Lvl {evolution?.min_level}</div>
							) : null}
						</div>
					))}
				</div>

				{/* Navigation */}
				<div className='flex items-center justify-between text-sm'>
					<Button
						variant='ghost'
						size='sm'
						onClick={handlePrevious}
						className='flex items-center gap-2 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer'>
						<ChevronLeft className='w-4 h-4' />
					</Button>
					<Button
						variant='ghost'
						size='sm'
						onClick={handleNext}
						className='flex items-center gap-2 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer'>
						<ChevronRight className='w-4 h-4' />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default memo(PokemonSingle);
