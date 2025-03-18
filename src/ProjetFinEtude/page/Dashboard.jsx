import React, { useState } from 'react';
import Produits from './Produits';
import Commande from './Commande';
import Profile from './Profile';

export default function Dashboard() {
    const [Profil, setProfil] = useState(true);
    const [produits, setPro] = useState(false);
    const [commande, setComm] = useState(false);
    const [Deconnecter, setDeco] = useState(false);

    return (
        <div className='pt-14 h-svh bg-slate-100 grid grid-cols-5'>
            {/* Sidebar */}
            <div className="col-span-1 bg-zinc-200 h-full">
                <div className="fixed w-1/5">
                    {/* Profile Section */}
                    <div className="flex justify-center py-5 w-11/12">
                        <div className="flex justify-start w-11/12">
                            <img src="profil.png" alt="Profil" width={60} height={60} />
                            <div className="flex items-center">
                                <p>Nom du restaurant</p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center">
                        <button onClick={() => { setProfil(true); setPro(false); setComm(false); }} className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${Profil ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}>Profil</button>
                    </div>
                    <div className="flex justify-center py-5">
                        <button onClick={() => { setProfil(false); setPro(true); setComm(false); }} className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${produits ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}>Gestion des produits</button>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => { setProfil(false); setPro(false); setComm(true); }} className={`w-11/12 border-b-4 font-serif font-bold text-stone-500 hover:scale-105 ${commande ? 'border-stone-900 text-stone-900' : 'border-stone-500 hover:border-stone-900'}`}>Gestion des commande</button>
                    </div>
                    <div className="flex justify-center pt-5 items-center">
                        <button onClick={() => setDeco(true)} className='w-11/12 border-b-4 border-stone-500 hover:border-stone-900 font-serif font-bold text-stone-500 hover:scale-105 hover:text-stone-900'>Se Deconnecter</button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="col-span-4 h-full">
                {Profil && <Profile />}
                {produits && <Produits />}
                {commande && <Commande />}
                {Deconnecter && (
                    <div className="h-svh w-full fixed bg-neutral-300 z-100 flex items-center justify-center">
                        <div className="bg-white p-5 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">Voulez-vous vraiment vous déconnecter ?</p>
                            <div className="flex justify-around mt-4">
                                <button onClick={() => setDeco(false)} className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400">Annuler</button>
                                <button onClick={() => console.log("Déconnecté")} className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700">Déconnecter</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}