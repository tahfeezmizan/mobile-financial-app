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
            }
        })
            .then(res => setProducts(res.data.products))
            .catch(err => console.error(err));
    }, [currentPage, itemsPerPage, searchText, selectedOption]);


    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [])

    const cate = products?.filter(item => item.category === "Smartphones")

    console.log('Load Data', products);


    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
        setCurrentPage(0); // Reset to the first page when filter changes
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log(event.target.value);

        setCurrentPage(0);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
        setCurrentPage(0);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
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


                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8">
                    <div className="col-span-1">
                        <div className="flex flex-col gap-6 mb-10 ">
                            <div className=''>
                                <input
                                    type="text"
                                    name='search'
                                    placeholder="Search"
                                    className="px-4 py-2.5 bg-white outline-none border-none rounded-none "
                                    value={searchText}
                                    onChange={handleChange}
                                />
                                <button className='px-4 py-2 w-full bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl rounded-none' onClick={handleSearch}>Search</button>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-2xl">All Categories</h3>
                                <select value={selectedCategory} onChange={handleCategoryChange}
                                    className="block w-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">All Categories</option>
                                    <option value="Smartphones">Smartphones</option>
                                    <option value="Laptops">Laptops</option>
                                </select>
                            </div>


                            <div className="space-y-3">
                                <h3 className="text-2xl">Brands</h3>

                                <select value={selectedBrand} onChange={handleBrandChange}
                                    className="block w-full px-4 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">All Brands</option>
                                    <option value="Brand A">Brand A</option>
                                    <option value="Brand B">Brand B</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-2xl">Price Range</h3>
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    className="px-4 py-2.5 bg-white outline-none border-none rounded-none"
                                />

                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    className="px-4 py-2.5 bg-white outline-none border-none rounded-none"
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