import {User} from '@firebase/auth';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import React from "react";

const AuthenticatedUserContext = React.createContext<User | null>(undefined);

const AuthenticationProvider = ({children}) => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const auth = getAuth();
        return onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <AuthenticatedUserContext.Provider value={user}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

export {AuthenticationProvider, AuthenticatedUserContext};
