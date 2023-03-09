import React, { useEffect } from "react";
import homeLogo from "../assets/home-logo.png";
import MdNavbar from "./MdNavbar";
import picpeople from '../assets/picpeople.svg'
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import profilePic from '../assets/profile.jpg'
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';

export default function Navbar(props) {

  const currentUser = useSelector(state => state.user.currentUser)

  let location = useLocation()
  let { id } = useParams();
  const videoUrl = location.pathname
  const myId = "/video/" + id



  function navBarControll1(path) {
    if (path !== "/" && path !== "/sub" && path !== "/trend" && path !== "/movie" && path !== "/music" && path !== "/gaming" && path !== "/news" && path !== "/sports" && path !== "/your-video" && path !== "/watch-later" && path !== "/history" && path !== "/search" ) {
      return "hidden"
    } else {
      return "xl:block"
    }
  }
  useEffect(() => {

    console.log(currentUser)
    console.log(id)
  }, [videoUrl])




  return (
    <>
      <section id="nav" className={`${navBarControll1(location.pathname)} hidden pt-3 w-72 min-h-[calc(100vh-64px)] bg-bg-main text-white slide-in-left z-50`}>
        <div className="s w-full flex flex-col justify-center sticky top-20">

          <Link to="/" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-end h-1/2">
              <img className="w-6 h-6 mr-4" src={homeLogo} alt="" />
              <p>Home</p>
            </div>
          </Link>

          <Link to="/sub" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-end h-1/2">
              {/* <img className="w-6 h-6 mr-4" src={SubscriptionsOutlinedIcon} alt="" /> */}
              <SubscriptionsOutlinedIcon className="mr-4" />
              <p>Subscriptions</p>
            </div>
          </Link>

          <div className="line border-t border-[#272727] mt-5"></div>
          {Object.keys(currentUser).length > 0 ?
            <>
              <Link to="/history" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
                <div className="flex justify-center items-end h-1/2">
                  {/* <img className="w-6 h-6 mr-4" src={homeLogo} alt="" /> */}
                  <HistoryOutlinedIcon className="mr-4" />
                  <p>History</p>
                </div>
              </Link>
              <Link to="/your-video" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
                <div className="flex justify-center items-end h-1/2">
                  {/* <img className="w-6 h-6 mr-4" src={homeLogo} alt="" /> */}
                  <SlideshowOutlinedIcon className="mr-4" />
                  <p>Your Videos</p>
                </div>
              </Link>
              <Link to="/watch-later" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
                <div className="flex justify-center items-end h-1/2">
                  {/* <img className="w-6 h-6 mr-4" src={homeLogo} alt="" /> */}
                  <WatchLaterOutlinedIcon className="mr-4" />
                  <p>Watch Later</p>
                </div>
              </Link>
            </> :
            <div className="sign-in w-4/5 flex flex-col items-center gap-2">
              <p>Signin to like</p>
              <Link to="/signup" className="signin-button flex justify-around border-solid border-2 border-sky-500 py-2 px-2">
                <img className="w-6" src={picpeople} alt="" />
                <h4>SIGN IN</h4>
              </Link>
            </div>
          }
          <div className="line border-t border-[#272727] mt-5"></div>

          {Object.keys(currentUser).length > 0 &&
            <>
              <p className="my-5 ml-4 pl-3">Subscriptions</p>

              <Link to="/sub" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
                <div className="flex justify-center items-center h-1/2">
                  {/* <img className="w-6 h-6 mr-4" src={SubscriptionsOutlinedIcon} alt="" /> */}
                  <img src={profilePic} className="mr-4 w-7 rounded-full" />
                  <p className="text-sm">Subscriptions</p>
                </div>
              </Link>
            </>}

          <div className="line border-t border-[#272727] mt-5"></div>

          <p className="my-5 ml-4 pl-3">Explore</p>

          <Link to="/trend" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-center h-1/2">
              <WhatshotOutlinedIcon className="mr-4"/>
              <p className="text-sm">Trending</p>
            </div>
          </Link>
          <Link to="/movie" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-center h-1/2">
              <MovieCreationOutlinedIcon className="mr-4"/>
              <p className="text-sm">Movie</p>
            </div>
          </Link>
          <Link to="/music" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-center h-1/2">
              <MusicNoteOutlinedIcon className="mr-4"/>
              <p className="text-sm">Music</p>
            </div>
          </Link>
          <Link to="/gaming" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-center h-1/2">
              <SportsEsportsOutlinedIcon className="mr-4"/>
              <p className="text-sm">Gaming</p>
            </div>
          </Link>
          <Link to="/news" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-center h-1/2">
              <NewspaperOutlinedIcon className="mr-4"/>
              <p className="text-sm">News</p>
            </div>
          </Link>
          <Link to="/sports" className="home w-[80%] flex h-10 ml-4 pl-3 items-center border-solid hover:bg-[#272727] rounded-xl ">
            <div className="flex justify-center items-center h-1/2">
              <EmojiEventsOutlinedIcon className="mr-4"/>
              <p className="text-sm">Sports</p>
            </div>
          </Link>

         
        </div>
      </section>

      {/* {location.pathname === '/' && <MdNavbar />} */}
    </>
  );
}
