import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: '400px',
  marginTop: '50px',
};

const tableStyle = {
  marginBottom: '20px',
};

function UserBudgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = localStorage.getItem('userid');
        if (storedUserId) {
          const response = await fetch(`http://localhost:9111/auth/budgets/Users/${storedUserId}`);
          const data = await response.json();
          setBudgets(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching budgets:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={contentStyle}>
        {/* Budgets Table */}
        <div style={tableStyle}>
          <h2>Budgets</h2>
          <table>
            <thead>
              <tr>
                <th>Budget ID</th>
                <th>Category</th>
                <th>Allocated Amount</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map(budget => (
                <tr key={budget.budgetId}>
                  <td>{budget.budgetId}</td>
                  <td>{budget.budgetCategory}</td>
                  <td>{budget.allocatedAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expenses Tables */}
        {budgets.map(budget => (
          <div key={budget.budgetId} style={tableStyle}>
            <h2>Expenses for {budget.budgetCategory}</h2>
            <table>
              <thead>
                <tr>
                  <th>Expense ID</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {budget.expenses.map(expense => (
                  <tr key={expense.expenseId}>
                    <td>{expense.expenseId}</td>
                    <td>{expense.expenseCategory}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBudgets;
