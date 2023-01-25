import React, { useContext, useState } from 'react';
const AuthContext = React.createContext();
export function useAuthContext() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [User, SetUser] = useState(() => {
    return { auth: false, token: null, User: {}};
  });
  return (
    <AuthContext.Provider value={[User, SetUser]}>
      {children}
    </AuthContext.Provider>
  );
}