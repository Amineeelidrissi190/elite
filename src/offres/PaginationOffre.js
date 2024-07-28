import React from 'react'
export const  PaginationOffre = ({Paginate,total,offreperpage})=> {
    const pageNum = []
    for(let i = 0 ; i < Math.ceil(total / offreperpage) ; i++ ){
        pageNum.push(i+1)
    }
    return (
        <ul className='text-black flex flex-wrap md:space-y-0 justify-center items-center space-x-2'>
            {pageNum.map((pageNumber, ind) => (
                <li key={ind}>
                    <a href='#' className='bg-white  px-3 rounded-lg py-1 focus:bg-red-700' onClick={() => {
                        Paginate(pageNumber);
                    }}>{pageNumber}</a>
                    
                </li>
            ))}

        </ul>
    );
}
