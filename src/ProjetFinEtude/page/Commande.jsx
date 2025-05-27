import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux';

export default function Commande() {
    const [Nouvelle, setNouv] = useState(true)
    const [traitement, setTra] = useState(false)
    const [livre, setLiv] = useState(false)
    const [lesCommand, setlesCommand] = useState([])
    const x = 'en coure'
    const user = useSelector(s => s.Tache.currentUser);
    useEffect(() => {
        showCommande();
    }, []);

    const showCommande = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/showCommande/${user.id}`);
            setlesCommand(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur ', error);
            alert("Erreur");
        }
    };
    console.log(lesCommand);
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/commande-detail/${id}/status`, {
                status: status
            });
            setlesCommand(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, status } : item
                )
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut", error);
            alert("Échec de la mise à jour");
        }
    };
    console.log(lesCommand);


    return (
        <div className=' w-full h-full px-10 pt-2 '>
            <p className=' text-3xl font-serif font-bold '>Bonjour {user.name}</p>
            <div className="mt-3 w-full  ">
                <div className="flex space-x-6">
                    <button onClick={() => { setNouv(true); setTra(false); setLiv(false) }} className={` font-serif font-medium border-b-2 text-xl h-10 ${Nouvelle ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Nouvelle commande</button>
                    <button onClick={() => { setNouv(false); setTra(true); setLiv(false) }} className={` font-serif font-medium border-b-2 text-xl h-10 ${traitement ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>En cours de traitement</button>
                    <button onClick={() => { setNouv(false); setTra(false); setLiv(true) }} className={` font-serif font-medium border-b-2 text-xl h-10 ${livre ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Commande livrée </button>
                </div>
                {
                    Nouvelle && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
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
                            </table>
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[490px]">
                                <table className="w-full text-sm ">
                                    <tbody>
                                        {lesCommand.filter((x) => x.status === 'en attente').map((x, y) =>
                                            <tr className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100" key={y}>
                                                <td className="px-6 py-1   whitespace-nowrap">
                                                    <img src={`http://127.0.0.1:8000/storage/${x.menu.image_plate}`} alt="profil" width={50} height={50} />
                                                </td>
                                                <td className="px-6 py-1">{x.menu.name}</td>
                                                <td className="px-6 py-1">{x.commande.address}</td>
                                                <td className="px-6 py-1">{x.quantity}</td>
                                                <td className="px-6 py-1">{x.menu.prix}</td>
                                                <td className="px-6 py-1">
                                                    <div className="flex space-x-2">

                                                        <button onClick={() => updateStatus(x.id, 'acceptée')} className='bg-green-500 hover:bg-green-600 rounded-md p-1'>
                                                            <AiOutlineCheck className='text-white text-xl' />
                                                        </button>

                                                        <button onClick={() => updateStatus(x.id, 'refusée')} className='bg-red-500 hover:bg-red-600 rounded-md p-1'>
                                                            <AiOutlineClose className='text-white text-xl' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
                {
                    traitement && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
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
                            </table>
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[400px]">
                                <table className="w-full text-sm ">
                                    <tbody>
                                        {lesCommand.filter((x) => x.status === 'acceptée').map((x, y) =>
                                            <tr className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100" key={y}>
                                                <td className="px-6 py-1   whitespace-nowrap">
                                                    <img src={`http://127.0.0.1:8000/storage/${x.menu.image_plate}`} alt="profil" width={50} height={50} />
                                                </td>
                                                <td className="px-6 py-1">{x.menu.name}</td>
                                                <td className="px-6 py-1">{x.commande.address}</td>
                                                <td className="px-6 py-1">{x.quantity}</td>
                                                <td className="px-6 py-1">{x.menu.prix}</td>
                                                <td className="px-6 py-1">
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => updateStatus(x.id, 'livrée')} className='py-1 px-2 rounded-md text-nowrap text-white bg-orange-500 hover:bg-orange-600' >{x.status}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
                {
                    livre && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
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
                            </table>
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[400px]">
                                <table className="w-full text-sm ">
                                    <tbody>
                                        {lesCommand.filter((x) => x.status === 'livrée').map((x, y) =>
                                            <tr className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100" key={y}>
                                                <td className="px-6 py-1   whitespace-nowrap">
                                                    <img src={`http://127.0.0.1:8000/storage/${x.menu.image_plate}`} alt="profil" width={50} height={50} />
                                                </td>
                                                <td className="px-6 py-1">{x.menu.name}</td>
                                                <td className="px-6 py-1">{x.commande.address}</td>
                                                <td className="px-6 py-1">{x.quantity}</td>
                                                <td className="px-6 py-1">{x.menu.prix}</td>
                                                <td className="px-6 py-1">
                                                    <div className="flex space-x-2">
                                                        <span className='py-1 px-2 rounded-md text-nowrap text-white bg-green-600  '>{x.status}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
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
