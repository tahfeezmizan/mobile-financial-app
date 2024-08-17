import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="bg-slate-50 py-20 text-black">
            <div className="w-full lg:w-4/5 mx-auto px-3 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="col-span-2">
                        <h3 className="text-2xl font-semibold pb-8">PH Commerce</h3>
                        <p className="text-base pb-5 font-medium">123 Main Street Anytown, USA <br />Postal Code: 12345</p>
                        <p className="text-base font-medium">Support: support@phcommerce.com</p>
                        <div className="text-base font-medium">Available : 10:00am to 07:00pm</div>
                    </div>
                    <div className="col-span-1 font-medium">
                        <div className="flex  flex-col space-y-2 mt-14">
                            <Link>Home</Link>
                            <Link>About Us</Link>
                            <Link>Sucess Page</Link>
                            <Link>Terms and condition</Link>
                        </div>
                    </div>
                    <div className="col-span-1 font-medium">
                        <div className="flex  flex-col space-y-2 mt-14">
                            <Link>Services</Link>
                            <Link>Scheduling</Link>
                            <Link>Contact Us</Link>
                            <Link>Patient Portal</Link>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <nav className="flex flex-col">
                            <header className="text-lg font-bold mt-14  mb-6">Follow Us On</header>

                            <div className="flex items-center gap-8 text-xl text-black mb-5">
                                <p className=" rounded-full p-2"><FaFacebook /></p>
                                <p className="rounded-full p-2"><FaLinkedin /></p>
                                <p className=" rounded-full p-2"><FaTwitter /></p>
                            </div>
                            <p className="font-medium">Copyright © 2020 PH Commerce</p>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;