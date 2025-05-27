import React from 'react'
import { FaFacebook, FaInstagram, FaSquareInstagram, FaTwitter } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className=' bg-neutral-900 h-24'>
       <div className="h-2/3 flex justify-center items-center space-x-8">
       <FaFacebook className="text-gray-100 text-3xl hover:scale-110 hover:text-sky-600 transition-all duration-500 " />
       <FaInstagram className="text-gray-100 text-3xl  hover:scale-110  hover:bg-clip-content hover:bg-gradient-to-br hover:from-violet-800 hover:via-red-600 hover:to-orange-500 transition-all duration-500 " />
       <FaTwitter className="text-gray-100 text-3xl hover:scale-110 hover:text-sky-400 transition-all duration-500 " />
       
       </div>
        
        <div className="h-1/3 border-t-2 flex justify-center items-center border-neutral-300">
            <span className="text-xl text-white">© 2025 | DAWQ ,All rights reserved</span>
          </div>    
      
    </footer>
  )
}
