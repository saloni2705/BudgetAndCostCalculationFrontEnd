import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';

const containerStyle = {
  display: 'flex',
  height: '100vh',
};

const contentContainerStyle = {
  display: 'flex',
  flex: 1,
  marginLeft: '300px',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2px',
};

function CreateInvestment() {
  const [portfolioId, setPortfolioId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [investmentCategory, setInvestmentCategory] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [investmentSuccessMessage, setInvestmentSuccessMessage] = useState('');

  useEffect(() => {
    const storedPortfolioId = localStorage.getItem('portfolioId');
    if (storedPortfolioId) {
      setPortfolioId(storedPortfolioId);
    }
  }, []);

  const handleCreateInvestment = () => {
    fetch(`http://localhost:9111/auth/portfolio/createInvestment/${portfolioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: parseFloat(quantity),
        purchasePrice: parseFloat(purchasePrice),
        purchaseDate,
        investmentCategory,
        annualInterestRate: parseFloat(annualInterestRate),
        compoundingFrequency: parseInt(compoundingFrequency),
        investmentPeriod: parseInt(investmentPeriod),
      }),
    })
      .then(async (response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        console.log('Investment created:', data);

        if (typeof data === 'object' && data.investmentId !== undefined) {
          setQuantity('');
          setPurchasePrice('');
          setPurchaseDate('');
          setInvestmentCategory('');
          setAnnualInterestRate('');
          setCompoundingFrequency('');
          setInvestmentPeriod('');
          setInvestmentSuccessMessage(`Your investment ID is ${data.investmentId}`);

          setTimeout(() => setInvestmentSuccessMessage(''), 10000);
        } else {
          console.error('Response is not JSON:', data);
          setInvestmentSuccessMessage(data);

          setTimeout(() => setInvestmentSuccessMessage(''), 3000);
        }
      })
      .catch((error) => {
        console.error('Error creating investment:', error);
      });
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <h1>Create Investment</h1>
          <label>
            Portfolio ID:
            <input
              type="number"
              value={portfolioId}
              onChange={(e) => setPortfolioId(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Purchase Price:
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Purchase Date:
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Investment Category:
            <input
              type="text"
              value={investmentCategory}
              onChange={(e) => setInvestmentCategory(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Annual Interest Rate:
            <input
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Compounding Frequency:
            <input
              type="number"
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Investment Period (in years):
            <input
              type="number"
              value={investmentPeriod}
              onChange={(e) => setInvestmentPeriod(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <button onClick={handleCreateInvestment} className="btn btn-primary">
            Create Investment
          </button>
          {investmentSuccessMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {investmentSuccessMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateInvestment;
