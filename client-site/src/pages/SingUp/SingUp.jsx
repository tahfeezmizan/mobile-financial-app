import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SingUp = () => {
    const { } = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { name, email, password } = data;
        console.log(data);

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
                <h1 className="text-4xl text-center font-bold py-4">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="py-6 space-y-4">
                    <div className="form-control">
                        <label className="label block mb-1">
                            <span className="text-base font-medium">Name</span>
                        </label>
                        <input
                            type="Name"
                            name="name"
                            placeholder="Enter Your Name"
                            className="w-full py-2 outline-none border border-gray-300 px-4 "

                            {...register("name", { required: true })}
                        />
                        {errors.name && <span className="text-xs text-red-500">Email is required</span>}
                    </div>
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
                        <button className="w-full text-center font-bold text-lg  border border-gray-400 px-7 py-2 tracking-wide hover:bg-yellow-400 hover:border-yellow-400">Sing Up</button>

                    </div>
                </form>

                <h3 className="text-center pt-3">Have an account? <NavLink to="/singin" className="text-blue-600 hover:text-[#d01818] font-bold">Login</NavLink></h3>
            </div>
        </div>
    );
};

export default SingUp;