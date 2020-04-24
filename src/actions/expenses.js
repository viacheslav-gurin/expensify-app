import { v4 as uuidv4 } from 'uuid';
import database from '../firebase/firebase';

// Было изначально без БД:
    // комопонент вызывает action generator
    // action generator возвращает объект
    // компонент диспатчит объект
    // redux-хранилище меняется

// Будет (с БД):
    // комопонент вызывает action generator
    // action generator возвращает функцию
    // компонент диспатчит функцию
    // функция отрабатывает (обладает возможностью диспатчить другие экшены и делать все, что захочется)

// ACTIONS WE'RE GONNA USE IN OUR APP:
// -----------------------------------
// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    // по дефолту мы не можем возвращать функцию, но можем при использовании модуля thunk, при этом надо указать dispatch в качестве параметра возвращаемой функции
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = expenseData; // деструктуризация из expenseData
        const expense = { description, note, amount, createdAt };

        return database.ref('expenses').push(expense).then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
        });
    };
};
// REMOVE_EXPENSE
export const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});