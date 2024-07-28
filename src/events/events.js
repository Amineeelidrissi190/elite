import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import eventbg from "../fitness/eventbg.png";
import { EventE } from "./EventE";
import { PaginationEvent } from "./PaginationEvent";
import ebn from "../fitness/ebn.png"
import ScrollAnimation from "../ScrollAnimation";
import "./Event.css"
const getInitialPostPerPage = () => {
    return window.innerWidth <= 768 ? 1 : 3;
};

function Events() {
    const [event, setevent] = useState([]);
    const [EventPerPage, setEventPerPage] = useState(getInitialPostPerPage());
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handle();
    }, []);

    const handle = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://127.0.0.1:8000/api/event");
            setevent(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setEventPerPage(getInitialPostPerPage());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const maxPage = Math.ceil(event.length / EventPerPage);
        setCurrentPage(Math.min(currentPage, maxPage || 1));
    }, [event, EventPerPage, currentPage]);

    const indexOfLastPr = currentPage * EventPerPage;
    const indexOfFirst = indexOfLastPr - EventPerPage;
    const currentPr = event.slice(indexOfFirst, indexOfLastPr);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <ScrollAnimation>
            <div className="w-full relative h-screen flex flex-col items-center justify-center">
            <img src={ebn} className="w-full h-full" />

            <div className="absolute bg-black border border-red-700 flex items-center justify-center bg-opacity-70 md:w-5/6 w-11/12 h-3/4 rounded-lg p-3 ">

                    {loading ? (
                        <div className="loader">
                        <div data-glitch="Loading..." className="glitch">Loading...</div>
                     </div>
                    ) : event.length > 0 ? (
                        <div className="">
                            <EventE event={currentPr} loading={loading} />
                            <PaginationEvent
                                Eventperpage={EventPerPage}
                                totalpr={event.length}
                                paginate={paginate}
                            />

                        </div>

                    ) : <div className="loader">
                    <div data-glitch="No events available" className="glitch">No events available</div>
                 </div>
                    }


                </div>




            </div>


        </ScrollAnimation>
        
    );
}

export default Events;
