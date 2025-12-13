import { Box, Typography } from '@mui/material';
import oneRingIcon from '../assets/icons8-one-ring.svg';

export default function Header() {
	return (
		<Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 4 } }}>
			<img 
				src={oneRingIcon} 
				alt="The One Ring" 
				style={{ 
					width: 'clamp(50px, 15vw, 80px)', 
					height: 'clamp(50px, 15vw, 80px)', 
					filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' 
				}}
			/>
			<Typography
				variant="h3"
				sx={{
					fontFamily: '"Cinzel", "Times New Roman", serif',
					color: '#d4af37',
					textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
					mt: { xs: 1, sm: 2 },
					mb: { xs: 0.5, sm: 1 },
					fontWeight: 700,
					fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
				}}
			>
				Middle-earth Combat Helper
			</Typography>
			<Typography
				variant="subtitle1"
				sx={{
					fontFamily: '"Cinzel", "Times New Roman", serif',
					color: '#c9a961',
					fontStyle: 'italic',
					fontSize: { xs: '0.875rem', sm: '1rem' },
					display: { xs: 'none', sm: 'block' },
				}}
			>
				"Not all those who wander are lost"
			</Typography>
		</Box>
	);
}
