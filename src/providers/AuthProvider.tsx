import {User} from '@firebase/auth';
import React from 'react';
import {onAuthStateChanged} from '../services/auth';

const AuthenticatedUserContext = React.createContext<User | null>(null);

const AuthenticationProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        return onAuthStateChanged((newUser) => {
            // User just logged out
            if (!newUser) {
                setUser(null);
                return;
            }

            setUser(newUser);
        });
    }, []);

    return (
        <AuthenticatedUserContext.Provider value={user}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

export {AuthenticationProvider, AuthenticatedUserContext};
