import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu, AiFillHome } from 'react-icons/ai';
import { IoMdContact } from "react-icons/io";


const Nav = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <nav className='shadow-md sticky top-0 left-0 right-0 bg-white z-50'>
      <div className='flex max-w-screen-xl items-center justify-between mx-auto p-4'>
        <button onClick={() => setOpen(true)}>
          <AiOutlineMenu size={30} className='text-black'/>
        </button>
        <Link href="/">
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800'> 
              Dólar<span className='font-normal text-black'>Actual</span>
          </h1>
        </Link>
        {/* <SearchBar/> */}
        {/* Icons */}
        

        <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)}></div>

        <div className={`${open ? "w-80" : "w-0"} bg-[#fafbfd] min-h-screen fixed top-0 left-0 transition-all duration-300`}>
          <div className={`${!open && "hidden"} pt-3`}>
            <button className='ml-4 text-black py-3' onClick={() => setOpen(false)}>
              <AiOutlineClose size={30}/>
            </button>
            <ul className='flex flex-col p-4 text-[#18171c] font-semibold uppercase'>
              <li className='text-xl py-4 pl-1 flex'><Link className='flex' href="/"><AiFillHome size={26} className='mr-4'/>Dólar Actual</Link></li>
              <li className='text-xl py-4 pl-1 flex'><Link className='flex' href="/contact"><IoMdContact size={26} className='mr-4'/>Contacto</Link></li>
            </ul>
          </div>
        </div>
      </div> 
    </nav>
  )
}

export default Nav

