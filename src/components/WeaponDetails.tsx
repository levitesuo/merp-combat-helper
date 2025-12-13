import { useState } from 'react';
import { Avatar, Box, Card, Typography, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Weapon } from '../tables/weapons';

interface WeaponDetailsProps {
	weapon: Weapon;
}

export default function WeaponDetails({ weapon }: WeaponDetailsProps) {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			sx={{
				mb: 4,
				p: 2,
				backgroundColor: 'rgba(255,255,255,0.5)',
				border: '2px solid #a0826d',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Avatar src={weapon.iconUrl} alt={weapon.name} sx={{ width: 48, height: 48 }} />
				<Box sx={{ flex: 1 }}>
					<Typography variant="h6" sx={{ fontFamily: '"Cinzel", serif', color: '#5d4037' }}>
						{weapon.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{weapon.category}
					</Typography>
				</Box>
				<IconButton
					onClick={handleExpandClick}
					sx={{
						transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.3s',
						color: '#5d4037',
					}}
					aria-expanded={expanded}
					aria-label="show details"
				>
					<ExpandMoreIcon />
				</IconButton>
			</Box>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1, mt: 2 }}>
					<Typography variant="body2"><strong>Fumble:</strong> {weapon.fumbleRange || '—'}</Typography>
					<Typography variant="body2"><strong>Primary Critical:</strong> {weapon.primaryCritical || '—'}</Typography>
					<Typography variant="body2"><strong>Weight:</strong> {weapon.weightLb ? `${weapon.weightLb} lb` : '—'}</Typography>
					<Typography variant="body2"><strong>Range:</strong> {weapon.baseRange || '—'}</Typography>
				</Box>
				{weapon.notes && (
					<Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: '#6d4c41' }}>
						{weapon.notes}
					</Typography>
				)}
			</Collapse>
		</Card>
	);
}
