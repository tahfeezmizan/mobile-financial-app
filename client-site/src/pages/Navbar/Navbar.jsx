import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoArrowUpSharp } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const links = <>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/'>About</NavLink>
        <NavLink to='/'>Services</NavLink>
    </>

    return (
        <div className="bg-white shadow-md md:shadow-none">
            <div className="w-full md:w-9/12 mx-auto flex justify-between items-center p-2 font-Inter">
                <NavLink to={'/'}>
                    {/* <img src={logo} className="" alt="Logo" /> */}
                    <h3 className="text-2xl font-medium ">PH-Commerce</h3>
                </NavLink>

                <div className="flex-1 flex justify-center">
                    <div className={`md:flex gap-8 md:static absolute duration-300 ease-in-out ${open ? 'top-14' : 'top-[-200px]'} right-0 md:right-auto md:bg-transparent bg-white py-6 w-full md:w-auto`}>

                        <div className="flex flex-col md:flex-row gap-3 md:gap-6 font-Inter items-center justify-center text-base font-medium">
                            {links}
                        </div>

                        {open && (
                            <div className="flex justify-center mt-4 md:hidden">
                                <button className="text-base font-semibold border border-PrimaryColor px-7 py-2 rounded-xl tracking-wide flex items-center gap-2 hover:bg-yellow-400 hover:border-yellow-400">
                                    Login/Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <button className="hidden md:flex text-base font-semibold border border-PrimaryColor px-7 py-2 rounded-xl tracking-wide items-center gap-2 hover:bg-yellow-400 hover:border-yellow-400">
                    Login/Register
                </button>

                <div className="text-4xl md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                    {open ? <IoMdClose /> : <RiMenu3Fill />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;