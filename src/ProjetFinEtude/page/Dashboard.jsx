import React, { useState } from 'react'
import Profile from './Profil'

export default function Dashboard() {
    const [Profil,setProfil]=useState(true)
    const [produits,setPro]=useState(false)
    const [commande,setComm]=useState(false)
    return (
        <div className='pt-14 h-svh bg-slate-100 grid grid-cols-5'>
            <div className=" col-span-1 bg-slate-300 h-full  ">
                <div className="fixed w-1/5">
                <div className="flex justify-center py-5 w-11/12">
                    <div className="flex justify-start w-11/12">
                        <img src="profil.png" alt="Profil" width={60} height={60} />
                        <div className="flex items-center">
                            <p>Nom du restaurant</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center ">
                    <button className=' w-11/12 border-b-4 border-gray-500 hover:border-gray-900 font-serif font-bold text-black hover:scale-105 hover:text-gray-900'>Profil</button>
                </div>
                <div className="flex justify-center py-5 ">
                    <button className=' w-11/12 border-b-4 border-gray-500 hover:border-gray-900 font-serif font-bold text-black hover:scale-105 hover:text-gray-900'>Gestion des produits</button>
                </div>
                <div className="flex justify-center ">
                    <button className=' w-11/12 border-b-4 border-gray-500 hover:border-gray-900 font-serif font-bold text-black hover:scale-105 hover:text-gray-900'>Gestion des commande</button>
                </div>
                <div className="flex justify-center pt-5 items-center">
                    <button className=' w-11/12 border-b-4  border-gray-500 hover:border-gray-900 font-serif font-bold text-black hover:scale-105 hover:text-gray-900'> Se Deconnecter</button>
                </div>
                </div>
            </div>
            <div className=" col-span-4 h-full">
                {Profil && (
                    <Profile/>
                )}
            </div>

        </div>
    )
}
