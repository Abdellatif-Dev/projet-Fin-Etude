import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function Commande() {
    const [Nouvelle, setNouv] = useState(true)
    const [traitement, setTra] = useState(false)
    const [livre, setLiv] = useState(false)
    const x='en coure'
    return (
        <div className=' w-full h-full px-10 pt-2 '>
            <p className=' text-3xl font-serif font-bold '>Bonjour XXX</p>
            <div className="mt-3 w-full  ">
                <div className="flex space-x-6">
                    <button onClick={() => {setNouv(true); setTra(false); setLiv(false)}} className={` font-serif font-medium border-b-2 text-xl h-10 ${Nouvelle ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Nouvelle commande</button>
                    <button onClick={() => {setNouv(false); setTra(true); setLiv(false)}} className={` font-serif font-medium border-b-2 text-xl h-10 ${traitement ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>En cours de traitement</button>
                    <button onClick={() => {setNouv(false); setTra(false); setLiv(true)}} className={` font-serif font-medium border-b-2 text-xl h-10 ${livre ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Commande livrée </button>
                </div>
                {
                    Nouvelle && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[490px]">
                                <table className="w-full text-sm ">
                                    <thead className="text-sm  bg-zinc-100 text-violet-700 font-bold ">
                                        <tr>
                                            <td className="px-6 py-3 w-1/12">Photo</td>
                                            <td className="px-6 py-3 w-4/12">Nom</td>
                                            <td className="px-6 py-3 w-4/12">Adresse</td>
                                            <td className="px-6 py-3 w-1/12">Quantity</td>
                                            <td className="px-6 py-3 w-1/12">Prix</td>
                                            <td className="px-6 py-3 w-1/12">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100">
                                            <td className="px-6 py-1   whitespace-nowrap">
                                                <img src="profil.png" alt="profil" width={50} height={50} />
                                            </td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">330</td>
                                            <td className="px-6 py-1">
                                                <div className="flex space-x-2">
                                                <button className='bg-green-500 hover:bg-green-600 rounded-md p-1'>
                                                    <AiOutlineCheck className='text-white text-xl' />
                                                </button>
                                                <button className='bg-red-500 hover:bg-red-600 rounded-md p-1'>
                                                <AiOutlineClose className='text-white text-xl' />
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
                {
                    traitement && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[490px]">
                                <table className="w-full text-sm ">
                                    <thead className="text-sm  bg-zinc-100 text-violet-700 font-bold ">
                                        <tr>
                                            <td className="px-6 py-3 w-1/12">Photo</td>
                                            <td className="px-6 py-3 w-4/12">Nom</td>
                                            <td className="px-6 py-3 w-4/12">Adresse</td>
                                            <td className="px-6 py-3 w-1/12">Quantity</td>
                                            <td className="px-6 py-3 w-1/12">Prix</td>
                                            <td className="px-6 py-3 w-1/12">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100">
                                            <td className="px-6 py-1   whitespace-nowrap">
                                                <img src="profil.png" alt="profil" width={50} height={50} />
                                            </td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">330</td>
                                            <td className="px-6 py-1">
                                                <button className={`py-1 px-2 rounded-md text-nowrap text-white ${x==='en coure'?'bg-orange-500 hover:bg-orange-600':''} `}>{x}</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
                {
                    livre && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[490px]">
                                <table className="w-full text-sm ">
                                    <thead className="text-sm  bg-zinc-100 text-violet-700 font-bold ">
                                        <tr>
                                            <td className="px-6 py-3 w-1/12">Photo</td>
                                            <td className="px-6 py-3 w-4/12">Nom</td>
                                            <td className="px-6 py-3 w-4/12">Adresse</td>
                                            <td className="px-6 py-3 w-1/12">Quantity</td>
                                            <td className="px-6 py-3 w-1/12">Prix</td>
                                            <td className="px-6 py-3 w-1/12">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100">
                                            <td className="px-6 py-1   whitespace-nowrap">
                                                <img src="profil.png" alt="profil" width={50} height={50} />
                                            </td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">xxxx</td>
                                            <td className="px-6 py-1">330</td>
                                            <td className="px-6 py-1">
                                            <button className='py-1 px-2 rounded-md text-nowrap text-white bg-green-500 hover:bg-green-600 '>{x}</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
