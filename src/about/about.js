import React from "react"
import aboutmen1 from "../fitness/aboutmen1.png"
function About() {
  return <div >
    <div className="flex items-end justify-center ">
    <div className="loader">
            <div id='coachtitre' data-glitch="About us" className="glitch">About us</div>
          </div>      <img src={aboutmen1} alt="aboutmen" id="ggmen" className="md:w-7 w-7" />
      </div>
    <div className="flex md:flex-row flex-col items-center justify-center space-x-8">
      <div className=" md:w-1/2 w-5/6">
        <p className="text-xs font-bold md:font-normal md:text-lg leading-1 p-2  md:leading-9 rounded-xl">ELITE FIT MAROC, one of the most well known gyms in Meknes, located in ENNAIM 2, right next to SOUSSI Mosque. Known for it's hospitality, variety, good atmosphere, environnement, and hard work. ELITE Gym has many coaches known for their friendliness, easiness to work with and will motivate you to achieve your goals and transform you into the best version of yourself. Our coaches will also help you reach your daily goals in nutrition and educate you on how your body works, and whats best for you mentally and physically. ELITE's golden child is crossfit, it's one of the best gyms in Morocco in terms of crossfit, ELITE Gym also has equipment that enables you to Bodybuild and to start your fitness journey. ELITE Gym also has JUDO ,Takewando and martial arts and activities you'll enjoy.</p>

      </div>
      <div className="mx-5">
        <iframe src="https://www.google.com/maps/d/u/1/embed?mid=1wUeD1mxq5EriVgc_igpbfoI6F3bB3t0&ehbc=000000" className=" w-4/5 h-60 md:w-80 md:h-80 rounded-xl"></iframe>
      </div>
    </div>

  </div>
}
export default About