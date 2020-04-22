import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';

test('should render ExpensesSummary with 0 expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with single expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />)
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multiple expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={3254632576523423} />)
    expect(wrapper).toMatchSnapshot();
});

