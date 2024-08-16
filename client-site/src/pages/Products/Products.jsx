import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";

const Products = () => {
    const { count, products: initialProducts } = useLoaderData() || { count: 0, products: [] };
    const [selectedOption, setSelectedOption] = useState('none');
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState(initialProducts);
    const [currentPage, setCurrentPage] = useState(0);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/products`, {
            params: {
                page: currentPage,
                size: itemsPerPage,
                search: searchText,
                sort: selectedOption,
                brandname: selectedBrand,
                category: selectedCategory,
                minPrice: minPrice,
                maxPrice: maxPrice,
            }
        })
            .then(res => setProducts(res.data.products))
            .catch(err => console.error(err));
    }, [currentPage, itemsPerPage, searchText, selectedOption, selectedBrand, selectedCategory, minPrice, maxPrice]);


    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
        console.log(event.target.value);
        setCurrentPage(0);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log(event.target.value);
        setCurrentPage(0);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
        console.log(event.target.value);
        setCurrentPage(0);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
        console.log(event.target.value);
        setCurrentPage(0);
    };

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
            <div className="w-full lg:w-4/5 mx-auto py-20 px-3 lg:px-0">
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
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-6 gap-0 md:gap-8">

                    <div className="col-span-1 w-full sm:w-auto">
                        <div className="flex flex-col gap-6 mb-10 px-4 sm:px-0">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search"
                                    className="px-4 w-full py-2.5 bg-white outline-none border border-gray-300 rounded-t-md"
                                    value={searchText}
                                    onChange={handleChange}
                                />
                                <button
                                    className="px-4 py-2 w-full bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl rounded-b-md"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>

                            <div className="space-y-3 w-full">
                                <h3 className="text-2xl">All Categories</h3>
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="block w-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                >
                                    <option value="">All Categories</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="phone">Phone</option>
                                    <option value="drones">Drones</option>
                                    <option value="tv">TV</option>
                                    <option value="earbuds">Earbuds</option>
                                    <option value="smartwatch">Smartwatch</option>
                                </select>
                            </div>

                            <div className="space-y-3 w-full">
                                <h3 className="text-2xl">Brands</h3>
                                <select
                                    value={selectedBrand}
                                    onChange={handleBrandChange}
                                    className="block w-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                >
                                    <option value="">All Brands</option>
                                    <option value="Apple">Apple</option>
                                    <option value="asus">Asus</option>
                                    <option value="walton">Walton</option>
                                    <option value="samsung">Samsung</option>
                                    <option value="dji">DJI</option>
                                    <option value="jbl">JBL</option>
                                    <option value="lenovo">Lenovo</option>
                                </select>
                            </div>

                            <div className="space-y-3 w-full">
                                <h3 className="text-2xl">Price Range</h3>
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    className="px-4 w-full py-2.5 bg-white border border-gray-300 rounded-md"
                                />
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    className="px-4 w-full py-2.5 bg-white border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {
                            products?.map(product => <ProductCard product={product} key={product?._id}></ProductCard>)
                        }
                    </div>
                </div>

                <div className="pagination flex flex-col sm:flex-row items-center justify-center py-10 space-y-4 sm:space-y-0 sm:space-x-3">
                    <button onClick={handlePrevPage} className="px-4 py-2 bg-black text-white sm:mr-3 w-full sm:w-auto">Prev</button>
                    <div className="flex flex-wrap justify-center space-x-2">
                        {pages?.map((page) => (
                            <button
                                onClick={() => setCurrentPage(page)}
                                key={page}
                                className={`px-4 py-2 w-full sm:w-auto text-white ${currentPage === page
                                    ? 'bg-[#ff8717] hover:bg-[#eb7d16]'
                                    : 'bg-black hover:bg-gray-700'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNextPage} className="px-4 py-2 bg-black text-white w-full sm:w-auto">Next</button>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        className="block px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default Products;