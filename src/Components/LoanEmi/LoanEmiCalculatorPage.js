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

const LoanEmiCalculatorPage = () => {
  const [userid, setUserid] = useState('');
  const [principalLoanAmount, setPrincipalLoanAmount] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [loanType, setLoanType] = useState('');
  const [numberOfInstallments, setNumberOfInstallments] = useState('');
  const [emi, setEmi] = useState('');
  const [emiLoading, setEmiLoading] = useState(false);
  const [emiError, setEmiError] = useState('');

  useEffect(() => {
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      setUserid(storedUserid);
    }
  }, []); 

  const handlePrincipalLoanAmountChange = (e) => {
    setPrincipalLoanAmount(e.target.value);
  };

  const handleAnnualInterestRateChange = (e) => {
    setAnnualInterestRate(e.target.value);
  };

  const handleLoanTypeChange = (e) => {
    setLoanType(e.target.value);
  };

  const handleNumberOfInstallmentsChange = (e) => {
    setNumberOfInstallments(e.target.value);
  };

  const handleCalculateEmi = () => {
    setEmiLoading(true);

    const requestData = {
      principalLoanAmount: principalLoanAmount,
      annualInterestRate: annualInterestRate,
      loanType: loanType,
      numberOfInstallments: numberOfInstallments,
    };

    fetch(`http://localhost:9111/auth/loan/calculate-emi/${userid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmi(data);
        setEmiLoading(false);
      })
      .catch((error) => {
        setEmiError('Error calculating EMI.');
        setEmiLoading(false);
      });
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <h2>Loan EMI Calculator</h2>
          <label>
            Enter Principal Loan Amount:
            <input
              type="text"
              value={principalLoanAmount}
              onChange={handlePrincipalLoanAmountChange}
              style={inputStyle}
            />
          </label>
          <label>
            Enter Annual Interest Rate:
            <input
              type="text"
              value={annualInterestRate}
              onChange={handleAnnualInterestRateChange}
              style={inputStyle}
            />
          </label>
          <label>
            Enter Loan Type:
            <input type="text" value={loanType} onChange={handleLoanTypeChange} style={inputStyle} />
          </label>
          <label>
            Enter Number of Installments:
            <input
              type="text"
              value={numberOfInstallments}
              onChange={handleNumberOfInstallmentsChange}
              style={inputStyle}
            />
          </label>
          <button onClick={handleCalculateEmi} style={buttonStyle}>
            Calculate EMI
          </button>

          {emiLoading && <p style={loadingStyle}>Loading...</p>}
          {emiError && <p style={errorStyle}>{emiError}</p>}

          {emi !== '' && <p>EMI: {emi}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoanEmiCalculatorPage;
