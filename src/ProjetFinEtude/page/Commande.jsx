import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux';

export default function Commande() {
    const [Nouvelle, setNouv] = useState(true)
    const [traitement, setTra] = useState(false)
    const [livre, setLiv] = useState(false)
    const [lesCommand, setlesCommand] = useState([])
    const user = useSelector(s => s.Tache.currentUser);
    useEffect(() => {
        showCommande();
    }, []);
    
    const showCommande = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/showCommande/${user.id}`);
            setlesCommand(response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
            console.log(response.data);
        } catch (error) {
            console.error('Erreur ', error);
            alert("Erreur");
        }
    };
    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/commande-detail/${id}/status`, {
                status: status
            });
            await showCommande();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut", error);
            alert("Échec de la mise à jour");
        }
    };
    
    

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
                        <div className="overflow-x-auto h-[500px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-1/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom</th>
                                        <th className="px-4 py-3 w-4/12">Adresse</th>
                                        <th className="px-4 py-3 w-1/12 text-center">Quantité</th>
                                        <th className="px-4 py-3 w-1/12 text-right">Prix</th>
                                        <th className="px-4 py-3 w-2/12 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lesCommand.filter((x) => x.status === 'en attente').map((x, y) => (
                                        <tr
                                            key={y}
                                            className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${x.menu.image_plate}`}
                                                    alt="menu"
                                                    className="w-12 h-12 rounded object-cover shadow"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{x.menu.name}</td>
                                            <td className="px-4 py-2 break-words">{x.commande.address}</td>
                                            <td className="px-4 py-2 text-center">{x.quantity}</td>
                                            <td className="px-4 py-2 text-right text-nowrap">{x.menu.prix} DH</td>
                                            <td className="px-4 py-2 text-center ">
                                                <div className="flex  justify-center  space-x-4">
                                                    <button onClick={() => updateStatus(x.id, 'acceptée')} className='bg-green-500 hover:bg-green-600 rounded-md p-1'>
                                                        <AiOutlineCheck className='text-white text-xl' />
                                                    </button>
                                                    <button onClick={() => updateStatus(x.id, 'refusée')} className='bg-red-500 hover:bg-red-600 rounded-md p-1'>
                                                        <AiOutlineClose className='text-white text-xl' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {
                    traitement && (
                        <div className="overflow-x-auto h-[500px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-1/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom</th>
                                        <th className="px-4 py-3 w-4/12">Adresse</th>
                                        <th className="px-4 py-3 w-1/12 text-center">Quantité</th>
                                        <th className="px-4 py-3 w-1/12 text-right">Prix</th>
                                        <th className="px-4 py-3 w-2/12 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lesCommand.filter((x) => x.status === 'acceptée').map((x, y) => (
                                        <tr
                                            key={y}
                                            className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${x.menu.image_plate}`}
                                                    alt="menu"
                                                    className="w-12 h-12 rounded object-cover shadow"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{x.menu.name}</td>
                                            <td className="px-4 py-2 break-words">{x.commande.address}</td>
                                            <td className="px-4 py-2 text-center">{x.quantity}</td>
                                            <td className="px-4 py-2 text-right text-nowrap">{x.menu.prix} DH</td>
                                            <td className="px-4 py-2 text-center">
                                                <span onClick={() => updateStatus(x.id, 'livrée')} className='cursor-pointer py-1 px-3 rounded-full text-sm font-medium text-white bg-sky-500 '>
                                                    {x.status}
                                                </span>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                            

                        </div>


                    )
                }
                {
                    livre && (

                        <div className="overflow-x-auto h-[500px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-1/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom</th>
                                        <th className="px-4 py-3 w-4/12">Adresse</th>
                                        <th className="px-4 py-3 w-1/12 text-center">Quantité</th>
                                        <th className="px-4 py-3 w-1/12 text-right">Prix</th>
                                        <th className="px-4 py-3 w-2/12 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lesCommand.filter((x) => x.status === 'livrée').map((x, y) => (
                                        <tr
                                            key={y}
                                            className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${x.menu.image_plate}`}
                                                    alt="menu"
                                                    className="w-12 h-12 rounded object-cover shadow"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{x.menu.name}</td>
                                            <td className="px-4 py-2 break-words">{x.commande.address}</td>
                                            <td className="px-4 py-2 text-center">{x.quantity}</td>
                                            <td className="px-4 py-2 text-right text-nowrap">{x.menu.prix} DH</td>
                                            <td className="px-4 py-2 text-center">
                                                <span className='py-1 px-3 rounded-full text-sm font-medium text-white bg-green-600 '>
                                                    {x.status}
                                                </span>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )
                }

            </div>
        </div>
    )
}
