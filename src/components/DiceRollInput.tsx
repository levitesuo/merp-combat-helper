import { Box, Button, TextField, Typography } from '@mui/material';

interface DiceRollInputProps {
    title: string;
	diceRoll: string;
	onDiceRollChange: (value: string) => void;
	onCalculate: () => void;
	disabled: boolean;
}

export default function DiceRollInput({ 
    title,
	diceRoll, 
	onDiceRollChange, 
	onCalculate, 
	disabled 
}: DiceRollInputProps) {
	return (
		<Box sx={{ mb: 4 }}>
			<Typography
				variant="h6"
				sx={{
					fontFamily: '"Cinzel", "Times New Roman", serif',
					color: '#5d4037',
					mb: 2,
					fontWeight: 600,
				}}
			>
				Enter Your Dice Roll
			</Typography>
			<Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
				<TextField
					fullWidth
					type="number"
					value={diceRoll}
					onChange={(e) => onDiceRollChange(e.target.value)}
					label={title}
					variant="outlined"
					inputProps={{ min: 1, max: 100 }}
					sx={{ 
						backgroundColor: 'rgba(255,255,255,0.7)',
						flex: 1,
					}}
				/>
				<Button
					variant="contained"
					onClick={onCalculate}
					disabled={disabled}
					sx={{
						fontFamily: '"Cinzel", serif',
						fontSize: '1rem',
						px: 4,
						py: 1.5,
						backgroundColor: '#8b4513',
						color: '#f4e8d0',
						'&:hover': {
							backgroundColor: '#6d3710',
						},
						'&:disabled': {
							backgroundColor: '#ccc',
						}
					}}
				>
					Calculate
				</Button>
			</Box>
		</Box>
	);
}
