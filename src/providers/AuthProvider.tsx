import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React from "react";

const AuthenticatedUserContext = React.createContext<FirebaseAuthTypes.User | null>(undefined);

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return subscriber;
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={user}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export { AuthenticationProvider, AuthenticatedUserContext };