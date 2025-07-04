const getStatColors = (statName: string): string => {
	const colors: Record<string, string> = {
		hp: '#FB2C36',
		attack: '#FF6900',
		defense: '#F0B100',
		'special-attack': '#2B7FFF',
		'special-defense': '#00C951',
		speed: '#F6339A',
		total: '#AD46FF',
	};
	return colors[statName] || '#000000';
};

const getStatName = (statName: string): string => {
	const names: Record<string, string> = {
		hp: 'HP',
		attack: 'ATK',
		defense: 'DEF',
		'special-attack': 'SPA',
		'special-defense': 'SPD',
		speed: 'SPE',
		total: 'TOT',
	};
	return names[statName] || statName;
};

type StatCirclesProps = {
	name: string;
	value: number;
};

const StatCircle = ({ name, value }: StatCirclesProps) => {
	return (
		<div className='flex flex-col items-center'>
			<div
				className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mb-1'
				style={{ backgroundColor: getStatColors(name) }}>
				<span className='text-xs font-bold text-white'>{getStatName(name)}</span>
			</div>
			<span className='text-sm font-semibold'>{value}</span>
		</div>
	);
};

export default StatCircle;
