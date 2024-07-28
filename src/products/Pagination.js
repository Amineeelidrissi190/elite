import React from 'react';
import "./product.css"
export const Pagination = ({ postperpage, totalpr, paginate }) => {
    const pagenumbers = [];
    for (let i = 0; i < Math.ceil(totalpr / postperpage); i++) {
        pagenumbers.push(i + 1);
    }
    
    return (
        <ul className='text-black flex flex-wrap py-6 md:space-y-0 justify-center items-center space-x-2'>
            {pagenumbers.map((pageNumber, ind) => (
                <li key={ind}>
                    <a href='#' className='bg-white  px-3 rounded-lg py-1 focus:bg-red-700' onClick={() => {
                        paginate(pageNumber);
                    }}>{pageNumber}</a>
                    
                </li>
            ))}

        </ul>
    );
};
