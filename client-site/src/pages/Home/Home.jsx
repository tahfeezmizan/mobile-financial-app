import React from 'react';
import Banner from './Banner';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div className='font-sans'>
            <Banner />
            <Products />
        </div>
    );
};

export default Home;