import { Paper, Typography } from '@mui/material';

interface ResultDisplayProps {
	result: string;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
	if (!result) return null;

	return (
		<Paper
			elevation={4}
			sx={{
				p: 3,
				backgroundColor: '#3e2723',
				color: '#d4af37',
				border: '2px solid #d4af37',
				textAlign: 'center',
				animation: 'fadeIn 0.5s ease-in',
				'@keyframes fadeIn': {
					from: { opacity: 0, transform: 'translateY(-10px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				}
			}}
		>
			<Typography
				variant="body1"
				sx={{
					fontFamily: '"Cinzel", serif',
					fontWeight: 600,
					textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
					whiteSpace: 'pre-line',
				}}
			>
				{result}
			</Typography>
		</Paper>
	);
}
