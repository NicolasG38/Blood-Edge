const { sum } = require('../hello');

test('ajoute 1 + 2 pour égaler 3', () => {
	expect(sum(1, 2)).toBe(3);
});