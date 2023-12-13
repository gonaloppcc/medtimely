import {User} from '@firebase/auth';
import React from 'react';
import {onAuthStateChanged} from '../services/auth';

const AuthenticatedUserContext = React.createContext<User | null>(undefined);

const AuthenticationProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        return onAuthStateChanged((newUser) => setUser(newUser));
    }, []);

    return (
        <AuthenticatedUserContext.Provider value={user}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

export {AuthenticationProvider, AuthenticatedUserContext};
