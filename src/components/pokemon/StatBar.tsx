interface StatBarProps {
	name: string;
	value: number;
	maxValue: number;
}

const statNames: Record<string, string> = {
	hp: 'HP',
	attack: 'Attack',
	defense: 'Defense',
	'special-attack': 'Sp. Atk',
	'special-defense': 'Sp. Def',
	speed: 'Speed',
};

const getStatColor = (value: number, maxValue: number) => {
	const percentage = (value / maxValue) * 100;
	if (percentage >= 80) return '#10b981'; // green
	if (percentage >= 60) return '#f59e0b'; // yellow
	if (percentage >= 40) return '#f97316'; // orange
	return '#ef4444'; // red
};

export const StatBar = ({ name, value, maxValue }: StatBarProps) => {
	const percentage = Math.min((value / maxValue) * 100, 100);
	const color = getStatColor(value, maxValue);
	const displayName = statNames[name] || name;

	return (
		<div className='space-y-1'>
			<div className='flex justify-between items-center'>
				<span className='text-sm font-medium text-gray-700 capitalize'>{displayName}</span>
				<span className='text-sm font-bold text-gray-800'>{value}</span>
			</div>
			<div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
				<div
					className='h-full rounded-full transition-all duration-500 ease-out'
					style={{
						width: `${percentage}%`,
						backgroundColor: color,
					}}
				/>
			</div>
		</div>
	);
};
