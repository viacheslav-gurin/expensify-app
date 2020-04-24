import  { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filter: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk)) // middleware wrraped into composeEnhancers 
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}

