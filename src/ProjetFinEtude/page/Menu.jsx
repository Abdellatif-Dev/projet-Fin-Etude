import React, { useEffect, useState } from 'react'
import { PiGreaterThan, PiLessThan, PiShoppingCartLight } from "react-icons/pi";
import { menuData, slide5, Restaurants } from '../data/data';
import { Link, useNavigate } from 'react-router-dom';
export default function Menu(props) {
    const [data, setdata] = useState(menuData)
    const [command, setCom] = useState([])
    const [Affichercommand, setAff] = useState(false)
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const navigate = useNavigate()
    const addToCart = (x) => {
        const exist = command.find((cmd) => cmd.id_Menu === x.id_Menu);
        if (exist) {
            setCom(
                command.map((cmd) =>
                    cmd.id_Menu === x.id_Menu ? { ...cmd, quantity: cmd.quantity + 1 } : cmd
                )
            );
        } else {
            setCom([...command, { ...x, quantity: 1 }]);
        }
    }

    useEffect(() => {
        if (command.length === 0) {
            setAff(false)
            console.log(Affichercommand);
        }
    }, [command])
    const decrease = (id) => {

        setCom(
            command.map((cmd) =>
                cmd.id_Menu === id ? { ...cmd, quantity: cmd.quantity - 1 } : cmd
            ).filter((cmd) => cmd.quantity > 0)
        );
    }
    const increase = (id) => {
        setCom(
            command.map((cmd) =>
                cmd.id_Menu === id ? { ...cmd, quantity: cmd.quantity + 1 } : cmd
            )
        );
    }

    const ValiderPaiement = () => {
            props.tabComm(command);
            navigate('/Valide');
        
    };

    return (
        <div className='pt-14 bg-slate-200'>
            {command.length > 0 && (
                <div className="fixed   bottom-10 right-5 cursor-pointer">
                    <PiShoppingCartLight onClick={() => setAff(!Affichercommand)} className="text-4xl   " />
                    <div className=" absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {command.length}
                    </div>
                </div>
            )}
            {Affichercommand && command.length > 0 && (
                <div className="w-80 h-[400px] z-20 bg-stone-200 fixed bottom-20 right-5 rounded-md">
                    <h1 className='pt-3 text-center first-letter:uppercase font-serif text-2xl'>panier</h1>

                    <div className="w-80 px-1 ">
                        <table className='w-full border-collapse  '>
                            <thead >
                                <tr >
                                    <td className='w-1/5'>Photo</td>
                                    <td className='w-2/5 '>Nom</td>
                                    <td className='w-1/5  '>Quantity</td>
                                    <td className='w-1/5 text-center'>Prix</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="overflow-x-auto  sm:rounded-lg  scroll-smooth w-80 px-1 h-[260px]">
                        <table className='w-full border-collapse  '>
                            <tbody>
                                {command.map((x, y) => (
                                    <tr key={y} className='odd:bg-slate-300 border-b border-gray-400 '>
                                        <td className='w-1/5'><img src={x.image_url} alt={x.name} className='w-12 h-12  object-cover ' /></td>
                                        <td className='w-2/5 '>{x.name}</td>
                                        <td className="w-1/5" >
                                        <div className='w-full flex'>
                                            <button onClick={() => decrease(x.id_Menu)} className='text-xl w-1/3 '>-</button>
                                            <p className='w-1/3 text-center text-2xl font-mono '>{x.quantity}</p>
                                            <button onClick={() => increase(x.id_Menu)} className='text-xl w-1/3 '>+</button>
                                        </div>
                                        </td>
                                        <td className='w-1/5 text-center'>{(x.quantity * x.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center text-xl font-bold  h-[30px]">
                        Total: {command.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} DH
                    </div>
                    <div className="flex justify-center">
                        <button onClick={ValiderPaiement} className='pt-2 px-3   rounded-full bg-gradient-to-b from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-t hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500'>COMMONDER</button>

                    </div>
                </div>
            )}

            <h1 className='text-center z-10  text-3xl font-serif  font-bold w-full absolute text-white '>Meilleur vendeur</h1>

            <div className=" flex w-full overflow-hidden group space-x-10">

                <div className="flex w-max animate-scrollX group-hover:[animation-play-state:paused] space-x-10 ">
                    {data.slice(0, 3).map((x, y) =>
                        <div key={y} className=" flex h-80 w-[800px] ">
                            <div className="h-full   w-2/5  bg-gradient-to-bl from-amber-400   via-yellow-600 to-orange-700 " >
                                <div className="backdrop-blur-md grid grid-cols-1 h-full">
                                    <div className="col-span-1  flex items-center pl-5   ">
                                        <h1 className='  font-serif text-2xl text-white'>Nom :{x.name}</h1>
                                    </div>
                                    <div className="col-span-1  flex items-center pl-5   ">
                                        <h1 className=' font-serif text-2xl text-white'>Nom du restaurant:{Restaurants.find(y => y.id_Resto === x.restaurant_id).name_Resto}</h1>
                                    </div>
                                    <div className="col-span-1  flex items-center pl-5   ">
                                        <h1 className='font-serif text-2xl text-white'>Prix:{x.price}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-cover bg-center w-3/5 h-full ">
                                <img src={x.image_url} className="w-full h-full object-cover hover:saturate-100 duration-500" alt={x.name} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex w-max animate-scrollX group-hover:[animation-play-state:paused] space-x-10">
                    {data.slice(0, 3).map((x, y) => (
                        <div key={y} className=" flex h-80 w-[800px] ">
                            <div className="h-full   w-2/5  bg-gradient-to-bl from-amber-400   via-yellow-600 to-orange-700 " >
                                <div className="backdrop-blur-md grid grid-cols-1 h-full">
                                    <div className="col-span-1  flex items-center pl-5   ">
                                        <h1 className='  font-serif text-2xl text-white'>Nom :{x.name}</h1>
                                    </div>
                                    <div className="col-span-1  flex items-center pl-5   ">
                                        <h1 className=' font-serif text-2xl text-white'>Nom du restaurant:{Restaurants.find(y => y.id_Resto === x.restaurant_id).name_Resto}</h1>
                                    </div>
                                    <div className="col-span-1  flex items-center pl-5   ">
                                        <h1 className='font-serif text-2xl text-white'>Prix:{x.price}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-cover bg-center w-3/5 h-full ">
                                <img src={x.image_url} className="w-full h-full object-cover hover:saturate-100 duration-500" alt={x.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div style={{ 'scrollbar-width': 'none' }} className=" flex w-[1200px] m-auto my-6  overflow-scroll  space-x-5 scroll-smooth">
                <button className='px-10 text-xl py-4 rounded-full bg-gradient-to-bl from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>  ALL</button>
                <button className='px-10 text-xl py-4 rounded-full bg-gradient-to-bl from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>  PIZZA</button>
                <button className='px-10 text-xl py-4 rounded-full bg-gradient-to-bl from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>  TACOS</button>
                <button className='px-10 text-xl py-4 rounded-full bg-gradient-to-bl from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>  HAMBURGER</button>
                <button className='px-10 text-xl py-4 rounded-full bg-gradient-to-bl from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>  SOUPE</button>
                <button className='px-10 text-xl py-4 rounded-full bg-gradient-to-bl from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>  SANDWICH</button>
                <button className='px-10 text-xl py-4 rounded-full bg-gradient-to-bl from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>  BOISSONS</button>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {data.map((x, y) =>
                    <div key={y} className="bg-white rounded-xl grid grid-cols-3 shadow-md overflow-hidden  hover:shadow-lg transition duration-300">
                        <div className="h-48 w-48 col-span-1 "  >
                            <Link to={`/detai/${x.id_Menu}`}>
                                <img src={x.image_url} alt={x.name} className='w-full h-full object-cover' />
                            </Link>
                        </div>
                        <div className="h-48 col-span-2 "  >
                        <div className="p-4 flex flex-col justify-between w-full">
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">{x.name}</h2>
                                    <span className="text-lg font-semibold text-orange-500">${x.price}</span>
                                </div>
                                <p className="text-gray-600 mt-1 text-sm">{x.description.length > 80 ? `${x.description.slice(0, 80)}...` : x.description}</p>
                                <p className="text-sm text-gray-500 mt-1">{Restaurants.find(y => y.id_Resto === x.restaurant_id).name_Resto}</p>
                            </div>
                            <div className="mt-4 flex justify-end items-center">
                                <button onClick={()=>addToCart(x)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition">
                                    <PiShoppingCartLight className="text-xl" /> Commander
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    )
}



