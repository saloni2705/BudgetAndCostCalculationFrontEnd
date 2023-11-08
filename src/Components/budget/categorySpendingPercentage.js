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

const inputStyle = {
  marginBottom: '15px',
  padding: '8px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

const loadingStyle = {
  fontSize: '18px',
  marginTop: '10px',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
  fontSize: '16px',
};

const BudgetCalculator = () => {
  const [budgetId, setBudgetId] = useState('');
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Expense category spending percentage state
  const [userid, setUserId] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [percentage, setPercentage] = useState('');
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expenseError, setExpenseError] = useState('');

  // Net savings state
  const [netSavings, setNetSavings] = useState('');
  const [netSavingsLoading, setNetSavingsLoading] = useState(false);
  const [netSavingsError, setNetSavingsError] = useState('');

  useEffect(() => {
    // Retrieve user ID from local storage
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      setUserId(storedUserid);
    }
  }, []); 

  const handleInputChange = (e) => {
    setBudgetId(e.target.value);
  };

  const handleGetSpendingPercentage = () => {
    setLoading(true);

    // Fetch budget categories
    fetch(`http://localhost:9111/auth/budgets/${budgetId}/categorySpendingPercentage`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error retrieving budget categories.');
        setLoading(false);
      });
  };

  const handleExpenseCategoryChange = (e) => {
    setExpenseCategory(e.target.value);
  };

  const handleGetExpenseCategorySpendingPercentage = () => {
    setExpenseLoading(true);

    // Fetch expense category spending percentage
    fetch(`http://localhost:9111/auth/expenses/categorySpendingPercentage/${userid}/${expenseCategory}`)
      .then((response) => response.text())
      .then((data) => {
        const percentageWithoutQuotes = data.replace(/"/g, '');
        setPercentage(percentageWithoutQuotes);
        setExpenseLoading(false);
      })
      .catch((error) => {
        setExpenseError('Error retrieving spending percentage.');
        setExpenseLoading(false);
      });
  };

  const handleGetNetSavings = () => {
    setNetSavingsLoading(true);

    // Fetch net savings
    fetch(`http://localhost:9111/auth/budgets/netSavings/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        setNetSavings(data);
        setNetSavingsLoading(false);
      })
      .catch((error) => {
        setNetSavingsError('Error retrieving net savings.');
        setNetSavingsLoading(false);
      });
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <h1>Budget Category Spending Percentage</h1>
          <label>
            Enter Budget ID:
            <input type="text" value={budgetId} onChange={handleInputChange} style={inputStyle} />
          </label>
          <button onClick={handleGetSpendingPercentage} style={buttonStyle}>
            Get Spending Percentage
          </button>

          {loading && <p style={loadingStyle}>Loading...</p>}
          {error && <p style={errorStyle}>{error}</p>}

          {Object.keys(categories).length > 0 && (
            <div>
              <h2>Budget Category Spending Percentages:</h2>
              <ul>
                {Object.entries(categories).map(([category, percentage]) => (
                  <li key={category}>
                    {category}: {percentage}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ margin: '20px' }}></div>


          {/* Expense category spending percentage calculator */}
          <h2>Expense Category Spending Percentage Calculator</h2>
          <label>
            Enter Expense Category:
            <input type="text" value={expenseCategory} onChange={handleExpenseCategoryChange} style={inputStyle} />
          </label>
          <button onClick={handleGetExpenseCategorySpendingPercentage} style={buttonStyle}>
            Get Spending Percentage
          </button>

          {expenseLoading && <p style={loadingStyle}>Loading...</p>}
          {expenseError && <p style={errorStyle}>{expenseError}</p>}

          {percentage !== '' && <p>Spending Percentage: {percentage}</p>}
          <div style={{ margin: '20px' }}></div>

          {/* Net savings calculator */}
          <h2>Net Savings Calculator</h2>
          <button onClick={handleGetNetSavings} style={buttonStyle}>
            Get Net Savings
          </button>

          {netSavingsLoading && <p style={loadingStyle}>Loading...</p>}
          {netSavingsError && <p style={errorStyle}>{netSavingsError}</p>}

          {netSavings !== '' && <p>Net Savings: {netSavings}</p>}
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
