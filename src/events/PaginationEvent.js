import React from 'react';
import { Link } from 'react-router-dom';

export const PaginationEvent = ({ Eventperpage, totalpr, paginate }) => {
  const pagenumbers = [];
  for (let i = 0; i < Math.ceil(totalpr / Eventperpage); i++) {
    pagenumbers.push(i + 1);
  }

  return (
    <ul className='text-black flex py-2 justify-center items-center space-x-2'>
      {pagenumbers.map((pageNumber, ind) => (
        <li key={ind}>
          <button
            className='bg-white px-3 rounded-lg py-1 focus:bg-red-700'
            onClick={() => {
              paginate(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        </li>
      ))}
    </ul>
  );
};



