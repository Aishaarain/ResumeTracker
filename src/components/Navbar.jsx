import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
   <nav className='flex flex-row justify-between items-center bg-white rounded-full p-4 w-full px-10 max-w-[1200px] mx-auto;'>
    <Link to="/">
    <p className='text-2xl font-bold text-gradient'>RESUMIND</p></Link>
    <Link to="/upload" className='bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00] text-white rounded-full px-4 py-2 cursor-pointer  w-fit'>
    Upload Resume
    </Link>
   </nav>
  )
}

export default Navbar