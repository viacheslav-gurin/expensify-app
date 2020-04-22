// Approach # 1
// export default (expenses) => {
//     let expensesTotal = 0;
//     if (expenses.length) {
//         let initialValue = 0;
//         expensesTotal = expenses.reduce(function(accumulator, currentValue) {
//             return accumulator + currentValue.amount;
//         }, initialValue);
//     };
//     return expensesTotal;
// };

// Approach # 2
// export default (expenses) => {
//     if (expenses.length === 0) {
//         return 0;
//     } else {
//         return expenses
//             .map((expenses) => expenses.amount)
//             .reduce((sum, value) => sum + value, 0);
//     }
// };

// Approach # 3
export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum + value, 0);
};