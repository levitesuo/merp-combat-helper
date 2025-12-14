export interface FumbleResult {
	range: [number, number];
	effect: string;
}

export interface FumbleTables {
	[key: string]: FumbleResult[];
}

const fumbleTables: FumbleTables = {
	'Hand Arms': [
		{ range: [-49, 5], effect: 'Lose your grip. No further activity this round.' },
		{ range: [6, 20], effect: 'You slip. If your weapon is 1-handed and non-magic, it breaks.' },
		{ range: [21, 35], effect: 'Bad follow-through. You lose your opportunity, give yourself 2 hits.' },
		{ range: [36, 50], effect: 'Drop your weapon. It will take 1 round to draw a new one or 2 rounds to recover old one.' },
		{ range: [51, 65], effect: 'You lose your wind and realize that you should try to relax. -40 to activity for 2 rounds.' },
		{ range: [66, 79], effect: 'You stumble. The classless display leaves you stunned for 2 rounds. With luck, you might still survive.' },
		{ range: [80, 80], effect: 'Incredibly inept move. Roll a \'B\' crush crit on yourself. If opponent is using a slashing weapon, your weapon is broken.' },
		{ range: [81, 86], effect: 'Bite and swallow tongue in the excitement. Stunned 2 rounds.' },
		{ range: [87, 89], effect: 'Lose your grip on your weapon and reality. Stunned 3 rounds.' },
		{ range: [90, 90], effect: 'Poor execution. You attempt to maim yourself as your weapon breaks. You take a \'C\' slash crit.' },
		{ range: [91, 96], effect: 'Unbelievable mishandling of your weapon. A friendly combatant near you takes a \'B\' crush critical.' },
		{ range: [97, 99], effect: 'Stumble over an unseen, imaginary, deceased turtle. You are very confused. Stunned 3 rounds.' },
		{ range: [100, 100], effect: 'Worst move seen in ages. -60 to activity from a pulled groin. Foe is stunned 2 rounds laughing.' },
		{ range: [101, 106], effect: 'You fall in an attempt to commit suicide. Stunned 3 rounds. If using a pole-arm, its shaft is shattered.' },
		{ range: [107, 109], effect: 'You break your weapon through ineptness. Stunned 4 rounds.' },
		{ range: [110, 110], effect: 'You stumble, driving your weapon into the ground. Stunned 5 rounds. If mounted: you pole vault 30\', take a \'C\' crush crit upon landing.' },
		{ range: [111, 116], effect: 'Your mount rears suddenly. Stunned 3 rounds recovering.' },
		{ range: [117, 119], effect: 'You do not coordinate your movement with your mount\'s. -90 to activity for next 3 rounds trying to stay mounted.' },
		{ range: [120, 120], effect: 'You fall off your mount. Roll a \'D\' crush crit on yourself.' }
	],
	'Missile Weapons': [
		{ range: [-49, 5], effect: 'Lose your grip. No further activity this round.' },
		{ range: [6, 20], effect: 'One\'s ten thumbs just cannot handle loading. Lose this round.' },
		{ range: [21, 35], effect: 'Fumble ammunition. Lose this round. -50 to activity next round.' },
		{ range: [36, 50], effect: 'Break ammunition and lose your cool. You find yourself at -30 activity for 3 rounds of action.' },
		{ range: [51, 65], effect: 'Drop ammunition. Stunned this round and next trying to decide whether to retrieve it.' },
		{ range: [66, 79], effect: 'You really mishandle your weapon. Stunned 2 rounds.' },
		{ range: [80, 80], effect: 'Poor judgment. +5 hits. If not using a crossbow, you let arrow fly, lose an ear and take 2 hits per round.' },
		{ range: [81, 86], effect: 'Bowstring breaks. 2 rnds to draw a weapon or 6 rnds to restring bow.' },
		{ range: [87, 89], effect: 'Fumble ammunition when loading. You scatter all of your ammunition over a 10\' radius area.' },
		{ range: [90, 90], effect: 'Weapon shatters. You are stunned for 4 rounds of action. Good luck, pal.' },
		{ range: [91, 96], effect: 'You let your arrow fly too soon. You strike 20\' short of target. You are at -30 activity for 3 rnds.' },
		{ range: [97, 99], effect: 'You seem to think that your bow is a baton. It slips. Trying to grab it, you knock it 5\' in front of you.' },
		{ range: [100, 100], effect: 'Ammunition slips as you fire. The missile goes through your hand; its useless. +8 hits. 2 hits per round.' },
		{ range: [101, 106], effect: 'Slip and fall down. Your shot goes astray. Stunned 5 rounds.' },
		{ range: [107, 109], effect: 'Fletching on missile scratches eye as it is released. +5 hits. -20 to activity. Stunned 2 rounds.' },
		{ range: [110, 110], effect: 'Tip of weapon catches on closest object and breaks off. If applicable, the object takes an \'A\' puncture crit.' },
		{ range: [111, 116], effect: 'Trigger slips while you are bringing up your weapon. Make an attack with no modifications on the closest combatant.' },
		{ range: [117, 119], effect: 'While daydreaming you put your hand in front of the quarrel while firing. Lose a finger. +4 hits. 2 hits per round.' },
		{ range: [120, 120], effect: 'You slip and pin your foot to the ground with a quarrel. +10 hits. 2 hits per round. -30 to activity. Stunned 3 rounds.' }
	],
	'Spell Failure': [
		{ range: [-49, 5], effect: 'Lose concentration due to strain. Spell lost, but not power points.' },
		{ range: [6, 20], effect: 'Second thoughts. No spell may be cast or prepared next round.' },
		{ range: [21, 35], effect: 'Indecision due to mild mental lapse. Spell delayed one round.' },
		{ range: [36, 50], effect: 'Serious mental lapse. Spell lost, but not for power points. -30 to activity for 3 rounds.' },
		{ range: [51, 65], effect: 'Moderate but serious, strain. Spell lost along with power points. Stunned 1 round.' },
		{ range: [66, 79], effect: 'Subconscious fear. Spell lost along with power points. Stunned 2 rounds.' },
		{ range: [80, 80], effect: 'Spell internalized. +15 hits. Knocked down. Stunned 1 hour. +1 CP.*' },
		{ range: [81, 86], effect: 'Serious strain. Spell lost, but not power points. Stunned 3 rounds.' },
		{ range: [87, 89], effect: 'Internalization overloads senses. +20 hits. Blinded and deaf for 10 minutes. +1 CP.*' },
		{ range: [90, 90], effect: 'Strain causes mild stroke. +20 hits. Knocked out for 12 hours. +3 CP.*' },
		{ range: [91, 96], effect: 'Severe strain causes misfire. +5 hits. Stunned 3 rounds. +1 CP.*' },
		{ range: [97, 99], effect: 'Target\'s Essence causes spell to backfire. Reverse roles of target and caster in spell effects. +2 CP.*' },
		{ range: [100, 100], effect: 'Identity crisis. Lose spell casting capabilities for 2 weeks. +5 CP.*' },
		{ range: [101, 106], effect: 'Extreme mental pressure causes misfire. Knocked down. +10 hits. Stunned 6 rounds. +4 CP.*' },
		{ range: [107, 109], effect: 'Internalize spell. Lose spell casting ability for 3 weeks. +25 hits. Unconscious for 3 hours. +8 CP.*' },
		{ range: [110, 110], effect: 'Strain causes severe stroke. Paralyzed from the waist down. +15 CP.*' },
		{ range: [111, 116], effect: 'Spell strays and travels to a point 20 feet right of target. Anyone in line takes an unmodified attack. Stunned 3 rounds. +6 CP.*' },
		{ range: [117, 119], effect: 'Spell strays and travels to a point 20 feet left of target. Anyone in line takes an unmodified attack. Stunned 3 rounds. +10 CP.*' },
		{ range: [120, 120], effect: 'Mental Collapse. Spell is cast in direction opposite to the intended line. Lose all spell casting ability for 3 months. +20 CP.*' }
	],
	'Moving Maneuver': [
		{ range: [-49, 5], effect: 'You hesitate and fail to act.' },
		{ range: [6, 20], effect: 'You have second thoughts and decide to wait one round.' },
		{ range: [21, 35], effect: 'You slip. 30% chance of falling. -20 from maneuvers for 2 rounds.' },
		{ range: [36, 50], effect: 'You stumble. 45% chance of falling. -30 from any maneuvers for 2 rounds.' },
		{ range: [51, 65], effect: 'You stub your toe. 60% chance of falling. +3 hits. -10 to activity.' },
		{ range: [66, 79], effect: 'You slip. 75% chance of falling. Stunned 2 rounds.' },
		{ range: [80, 80], effect: 'You twist your ankle. +5 hits. -10 to activity.' },
		{ range: [81, 86], effect: 'You fall down. +3 hits. -20 to activity for 3 rounds.' },
		{ range: [87, 89], effect: 'You sprain your ankle and tear some tendons. +7 hits. -20 to activity. Stunned 1 round.' },
		{ range: [90, 90], effect: 'Fall breaks your leg. +8 hits. -30 to activity. Stunned 3 rounds.' },
		{ range: [91, 96], effect: 'You break your wrist when you fall. +12 hits. -20 to activity. Stunned 2 rounds.' },
		{ range: [97, 99], effect: 'Your arm breaks when you land on it. +14 hits. -30 to activity. Stunned 4 rounds.' },
		{ range: [100, 100], effect: 'Attempting to break a fall you break your arms. They are useless. +30 hits. Stunned 6 rounds.' },
		{ range: [101, 106], effect: 'When you fall, your leg twists under you and breaks. +15 hits. -50 to activity. Stunned 3 rounds.' },
		{ range: [107, 109], effect: 'Your knee strikes a hard object and shatters as you fall. +10 hits. -80 to activity. Stunned 4 rounds.' },
		{ range: [110, 110], effect: 'You fall. The resulting concussion causes a year-long coma.' },
		{ range: [111, 116], effect: 'You fall and land on your lower spine. You are paralyzed from the waist down. +30 hits.' },
		{ range: [117, 119], effect: 'You fall and are paralyzed from the neck down. +20 hits.' },
		{ range: [120, 120], effect: 'Your fall turns into a dive. You crash your skull and die.' }
	]
};

export default fumbleTables;
