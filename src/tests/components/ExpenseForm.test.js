import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />); // here we test default props
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />); // here we test real data
    expect(wrapper).toMatchSnapshot();
});  

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'New description'; 
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'Some optional text for textarea';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('');
    // Spies: нам нужно удостовериться, что проп onSubmit был вызван с объектом, содержащим информацию в корректном формате. И это можно осуществить с помощью т.н. "шпионских" функций
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});

// Test case with implementation of spies
// test('should call onSubmit prop for valid form submission', () => {
    // const onSubmitSpy = jest.fn(); // эта функция без аргументов возвращает нового шпиона. Все что нам надо - это сохранить эту фукнцию в переменную. Теперь, когда у нас есть экземпляр шпиона, мы получаем доступ к новому набору утверждений/проверок (assertions). 
    // Например, мы можем проверить, был ли вообще вызван наш шпион:
    // // onSubmitSpy(); // вызываем шпиона без аргументов
    // // expect(onSubmitSpy).toHaveBeenCalled(); // выбросит ошибку, если шпион не был вызван ни разу. Иначе, если тест зазеленился, значит шпион был вызван
    // onSubmitSpy('Andrew', 'Philadelphia');
    //expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Philadelphia'); // если вызвать только с одним аргументом или вовсе без аргументов, то тест не пройдет
// });