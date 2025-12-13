import { useState } from 'react';

import {
	Box,
	Card,
	Collapse,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { Weapon } from './tables/weapons';

const WeaponStat = ({ label, value }: { label: string; value?: string | number }) => {
	return (
		<TableRow>
			<TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '35%' }}>
				{label}
			</TableCell>
			<TableCell>{value ?? '—'}</TableCell>
		</TableRow>
	);
};

type WeaponBoxProps = Weapon & {
	selected?: boolean;
	onSelect?: () => void;
};

const WeaponBox = (weapon: WeaponBoxProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Card
			onClick={() => weapon.onSelect && weapon.onSelect()}
			variant="outlined"
			sx={{
				backgroundColor: weapon.selected ? 'rgba(25, 118, 210, 0.06)' : 'transparent',
				margin: { xs: 1, sm: 2 },
				borderRadius: 2,
				cursor: 'pointer',
				px: { xs: 1, sm: 2 },
				py: { xs: 1, sm: 1.5 },
				'&:hover': { boxShadow: 3, transform: 'translateY(-2px)' },
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
				<img
					src={weapon.iconUrl}
					alt={weapon.name}
					width={28}
					height={28}
					style={{ display: 'block' }}
				/>
				<Box sx={{ flex: 1, minWidth: 0 }}>
					<Box
						component="div"
						sx={{
							fontWeight: 600,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{weapon.name}
					</Box>
					<Box component="div" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
						{weapon.category}
					</Box>
				</Box>
				<IconButton
					size="small"
					onClick={(e) => {
						e.stopPropagation();
						setOpen(!open);
					}}
					aria-expanded={open}
					aria-label="show more"
				>
					{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</IconButton>
			</Box>
			<Box sx={{ marginTop: 1 }}>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<TableContainer>
						<Table size="small">
							<TableBody>
								<WeaponStat label="Category" value={weapon.category} />
								<WeaponStat label="Fumble Range" value={weapon.fumbleRange} />
								<WeaponStat label="Primary Critical" value={weapon.primaryCritical} />
								<WeaponStat label="Secondary Critical" value={weapon.secondaryCritical} />
								<WeaponStat label="Base Range" value={weapon.baseRange} />
								<WeaponStat label="Weight (lb)" value={weapon.weightLb} />
								<WeaponStat label="Notes" value={weapon.notes} />
							</TableBody>
						</Table>
					</TableContainer>
				</Collapse>
			</Box>
		</Card>
	);
};

export default WeaponBox;
