import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [showPin, setShowPin] = useState(false);

    const handleLogin = () => {
        if (pin.length < 5 || pin.length > 8 ) {
            setError('PIN must be a number between 5 to 8 digits.');
            return;
        }

        // Handle login logic here
        console.log('Email or Phone:', emailOrPhone);
        console.log('PIN:', pin);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const toggleShowPin = () => {
        setShowPin(!showPin);
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 text-black w-[500px] px-16 py-24 rounded-lg shadow-lg relative">
                <h2 className="text-2xl mb-6 text-center">Login Here</h2>
                <input
                    type="text"
                    placeholder="Phone Number or Email"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="mb-4 p-2 w-full border border-gray-300 rounded"
                />
                <div className="relative mb-4 flex items-center">
                    <input
                        type={showPin ? "text" : "password"}
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="p-2 w-full border border-gray-300 rounded pr-10"
                        pattern="\d{5,8}"
                        inputMode="numeric"
                    />
                    <button
                        type="button"
                        onClick={toggleShowPin}
                        className="absolute right-4 top-3 text-xl text-gray-600"
                    >
                        {showPin ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
