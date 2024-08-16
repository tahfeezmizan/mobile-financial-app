import React from 'react';
import bg from '../../assets/slider-bg.jpg';

const ProductCard = ({ product }) => {
    const { productname, productimage, price, description, category, ratings, productcreationdate } = product;
  
    const formattedDate = new Date(productcreationdate);
    const date = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;

    return (
        <div className="bg-slate-100 hover:shadow-xl transition duration-300 rounded-xl overflow-hidden">
            <div className="">
                <div className="w-full h-[334px] overflow-hidden">
                    <img className="w-full h-full object-cover" src={bg} alt="" />
                </div>

                <div className="mt-6 pb-5">
                    <h2 className="text-[#373737] text-lg font-Poppins font-semibold px-5">{productname}</h2>

                    <div className="flex items-center justify-between gap-5 px-5">
                        <p className="text-gray-500 font-Poppins">category: <span className=' bg-green-200 rounded-full text-black px-2'>{category}</span></p>
                        <p className="text-[#373737] text-base font-Poppins font-semibold">Rating {ratings}</p>
                    </div>
                    <p className="py-2 px-5">{description}</p>
                    <div className="flex items-center justify-between gap-5 px-5 mt-2 pt-2 border-t border-gray-400">
                        <p className="text-[#373737] text-base font-Poppins font-semibold">${price}</p>

                        <p className="flex items-center justify-between gap-1  text-[#373737] text-base font-Poppins font-semibold">{date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;