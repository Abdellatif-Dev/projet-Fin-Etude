import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaUser } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {clearCommande} from '../Store/CreteSlice'

export default function ValiderPaiement() {
    const command = useSelector((s) => s.Tache.Commande)
    const dispatch=useDispatch()
    return (
        <div className='pt-14 h-svh w-full bg-white'>
            <div className='w-10/12 mx-auto my-5 bg-gray-100 h-[600px]'>
                <h1 className='text-center text-3xl font-serif'>Valider Votre Paiement</h1>
                <div className="grid grid-cols-5">
                    <div className="col-span-3 px-4">
                        <div className="mt-4 space-y-4">
                            <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                <FaUser className="text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Adresse email"
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
                            <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                <FaPhoneAlt className="text-gray-500" />
                                <input
                                    type="tel"
                                    placeholder="telephon"
                                    className="ml-2 w-full p-2 outline-none bg-transparent"
                                />
                            </div>
                            <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                <FaLocationDot className="text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Adresse "
                                    className="ml-2 w-full p-2 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 h-[500px] bg-white">
                        <div className="h-4/5 overflow-x-auto scroll-smooth ">
                            {command.map((x, y) => (
                                <div className="m-1 flex justify-between h-40 " key={y}>
                                    <div className=" h-full">
                                        <div className="h-32">
                                            <img src={x.image_url} alt={x.name} className='w-32 h-32 rounded-md  object-cover ' />
                                        </div>
                                        <div className="h-8 flex items-end">
                                            <p className='text-xl font-sans font-semibold text-nowrap'>{x.name}</p>
                                        </div>
                                    </div>
                                    <div className="h-full w-56">
                                        <div className='h-1/2 '>
                                            <div className="flex justify-between">
                                                <p className='text-xl font-sans font-semibold'>Prix: </p>
                                                <p className='text-xl font-sans font-semibold'>{x.price.toFixed(2)} DH</p>
                                            </div>
                                            <div className="flex justify-between pt-5">
                                                <p className='text-xl font-sans font-semibold'>Quantity: </p>
                                                <p className='text-xl font-sans font-semibold'>{x.quantity}</p>
                                            </div>
                                        </div>
                                        <div className='h-1/2 flex items-end w-56 pr-2'>
                                            <div className="flex justify-between w-full ">
                                                <p className='text-xl font-sans font-semibold'>Total: </p>
                                                <p className='text-xl font-sans font-semibold'>{(x.quantity * x.price).toFixed(2)} DH</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-1/5 flex  justify-center items-center  border-t-2 border-red-600">
                            <div className="">
                                <div className="text-center text-xl font-bold  ">
                                    Total: {command.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} DH
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center h-32 items-center  ">
                    <button onClick={()=>dispatch(clearCommande())} className='text-2xl  bg-orange-500 text-2 hover:bg-orange-600 text-white px-4 py-2 rounded-full  '>Valider</button>
                </div>
            </div>
        </div>
    )
}
