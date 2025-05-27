import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

export default function Login() {
    const [Login, setLogin] = useState(true)
    const [client, setClient] = useState(false)
    const [shop, setShop] = useState(false)
    return (
        <div className='h-svh w-full'>
            {Login && (
                <div className=" grid grid-cols-5 bg-slate-500 h-full w-full ">
                    <div className="col-span-3  bg-slate-200  ">

                        <div className=" flex items-center h-1/5 justify-center">
                            <h1 className=' text-4xl pt-3  font-serif font-medium'>SE CONNECTER</h1>
                        </div>
                        <div className="flex items-center h-3/5 justify-center ">
                            <div className='w-full'>
                                <div className="relative  flex mx-10 items-center mt-5 border rounded-2xl  bg-white px-3">
                                    <FaUser className="text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Nom d'utilisateur"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                    <MdEmail className="text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Adresse email"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="mx-12 mt-7 flex items-center gap-2">
                                    <input type="checkbox" id="rememberMe" className="cursor-pointer scale-150" />
                                    <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer">Se souvenir de moi</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-1/5 justify-center ">
                            <button className='border-2 border-white bg-lime-800 rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5 '>
                                Se Connecter
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 w-full   bg-gradient-to-br from-lime-500 via-lime-700 to-lime-900 rounded-r-2xl ">
                        <div className=" w-full h-full flex justify-center items-center ">
                            <div className=" w-full ">
                                <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant que client</h1>
                                <div className="flex justify-center my-7 font-serif">
                                    <button onClick={()=>{setLogin(false);setClient(true)}} className='  border-2 border-white rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5 '>S'inscrire</button>
                                </div>
                                <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant qu'admin</h1>
                                <div className="flex justify-center my-7 font-serif">
                                    <button onClick={()=>{setLogin(false);setShop(true)}} className=' border-2 border-white rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5  '>S'inscrire</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            {client && (
                <div className=" grid grid-cols-5 bg-slate-500 h-full w-full ">
                    <div className="col-span-2 w-full h-full bg-gradient-to-br from-lime-900 via-lime-700 to-lime-500 rounded-r-2xl ">
                        <div className=" w-full h-full flex justify-center items-center ">
                            <div className=" w-full ">

                                <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant qu'admin</h1>
                                <div className="flex justify-center my-7 font-serif">
                                    <button onClick={()=>{setShop(true);setClient(false)}} className=' border-2 border-white rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5  '>S'inscrire</button>
                                </div>
                                <h1 className='text-center font-serif text-2xl text-white'>Se Connecter</h1>
                                <div className="flex justify-center my-7 font-serif">
                                    <button onClick={()=>{setLogin(true);setClient(false)}} className='  border-2 border-white rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5 '>Se Connecter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 bg-slate-200 rounded-l-2xl">
                        <div className=" flex items-center h-1/5 justify-center">
                            <h1 className=' text-4xl pt-3  font-serif font-medium'>S'inscrire en tant que client</h1>
                        </div>
                        <div className="flex items-center h-3/6 justify-center ">
                            <div className='w-full'>
                                <div className="relative  flex mx-10 items-center mt-5 border rounded-2xl  bg-white px-3">
                                    <FaUser className="text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Nom d'utilisateur"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                    <MdEmail className="text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Adresse email"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="relative  flex mx-10 items-center mt-5 border rounded-2xl bg-white  px-3">
                                    <RiLockPasswordFill className="text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Nom de pass"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="mx-12 mt-7 flex items-center gap-2">
                                    <input type="checkbox" id="rememberMe" className="cursor-pointer scale-150" />
                                    <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer">Se souvenir de moi</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-1/6 justify-center ">
                            <button className='border-2 border-white bg-lime-800 rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5 '>
                                S'inscrire
                            </button>
                        </div>
                    </div>

                </div>
            )}
            {shop && (
                <div className=" grid grid-cols-5 bg-slate-500 h-full w-full ">
                    <div className="col-span-2 w-full h-full bg-gradient-to-br from-lime-900 via-lime-700 to-lime-500 rounded-r-2xl ">
                        <div className=" w-full h-full flex justify-center items-center ">
                            <div className=" w-full ">

                                <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant que client</h1>
                                <div className="flex justify-center my-7 font-serif">
                                    <button onClick={()=>{setShop(false);setClient(true)}} className=' border-2 border-white rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5  '>S'inscrire</button>
                                </div>
                                <h1 className='text-center font-serif text-2xl text-white'>Se Connecter</h1>
                                <div className="flex justify-center my-7 font-serif">
                                    <button onClick={()=>{setShop(false);setLogin(true)}} className='  border-2 border-white rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5 '>Se Connecter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 bg-slate-200 rounded-l-2xl">
                        <div className=" flex items-center h-1/5 justify-center">
                            <h1 className=' text-4xl pt-3  font-serif font-medium'>S'inscrire en tant qu'admin</h1>
                        </div>
                        <div className="flex items-center h-3/6 justify-center ">
                            <div className='w-full'>
                                <div className="relative  flex mx-10 items-center mt-5 border rounded-2xl  bg-white px-3">
                                    <FaUser className="text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Nom d'utilisateur"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                    <MdEmail className="text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Adresse email"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="relative  flex mx-10 items-center mt-5 border rounded-2xl  bg-white  px-3">
                                    <RiLockPasswordFill className="text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Nom de pass"
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                    />
                                </div>
                                <div className="mx-12 mt-7 flex items-center gap-2">
                                    <input type="checkbox" id="rememberMe" className="cursor-pointer scale-150" />
                                    <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer">Se souvenir de moi</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center h-1/6 justify-center ">
                            <button className='border-2 border-white bg-lime-800 rounded-full text-2xl hover:scale-110 text-white hover:text-lime-800 hover:shadow-[0_0px_20px_rgba(0,0,0,0.7)] hover:bg-white py-2 px-5 '>
                                S'inscrire
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
