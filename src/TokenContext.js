import React, { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

const TokenContextProvider = (props) => {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState('');

  return (
    <TokenContext.Provider
      value={{
        userData,
        setUserData,
        name,
        setName
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
