import React, { useEffect, useState } from 'react'
import { PiGreaterThan, PiLessThan, PiShoppingCartLight } from "react-icons/pi";
import { menuData } from '../data/data';
import { Link } from 'react-router-dom';
export default function Menu(props) {
    const [data, setdata] = useState(menuData)
    const [command, setCom] = useState([])
    const [Affichercommand, setAff] = useState(false)
    const addToCart = (x) => {
        const exist = command.find((cmd) => cmd.idMenu === x.idMenu);
        if (exist) {
            setCom(
                command.map((cmd) =>
                    cmd.idMenu === x.idMenu ? { ...cmd, quantity: cmd.quantity + 1 } : cmd
                )
            );
        } else {
            setCom([...command, { ...x, quantity: 1 }]);
        }
    }
    useEffect(()=>{
        if(command.length === 0){
            setAff(false)
            console.log(Affichercommand);
        }
    },[command])
    const decrease = (id) => {
        
        setCom(
            command.map((cmd) =>
                cmd.idMenu === id ? { ...cmd, quantity: cmd.quantity - 1 } : cmd
            ).filter((cmd) => cmd.quantity > 0)
        );
    }
    const increase = (id) => {
        setCom(
            command.map((cmd) =>
                cmd.idMenu === id ? { ...cmd, quantity: cmd.quantity + 1 } : cmd
            )
        );
    }
    const ValiderPaiement=()=>{
        props.tabComm(command)
    }
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
            {Affichercommand && command.length > 0  && (
                <div className="w-80 h-[400px] z-20 bg-stone-200 fixed bottom-20 right-5 rounded-md">
                    <h1 className='pt-3 text-center first-letter:uppercase font-serif text-2xl'>panier</h1>

                    <div className="w-80 px-1 ">
                        <table className='w-full border-collapse  '>
                            <thead >
                                <tr >
                                    <td>Photo</td>
                                    <td>Nom</td>
                                    <td>QT</td>
                                    <td>Prix</td>
                                </tr>
                            </thead>
                            </table>
                            </div>
                    <div className="overflow-x-auto  sm:rounded-lg  scroll-smooth w-80 px-1 h-[260px]">
                        <table className='w-full border-collapse  '>
                            <tbody>
                                {command.map((x, y) => (
                                    <tr key={y} className='odd:bg-slate-300 border-b border-gray-400 '>
                                        <td><img src={x.image} alt={x.nomPlat} width={50} height={50} /></td>
                                        <td>{x.nomPlat}</td>
                                        <td className="flex items-center justify-center space-x-2 h-[56px]" >
                                            <button onClick={() => decrease(x.idMenu)} className='text-xl'>-</button>
                                            {x.quantity}
                                            <button onClick={() => increase(x.idMenu)} className='text-xl'>+</button>
                                        </td>
                                        <td>{(x.quantity * x.prix).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                        <div className="text-center text-xl font-bold  h-[30px]">
                            Total: {command.reduce((acc, item) => acc + item.quantity * item.prix, 0).toFixed(2)} DH
                        </div>
                        <div className="flex justify-center">
                        <Link to='/Valide' onClick={ValiderPaiement}>
                        <button className='pt-2 px-3   rounded-full bg-gradient-to-b from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-t hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500'>COMMONDER</button>
                        </Link>
                        </div>
                </div>
            )}
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
                                    <PiShoppingCartLight onClick={() => addToCart(x)} className='text-3xl hover:text-slate-700 cursor-pointer ' />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
