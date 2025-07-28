import React from 'react'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
      <img src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
      <div>
        
      </div></div>
    </div>
  )
}

export default Navbar