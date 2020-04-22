import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
});

test('should correctyly add up a single expense', () => {
    const total = getExpensesTotal([expenses[0]]);
    expect(total).toEqual(195);
});

test('should correctyly add up multiple expenses', () => {
    const total = getExpensesTotal(expenses);
    expect(total).toBe(114195);
});