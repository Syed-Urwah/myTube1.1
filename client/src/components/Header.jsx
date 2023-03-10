import React,{useState} from "react";
import logo from "../assets/YouTube-Logo.wine.svg";
import bar from "../assets/hamburgerDark.png";
import video from '../assets/add-video.png'
import searchIcon from '../assets/search.svg'
import leftArrow from '../assets/arrow-left.svg'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { videoQuery } from "../redux/user/CurrentUserSlice";
import IconMenu from "./IconMenu";
import picpeople from '../assets/picpeople.svg'


export default function Header() {

  const currentUser = useSelector(state=>state.user.currentUser)
  const [searchBox, setsearchBox] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch();

  

  function handleSearchDisplay(){
    if(!searchBox){
      setsearchBox(true)
    }else{
      setsearchBox(false)
    }
  }

  function handleSearch(e){
    if(e.key === 'Enter'){
      dispatch(videoQuery(searchValue));
      console.log(searchValue)
      navigate('/search')
    }
    
  }

  function handleNavBar(){
    let click = false;
    const nav = document.getElementById('nav');
    //toggling display
    nav.classList.toggle('hidden')
    nav.classList.toggle('absolute')
  }

  function handleModalVideo(){
    document.getElementById('modal-video').classList.add('flex')
    document.getElementById('modal-video').classList.remove('hidden')
    document.getElementById('modal-video').classList.remove('modalAnimationUp')
    document.getElementById('modal-video').classList.add('modalAnimationDown')
    document.getElementById('main').classList.add('opacity-70')
    document.getElementById('header').classList.add('opacity-70')
    document.getElementById('body').classList.add('overflow-y-auto')
  }
  

  function hamburgerControll1(path){
    if (path !== "/" && path !== "/sub" && path !== "/trend" && path !== "/movie" && path !== "/music" && path !== "/gaming" && path !== "/news" && path !== "/sports" && path !== "/your-video" && path !== "/watch-later" && path !== "/history" && path !== "/search" ) {
      return "block"
    }else{
      return "hidden"
    }
  }

  function handleIconMenu(){
    const menu = document.getElementById('icon-menu')
    menu.classList.toggle('hidden')
    // navigate('/signup')
  }

  return (
    <>
    {/* <ModalCreateVideo/> */}
    <header id="header" className="h-16 bg-bg-main pb-4 sticky top-0 z-10">
      <div className="header h-full w-[96vw] m-auto flex justify-between items-center text-white ">
        <div className={`bar ${!searchBox ? 'flex' : 'hidden'} items-center h-full`}>
          <img onClick={handleNavBar} src={bar} alt="" className={`w-6 xl:${hamburgerControll1(location.pathname)} hover:cursor-pointer`} />
          <Link to="/" className="logo h-full">
            <img src={logo} alt="" className="w-32 h-full" />
          </Link>
        </div>

        <div className={`search h-full flex items-center justify-evenly ${searchBox ? 'w-full' : 'w-auto'}`}>
            <img onClick={handleSearchDisplay} className={`w-5 hover:cursor-pointer ${searchBox ? 'block' : 'hidden'}`} src={leftArrow} alt="" />
            <input onKeyDown={handleSearch} onChange={(e)=>setSearchValue(e.target.value)} className={`md:w-96 sm:w-60 sm:block w-4/5 ${searchBox ? 'block' : 'hidden'} h-10 rounded-full pl-2 text-white border-[#1c1c1c] outline-none border-solid border-2 bg-transparent focus:border-white`} autoFocus={searchBox} placeholder="Search" type="text" name="search" id="search-box" />
        </div>

        {Object.keys(currentUser).length === 0 ? 
          <Link to="/signup" className="signin-button flex justify-around border-solid border-2 border-sky-500 py-2 px-2">
              <img className="w-6" src={picpeople} alt="" />
              <h4>SIGN IN</h4>
          </Link> : 
        <div className={`profile ${!searchBox ? 'flex' : 'hidden'} gap-5 h-full items-center`}>
            <img onClick={handleSearchDisplay} className="w-5 sm:hidden hover:cursor-pointer" src={searchIcon} alt="" />
            <Link to='/createVideo'>
              <img onClick={handleModalVideo} className="w-8 h-8 hover:cursor-pointer" src={video} alt="" />
            </Link>
            <img onClick={handleIconMenu} className="w-8 h-8 rounded-full hover:cursor-pointer" src={currentUser.img} alt="" />
            <IconMenu/>
        </div>
        }
      </div>
    </header>
    </>
  );
}
