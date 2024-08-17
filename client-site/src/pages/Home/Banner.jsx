import React from 'react';
import sliderBg from '../../assets/slider-bg.jpg'

const Banner = () => {
    return (
        <div className='home flex items-center justify-center' style={{
            backgroundImage: `url(${sliderBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className="w-full md:w-9/12 mx-auto text-white">
                <h2 className='text-center text-5xl font-bold px-3'>Buy Best Products From All Of The World</h2>
            </div>
        </div>
    );
};

export default Banner;