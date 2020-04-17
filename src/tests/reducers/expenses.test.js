import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id ', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'Lunch',
        note: 'Salad, burger, coffee',
        amount: 295,
        createdAt: 0
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    // const state = expensesReducer([], action);
    // expect(state).toEqual([ expense ]);
    // OR:
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses, expense ]);
});

test('should edit an expense', () => {
    const updates = {
        note: 'This is my note'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].note).toBe(updates.note);
});

test('should not edit expense if expense not found', () => {
    const updates = {
        note: 'This is my note'
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: '5',
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});