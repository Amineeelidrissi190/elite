import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import offr2 from "../fitness/offr2.png"
import { Offer } from "./offer"
import { PaginationOffre } from "./PaginationOffre"
import ScrollAnimation from "../ScrollAnimation"
import bgof from "../fitness/bgof.png"
const getInitialPostPerPage = () => {
    return window.innerWidth <= 1024 ? 1 : 3;
};
function Offres() {
    const [offre, setoffre] = useState([])
    const [loading, setLoading] = useState(false)
    const [offreperpage, setoffreperpage] = useState(getInitialPostPerPage())
    const [currentpage, setcurrentpage] = useState(1)
    useEffect(() => {
        handle()

    }, [])
    const handle = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://127.0.0.1:8000/api/offres")
            setoffre(response.data)
        }
        catch (error) {

            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        const handleResize = () => {
            setoffreperpage(getInitialPostPerPage());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        const maxPage = Math.ceil(offre.length / offreperpage);
        setcurrentpage(Math.min(currentpage, maxPage || 1));
    }, [offre, offreperpage, currentpage]);

    const indexOfLastPr = currentpage * offreperpage;
    const indexOfFirst = indexOfLastPr - offreperpage;
    const currentPr = offre.slice(indexOfFirst, indexOfLastPr);
    const Paginate = (pageNum) => {
        setcurrentpage(pageNum)
    }
    return <ScrollAnimation>
        <div className="w-full relative h-screen flex items-center justify-center" >
            <img src={bgof} className="w-full h-full" />
            <div className="absolute md:w-5/6 w-11/12 h-3/4 rounded-lg bg-black bg-opacity-70 border border-red-700 flex items-center flex-col px-3 space-x-2 justify-center">
                {loading ? (
                    <div className="loader">
                    <div data-glitch="Loading..." className="glitch">Loading...</div>
                 </div>
                ) : offre.length > 0 ? <div className="space-y-8">
                    <Offer offer={currentPr} loading={loading} />
                    <PaginationOffre Paginate={Paginate} total={offre.length} offreperpage={offreperpage} />
                </div> : <div className="loader">
                    <div data-glitch="No offers available" className="glitch">No offers available</div>
                 </div>

                }

            </div>
        </div>
    </ScrollAnimation>

}
export default Offres