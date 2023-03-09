import React from 'react'
import { Link } from 'react-router-dom'
import homeLogo from '../assets/home-logo.png'

export default function MdNavbar() {
  return (
    <section id='md-nav' className='xl:hidden md:flex hidden bg-bg-main w-15 h-auto text-white flex-col items-center'>

      <Link to='/' className="home w-16 flex flex-col items-center hover:bg-[#272727] rounded-xl py-4">
        <img className='w-6 h-6' src={homeLogo} alt="" />
        <p>Home</p>
      </Link>

      <a className="home w-16 flex flex-col items-center hover:bg-[#272727] rounded-xl py-4">
        <img className='w-6 h-6' src={homeLogo} alt="" />
        <p>Home</p>
      </a>

      <a className="home w-16 flex flex-col items-center hover:bg-[#272727] rounded-xl py-4">
        <img className='w-6 h-6' src={homeLogo} alt="" />
        <p>Home</p>
      </a>

    </section>
  )
}
