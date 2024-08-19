import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Trainie } from "./trainie"
import { useNavigate } from "react-router-dom"
import ScrollAnimation from "../ScrollAnimation"
import { PagineTrainie } from "./PagineTrainie"
import workoutboxing from "../fitness/workoutboxing.png"
const getInitialPostPerPage = () => {
  return window.innerWidth <= 768 ? 1 : 3;
};
function Trainies() {
  const [personal, setpersonal] = useState([])
  const [loading, setloading] = useState(false)
  const [trainieperp, settrainieperp] = useState(getInitialPostPerPage())
  const [currentPage, setcurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    handle()

  }, [])
  const handle = async () => {
    try {
      setloading(true)
      const response = await axios.get("http://127.0.0.1:8000/api/personal_trainies")
      setpersonal(response.data)


    }
    catch (error) {
      console.log(error)
    }
    finally {
      setloading(false)
    }

  }
  useEffect(() => {
    const handleResize = () => {
      settrainieperp(getInitialPostPerPage());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const maxPage = Math.ceil(personal.length / trainieperp);
    setcurrentPage(Math.min(currentPage, maxPage || 1));
  }, [personal, trainieperp, currentPage]);

  const indexOfLastPr = currentPage * trainieperp;
  const indexOfFirst = indexOfLastPr - trainieperp;
  const currentPr = personal.slice(indexOfFirst, indexOfLastPr);
  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber)
  }
  return <ScrollAnimation>
    <div className="w-full id='#ptraining' relative h-screen flex items-center justify-center">
      <img src={workoutboxing} className="w-full h-full" />
      <div className="absolute md:w-5/6 w-11/12 h-3/4 rounded-lg bg-black bg-opacity-70 border border-red-700 flex items-center flex-col px-3 space-x-2 justify-center">
        {loading ? (
          <div className="loader">
            <div data-glitch="Loading..." className="glitch">Loading...</div>
          </div>
        ) : personal.length > 0 ? <div className="space-y-8">
          <Trainie personal={currentPr} loading={loading} />
          <PagineTrainie trainieperp={trainieperp} totalper={personal.length} paginate={paginate} />
        </div> : <div className="loader">
          <div data-glitch="No workout sessions available" className="glitch">No workout sessions available</div>
        </div>
        }
      </div>



    </div>

  </ScrollAnimation>
}
export default Trainies