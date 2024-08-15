import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { createContext, useState } from "react";


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const createUser = (email, password) => {
        // isLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singIn = (email, password) => {
        // isLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }



    const authInfo = {
        user,
        createUser,
        singIn,
        isLoading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;