import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import financial from "../image/financial-management.png";
import './Register.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
function Register() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState("");
  const [adminid, setAdmin] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [totalIncomeError, setTotalIncomeError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value.includes('@')) {
      setEmailError('Invalid email address.');
    } else {
      setEmailError('');
    }
  };

  const validateUsername = (value) => {
    if (value === '') {
      setUsernameError('Username cannot be empty.');
    } else {
      setUsernameError('');
    }
  };

  const validatePhone = (value) => {
    if (value.length !== 10 || !/^\d+$/.test(value)) {
      setPhoneError('Phone number should be a 10-digit number.');
    } else {
      setPhoneError('');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 4) {
      setPasswordError('Password must have at least 4 characters.');
    } else {
      setPasswordError('');
    }
  };
  const validateTotalIncome = (value) => {
    
    if (isNaN(value) || value <= 0) {
      setTotalIncomeError('Invalid total income.');
    } else {
      setTotalIncomeError('');
    }
  };


  const handleRegister = async () => {
    let endpoint = "http://localhost:9111/auth/user/signup";

    if (emailError || usernameError || phoneError || passwordError) {
      setFailMessage('Please fix the validation errors.');
      return;
    }
    const registerData = {
      username,
      email,
      phone_number,
      totalIncome,
      password,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        setSuccessMessage("Registration successful");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000);
      } else {
        const errorResponse = await response.json();
        setFailMessage(errorResponse.message);
        setTimeout(() => setFailMessage(""), 2000);
      }
    } catch (error) {
      document.write(`Error occurred: ${error}`);
    }
  };

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
          <MDBCol md="6">
            <MDBCard className="custom-card-column">
              <MDBCardBody>
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
                  wrapperClass="mb-4 custom-label-font-size custom-input-font-size "
                  label="Username"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                  }}
                  onBlur={() => validateUsername(username)}
                />
                {usernameError && (
                 <div className="alert alert-danger" role="alert">
                    {usernameError}
                  </div>
                )}
                <MDBInput
                  wrapperClass="mb-4 custom-label-font-size custom-input-font-size"
                  label="Email Address"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={() => validateEmail(email)}
                  className="custom-label-font-size"
                />
                {emailError && (
                  <div className="alert alert-danger" role="alert">
                    {emailError}
                  </div>
                )}
                <MDBInput
                  wrapperClass="mb-4 custom-label-font-size custom-input-font-size"
                  label="Phone Number"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={phone_number}
                  onChange={(e) => {
                    setPhone_number(e.target.value);
                  }}
                  onBlur={() => validatePhone(phone_number)}
                />
                {phoneError && (
                 <div className="alert alert-danger" role="alert">
                    {phoneError}
                  </div>
                )}
                 <MDBInput
                   wrapperClass="mb-4 custom-label-font-size custom-input-font-size"
                   label="Total Income"
                   id="formControlLg"
                   type="text"
                   size="lg"
                   value={totalIncome}
                   onChange={(e) => {
                   setTotalIncome(e.target.value);
                   validateTotalIncome(e.target.value);
                  }}
                   onBlur={() => validateTotalIncome(totalIncome)}
                />
                {totalIncomeError && (
                 <div className="alert alert-danger" role="alert">
                   {totalIncomeError}
                    </div>
                  )}
                <MDBInput
                  wrapperClass="mb-4 custom-label-font-size custom-input-font-size"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onBlur={() => validatePassword(password)}
                />
                {passwordError && (
                  <div className="alert alert-danger" role="alert">
                    {passwordError}
                  </div>
                )}
                <MDBBtn
                  className="mb-4 px-5"
                  style={{
                    backgroundColor: '#98144d',
                    width: '650px',
                    marginTop: '20px',
                  }}
                  size="lg"
                  onClick={handleRegister}
                >
                  Register
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
                {successMessage && (
                  <div
                    className="alert alert-success"
                    role="alert"
                  >
                    {successMessage}
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Register;
