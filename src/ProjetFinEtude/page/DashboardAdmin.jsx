import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../Store/CreteSlice";
import axios from 'axios';

export default function DashboardAdmin() {


    const user = useSelector(s => s.Tache.currentUser);
    const [Utilisateurs, setUtilisateurs] = useState(true)
    const [Restuarants, setRestuarants] = useState(false)
    const [Users, setUsers] = useState()
    const navigate = useNavigate();
    

    const showUtilisateurs = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users`);
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur ', error);
            alert("Erreur");
        }
    };



    useEffect(() => {
        if (user && user.id) {
            showUtilisateurs();
        }
    }, [user]);
    const retourn = () => {
        navigate('/');
    };
    const handleDeleteUser = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
                showUtilisateurs(); // Refresh list
            } catch (err) {
                alert("Erreur lors de la suppression.");
            }
        }
    };
    function getStatusColor(status) {
        switch (status) {
            case 'payé':
                return 'bg-green-500';
            case 'non payé':
                return 'bg-red-500';
            default:
                return 'bg-gray-400';
        }
    }


    if (user?.role !== 'client') {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <p className="text-lg font-semibold mb-4">Vous n'êtes pas autorisé à accéder à ce tableau de bord.</p>
                    <button
                        onClick={retourn}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Page d'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='pt-14  bg-slate-100 grid grid-cols-5 '>
            <div className="col-span-1 bg-zinc-200">
                <div className=" fixed w-1/5">

                    <div className="flex justify-center items-center h-14">
                        <button
                            onClick={() => { setUtilisateurs(true); setRestuarants(false) }}
                            className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${Utilisateurs ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}
                        >
                            Utilisateurs
                        </button>
                    </div>
                    <div className="flex justify-center items-center h-14">
                        <button
                            onClick={() => { setUtilisateurs(false); setRestuarants(true) }}
                            className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${Restuarants ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}
                        >
                            Montant à régler
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-span-4 ">
                <p className=' text-3xl font-serif font-bold px-10 pt-4 '>Bonjour {user?.name}</p>
                {Utilisateurs && (
                    <div className="mt-4 p-6 bg-white rounded-2xl shadow-lg border h-[520px]">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Liste des utilisateurs</h2>
                        <div className="overflow-x-auto h-[400px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-1/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom</th>
                                        <th className="px-4 py-3 w-2/12">Rôle</th>
                                        <th className="px-4 py-3 w-4/12">Nom Restaurant</th>
                                        <th className="px-4 py-3 w-2/12">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Users?.map((u, i) => (
                                        <tr key={i} className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition">
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${u?.image}`}
                                                    alt="user"
                                                    className="w-12 h-12 rounded object-cover shadow"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{u.name}</td>
                                            <td className="px-4 py-2">{u.role}</td>
                                            <td className="px-4 py-2">{u.nameResto || '—'}</td>
                                            <td className="px-4 py-2">
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                                                    onClick={() => handleDeleteUser(u.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            
                {Restuarants && (
                    <div className="mt-4 p-6 bg-white rounded-2xl shadow-lg border h-[520px]">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Liste des Commandes</h2>
                        

                        <div className="overflow-x-auto h-[400px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-1/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom</th>
                                        <th className="px-4 py-3 w-4/12">nom restaurant</th>
                                        <th className="px-4 py-3 w-1/12 text-nowrap">Mois</th>
                                        <th className="px-4 py-3 w-1/12 text-nowrap">Année</th>
                                        <th className="px-4 py-3 w-1/12 text-center">Salire</th>
                                        <th className="px-4 py-3 w-2/12 text-center">État</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Users?.filter(x => x.role === 'restaurant').map((u, i) =>
                                        u.devoirs.map((d, j) => (
                                                <tr
                                                    key={`${i}-${j}`}
                                                    className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition"
                                                >
                                                    <td className="px-4 py-2">
                                                        <img
                                                            src={`http://127.0.0.1:8000/storage/${u?.image_resto}`}
                                                            alt="menu"
                                                            className="w-12 h-12 rounded object-cover shadow"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">{u.name}</td>
                                                    <td className="px-4 py-2 break-words">{u.nameResto}</td>
                                                    <td className="px-4 py-2 text-center">{d.mois}</td>
                                                    <td className="px-4 py-2 text-center">{d.annee}</td>
                                                    <td className="px-4 py-2 text-right">{d.montant} DH</td>
                                                    <td className="px-4 py-2 text-center">
                                                        <span className={`py-1 px-3 rounded-full text-sm font-medium ${getStatusColor(d.etat)}`}>
                                                            {d.etat}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )}
            </div>
        </div >
    )
}
