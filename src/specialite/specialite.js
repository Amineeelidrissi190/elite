import { Link } from "react-router-dom"
import nd2 from "../fitness/nd2.png"
import React from "react";
import icogym from "../fitness/icogym.png"
import kettlebell from "../fitness/kettlebell.png"
import tak from "../fitness/tak.png"
import judocon from "../fitness/judocon.png"
import karate from "../fitness/karate.png"
import ScrollAnimation from "../ScrollAnimation";
export default function Specialite() {
    return <ScrollAnimation>
        <div className=" bg-black flex md:flex-row flex-col-reverse items-center justify-center w-screen space-x-5 h-screen">

            <div className="flex flex-col items-center justify-center space-y-3 md:w-1/3 w-2/3 h-1/2">
                <div className="flex space-x-3 items-center justify-center w-full h-full">
                    <Link to="/takewando" className="text-white w-1/2 bg-red-700  flex flex-col items-center justify-center  h-full rounded-2xl p-2 hover:scale-105">
                        <img src={karate} className="w-16" /><h3 className="text-xs md:text-lg">Takewando</h3></Link>
                    <Link to="/fitness" className="text-white bg-red-700  w-1/2 flex flex-col items-center justify-center h-full rounded-2xl space-y-1 p-2 hover:scale-105">
                        <img src={icogym} className="" /><h3 className="flex items-center justify-center text-xs md:text-lg">Fitness</h3></Link>

                </div>


                <div className="flex space-x-3 items-center w-full h-full">
                    <Link to="/judo" className="text-white w-1/2 bg-red-700 h-full flex flex-col  items-center justify-center  rounded-2xl hover:scale-105" >
                        <img src={judocon} className="w-16" /><h3 className="text-xs md:text-lg">Judo</h3></Link>
                    <Link to="/crossfit" className="text-white bg-red-700 w-1/2 flex flex-col items-center h-full justify-center  rounded-2xl hover:scale-105">
                        <img src={kettlebell} className="w-16" />
                        <h3 className="text-xs md:text-lg">Crossfit</h3></Link>

                </div>





            </div>
            <img src={nd2} className=" md:w-1/3 w-60 h-11/12" />
        </div>
    </ScrollAnimation>

}




