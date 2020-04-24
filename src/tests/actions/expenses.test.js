import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, startAddExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk])

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expens action object', () => {
    const action = editExpense('123abc', { note: 'my note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'my note'
        }
    });
});

// toEqual - для сравнения массивов и объектов
// toBe - для сравнения чисел и строк

test('should setup add expense action object with provided values', () => {

    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// Ниже происходит следующее:
// Когда мы работаем с асинхронными тест-кейсами в джесте, мы должны указать джесту на то, что данный тест-кейс асинхронный. Если не укажем, то джест пробежится по колбэк-функции внутри кейса, дождется return'а от этой функции. И если в процессе будет выброшена ошибка, то тест завален, если нет ошибки - успех. Но проблема в том, что кусок кода этой функции, в котором мы диспатчим экшн startAddExpense запустится только некоторое время спустя после того, как колбэк-функция сделает return. Этот кусок ведь асинхронный: мы должны долждаться ответа от firebase и только после этого фукнция проверки (expect) будет вызвана. Таким образом, если мы хотим заставить jest дождаться конкретного момента времени, мы должны подсунуть ему аргумент на входе в тест-кейс (в нашем случае это done). Тест-кейс не выдаст ни failure, ни success до тех пор, пока не будет вызана функция done().
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions(); // получаем массив всех экшенов
        // в нашем случае мы ожидаем, что только один экшен будет задиспатчен 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0 
    };
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions(); // получаем массив всех экшенов
        // в нашем случае мы ожидаем, что только один экшен будет задиспатчен 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '', 
//             note: '', 
//             amount: 0, 
//             createdAt: 0
//         }
//     });
// });
