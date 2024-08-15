import axios from "axios";
import { useEffect, useState } from "react";
import { IoGridOutline, IoList } from "react-icons/io5";
import ProductCard from "./ProductCard";

const Products = () => {
    const [selectedOption, setSelectedOption] = useState('none');
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/products?sort?=${selectedOption ? "asc" : "desc"}`)
            .then(res => {
                setProducts(res.data)
            })
            .then(err => console.log(err))

    }, [])

    const handleChange = (event) => {
        setSearchText(event.target?.value);
    };

    const handleSearch = () => {
        console.log(searchText);
    }

    const handleSelect = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value !== 'none') {
            console.log(value);
          }
    }



    return (
        <div className=" bg-slate-200">
            <div className="w-full md:w-9/12 mx-auto py-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold pl-2">All Products</h2>
                    <div className="flex gap-5 items-center">
                        <select
                            value={selectedOption}
                            onChange={handleSelect}
                            className="block w-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="none">None</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                            <option value="date">Date</option>
                        </select>

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



                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
                    {
                        products?.map(product => <ProductCard product={product} key={product?._id}></ProductCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;