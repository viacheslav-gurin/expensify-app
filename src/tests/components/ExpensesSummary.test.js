import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary with 0 expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with single expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[2]]} />)
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} />)
    expect(wrapper).toMatchSnapshot();
});

