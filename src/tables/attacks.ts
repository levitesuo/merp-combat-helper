export interface AttackResultValue {
	damage: number;
	crit: string | null;
}

export interface AttackResult {
	range: [number, number];
	plate: AttackResultValue | 'Fumble';
	chain: AttackResultValue | 'Fumble';
	rigidLeather: AttackResultValue | 'Fumble';
	softLeather: AttackResultValue | 'Fumble';
	none: AttackResultValue | 'Fumble';
}

export interface AttackTables {
	[key: string]: AttackResult[];
}

const attackTables: AttackTables = {
	'1-Handed Slashing': [
		{ range: [1, 8], plate: 'Fumble', chain: 'Fumble', rigidLeather: 'Fumble', softLeather: 'Fumble', none: 'Fumble' },
		{ range: [9, 45], plate: { damage: 0, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [46, 50], plate: { damage: 1, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [51, 55], plate: { damage: 1, crit: null }, chain: { damage: 1, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [56, 60], plate: { damage: 2, crit: null }, chain: { damage: 1, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [61, 65], plate: { damage: 2, crit: null }, chain: { damage: 2, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [66, 70], plate: { damage: 3, crit: null }, chain: { damage: 3, crit: null }, rigidLeather: { damage: 2, crit: null }, softLeather: { damage: 3, crit: null }, none: { damage: 0, crit: null } },
		{ range: [71, 75], plate: { damage: 3, crit: null }, chain: { damage: 4, crit: null }, rigidLeather: { damage: 3, crit: null }, softLeather: { damage: 5, crit: null }, none: { damage: 0, crit: null } },
		{ range: [76, 80], plate: { damage: 4, crit: null }, chain: { damage: 5, crit: null }, rigidLeather: { damage: 5, crit: null }, softLeather: { damage: 7, crit: 'A' }, none: { damage: 7, crit: null } },
		{ range: [81, 85], plate: { damage: 5, crit: null }, chain: { damage: 6, crit: null }, rigidLeather: { damage: 6, crit: null }, softLeather: { damage: 9, crit: 'A' }, none: { damage: 9, crit: 'A' } },
		{ range: [86, 90], plate: { damage: 5, crit: null }, chain: { damage: 7, crit: null }, rigidLeather: { damage: 7, crit: 'A' }, softLeather: { damage: 10, crit: 'B' }, none: { damage: 10, crit: 'A' } },
		{ range: [91, 95], plate: { damage: 6, crit: null }, chain: { damage: 8, crit: null }, rigidLeather: { damage: 9, crit: 'A' }, softLeather: { damage: 12, crit: 'B' }, none: { damage: 11, crit: 'B' } },
		{ range: [96, 100], plate: { damage: 6, crit: null }, chain: { damage: 9, crit: null }, rigidLeather: { damage: 10, crit: 'B' }, softLeather: { damage: 13, crit: 'B' }, none: { damage: 13, crit: 'C' } },
		{ range: [101, 105], plate: { damage: 7, crit: null }, chain: { damage: 10, crit: 'A' }, rigidLeather: { damage: 11, crit: 'B' }, softLeather: { damage: 14, crit: 'C' }, none: { damage: 15, crit: 'C' } },
		{ range: [106, 110], plate: { damage: 8, crit: null }, chain: { damage: 11, crit: 'A' }, rigidLeather: { damage: 12, crit: 'B' }, softLeather: { damage: 15, crit: 'C' }, none: { damage: 17, crit: 'D' } },
		{ range: [111, 115], plate: { damage: 8, crit: 'A' }, chain: { damage: 12, crit: 'B' }, rigidLeather: { damage: 13, crit: 'C' }, softLeather: { damage: 17, crit: 'C' }, none: { damage: 19, crit: 'D' } },
		{ range: [116, 120], plate: { damage: 9, crit: 'A' }, chain: { damage: 13, crit: 'B' }, rigidLeather: { damage: 15, crit: 'C' }, softLeather: { damage: 18, crit: 'D' }, none: { damage: 20, crit: 'D' } },
		{ range: [121, 125], plate: { damage: 9, crit: 'A' }, chain: { damage: 13, crit: 'C' }, rigidLeather: { damage: 16, crit: 'C' }, softLeather: { damage: 19, crit: 'D' }, none: { damage: 21, crit: 'E' } },
		{ range: [126, 130], plate: { damage: 10, crit: 'B' }, chain: { damage: 14, crit: 'C' }, rigidLeather: { damage: 17, crit: 'D' }, softLeather: { damage: 20, crit: 'D' }, none: { damage: 23, crit: 'E' } },
		{ range: [131, 135], plate: { damage: 11, crit: 'B' }, chain: { damage: 15, crit: 'C' }, rigidLeather: { damage: 18, crit: 'D' }, softLeather: { damage: 22, crit: 'D' }, none: { damage: 25, crit: 'E' } },
		{ range: [136, 140], plate: { damage: 11, crit: 'C' }, chain: { damage: 16, crit: 'D' }, rigidLeather: { damage: 20, crit: 'D' }, softLeather: { damage: 23, crit: 'E' }, none: { damage: 27, crit: 'E' } },
		{ range: [141, 145], plate: { damage: 12, crit: 'D' }, chain: { damage: 17, crit: 'D' }, rigidLeather: { damage: 21, crit: 'E' }, softLeather: { damage: 24, crit: 'E' }, none: { damage: 28, crit: 'E' } },
		{ range: [146, 150], plate: { damage: 12, crit: 'E' }, chain: { damage: 18, crit: 'E' }, rigidLeather: { damage: 22, crit: 'E' }, softLeather: { damage: 25, crit: 'E' }, none: { damage: 30, crit: 'E' } }
	],
	'1-Handed Concussion': [
		{ range: [1, 8], plate: 'Fumble', chain: 'Fumble', rigidLeather: 'Fumble', softLeather: 'Fumble', none: 'Fumble' },
		{ range: [9, 30], plate: { damage: 0, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [36, 40], plate: { damage: 1, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [41, 45], plate: { damage: 1, crit: null }, chain: { damage: 1, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [46, 50], plate: { damage: 2, crit: null }, chain: { damage: 2, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [51, 55], plate: { damage: 3, crit: null }, chain: { damage: 3, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [56, 60], plate: { damage: 3, crit: null }, chain: { damage: 4, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [61, 65], plate: { damage: 4, crit: null }, chain: { damage: 5, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [66, 70], plate: { damage: 5, crit: null }, chain: { damage: 6, crit: null }, rigidLeather: { damage: 2, crit: null }, softLeather: { damage: 3, crit: null }, none: { damage: 0, crit: null } },
		{ range: [71, 75], plate: { damage: 5, crit: null }, chain: { damage: 7, crit: null }, rigidLeather: { damage: 3, crit: null }, softLeather: { damage: 5, crit: null }, none: { damage: 0, crit: null } },
		{ range: [76, 80], plate: { damage: 6, crit: null }, chain: { damage: 8, crit: null }, rigidLeather: { damage: 4, crit: null }, softLeather: { damage: 6, crit: null }, none: { damage: 0, crit: null } },
		{ range: [81, 85], plate: { damage: 7, crit: null }, chain: { damage: 9, crit: null }, rigidLeather: { damage: 6, crit: null }, softLeather: { damage: 7, crit: 'A' }, none: { damage: 6, crit: null } },
		{ range: [86, 90], plate: { damage: 8, crit: null }, chain: { damage: 10, crit: null }, rigidLeather: { damage: 7, crit: 'A' }, softLeather: { damage: 8, crit: 'A' }, none: { damage: 8, crit: null } },
		{ range: [91, 95], plate: { damage: 8, crit: null }, chain: { damage: 11, crit: null }, rigidLeather: { damage: 8, crit: 'A' }, softLeather: { damage: 9, crit: 'A' }, none: { damage: 9, crit: 'A' } },
		{ range: [96, 100], plate: { damage: 9, crit: null }, chain: { damage: 12, crit: 'A' }, rigidLeather: { damage: 9, crit: 'B' }, softLeather: { damage: 10, crit: 'B' }, none: { damage: 10, crit: 'B' } },
		{ range: [101, 105], plate: { damage: 10, crit: null }, chain: { damage: 13, crit: 'A' }, rigidLeather: { damage: 10, crit: 'B' }, softLeather: { damage: 11, crit: 'B' }, none: { damage: 12, crit: 'C' } },
		{ range: [106, 110], plate: { damage: 10, crit: 'A' }, chain: { damage: 14, crit: 'B' }, rigidLeather: { damage: 11, crit: 'B' }, softLeather: { damage: 12, crit: 'B' }, none: { damage: 13, crit: 'C' } },
		{ range: [111, 115], plate: { damage: 11, crit: 'A' }, chain: { damage: 15, crit: 'B' }, rigidLeather: { damage: 12, crit: 'C' }, softLeather: { damage: 13, crit: 'C' }, none: { damage: 14, crit: 'D' } },
		{ range: [116, 120], plate: { damage: 12, crit: 'B' }, chain: { damage: 16, crit: 'C' }, rigidLeather: { damage: 13, crit: 'C' }, softLeather: { damage: 14, crit: 'C' }, none: { damage: 15, crit: 'D' } },
		{ range: [121, 125], plate: { damage: 13, crit: 'B' }, chain: { damage: 17, crit: 'C' }, rigidLeather: { damage: 15, crit: 'C' }, softLeather: { damage: 15, crit: 'C' }, none: { damage: 17, crit: 'D' } },
		{ range: [126, 130], plate: { damage: 13, crit: 'C' }, chain: { damage: 18, crit: 'C' }, rigidLeather: { damage: 16, crit: 'C' }, softLeather: { damage: 16, crit: 'D' }, none: { damage: 18, crit: 'E' } },
		{ range: [131, 135], plate: { damage: 14, crit: 'C' }, chain: { damage: 19, crit: 'D' }, rigidLeather: { damage: 17, crit: 'D' }, softLeather: { damage: 17, crit: 'D' }, none: { damage: 19, crit: 'E' } },
		{ range: [136, 140], plate: { damage: 15, crit: 'D' }, chain: { damage: 20, crit: 'D' }, rigidLeather: { damage: 18, crit: 'D' }, softLeather: { damage: 18, crit: 'E' }, none: { damage: 21, crit: 'E' } },
		{ range: [141, 145], plate: { damage: 16, crit: 'D' }, chain: { damage: 21, crit: 'E' }, rigidLeather: { damage: 19, crit: 'E' }, softLeather: { damage: 19, crit: 'E' }, none: { damage: 22, crit: 'E' } },
		{ range: [146, 150], plate: { damage: 16, crit: 'E' }, chain: { damage: 22, crit: 'E' }, rigidLeather: { damage: 20, crit: 'E' }, softLeather: { damage: 20, crit: 'E' }, none: { damage: 23, crit: 'E' } }
	],
	'2-Handed Weapons': [
		{ range: [1, 8], plate: 'Fumble', chain: 'Fumble', rigidLeather: 'Fumble', softLeather: 'Fumble', none: 'Fumble' },
		{ range: [9, 55], plate: { damage: 0, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [56, 60], plate: { damage: 2, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [61, 65], plate: { damage: 3, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [66, 70], plate: { damage: 4, crit: null }, chain: { damage: 3, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 6, crit: null }, none: { damage: 0, crit: null } },
		{ range: [71, 75], plate: { damage: 5, crit: null }, chain: { damage: 5, crit: null }, rigidLeather: { damage: 2, crit: null }, softLeather: { damage: 8, crit: 'A' }, none: { damage: 0, crit: null } },
		{ range: [76, 80], plate: { damage: 6, crit: null }, chain: { damage: 7, crit: null }, rigidLeather: { damage: 4, crit: 'A' }, softLeather: { damage: 10, crit: 'A' }, none: { damage: 0, crit: null } },
		{ range: [81, 85], plate: { damage: 7, crit: null }, chain: { damage: 9, crit: null }, rigidLeather: { damage: 7, crit: 'A' }, softLeather: { damage: 13, crit: 'B' }, none: { damage: 10, crit: 'A' } },
		{ range: [86, 90], plate: { damage: 8, crit: null }, chain: { damage: 11, crit: null }, rigidLeather: { damage: 9, crit: 'B' }, softLeather: { damage: 15, crit: 'B' }, none: { damage: 13, crit: 'B' } },
		{ range: [91, 95], plate: { damage: 9, crit: null }, chain: { damage: 12, crit: 'A' }, rigidLeather: { damage: 12, crit: 'B' }, softLeather: { damage: 17, crit: 'C' }, none: { damage: 16, crit: 'C' } },
		{ range: [96, 100], plate: { damage: 11, crit: null }, chain: { damage: 14, crit: 'A' }, rigidLeather: { damage: 14, crit: 'C' }, softLeather: { damage: 20, crit: 'C' }, none: { damage: 19, crit: 'D' } },
		{ range: [101, 105], plate: { damage: 12, crit: 'A' }, chain: { damage: 16, crit: 'B' }, rigidLeather: { damage: 17, crit: 'C' }, softLeather: { damage: 22, crit: 'C' }, none: { damage: 22, crit: 'D' } },
		{ range: [106, 110], plate: { damage: 13, crit: 'A' }, chain: { damage: 18, crit: 'B' }, rigidLeather: { damage: 19, crit: 'C' }, softLeather: { damage: 24, crit: 'C' }, none: { damage: 25, crit: 'D' } },
		{ range: [111, 115], plate: { damage: 14, crit: 'B' }, chain: { damage: 20, crit: 'C' }, rigidLeather: { damage: 22, crit: 'C' }, softLeather: { damage: 27, crit: 'D' }, none: { damage: 28, crit: 'E' } },
		{ range: [116, 120], plate: { damage: 15, crit: 'B' }, chain: { damage: 22, crit: 'C' }, rigidLeather: { damage: 24, crit: 'D' }, softLeather: { damage: 29, crit: 'D' }, none: { damage: 31, crit: 'E' } },
		{ range: [121, 125], plate: { damage: 16, crit: 'C' }, chain: { damage: 24, crit: 'C' }, rigidLeather: { damage: 27, crit: 'D' }, softLeather: { damage: 31, crit: 'D' }, none: { damage: 33, crit: 'E' } },
		{ range: [126, 130], plate: { damage: 17, crit: 'C' }, chain: { damage: 26, crit: 'D' }, rigidLeather: { damage: 29, crit: 'D' }, softLeather: { damage: 33, crit: 'E' }, none: { damage: 36, crit: 'E' } },
		{ range: [131, 135], plate: { damage: 19, crit: 'D' }, chain: { damage: 28, crit: 'D' }, rigidLeather: { damage: 32, crit: 'E' }, softLeather: { damage: 36, crit: 'E' }, none: { damage: 39, crit: 'E' } },
		{ range: [136, 140], plate: { damage: 20, crit: 'D' }, chain: { damage: 29, crit: 'E' }, rigidLeather: { damage: 34, crit: 'E' }, softLeather: { damage: 38, crit: 'E' }, none: { damage: 42, crit: 'E' } },
		{ range: [141, 145], plate: { damage: 21, crit: 'E' }, chain: { damage: 31, crit: 'E' }, rigidLeather: { damage: 37, crit: 'E' }, softLeather: { damage: 40, crit: 'E' }, none: { damage: 45, crit: 'E' } },
		{ range: [146, 150], plate: { damage: 22, crit: 'E' }, chain: { damage: 33, crit: 'E' }, rigidLeather: { damage: 40, crit: 'E' }, softLeather: { damage: 43, crit: 'E' }, none: { damage: 48, crit: 'E' } }
	],
	'Missile Weapons': [
		{ range: [1, 8], plate: 'Fumble', chain: 'Fumble', rigidLeather: 'Fumble', softLeather: 'Fumble', none: 'Fumble' },
		{ range: [9, 70], plate: { damage: 0, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [71, 75], plate: { damage: 1, crit: null }, chain: { damage: 0, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 0, crit: null }, none: { damage: 0, crit: null } },
		{ range: [76, 80], plate: { damage: 2, crit: null }, chain: { damage: 2, crit: null }, rigidLeather: { damage: 0, crit: null }, softLeather: { damage: 4, crit: null }, none: { damage: 0, crit: null } },
		{ range: [81, 85], plate: { damage: 3, crit: null }, chain: { damage: 4, crit: null }, rigidLeather: { damage: 3, crit: null }, softLeather: { damage: 6, crit: null }, none: { damage: 0, crit: null } },
		{ range: [86, 90], plate: { damage: 4, crit: null }, chain: { damage: 6, crit: null }, rigidLeather: { damage: 5, crit: null }, softLeather: { damage: 8, crit: 'A' }, none: { damage: 0, crit: null } },
		{ range: [91, 95], plate: { damage: 5, crit: null }, chain: { damage: 7, crit: null }, rigidLeather: { damage: 7, crit: 'A' }, softLeather: { damage: 10, crit: 'A' }, none: { damage: 8, crit: 'A' } },
		{ range: [96, 100], plate: { damage: 6, crit: null }, chain: { damage: 8, crit: 'A' }, rigidLeather: { damage: 9, crit: 'A' }, softLeather: { damage: 12, crit: 'B' }, none: { damage: 10, crit: 'B' } },
		{ range: [101, 105], plate: { damage: 7, crit: null }, chain: { damage: 10, crit: 'A' }, rigidLeather: { damage: 10, crit: 'B' }, softLeather: { damage: 13, crit: 'B' }, none: { damage: 11, crit: 'C' } },
		{ range: [106, 110], plate: { damage: 8, crit: 'A' }, chain: { damage: 13, crit: 'B' }, rigidLeather: { damage: 12, crit: 'B' }, softLeather: { damage: 14, crit: 'B' }, none: { damage: 13, crit: 'C' } },
		{ range: [111, 115], plate: { damage: 9, crit: 'A' }, chain: { damage: 14, crit: 'B' }, rigidLeather: { damage: 13, crit: 'B' }, softLeather: { damage: 16, crit: 'C' }, none: { damage: 15, crit: 'C' } },
		{ range: [116, 120], plate: { damage: 10, crit: 'A' }, chain: { damage: 16, crit: 'B' }, rigidLeather: { damage: 15, crit: 'C' }, softLeather: { damage: 17, crit: 'C' }, none: { damage: 16, crit: 'D' } },
		{ range: [121, 125], plate: { damage: 11, crit: 'B' }, chain: { damage: 17, crit: 'C' }, rigidLeather: { damage: 17, crit: 'C' }, softLeather: { damage: 19, crit: 'D' }, none: { damage: 18, crit: 'D' } },
		{ range: [126, 130], plate: { damage: 11, crit: 'B' }, chain: { damage: 19, crit: 'C' }, rigidLeather: { damage: 19, crit: 'D' }, softLeather: { damage: 20, crit: 'D' }, none: { damage: 20, crit: 'D' } },
		{ range: [131, 135], plate: { damage: 12, crit: 'C' }, chain: { damage: 20, crit: 'D' }, rigidLeather: { damage: 21, crit: 'D' }, softLeather: { damage: 22, crit: 'D' }, none: { damage: 22, crit: 'E' } },
		{ range: [136, 140], plate: { damage: 13, crit: 'C' }, chain: { damage: 22, crit: 'D' }, rigidLeather: { damage: 23, crit: 'D' }, softLeather: { damage: 23, crit: 'E' }, none: { damage: 23, crit: 'E' } },
		{ range: [141, 145], plate: { damage: 14, crit: 'D' }, chain: { damage: 23, crit: 'E' }, rigidLeather: { damage: 25, crit: 'E' }, softLeather: { damage: 25, crit: 'E' }, none: { damage: 25, crit: 'E' } },
		{ range: [146, 150], plate: { damage: 15, crit: 'E' }, chain: { damage: 25, crit: 'E' }, rigidLeather: { damage: 26, crit: 'E' }, softLeather: { damage: 26, crit: 'E' }, none: { damage: 27, crit: 'E' } }
	]
};

export default attackTables;