import { useState } from "react";
import { IoGridOutline, IoList } from "react-icons/io5";

const Products = () => {
    const [searchText, setSearchText] = useState('');

    const handleChange = (event) => {
        setSearchText(event.target?.value);
    };

    const handleSearch = () => {
        console.log(searchText);

    }

    return (
        <div className=" bg-slate-100">
            <div className="w-full md:w-9/12 mx-auto py-20">
                <div className=" flex flex-col md:flex-row justify-between items-center gap-6">
                    <h2 className="text-3xl md:text-5xl font-bold pl-2">All Products</h2>
                    <div className="flex gap-5 items-center">
                        <button className='px-3 py-2.5 bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl  rounded-none'><IoList /></button>
                        <button className='px-3 py-2.5 bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl  rounded-none'><IoGridOutline /></button>

                        <div className='flex items-center'>
                            <input
                                type="text"
                                name='search'
                                placeholder="Search"
                                className="px-4 py-2.5 bg-white outline-none border-none rounded-none "
                                value={searchText}
                                onChange={handleChange}
                            />
                            <button className='px-4 py-2 bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl rounded-none' onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Products;