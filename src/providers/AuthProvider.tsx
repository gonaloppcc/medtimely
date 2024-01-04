import { User } from '@firebase/auth';
import React from 'react';
import { onAuthStateChanged } from '../services/auth';

const AuthenticatedUserContext = React.createContext<{
    user: User | null;
    isLoading: boolean;
}>({ isLoading: true, user: null });

const AuthenticationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        return onAuthStateChanged((newUser) => {
            setIsLoading(false);
            // User just logged out
            if (!newUser) {
                setUser(null);
                return;
            }

            setUser(newUser);
        });
    }, []);

    return (
        <AuthenticatedUserContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

export { AuthenticationProvider, AuthenticatedUserContext };
