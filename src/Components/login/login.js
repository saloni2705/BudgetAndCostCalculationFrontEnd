import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../TokenContext';
import financial from "../image/financial-management.png";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';

function LoginPage() {
  const navigate = useNavigate();
  const { setUserData } = useContext(TokenContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('Effect triggered. Logged in:', loggedIn);

    if (loggedIn) {
      console.log('User is logged in:', loggedIn);
      const user = JSON.parse(localStorage.getItem('user')); 
      console.log('User data:', user);

   if (user.roles[0] === 'ROLE_USER') {

        localStorage.setItem("userid", user.id);

        navigate('/createBudget');

        window.location.href = window.location.href;

      } 
       
    }
  }, [loggedIn]);

  const handleLogin = async () => {
    let endpoint = 'http://localhost:9111/auth/user/signin'; 
    const loginData = { username, password };
    setUsername(username);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Logged in user:", user);
        setUserData(user);
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
      } else {
        const errorResponse = await response.json(); 
        setFailMessage(errorResponse.message); 
        setTimeout(() => setFailMessage(""), 2000)
      }
      
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  if (loggedIn) {
    return null;
  }

  return (
    <div  className="login-page-container">
   
    <MDBContainer className="my-5">
      <MDBRow className="g-0"  >
        {/* Photo Column */}
        <MDBCol md="6" style={{ marginTop: '50px' }}>
          <MDBCardImage
            src={financial}
            alt="login form"
            className="rounded-start w-100"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </MDBCol>

        {/* Card Column */}
        <MDBCol md="6" >
          <MDBCard className="custom-card-column">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <span className="h1 fw-bold mb-0">
                  Budget And cost calculation
                </span>
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: '1px' }}
              >
                Sign into your account
              </h5>
              <MDBInput
                wrapperClass="mb-4 custom-label-font-size2 custom-input-font-size2"
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <MDBInput
                wrapperClass="mb-4 custom-label-font-size2 custom-input-font-size2"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <MDBBtn
                className="mb-4 px-5"
                size="lg"
                style={{ backgroundColor: '#98144d' }}
                onClick={handleLogin}
              >
                Login
              </MDBBtn>

              <div>
                {failMessage && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {failMessage}
                  </div>
                )}
              </div>
              <p
                className="mb-3 pb-lg-2"
                style={{ color: '#98144d' }}
              >
                Don't have an account?{' '}
                <a
                  href="http://localhost:3000/register"
                  style={{ color: '#98144d' }}
                >
                  Register here
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
);

}


export default LoginPage;