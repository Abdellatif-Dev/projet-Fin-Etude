import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaUser } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearCommande } from '../Store/CreteSlice';
import axios from 'axios';

export default function ValiderPaiement() {
    const command = useSelector((s) => s.Tache.Commande);
    const currentUser = useSelector((s) => s.Tache.currentUser)
    console.log(currentUser);
    const dispatch = useDispatch();
    const [name, setFullName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [tele, setTelephone] = useState(currentUser.tele);

    const [adresse, setAdresse] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(false);
    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("La géolocalisation n'est pas supportée par votre navigateur.");
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude);
                console.log(longitude);

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();
                    console.log(data);

                    setAdresse(data.display_name || 'Adresse inconnue');
                } catch (error) {
                    alert("Erreur lors de la récupération de l'adresse.");
                    console.error(error);
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                alert("Impossible d'obtenir votre position.");
                setLoadingLocation(false);
            }
        );
    };
    const total=command.reduce((acc, item) => acc + item.quantity * item.prix, 0).toFixed(2)
    const id=currentUser.id
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id,
            name,
            email,
            tele,
            adresse,
            command,
            total
        };

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/Commande", payload);

            alert("Données envoyées avec succès !");
            console.log(res.data);

            // vider le panier
            dispatch(clearCommande());
        } catch (error) {
            console.error(error);
            alert("Erreur d'envoi.");
        }
    };
    return (
        <div className='pt-14 h-svh w-full bg-white'>
            <div className='w-10/12 mx-auto my-5 bg-gray-100 h-[600px]'>
                <form onSubmit={handleSubmit} >
                    <h1 className='text-center text-3xl font-serif'>Valider Votre Paiement</h1>
                    <div className="grid grid-cols-5">
                        <div className="col-span-3 px-4">
                            <div className="mt-4 space-y-4">
                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                    <FaUser className="text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Nom complet"
                                        value={name}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                        required
                                    />
                                </div>
                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                    <MdEmail className="text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Adresse email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                        required
                                    />
                                </div>
                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                    <FaPhoneAlt className="text-gray-500" />
                                    <input
                                        type="tel"
                                        placeholder="Téléphone"
                                        value={tele}
                                        onChange={(e) => setTelephone(e.target.value)}
                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                        required
                                    />
                                </div>
                                <div className="relative flex flex-col mx-10 mt-5 border rounded-2xl bg-white px-3 py-2">
                                    <div className="flex items-center">
                                        <FaLocationDot className="text-gray-500 mr-2" />
                                        <input
                                            type="text"
                                            placeholder="Adresse"
                                            value={adresse}
                                            onChange={(e) => setAdresse(e.target.value)}
                                            className="w-full p-2 outline-none bg-transparent"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={getLocation}
                                        className="mt-2 text-sm text-blue-500 underline self-end"
                                    >
                                        {loadingLocation ? "Chargement de l'adresse..." : "📍 Utiliser ma position actuelle"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 h-[500px] bg-white">
                            <div className="h-4/5 overflow-x-auto scroll-smooth ">
                                {command.map((x, y) => (
                                    <div className="m-1 flex justify-between h-40 " key={y}>
                                        <div className=" h-full">
                                            <div className="h-32">
                                                <img src={`http://127.0.0.1:8000/storage/${x.image_plate}`} alt={x.name} className='w-32 h-32 rounded-md  object-cover ' />
                                            </div>
                                            <div className="h-8 flex items-end">
                                                <p className='text-xl font-sans font-semibold text-nowrap'>{x.name}</p>
                                            </div>
                                        </div>
                                        <div className="h-full w-56">
                                            <div className='h-1/2 '>
                                                <div className="flex justify-between">
                                                    <p className='text-xl font-sans font-semibold'>Prix: </p>
                                                    <p className='text-xl font-sans font-semibold'>{x.prix} DH</p>
                                                </div>
                                                <div className="flex justify-between pt-5">
                                                    <p className='text-xl font-sans font-semibold'>Quantity: </p>
                                                    <p className='text-xl font-sans font-semibold'>{x.quantity}</p>
                                                </div>
                                            </div>
                                            <div className='h-1/2 flex items-end w-56 pr-2'>
                                                <div className="flex justify-between w-full ">
                                                    <p className='text-xl font-sans font-semibold'>Total: </p>
                                                    <p className='text-xl font-sans font-semibold'>{(x.quantity * x.prix).toFixed(2)} DH</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-1/5 flex  justify-center items-center  border-t-2 border-red-600">
                                <div className="">
                                    <div className="text-center text-xl font-bold  ">
                                        Total: {total} DH
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center h-32 items-center">
                        <button
                            type="submit"
                            className='text-2xl bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full'
                        >
                            Valider
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


