import React, { createContext, useState } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    // create new user
    const singUpUser = (email, pin) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, pin)
    }

    //login user
    const singIn = (email, pin) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, pin)
    }


    const authValue = {
        user,

    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;