import React, { useState } from 'react';
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

const InvestmentCalculatorPage = () => {
  const [investmentId, setInvestmentId] = useState('');
  const [futureValue, setFutureValue] = useState('');
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [investmentError, setInvestmentError] = useState('');

  const handleInvestmentIdChange = (e) => {
    setInvestmentId(e.target.value);
  };

  const handleCalculateFutureValue = () => {
    setInvestmentLoading(true);

    fetch(`http://localhost:9111/auth/portfolio/calculateFutureValue/${investmentId}`)
      .then((response) => response.json())
      .then((data) => {
        setFutureValue(data);
        setInvestmentLoading(false);
      })
      .catch((error) => {
        setInvestmentError('Error calculating future value.');
        setInvestmentLoading(false);
      });
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <h2>Investment Calculator</h2>
          <label>
            Enter Investment ID:
            <input type="text" value={investmentId} onChange={handleInvestmentIdChange} style={inputStyle} />
          </label>
          <button onClick={handleCalculateFutureValue} style={buttonStyle}>
            Calculate Future Value
          </button>

          {investmentLoading && <p style={loadingStyle}>Loading...</p>}
          {investmentError && <p style={errorStyle}>{investmentError}</p>}

          {futureValue !== '' && <p>Future Value: {futureValue}</p>}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculatorPage;
