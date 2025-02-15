import React from 'react'
import { NavLink } from 'react-router-dom'  // Changed to NavLink

export default function NavBar() {
    return (
        <nav className='h-14 z-20 bg-slate-950 w-full flex justify-between fixed'>
            <div className="flex justify-center items-center h-14 mx-5">
                <img src="DawQ.png" alt="" className='h-10' />
            </div>
            <div className="flex justify-around items-center h-14 w-1/2">
                {/* Changed all Links to NavLinks */}
                <NavLink 
                    to='/' 
                    className={({ isActive }) => 
                        `text-2xl hover:text-yellow-300 active:text-yellow-500 ${
                            isActive ? 'text-yellow-300' : 'text-white'
                        }`
                    }
                >
                    Home
                </NavLink>
                
                <NavLink 
                    to='/Menu' 
                    className={({ isActive }) => 
                        `text-2xl hover:text-yellow-300 active:text-yellow-500 ${
                            isActive ? 'text-yellow-300' : 'text-white'
                        }`
                    }
                >
                    Menu
                </NavLink>
                
                <NavLink 
                    to='/About'
                    className={({ isActive }) => 
                        `text-2xl hover:text-yellow-300 active:text-yellow-500 ${
                            isActive ? 'text-yellow-300' : 'text-white'
                        }`
                    }
                >
                    About us
                </NavLink>
                
                <NavLink 
                    to='/Login'
                    className={({ isActive }) => 
                        `text-2xl hover:text-yellow-300 active:text-yellow-500 ${
                            isActive ? 'text-yellow-300' : 'text-white'
                        }`
                    }
                >
                    Login
                </NavLink>
            </div>
        </nav>
    )
}