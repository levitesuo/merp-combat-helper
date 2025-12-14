import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import type { Weapon } from './tables/weapons';
import Header from './components/Header';
import WeaponSelector from './components/WeaponSelector';
import WeaponDetails from './components/WeaponDetails';
import DiceRollInput from './components/DiceRollInput';
import ResultDisplay from './components/ResultDisplay';
import CombatCard from './components/CombatCard';
import ArmorSelector, { type ArmorType } from './components/ArmorSelector';
import attackTables from './tables/attacks';
import fumbleTables from './tables/fumble';
import criticalTables from './tables/criticals';

// Map weapon categories to attack table names
const getAttackTableName = (category: string | undefined): string => {
	if (!category) return '1-Handed Slashing';
	
	if (category.includes('1-Handed Edged')) return '1-Handed Slashing';
	if (category.includes('1-Handed Concussion')) return '1-Handed Concussion';
	if (category.includes('2-Handed') || category.includes('Pole Arms')) return '2-Handed Weapons';
	if (category.includes('Missile') || category.includes('Bow') || category.includes('Crossbow')) return 'Missile Weapons';
	
	return '1-Handed Slashing'; // default
};

// Get fumble modifier based on weapon category
const getFumbleModifier = (weaponCategory: string[] | undefined): number => {
	console.log('Calculating fumble modifier for categories:', weaponCategory);
	if (!weaponCategory) return 0;
	
	// Hand Arms modifiers (FT-1)
	if (weaponCategory.includes('1-Handed Concussion')) return -20;
	if (weaponCategory.includes('1-Handed Edged')) return -10;
	if (weaponCategory.includes('2-Handed')) {
		// Check if mounted
		if (weaponCategory.includes('Mounted')) return 20;
		return 0;
	}
	if (weaponCategory.includes('Pole Arms')) return 10;
	
	// Missile Weapons modifiers (FT-2)
	if (weaponCategory.includes('Sling')) return -10;
	if (weaponCategory.includes('Short Bow')) return 0;
	if (weaponCategory.includes('Composite')) return 10;
	if (weaponCategory.includes('Long Bow')) return 10;
	if (weaponCategory.includes('Crossbow')) return 20;
	
	return 0;
};

// Get fumble result from table
const getFumbleResult = (roll: number, weaponCategory: string[] | undefined): { effect: string; modifier: number; modifiedRoll: number } => {
	// Determine which fumble table to use
	const isMissile = weaponCategory?.includes('Missile') || weaponCategory?.includes('Bow') || weaponCategory?.includes('Crossbow') || weaponCategory?.includes('Sling');
	const tableName = isMissile ? 'Missile Weapons' : 'Hand Arms';
	const table = fumbleTables[tableName];
	
	if (!table) return { effect: 'No fumble table found', modifier: 0, modifiedRoll: roll };
	
	// Apply fumble modifier
	const modifier = getFumbleModifier(weaponCategory);
	console.log('Fumble modifier:', modifier);
	const modifiedRoll = roll + modifier;
	
	// Find matching range or use edge ranges
	if (modifiedRoll <= table[0].range[1]) {
		return { effect: table[0].effect, modifier, modifiedRoll };
	}
	
	const lastEntry = table[table.length - 1];
	if (modifiedRoll >= lastEntry.range[0]) {
		return { effect: lastEntry.effect, modifier, modifiedRoll };
	}
	
	for (const row of table) {
		const [min, max] = row.range;
		if (modifiedRoll >= min && modifiedRoll <= max) {
			return { effect: row.effect, modifier, modifiedRoll };
		}
	}
	
	return { effect: 'No fumble effect found', modifier, modifiedRoll };
};

// Parse critical type from weapon field (e.g., "Slash", "Puncture(C)", "Crush")
const parseCriticalType = (critString: string | undefined): { type: string; severity: string } => {
	if (!critString || critString === '—') return { type: '', severity: '' };
	
	const match = critString.match(/^([A-Za-z]+)(?:\(([A-E])\))?$/);
	if (match) {
		return { type: match[1], severity: match[2] || 'B' }; // Default to B if not specified
	}
	return { type: critString, severity: 'B' };
};

// Reduce critical severity by two steps for secondary criticals
const reduceCriticalSeverity = (severity: string): string => {
	const severityMap: { [key: string]: string } = {
		'E': 'C',
		'D': 'B',
		'C': 'A',
		'B': 'A', // B reduces to A (can't go lower)
		'A': 'A'  // A stays at A (minimum)
	};
	return severityMap[severity] || 'A';
};

// Get critical result from table
const getCriticalResult = (roll: number, critTypeString: string): { effect: string; hasSecondaryCrit: boolean; secondaryCritSeverity: string } => {
	const parsed = parseCriticalType(critTypeString);
	let tableName = parsed.type;
	
	// Map weapon critical names to table names
	if (tableName === 'Grapple') tableName = 'Grappling';
	if (tableName === 'Unbalance') tableName = 'Unbalancing';
	
	const table = criticalTables[tableName];
	
	if (!table) return { effect: 'No critical table found', hasSecondaryCrit: false, secondaryCritSeverity: '' };
	
	let effectText = '';
	
	// Find matching range or use edge ranges
	if (roll <= table[0].range[1]) {
		effectText = table[0].effect;
	} else {
		const lastEntry = table[table.length - 1];
		if (roll >= lastEntry.range[0]) {
			effectText = lastEntry.effect;
		} else {
			for (const row of table) {
				const [min, max] = row.range;
				if (roll >= min && roll <= max) {
					effectText = row.effect;
					break;
				}
			}
		}
	}
	
	if (!effectText) effectText = 'No critical effect found';
	
	// Check if the effect indicates a secondary critical (e.g., "take a 'C' crush crit")
	const secondaryCritMatch = effectText.match(/(?:take|roll|delivers?)\s+an?\s+['"]([A-E])['"](?:\s+(\w+))?\s+crit/i);
	
	return {
		effect: effectText,
		hasSecondaryCrit: !!secondaryCritMatch,
		secondaryCritSeverity: secondaryCritMatch ? secondaryCritMatch[1] : ''
	};
};

// Get attack result from table based on roll and armor type
const getAttackResult = (
	roll: number, 
	weaponCategory: string | undefined, 
	armorType: ArmorType
): { damage: number; crit: string | null } | 'Fumble' => {
	const tableName = getAttackTableName(weaponCategory);
	const table = attackTables[tableName];
	
	if (!table) {
    alert(`No attack table found for weapon category: ${weaponCategory}`);
		return { damage: 0, crit: null };
	}
	
	// Check if roll is below the lowest range - use lowest range
	const lowestRange = table[0];
	if (roll < lowestRange.range[0]) {
		const result = lowestRange[armorType];
		return result;
	}
	
	// Check if roll is above the highest range - use highest range
	const highestRange = table[table.length - 1];
	if (roll > highestRange.range[1]) {
		const result = highestRange[armorType];
		return result;
	}
	
	// Find the matching range
	for (const row of table) {
		const [min, max] = row.range;
		if (roll >= min && roll <= max) {
			const result = row[armorType];
			return result;
		}
	}
	
	// Fallback to highest range (should not reach here)
	const result = highestRange[armorType];
	return result;
};

function App() {
	const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
	const [selectedArmor, setSelectedArmor] = useState<ArmorType>('none');
	const [diceRoll, setDiceRoll] = useState<string>('');
	const [secondRoll, setSecondRoll] = useState<string>('');
	const [thirdRoll, setThirdRoll] = useState<string>('');
	const [result, setResult] = useState<string>('');
	const [additionalEffect, setAdditionalEffect] = useState<string>('');
	const [secondaryEffect, setSecondaryEffect] = useState<string>('');
	const [showSecondRoll, setShowSecondRoll] = useState<boolean>(false);
	const [showThirdRoll, setShowThirdRoll] = useState<boolean>(false);
	const [secondRollType, setSecondRollType] = useState<'fumble' | 'critical' | null>(null);
	const [primaryCritType, setPrimaryCritType] = useState<string>('');

	const handleWeaponChange = (weapon: Weapon | null) => {
		setSelectedWeapon(weapon);
		setResult('');
		setAdditionalEffect('');
		setSecondaryEffect('');
		setShowSecondRoll(false);
		setShowThirdRoll(false);
		setSecondRoll('');
		setThirdRoll('');
		setSecondRollType(null);
		setPrimaryCritType('');
	};

	const handleCalculate = () => {
		if (!selectedWeapon || !diceRoll) return;
		
		const roll = parseInt(diceRoll);
		if (isNaN(roll)) return;
		
		const attackResult = getAttackResult(roll, selectedWeapon.category, selectedArmor);
		
		let outcome = '';
		
		if (attackResult === 'Fumble') {
			outcome = `Attack Roll: ${roll}\n\n`;
			outcome += `⚠️  FUMBLE!\n`;
			outcome += `    Roll again for fumble effect`;
			setShowSecondRoll(true);
			setSecondRollType('fumble');
			setSecondRoll('');
		} else {
			const { damage, crit } = attackResult;
			outcome = `Attack Roll: ${roll}\n`;
			outcome += `    Damage: ${damage}\n`;
			
			if (crit) {
				outcome += `    Critical: ${crit}\n`;
				outcome += `\n⚔️  Roll again for critical effect!`;
				setShowSecondRoll(true);
				setSecondRollType('critical');
				setSecondRoll('');
			} else {
				outcome += `    Critical: None`;
				setShowSecondRoll(false);
				setSecondRollType(null);
			}
		}
		
		setResult(outcome);
	};

	const handleSecondRollCalculate = () => {
		if (!secondRoll || !secondRollType || !selectedWeapon) return;
		
		const roll = parseInt(secondRoll);
		if (isNaN(roll)) return;

		let effectOutput = '';
		
		if (secondRollType === 'fumble') {
			const fumbleResult = getFumbleResult(roll, [selectedWeapon.category ?? '', selectedWeapon.name]);
			const isMissile = selectedWeapon.category?.includes('Missile') || 
			                  selectedWeapon.category?.includes('Bow') || 
			                  selectedWeapon.category?.includes('Crossbow') || 
			                  selectedWeapon.category?.includes('Sling');
			const fumbleTableType = isMissile ? 'Missile Weapons' : 'Hand Arms';
			
			effectOutput = `Fumble Roll: ${roll}`;
			if (fumbleResult.modifier !== 0) {
				effectOutput += ` ${fumbleResult.modifier > 0 ? '+' : ''}${fumbleResult.modifier} = ${fumbleResult.modifiedRoll}`;
			}
			effectOutput += `\nFumble Table: ${fumbleTableType}`;
			if (fumbleResult.modifier !== 0) {
				effectOutput += `\nWeapon Modifier: ${fumbleResult.modifier > 0 ? '+' : ''}${fumbleResult.modifier}`;
			}
			effectOutput += `\n\n${fumbleResult.effect}`;
			setAdditionalEffect(effectOutput);
		} else if (secondRollType === 'critical') {
			let critType = result.match(/Critical: ([A-E])/)?.[1] || 'E';
			
			// Use primary critical type from weapon
			const primaryCrit = selectedWeapon.primaryCritical || 'Slash';
			const primaryParsed = parseCriticalType(primaryCrit);
			const maxPrimarySeverity = primaryParsed.severity;
			
			// Cap the critical severity at the weapon's max primary critical level
			if (maxPrimarySeverity) {
				const severityOrder = ['A', 'B', 'C', 'D', 'E'];
				const critIndex = severityOrder.indexOf(critType);
				const maxIndex = severityOrder.indexOf(maxPrimarySeverity);
				
				if (critIndex > maxIndex) {
					critType = maxPrimarySeverity;
				}
			}
			
			// Apply critical modifier based on type (possibly capped)
			const critModifiers: { [key: string]: number } = {
				'A': -20,
				'B': -10,
				'C': 0,
				'D': 10,
				'E': 20
			};
			const modifier = critModifiers[critType] || 0;
			const modifiedRoll = roll + modifier;
			
			const critResult = getCriticalResult(modifiedRoll, primaryCrit);
			
			const originalCritType = result.match(/Critical: ([A-E])/)?.[1] || 'B';
			effectOutput = `Primary Critical Roll: ${roll}`;
			if (modifier !== 0) {
				effectOutput += ` ${modifier > 0 ? '+' : ''}${modifier} = ${modifiedRoll}`;
			}
			effectOutput += `\nCritical Severity: ${critType}`;
			if (maxPrimarySeverity && originalCritType !== critType) {
				effectOutput += ` (capped from ${originalCritType} to weapon max: ${maxPrimarySeverity})`;
			}
			effectOutput += `\nCritical Type: ${primaryParsed.type}\n\n`;
			effectOutput += critResult.effect;
			
			setAdditionalEffect(effectOutput);
			
			// Check if we need to roll for secondary critical
			// Only show secondary if: weapon has a secondary critical AND severity is above B (C, D, or E)
			const hasSecondaryCrit = selectedWeapon.secondaryCritical && selectedWeapon.secondaryCritical !== '—';
			const isSeverityAboveB = ['C', 'D', 'E'].includes(critType);
			
			if (hasSecondaryCrit && isSeverityAboveB) {
				setPrimaryCritType(critType);
				setShowThirdRoll(true);
				setSecondaryEffect('');
			} else {
				setShowThirdRoll(false);
				setSecondaryEffect('');
			}
		}
	};

	const handleThirdRollCalculate = () => {
		if (!thirdRoll || !selectedWeapon) return;
		
		const roll = parseInt(thirdRoll);
		if (isNaN(roll)) return;
		
		// Secondary criticals are reduced by two steps
		let reducedSeverity = reduceCriticalSeverity(primaryCritType);
		
		// Check if weapon has a secondary critical with a max level specified
		const secondaryCrit = selectedWeapon.secondaryCritical && selectedWeapon.secondaryCritical !== '—' 
			? selectedWeapon.secondaryCritical 
			: 'Crush';
		
		// Parse secondary critical to check for max level (e.g., "Crush(B)" means max level B)
		const secondaryParsed = parseCriticalType(secondaryCrit);
		const maxSecondarySeverity = secondaryParsed.severity;
		
		// Cap the reduced severity at the weapon's max secondary critical level
		if (maxSecondarySeverity) {
			const severityOrder = ['A', 'B', 'C', 'D', 'E'];
			const reducedIndex = severityOrder.indexOf(reducedSeverity);
			const maxIndex = severityOrder.indexOf(maxSecondarySeverity);
			
			if (reducedIndex > maxIndex) {
				reducedSeverity = maxSecondarySeverity;
			}
		}
		
		// Apply critical modifier for secondary critical (using capped severity)
		const critModifiers: { [key: string]: number } = {
			'A': -20,
			'B': -10,
			'C': 0,
			'D': 10,
			'E': 20
		};
		const modifier = critModifiers[reducedSeverity] || 0;
		const modifiedRoll = roll + modifier;
		
		const critResult = getCriticalResult(modifiedRoll, secondaryCrit);
		
		let effectOutput = `Secondary Critical Roll: ${roll}`;
		if (modifier !== 0) {
			effectOutput += ` ${modifier > 0 ? '+' : ''}${modifier} = ${modifiedRoll}`;
		}
		effectOutput += `\nOriginal Severity: ${primaryCritType} → Reduced to: ${reducedSeverity}`;
		if (maxSecondarySeverity && primaryCritType !== reducedSeverity) {
			effectOutput += ` (capped at weapon max: ${maxSecondarySeverity})`;
		}
		effectOutput += `\nCritical Type: ${secondaryParsed.type}\n\n`;
		effectOutput += critResult.effect;
		
		setSecondaryEffect(effectOutput);
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				background: '#1a0f08',
				backgroundImage: `
					linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
					url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3e884c145049873.6297529878a82.jpg')
				`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
				py: 4,
			}}
		>
			<Container maxWidth="md">
				<Header />

				<CombatCard>
					<WeaponSelector 
						selectedWeapon={selectedWeapon} 
						onWeaponChange={handleWeaponChange}
					/>

					{selectedWeapon && <WeaponDetails weapon={selectedWeapon} />}

					<ArmorSelector
						selectedArmor={selectedArmor}
						onArmorChange={setSelectedArmor}
					/>

				<DiceRollInput
          title='Attack roll (OB):'
					diceRoll={diceRoll}
					onDiceRollChange={setDiceRoll}
					onCalculate={handleCalculate}
					disabled={!selectedWeapon || !diceRoll}
				/>

				{result && (
					<Box sx={{ mt: 3 }}>
						<ResultDisplay result={result} />
					</Box>
				)}

				{showSecondRoll && secondRollType && (
					<Box sx={{ mt: 3 }}>
						<Typography 
							variant="subtitle2" 
							sx={{ 
								mb: 1, 
								color: secondRollType === 'fumble' ? '#d32f2f' : '#f57c00',
								fontWeight: 600 
							}}
						>
							{secondRollType === 'fumble' ? '⚠️ Roll for Fumble Effect' : '⚔️ Roll for Primary Critical Effect'}
						</Typography>
						<DiceRollInput
              title={secondRollType === 'fumble' ? 'Fumble roll only dice:' : 'Primary Critical roll only dice:'}
							diceRoll={secondRoll}
							onDiceRollChange={setSecondRoll}
							onCalculate={handleSecondRollCalculate}
							disabled={!secondRoll}
						/>
					</Box>
				)}

				{additionalEffect && (
					<Box sx={{ mt: 3 }}>
						<Typography 
							variant="h6" 
							sx={{ 
								mb: 2, 
								fontFamily: '"Cinzel", serif',
								color: '#5d4037',
								fontWeight: 600
							}}
						>
							{secondRollType === 'fumble' ? 'Fumble Effect' : 'Primary Critical Effect'}
						</Typography>
						<ResultDisplay result={additionalEffect} />
					</Box>
				)}

				{showThirdRoll && (
					<Box sx={{ mt: 3 }}>
						<Typography 
							variant="subtitle2" 
							sx={{ 
								mb: 1, 
								color: '#ff6f00',
								fontWeight: 600 
							}}
						>
							⚔️⚔️ Roll for Secondary Critical Effect
						</Typography>
						<DiceRollInput
              title='Secondary Critical roll only dice:'
							diceRoll={thirdRoll}
							onDiceRollChange={setThirdRoll}
							onCalculate={handleThirdRollCalculate}
							disabled={!thirdRoll}
						/>
					</Box>
				)}

				{secondaryEffect && (
					<Box sx={{ mt: 3 }}>
						<Typography 
							variant="h6" 
							sx={{ 
								mb: 2, 
								fontFamily: '"Cinzel", serif',
								color: '#5d4037',
								fontWeight: 600
							}}
						>
							Secondary Critical Effect
						</Typography>
						<ResultDisplay result={secondaryEffect} />
					</Box>
				)}
				</CombatCard>

				<Typography
					variant="caption"
					sx={{
						display: 'block',
						textAlign: 'center',
						mt: 3,
						color: '#c9a961',
						fontFamily: '"Cinzel", serif',
					}}
				>
					May the road rise up to meet you
				</Typography>
			</Container>
		</Box>
	);
}

export default App;
