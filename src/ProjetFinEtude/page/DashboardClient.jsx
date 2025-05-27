import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../Store/CreteSlice";
import axios from 'axios';

export default function DashboardClient() {
    const user = useSelector(s => s.Tache.currentUser);
    const [image, setImage] = useState(null)
    const [Profil, setProfil] = useState(true)
    const [Name, setName] = useState(user?.name)
    const [tele, setTele] = useState(user?.tele)
    const [oldPass, setOldPass] = useState('')
    const [NewPass, setNewPass] = useState('')
    const [list, setList] = useState(false)
    const [LesCommand, setlesCommand] = useState()
    const [statusFilter, setStatusFilter] = useState("Tous");
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const showCommande = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/showCommandeClient/${user.id}`);
            setlesCommand(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur ', error);
            alert("Erreur");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", Name);
        formData.append("tele", tele);
        formData.append("old_password", oldPass);
        formData.append("new_password", NewPass);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/users/${user.id}?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert(response.data.message);
            setNewPass('')
            setOldPass('')
            localStorage.setItem('user', JSON.stringify(response.data.user));
            dispatch(setUser(response.data.user));
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            alert("Erreur lors de la mise à jour");
        }
    };

    useEffect(() => {
        if (user && user.id) {
            showCommande();
            setName(user?.name)
            setTele(user?.tele)
        }
    }, [user]);
    const retourn = () => {
        navigate('/');
    };
    const filteredCommandes = LesCommand?.map((commande) => {
        const filteredDetails = commande.details.filter(detail =>
            statusFilter === "Tous" ? true : detail.status === statusFilter
        );
        return { ...commande, details: filteredDetails };
    }).filter(commande => commande.details.length > 0);
    console.log(LesCommand);
    function getStatusColor(status) {
        switch (status) {
            case 'en attente':
                return 'bg-yellow-500';
            case 'acceptée':
                return 'bg-blue-500';
            case 'refusée':
                return 'bg-red-500';
            case 'livrée':
                return 'bg-green-600';
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
                            onClick={() => { setProfil(true); setList(false) }}
                            className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${Profil ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}
                        >
                            Profile
                        </button>
                    </div>
                    <div className="flex justify-center items-center h-14">
                        <button
                            onClick={() => { setProfil(false); setList(true) }}
                            className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${list ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}
                        >
                            Gestion des commandes
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-4 ">
                <p className=' text-3xl font-serif font-bold text-center pt-4 '>Bonjour {user?.name}</p>
                {Profil && (
                    <div className="mt-4 p-6 bg-white rounded-2xl shadow-lg border ">
                        <form onSubmit={handleUpdate} >
                            <div className="flex items-center space-x-4">
                                <label className="w-32 h-32 border-dashed border-2 border-gray-400 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-600">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <img src={image === null ? `http://127.0.0.1:8000/storage/${user.image}` : URL.createObjectURL(image)} alt={Name} className='w-32 h-32' />
                                </label>
                                <label className="text-gray-700">Changer la photo du restaurant</label>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-gray-700">Nom</label>
                                    <input
                                        type="text"
                                        value={Name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="Entrez votre nom"
                                        required
                                    />
                                </div>


                                <div>
                                    <label className="block text-gray-700">Numéro de téléphone</label>
                                    <input
                                        type="text"
                                        value={tele}
                                        onChange={(e) => setTele(e.target.value)}
                                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="Entrez le numéro"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Ancien mot de passe</label>
                                    <input
                                        type="password"
                                        value={oldPass}
                                        onChange={(e) => setOldPass(e.target.value)}
                                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="Entrez l'adresse"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        value={NewPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        placeholder="Entrez l'adresse"
                                    />
                                </div>
                            </div>
                            <button
                                type='submit'
                                className="mt-5 bg-violet-600 px-4 py-2 rounded-lg text-white hover:bg-violet-700"
                            >
                                Modifier
                            </button>
                        </form>
                    </div>
                )}
                {list && (
                    <div className="mt-4 p-6 bg-white rounded-2xl shadow-lg border h-[520px]">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Liste des Commandes</h2>
                        <div className="overflow-x-auto h-[400px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-1/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom</th>
                                        <th className="px-4 py-3 w-4/12">Adresse</th>
                                        <th className="px-4 py-3 w-1/12 text-nowrap">N° Commande</th>
                                        <th className="px-4 py-3 w-1/12 text-center">Quantité</th>
                                        <th className="px-4 py-3 w-1/12 text-right">Prix</th>
                                        <th className="px-4 py-3 w-2/12 text-center">État</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCommandes?.map((commande, i) =>
                                        commande.details.map((detail, j) => (
                                            <tr
                                                key={`${i}-${j}`}
                                                className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition"
                                            >
                                                <td className="px-4 py-2">
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${detail.menu?.image_plate}`}
                                                        alt="menu"
                                                        className="w-12 h-12 rounded object-cover shadow"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">{detail.menu?.name}</td>
                                                <td className="px-4 py-2 break-words">{commande.address}</td>
                                                <td className="px-4 py-2 text-center">{detail.commande_id}</td>
                                                <td className="px-4 py-2 text-center">{detail.quantity}</td>
                                                <td className="px-4 py-2 text-right">{detail.menu?.prix} DH</td>
                                                <td className="px-4 py-2 text-center">
                                                    <span className={`py-1 px-3 rounded-full text-sm font-medium ${getStatusColor(detail.status)}`}>
                                                        {detail.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-end items-center gap-2">
                            <label htmlFor="filter" className="text-sm font-medium text-gray-600">Filtrer par état :</label>
                            <select
                                id="filter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
                            >
                                <option value="Tous">Tous</option>
                                <option value="en attente">En attente</option>
                                <option value="acceptée">Acceptée</option>
                                <option value="refusée">Refusée</option>
                                <option value="livrée">Livrée</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
