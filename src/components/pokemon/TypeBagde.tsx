import { Badge } from '../ui/Badge';
import { getTypeColor } from '../../utils/pokemonUtils';

interface TypeBadgeProps {
	type: string;
	size?: 'sm' | 'md';
}

export const TypeBadge = ({ type, size = 'md' }: TypeBadgeProps) => {
	const color = getTypeColor(type);

	return (
		<Badge
			className={`
        capitalize font-medium text-white border-0 shadow-sm
        ${size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'}
      `}
			style={{ backgroundColor: color }}>
			{type}
		</Badge>
	);
};
