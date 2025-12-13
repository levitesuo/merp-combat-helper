import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export type ArmorType = 'plate' | 'chain' | 'rigidLeather' | 'softLeather' | 'none';

interface ArmorSelectorProps {
	selectedArmor: ArmorType;
	onArmorChange: (armor: ArmorType) => void;
}

const armorOptions: { value: ArmorType; label: string }[] = [
	{ value: 'plate', label: 'Plate Armor' },
	{ value: 'chain', label: 'Chain Mail' },
	{ value: 'rigidLeather', label: 'Rigid Leather' },
	{ value: 'softLeather', label: 'Soft Leather' },
	{ value: 'none', label: 'No Armor' },
];

function ArmorSelector({ selectedArmor, onArmorChange }: ArmorSelectorProps) {
	const handleChange = (event: SelectChangeEvent<ArmorType>) => {
		onArmorChange(event.target.value as ArmorType);
	};

	return (
		<Box sx={{ mt: 3 }}>
			<FormControl fullWidth>
				<InputLabel 
					id="armor-select-label"
					sx={{
						fontFamily: '"Cinzel", serif',
						color: '#8b7355',
						'&.Mui-focused': {
							color: '#d4af37',
						},
					}}
				>
					Enemy Armor
				</InputLabel>
				<Select
					labelId="armor-select-label"
					id="armor-select"
					value={selectedArmor}
					label="Enemy Armor"
					onChange={handleChange}
					sx={{
						fontFamily: '"Cinzel", serif',
						color: '#3e2723',
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: '#8b7355',
							borderWidth: 2,
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: '#c9a961',
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: '#d4af37',
						},
						backgroundColor: 'rgba(255, 255, 255, 0.3)',
					}}
				>
					{armorOptions.map((option) => (
						<MenuItem 
							key={option.value} 
							value={option.value}
							sx={{
								fontFamily: '"Cinzel", serif',
								color: '#3e2723',
							}}
						>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}

export default ArmorSelector;
