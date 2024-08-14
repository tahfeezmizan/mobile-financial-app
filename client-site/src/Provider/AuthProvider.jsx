import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const singUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
    }

    const singIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        singUp,
        singIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;