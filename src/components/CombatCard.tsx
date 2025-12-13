import { Paper } from '@mui/material';
import type { ReactNode } from 'react';

interface CombatCardProps {
	children: ReactNode;
}

export default function CombatCard({ children }: CombatCardProps) {
	return (
		<Paper
			elevation={12}
			sx={{
				p: 4,
				background: '#f5f0e8',
				backgroundImage: `
					radial-gradient(at 20% 30%, rgba(210, 180, 140, 0.15) 0%, transparent 50%),
					radial-gradient(at 80% 70%, rgba(205, 170, 125, 0.1) 0%, transparent 50%),
					repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.02) 2px, rgba(139, 69, 19, 0.02) 4px),
					repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.015) 2px, rgba(139, 69, 19, 0.015) 4px)
				`,
				border: '3px solid #8b4513',
				borderRadius: 2,
				boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 20px rgba(255,255,255,0.3), inset 0 -2px 20px rgba(139, 69, 19, 0.1)',
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 12,
					left: 12,
					right: 12,
					bottom: 12,
					border: '1px solid #a0826d',
					borderRadius: 1,
					pointerEvents: 'none',
					opacity: 0.5,
				},
				'&::after': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(210, 180, 140, 0.03) 1px, transparent 2px)',
					pointerEvents: 'none',
					borderRadius: 2,
				}
			}}
		>
			{children}
		</Paper>
	);
}
