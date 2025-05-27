import React, { useState } from 'react';
import Produits from './Produits';
import Commande from './Commande';
import Profile from './Profile';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Dashboard() {
    const [Profil, setProfil] = useState(true);
    const [produits, setPro] = useState(false);
    const [commande, setComm] = useState(false);
    const [Deconnecter, setDeco] = useState(false);
    const user = useSelector(s => s.Tache.currentUser);
    const navigate = useNavigate();

    const retourn = () => {
        navigate('/');
    };
    console.log(user);
    
  


    if (user?.role !== 'restaurant') {
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
            <div className="col-span-1 bg-zinc-200 h-full">
                <div className="fixed w-1/5">
                    <div className="flex justify-center py-5 w-11/12">
                        <div className="flex justify-start w-11/12">
                            <img src={`http://127.0.0.1:8000/storage/${user.image_resto}`} alt="Profil" width={60} height={60} />
                            <div className="flex items-center ml-2">
                                <p>{user.nameResto}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => { setProfil(true); setPro(false); setComm(false); }}
                            className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${Profil ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}
                        >
                            Profil
                        </button>
                        <button
                            onClick={() => {
                                if (user.nameResto !== undefined) {
                                    setProfil(false);
                                    setPro(true);
                                    setComm(false);
                                } else {
                                    alert("Complétez d'abord votre profil du restaurant.");
                                }
                            }}
                            className={`w-11/12 mt-5 border-b-4 font-serif font-bold text-stone-500 hover:scale-105  ${produits ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}
                        >
                            Gestion des produits
                        </button>
                        <button
                            onClick={() => {
                                if (user.nameResto !== undefined) {
                                    setProfil(false);
                                    setPro(false);
                                    setComm(true);
                                } else {
                                    alert("Complétez d'abord votre profil du restaurant.");
                                }
                            }}
                            className={`w-11/12 mt-5 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${commande ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}
                        >
                            Gestion des commandes
                        </button>

                        <button
                            onClick={() => setDeco(true)}
                            className='w-11/12 mt-5 border-b-4 border-stone-500 hover:border-stone-900 font-serif font-bold text-stone-500 hover:scale-105 '
                        >
                            Se Déconnecter
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-4  p-5">
                {Profil && <Profile />}
                {produits && <Produits />}
                {commande && <Commande />}
            </div>

            {Deconnecter && (
                <div className="fixed inset-0 bg-neutral-800 bg-opacity-80 z-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <p className="text-lg font-semibold">Voulez-vous vraiment vous déconnecter ?</p>
                        <div className="flex justify-around mt-4">
                            <button
                                onClick={() => setDeco(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
                            >
                                Annuler
                            </button>
                            <Link to='/'>
                                <button
                                    onClick={() => console.log("Déconnecté")}
                                    className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                                >
                                    Déconnecter
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
