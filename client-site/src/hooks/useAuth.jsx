import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuth = () => {
    const globalContextData = useContext(AuthContext);
    return globalContextData;
};

export default useAuth;