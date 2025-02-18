import React, { useState } from 'react'
import { PiGreaterThan, PiLessThan,PiShoppingCartLight  } from "react-icons/pi";
import { menuData } from '../data/data';
export default function Menu() {
    const [data, setdata] = useState(menuData)
    return (
        <div className='pt-14 bg-slate-200'>
            <div className="grid grid-cols-10 h-52  ">
                <div className="col-span-1 h-full bg-gray-800 hover:bg-gray-900 active:bg-gray-950 flex justify-center items-center"><PiLessThan className='text-white text-5xl' /></div>
                <div className="col-span-8 h-full relative  ">
                    <div
                        style={{
                            backgroundImage: `url(/imageMenu/pizza1.png)`
                        }}
                        className='h-full  w-full bg-cover bg-center  '
                        alt="Plat du menu"
                    >
                        <h1 className='text-center z-10  text-3xl font-serif  font-bold w-full absolute '>Meilleur vendeur</h1>
                        <div className="h-full  w-2/5  backdrop-blur-md grid grid-cols-1">
                            <div className="col-span-1  flex items-center pl-5   ">
                                <h1 className='  font-serif text-2xl'>Nom</h1>
                            </div>
                            <div className="col-span-1  flex items-center pl-5   ">
                                <h1 className=' font-serif text-2xl'>Nom du restaurant</h1>
                            </div>
                            <div className="col-span-1  flex items-center pl-5   ">
                                <h1 className='font-serif text-2xl '>Prix</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 h-full bg-gray-800 hover:bg-gray-900 active:bg-gray-950 flex justify-center items-center"><PiGreaterThan className='text-white text-5xl' /></div>
            </div>

            <div className=" container m-auto ">
                <div className="grid grid-cols-2">
                    {data.map((x, y) =>
                        <div className="col-span-1 grid grid-cols-3 p-3 bg-neutral-300 hover:bg-neutral-400 " key={y}>
                            <div className="h-48 w-48 col-span-1 "  >
                                <img src={x.image} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className="col-span-2 h-full  ">
                                <div className="h-4/5 ">
                                <div className="flex justify-between w-full px-3  ">
                                    <p className='text-xl font-serif'>{x.nomPlat}</p>
                                    <p className='text-xl font-serif'>{x.prix}</p>
                                </div>
                                <p className='text-lg px-3 '>{x.description.length > 80 ? `${x.description.slice(0, 80)}...` : x.description}</p>
                                <p className='text-lg px-3 '>{x.nomRestro}</p>
                                <p className='text-lg px-3 '>{x.note}/5</p>
                                </div>
                                <div className="h-1/5 flex items-center justify-end space-x-6 "> 
                                <button className='py-2  px-5 rounded-full bg-gradient-to-b from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-t hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500'>COMMONDER</button>
                                 <PiShoppingCartLight className='text-3xl hover:text-slate-700 ' />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
