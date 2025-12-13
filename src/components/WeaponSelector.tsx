import {
	Autocomplete,
	Avatar,
	Box,
	ListItem,
	ListItemAvatar,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import weapons, { type Weapon } from '../tables/weapons';

interface WeaponSelectorProps {
	selectedWeapon: Weapon | null;
	onWeaponChange: (weapon: Weapon | null) => void;
}

export default function WeaponSelector({ selectedWeapon, onWeaponChange }: WeaponSelectorProps) {
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
				Choose Your Weapon
			</Typography>
			<Autocomplete
				options={weapons}
				getOptionLabel={(option) => option.name}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				value={selectedWeapon}
				onChange={(_, value) => onWeaponChange(value)}
				sx={{ 
					backgroundColor: 'rgba(255,255,255,0.7)',
					borderRadius: 1,
				}}
				renderOption={(props, option) => (
					<ListItem {...props} key={option.id}>
						<ListItemAvatar>
							<Avatar src={option.iconUrl} alt={option.name} />
						</ListItemAvatar>
						<ListItemText primary={option.name} secondary={option.category} />
					</ListItem>
				)}
				renderInput={(params) => (
					<TextField 
						{...params} 
						label="Select your weapon" 
						variant="outlined"
					/>
				)}
			/>
		</Box>
	);
}
