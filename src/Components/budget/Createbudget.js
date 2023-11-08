import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';

const containerStyle = {
  display: 'flex',
  height: '100vh',
};

const contentContainerStyle = {
  display: 'flex',
  flex: 1,
  marginLeft: '200px', 
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '100px',
};

function CreateBudget() {
  const [budgetCategory, setBudgetCategory] = useState('');
  const [allocatedAmount, setAllocatedAmount] = useState('');
  const [userid, setUserId] = useState('');
  const [budgetSuccessMessage, setBudgetSuccessMessage] = useState('');
  const [expenseSuccessMessage, setExpenseSuccessMessage] = useState('');
  
  const [expenseBudgetId, setExpenseBudgetId] = useState('');
  const [expenseCategory, setExpenseCategory] = useState(''); 
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); 

  const handleCreateBudget = () => {
    fetch(`http://localhost:9111/auth/budgets/${userid}/createbudget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        budgetCategory,
        allocatedAmount: parseFloat(allocatedAmount),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Budget created:', data);
        localStorage.setItem('budgetCategory', data.budgetCategory);
        localStorage.setItem('budgetId', data.budgetId);

        setBudgetCategory('');
        setAllocatedAmount('');
        setBudgetSuccessMessage('Budget created successfully!');

        setTimeout(() => setBudgetSuccessMessage(''), 3000);
      })
      .catch((error) => {
        console.error('Error creating budget:', error);
      });
  };

  const handleAddExpense = () => {
    fetch(`http://localhost:9111/auth/expenses/${userid}/${expenseBudgetId}/addExpense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expenseCategory: expenseCategory,
        amount: parseFloat(expenseAmount),
        description: expenseDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Expense added:', data);
        setExpenseSuccessMessage('Expense added successfully!');
        setExpenseCategory('');
        setExpenseBudgetId('');
        setExpenseAmount('');
        setExpenseDescription('');
        setExpenseCategory('');
  
        setTimeout(() => setExpenseSuccessMessage(''), 3000);
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
        
      });
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={contentContainerStyle}>
        {/* Budget Section */}
        <div style={contentStyle}>
          <h1>Create Budget</h1>
          <label>
            Budget Category:
            <input
              type="text"
              value={budgetCategory}
              onChange={(e) => setBudgetCategory(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Allocated Amount:
            <input
              type="number"
              value={allocatedAmount}
              onChange={(e) => setAllocatedAmount(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <button onClick={handleCreateBudget} className="btn btn-primary">
            Create Budget
          </button>
          {budgetSuccessMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {budgetSuccessMessage}
            </div>
          )}
        </div>

        {/* Expense Section */}
        <div style={{ ...contentStyle, marginLeft: '20px' }}>
          <h2>Add Expense</h2>
          <label>
            Budget ID for Expense:
            <input
              type="number"
              value={expenseBudgetId}
              onChange={(e) => setExpenseBudgetId(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Expense Category:
            <input
              type="text"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Expense Amount:
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Expense Description:
            <input
              type="text"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <button onClick={handleAddExpense} className="btn btn-primary">
            Add Expense
          </button>
          {expenseSuccessMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {expenseSuccessMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateBudget;
