import axios from "axios";
import { useEffect, useState } from "react";
import { IoGridOutline, IoList } from "react-icons/io5";
import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";

const Products = () => {
    const { count, products: initialProducts } = useLoaderData() || { count: 0, products: [] };
    const [selectedOption, setSelectedOption] = useState('none');
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState(initialProducts);
    const [currentPage, setCurrentPage] = useState(0);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/products?page=${currentPage}&size=${itemsPerPage}&search=${searchText}`)
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => console.log(err));
    }, [currentPage, itemsPerPage, searchText]);

    const handleChange = (event) => {
        setSearchText(event.target?.value);
    };

    const handleSearch = () => {
        setCurrentPage(0);
    };

    const handleSelect = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        if (value !== 'none') {
            console.log(value);
        }
    }

    const handleItemsPerPage = e => {
        const values = parseInt(e.target.value)
        console.log(values);
        setItemsPerPage(values)
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
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
                            <option value="Low to High">Low to High</option>
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

                <div className="pagination flex items-center justify-center py-10">
                    <button onClick={handlePrevPage} className="px-4 py-2 bg-black text-white  mr-3">Prev</button>
                    {
                        pages?.map(page => <button
                            onClick={() => setCurrentPage(page)}

                            key={page} className={currentPage === page ? "px-4 py-2 text-white bg-[#ff8717] hover:bg-[#eb7d16] mr-3" : "px-4 py-2 bg-black text-white  mr-3"}>{page}</button>)
                    }
                    <button onClick={handleNextPage} className="px-4 py-2 bg-black text-white  mr-3">Next</button>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        className="block px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">30</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Products;