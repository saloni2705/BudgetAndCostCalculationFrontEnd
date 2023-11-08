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

function CreatePortfolio() {
  const [portfolioName, setPortfolioName] = useState('');
  const [description, setDescription] = useState('');
  const [userid, setUserId] = useState('');
  const [portfolioSuccessMessage, setPortfolioSuccessMessage] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleCreatePortfolio = () => {
    fetch(`http://localhost:9111/auth/portfolio/createPortfolio/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioName,
          description,
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
          console.log('Portfolio created:', data);
    
          
          if (typeof data === 'object' && data.portfolioId !== undefined) {
            localStorage.setItem('portfolioId', data.portfolioId);
    
            setPortfolioName('');
            setDescription('');
            setPortfolioSuccessMessage(`Your portfolio ID is ${data.portfolioId}`);
    
            setTimeout(() => setPortfolioSuccessMessage(''), 3000);
          } else {
            console.error('Response is not JSON:', data);
            setPortfolioSuccessMessage(data);
    
            setTimeout(() => setPortfolioSuccessMessage(''), 30000);
          }
        })
        .catch((error) => {
          console.error('Error creating portfolio:', error);
        });
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <h1>Create Portfolio</h1>
          <label>
            Portfolio Name:
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </label>
          <br />
          <button onClick={handleCreatePortfolio} className="btn btn-primary">
            Create Portfolio
          </button>
          {portfolioSuccessMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {portfolioSuccessMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePortfolio;
