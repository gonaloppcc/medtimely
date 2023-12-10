import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import React from "react";

const AuthenticatedUserContext = React.createContext<User>(undefined);

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    })
  })

  return (
    <AuthenticatedUserContext.Provider value={user}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export { AuthenticationProvider, AuthenticatedUserContext };