import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Productp } from './productp';
import { Pagination } from './Pagination';
import prback from "../fitness/prback.png";
// import prbgbg from "../fitness/prbgbg.png";
import ScrollAnimation from '../ScrollAnimation';

const getInitialPostPerPage = () => {
    return window.innerWidth <= 768 ? 1 : 4;
};

function Product() {
    const [product, setProduct] = useState([]);
    const [postPerPage, setPostPerPage] = useState(getInitialPostPerPage());
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8000/api/produit');
            setProduct(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setPostPerPage(getInitialPostPerPage());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const maxPage = Math.ceil(product.length / postPerPage);
        setCurrentPage(Math.min(currentPage, maxPage || 1));
    }, [product, postPerPage, currentPage]);

    const indexOfLastPr = currentPage * postPerPage;
    const indexOfFirst = indexOfLastPr - postPerPage;
    const currentPr = product.slice(indexOfFirst, indexOfLastPr);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <ScrollAnimation>
            <div  className="w-full relative h-screen flex items-center id='prdgene' justify-center" >
                <img src={prback} className='w-full h-full' />
                <div  className="absolute items-center justify-center flex md:w-5/6 w-full px-6  h-3/4 bg-black border border-red-700 rounded-lg bg-opacity-75 space-x-2 ">
                    <div className='flex-col items-center justify-center'>
                        {loading ? (
                            <div className="loader flex items-center justify-center h-full">
                                <div data-glitch="Loading..." className="glitch">Loading...</div>
                            </div>
                        ) : product.length > 0 ? (
                            <>
                                <Productp product={currentPr} loading={loading} />
                                <Pagination postperpage={postPerPage} totalpr={product.length} paginate={paginate} />
                            </>
                        ) : (
                            <div className="loader flex items-center justify-center h-full">
                                <div data-glitch="No products available" className="glitch">No products available</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ScrollAnimation>
    );
}

export default Product;
