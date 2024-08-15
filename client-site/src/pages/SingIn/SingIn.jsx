import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SingIn = () => {
    const { singIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        console.log(data);

        singIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(location?.state ? location.state : '/');
            })
            .then(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="home-screen flex items-center justify-center bg-base-200">
            {/* <Helmet>
                <title>Login - TripRex</title>
            </Helmet> */}
            <div className="w-full rounded-none max-w-lg p-14 shadow-2xl">
                <h1 className="text-5xl text-center font-bold py-4">Login now!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="py-6 space-y-4">
                    <div className="form-control">
                        <label className="label block mb-1">
                            <span className="text-base font-medium">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            className="w-full py-2 outline-none border border-gray-300 px-4 "

                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label block mb-1">
                            <span className="text-base font-medium">Password</span>
                        </label>
                        <div className="relative w-full py-2 border border-gray-300 px-4  flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Your Password"
                                className="w-4/5 outline-none"
                                {...register("password", { required: true })}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-4 flex items-center"
                            >
                                {showPassword ? <FaRegEyeSlash className="h-6 w-6 text-gray-500" /> : <FaRegEye className="h-6 w-6 text-gray-500" />}
                            </button>
                        </div>
                        {errors.password && <span className="text-xs text-red-500">Password is required</span>}
                    </div>
                    <div className="form-control pt-5">
                        <button className="w-full text-center font-bold text-lg  border border-gray-400 px-7 py-2 tracking-wide hover:bg-yellow-400 hover:border-yellow-400">Login</button>

                    </div>
                </form>
                <div className="text-center">
                    <div className="py-3 text-base font-medium">Continue With</div>
                    <div className=''>
                        <button
                            onClick={() => googleLogin()
                                .then(result => {
                                    toast.success('Congrs! Google Login Sucessfull');
                                    navigate(location?.state ? location.state : '/');
                                })
                                .catch((error) => {
                                    const errorText = error.message;
                                    console.log(errorText)
                                    const errorMessage = errorText.slice(22, 40);
                                    toast.error(errorMessage)
                                })
                            }
                            className='w-4/5 mx-auto text-3xl flex items-center justify-center rounded-3xl  border border-gray-400 px-7 py-2 tracking-wide hover:bg-yellow-400 hover:border-yellow-400'><FcGoogle />
                        </button>
                    </div>
                </div>
                <h3 className="text-center pt-3">Need an account? <NavLink to="/singup" className="text-blue-600 hover:text-[#d01818] font-bold">Create Account</NavLink></h3>
            </div>
        </div>
    );
};

export default SingIn;