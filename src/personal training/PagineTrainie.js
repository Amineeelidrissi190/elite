import React from 'react'

export const PagineTrainie = ({trainieperp,totalper,paginate}) => {
    const pagenumbers = [];
    for (let i = 0; i < Math.ceil(totalper / trainieperp); i++) {
        pagenumbers.push(i + 1);
    }
    
    return (
        <ul className='text-black flex flex-wrap justify-center items-center space-x-2'>
            {pagenumbers.map((pageNumber, ind) => (
                <li key={ind}>
                    <a href='#ptraining' className='bg-white  px-3 rounded-lg py-1 focus:bg-red-700' onClick={() => {
                        paginate(pageNumber);
                    }}>{pageNumber}</a>
                    
                </li>
            ))}

        </ul>
    );
}
