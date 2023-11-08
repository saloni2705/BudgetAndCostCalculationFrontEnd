import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/login/login';
import React, { useState, useEffect } from 'react';
import TokenContextProvider from './TokenContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateBudget from './Components/budget/Createbudget';
import Logout from './Components/logout';
import UserBudgets from './Components/budget/UserBudgets';
import BudgetCalculator from './Components/budget/categorySpendingPercentage';
import InvestmentCalculatorPage from './Components/Investment/InvestmentCalculatorPage';
import LoanEmiCalculatorPage from './Components/LoanEmi/LoanEmiCalculatorPage';
import Register from './Components/Register/Register';
import CreatePortfolio from './Components/Investment/createPortfolio';
import CreateInvestment from './Components/Investment/CreateInvestment';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [landingPageData, setLandingPageData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false); 
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
   
   // Retrieve the token from local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    // Retrieve the user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setLoggedIn(true); 
      
    }
  }, []);

  return (
    <TokenContextProvider>
      <Router>
        
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/createBudget' element={<CreateBudget/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/UserBudgets' element={<UserBudgets/>} />
          <Route path='/categorySpendingPercentage' element={<BudgetCalculator/>} />
          <Route path='/calculateFutureValue' element={<InvestmentCalculatorPage/>} />
          <Route path='/LoanEmi' element={<LoanEmiCalculatorPage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/CreatePortfolio" element={<CreatePortfolio />} />
          <Route path="/CreateInvestment" element={<CreateInvestment/>} />
          </Routes>
      </Router>
    </TokenContextProvider>
    );
}

export default App;
