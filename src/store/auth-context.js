import React, { useCallback, useState } from 'react';

//let tokenTimer;

const AuthContext = React.createContext({
  token: null,
  isUserLoggedIn: false,
  login: token => {},
  logout: () => {},
});

// const calculateRemainingTime = expirationTime => {
//   const currentTime = new Date().getTime();
//   const expTimeDate = new Date(expirationTime).getTime();

//   const remainingTime = expTimeDate - currentTime;
//   return remainingTime;
// };

// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem('token');
//   const storedTokenTimer = localStorage.getItem('tokenTimer');

//   const remainingTime = calculateRemainingTime(storedTokenTimer);

//   if (remainingTime <= 60000) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('tokenTimer');
//     return null;
//   }

//   return { token: storedToken, timer: storedTokenTimer };
// };

export const AuthContextProvider = ({ children }) => {
  //const tokenData = retrieveStoredToken();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const isUserLoggedIn = !!token;

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);

    //localStorage.removeItem('tokenTimer');
    // if (tokenTimer) {
    //   clearTimeout(tokenTimer);
    // }
  }, []);

  const handleLogin = token => {
    localStorage.setItem('token', token);
    setToken(token);

    //localStorage.setItem('tokenTimer', expirationTime);
    //const remainingTime = calculateRemainingTime(expirationTime);
    //tokenTimer = setTimeout(handleLogout, remainingTime);
  };

  // useEffect(() => {
  //   if (tokenData) {
  //     tokenTimer = setTimeout(handleLogout, tokenData.timer);
  //   }
  // }, [tokenData, handleLogout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isUserLoggedIn,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
