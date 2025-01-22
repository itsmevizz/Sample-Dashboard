import { getGreeting } from './getGreeting';

test('returns greeting for a given name', () => {
	expect(getGreeting('Alice')).toBe('Hello, Alice!');
});

test('returns default greeting when no name is provided', () => {
	expect(getGreeting('')).toBe('Hello, Guest!');
});