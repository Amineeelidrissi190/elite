import { useNavigate } from "react-router-dom";
import Elite2rem from "../fitness/Elite2rem.png";
function Contact() {
  const navigate = useNavigate()
  const handle = ()=>{
    window.scrollTo({
      top: 5,
      behavior: "smooth",
    });
    navigate("/join")


  }
  return <div className="w-full max-w-screen-xl mx-auto p-4 ">
    <div className="sm:flex sm:items-center sm:justify-between ">
      <a href="#nav" className="flex items-center mb-4 sm:mb-0">
        <img src={Elite2rem} alt="logo" className="md:w-44 w-28" />

      </a>
      <div className="">
        <div
          id="joincom"
          className="text-white font-bold text-sm border border-red-700 p-2 rounded-lg cursor-pointer bg-black hover:bg-red-700 hover:text-black hover:border-black transition-colors duration-300 ease-in-out"
          onClick={handle}
        >
          Join our community
        </div>

      </div>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium space-x-3 text-white sm:mb-0">
        <li>
          <a href="https://www.instagram.com/elitefitmaroc/" target="_blank" className="hover:underline hover:text-red-700">instagram</a>
        </li>
        <li>
          <a href="https://www.facebook.com/elitefitmaroc/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_transition=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0" target="_blank" className="hover:underline hover:text-red-700">facebook</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@elitemks4499" target="_blank" className="hover:underline hover:text-red-700" >youtube</a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-red-700">Contact</a>
        </li>
      </ul>

    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-red-700 lg:my-8" />
    <span className=" text-sm text-red-700 sm:text-center ">© 2023 All Rights Reserved.</span>
  </div>

}
export default Contact