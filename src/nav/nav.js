import { Link } from "react-router-dom";
import nd2 from "../fitness/nd2.png";
import React from "react";
import "./navCard.css";
import roserouge from "../fitness/roserouge.png";
import "../input.css";
import facebooklast from "../fitness/facebooklast.png";
import instapng from "../fitness/instapng.png";
import whatsappng from "../fitness/whatsapppng.png";
import yt from "../fitness/yt.png";
import ScrollAnimation from "../ScrollAnimation";

function Nav() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    

    return (
        <ScrollAnimation>
            <div className="flex relative flex-col-reverse min-h-screen md:flex-row items-center justify-center">
                <div className="mdn" id="ss">
                    <div className="grp">
                        <img src={roserouge} className="w-2/3" alt="Rose Rouge" />
                        <p className="text-xs">WELCOME TO ELITE</p>
                        <p className="text-xs text-center">THE DEEP BLACK BREATH</p>
                    </div>
                </div>
                {token && user.role === "client"?
                    <div className="md:w-1/2 flex flex-col justify-center mx-5 space-y-4 text-center md:text-left">
                        <h1 className="font-bold text-lg md:text-5xl">
                            Greetings <span className="text-red-700">{user.name_client}</span>! YOU'RE NOW LOGGED IN AND ALL GYM FEATURES ARE AT YOUR FINGERTIPS.
                        </h1>
                        <h1 className="font-bold md:text-3xl text-lg text-red-700">ARE YOU READY !!</h1>
                        <div className="relative flex justify-center md:justify-start">
                            <div className="absolute top-5 md:top-10 flex space-x-10 items-center justify-center">
                                <a href="https://www.facebook.com/elitefitmaroc/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_transition=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0" target="_blank" rel="noopener noreferrer">
                                    <img src={facebooklast} className="w-2.5 md:w-4 lien" alt="Facebook" />
                                </a>
                                <a href="https://www.instagram.com/elitefitmaroc/" target="_blank" rel="noopener noreferrer">
                                    <img src={instapng} className="w-4 md:w-7 lien" alt="Instagram" />
                                </a>
                                <a href="" target="_blank" rel="noopener noreferrer">
                                    <img src={whatsappng} className="w-5 md:w-8 lien" alt="WhatsApp" />
                                </a>
                                <a href="https://www.youtube.com/@elitemks4499" target="_blank" rel="noopener noreferrer">
                                    <img src={yt} className="w-5 md:w-10 lien" alt="YouTube" />
                                </a>
                            </div>
                        </div>
                    </div>
                : (
                    <div className="md:w-1/2 flex flex-col justify-center mx-5 text-center md:text-left">
                        <h1 className="font-bold text-lg md:text-5xl">THE BODY ACHIEVES WHAT THE MIND BELIEVES</h1>
                        <h2 className="font-bold md:text-3xl text-lg text-red-700">GYM & FITNESS</h2>
                        <p className="text-sm md:space-y-2 py-3 md:text-lg font-bold">
                            Dive into a transformational fitness journey at our gym, where passion meets performance.
                            <span className="hidden md:flex"> Elevate your workouts, achieve your goals, and embrace a healthier you with our expert guidance and state-of-the-art facilities.</span>
                        </p>
                        <div className="py-1 flex md:self-start justify-center space-x-1">
                            <Link to="/join" className="self-center md:self-start bg-red-700 md:text-sm text-xs px-6 py-3 rounded-2xl">
                                <button>Start today</button>
                            </Link>
                            <Link to="/join" className="self-center md:self-start bg-transparent md:text-sm text-xs border px-6 py-3 rounded-2xl">
                                <button>Contact us</button>
                            </Link>
                        </div>
                        <div className="relative flex justify-center md:justify-start">
                            <div className="absolute top-5 md:top-10 flex space-x-10 items-center justify-center">
                                <a href="https://www.facebook.com/elitefitmaroc/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_transition=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0" target="_blank" rel="noopener noreferrer">
                                    <img src={facebooklast} className="w-2.5 md:w-4 lien" alt="Facebook" />
                                </a>
                                <a href="https://www.instagram.com/elitefitmaroc/" target="_blank" rel="noopener noreferrer">
                                    <img src={instapng} className="w-4 md:w-7 lien" alt="Instagram" />
                                </a>
                                <a href="" target="_blank" rel="noopener noreferrer">
                                    <img src={whatsappng} className="w-5 md:w-8 lien" alt="WhatsApp" />
                                </a>
                                <a href="https://www.youtube.com/@elitemks4499" target="_blank" rel="noopener noreferrer">
                                    <img src={yt} className="w-5 md:w-10 lien" alt="YouTube" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                <img src={nd2} className="w-1/2 md:w-1/3 z-10" alt="ND2" />
            </div>
        </ScrollAnimation>
    );
}

export default Nav;
