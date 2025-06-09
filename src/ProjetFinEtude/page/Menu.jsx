import React, { useEffect, useState } from 'react'
import { PiShoppingCartLight } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { addPlatToCommande, increaseQuantity, decreaseQuantity, removePlatFromCommande } from "../Store/CreteSlice";
import { useDispatch, useSelector } from "react-redux"
export default function Menu() {
    const [Affichercommand, setAff] = useState(false)
    const [filtreParNom, setFPN] = useState(true)
    const [filtreParPrix, setFPP] = useState(false)
    const [filtreParResto, setFPR] = useState(false)
    const [filtreParcategory, setFPC] = useState('')
    const [searchNom, setSearchNom] = useState('');
    const [searchPrixMin, setSearchPrixMin] = useState('');
    const [searchPrixMax, setSearchPrixMax] = useState('');
    const [searchResto, setSearchResto] = useState('');


    const currentUser = useSelector((s) => s.Tache.currentUser)
    const Restaurants = useSelector((s) => s.Tache.User)


    const command = useSelector((s) => s.Tache.Commande)
    const { menuData, loading, error } = useSelector((state) => state.Tache);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        if (command.length === 0) {
            setAff(false)
        }
        console.log(command);

    }, [command])

    console.log(menuData);

    const addToCart = (x) => {
        dispatch(addPlatToCommande(x));
    };

    const increase = (id) => {
        dispatch(increaseQuantity(id));
    };

    const decrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const removePlat = (id) => {
        dispatch(removePlatFromCommande(id));
    };
    const getFilteredMenu = () => {
        if (filtreParNom && searchNom.trim() !== '') {
            return menuData.filter(item => item.name.toLowerCase().includes(searchNom.toLowerCase()));
        }

        if (filtreParPrix && searchPrixMin !== '' && searchPrixMax !== '') {
            return menuData.filter(item => {
                const prix = parseFloat(item.prix);
                return prix >= parseFloat(searchPrixMin) && prix <= parseFloat(searchPrixMax);
            });
        }

        if (filtreParResto && searchResto.trim() !== '') {
            return menuData.filter(item =>
                Restaurants.find(r => r.id === item.restaurant_id && r.nameResto.toLowerCase().includes(searchResto.toLowerCase()))
            );
        }
        if (filtreParcategory === 'Tous') {
            return menuData;
        }
        if (filtreParcategory !== '') {
            return menuData.filter(item => item.category === filtreParcategory);
        }

        return menuData;
    };


    const ValiderPaiement = () => {
        navigate('/Valide');

    };



    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Une erreur s'est produite : {error}</p>;

    return (
        <div className='pt-14 bg-slate-200'>
            {command.length > 0 && (
                <div className="fixed z-20 bg-white rounded-full   bottom-10 right-5 cursor-pointer">
                    <PiShoppingCartLight onClick={() => setAff(!Affichercommand)} className="text-4xl   " />
                    <div className=" absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {command.length}
                    </div>
                </div>
            )}
            {Affichercommand && command.length > 0 && (
                <div className="w-96 h-[600px] z-20 bg-white fixed bottom-20 right-5 rounded-md shadow-[0_0px_20px_rgba(0,0,0,0.8)]">
                    <div className="h-1/5  border-b-4 border-red-600 flex justify-center items-center">
                        <img src={`http://127.0.0.1:8000/storage/${currentUser.image}`} alt="" className='w-16 h-16 rounded-full' />
                        <p>HI, {currentUser.name}</p>
                    </div>
                    <div className="h-3/5 overflow-x-auto scroll-smooth ">
                        {command.map((x, y) => (
                            <div className="m-1 flex justify-between h-40 " key={y}>
                                <div className=" h-full">
                                    <div className="h-32">
                                        <img src={`http://127.0.0.1:8000/storage/${x.image_plate}`} alt={x.name} className='w-32 h-32 rounded-md  object-cover ' />
                                    </div>
                                    <div className="h-8 flex items-end">
                                        <p className='text-xl font-sans font-semibold'>{x.name}</p>
                                    </div>
                                </div>
                                <div className="h-full">
                                    <div className='h-1/2 '>
                                        <p className='font-sans text-2xl'>{(x.quantity * x.prix).toFixed(2)} DH</p>
                                        <div className="flex justify-end   ">
                                            <div className='w-24 flex '>
                                                <button onClick={() => decrease(x.id)} className='text-xl w-1/3 '>-</button>
                                                <p className='w-1/3 text-center text-2xl font-mono '>{x.quantity}</p>
                                                <button onClick={() => increase(x.id)} className='text-xl w-1/3 '>+</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='h-1/2 flex items-end justify-end pr-2'>
                                        <button onClick={() => removePlat(x.id)} className='font-sans text-xl font-bold text-red-500 hover:text-red-700 cursor-pointer'>Annuler</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="h-1/5 flex  justify-center items-center  border-t-2 border-red-600">
                        <div className="">
                            <div className="text-center text-xl font-bold  ">
                                Total: {command.reduce((acc, item) => acc + item.quantity * item.prix, 0).toFixed(2)} DH
                            </div>
                            <div className="flex justify-center">
                                <button onClick={ValiderPaiement} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition">COMMONDER</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <h1 className='text-center   text-3xl font-serif  font-bold w-full  text-black '>Meilleur vendeur</h1>

            <div className=" flex w-full overflow-hidden group space-x-10">

                <div className="flex w-max animate-scrollX group-hover:[animation-play-state:paused] space-x-10 ">
                    {menuData.slice(0, 3).map((x, y) => {
                        const restaurant = Restaurants.find(r => r.id === x.restaurant_id);
                        return (
                            <div key={y} className="flex h-80 w-[800px] rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:scale-[1.02] duration-300 bg-white">
                                <div className="w-2/5 bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-500 p-6 text-white flex flex-col justify-center gap-4">
                                    <h1 className="text-2xl font-semibold font-serif">Nom: <span className="font-normal">{x.name}</span></h1>
                                    <h1 className="text-2xl font-semibold font-serif">Restaurant: <span className="font-normal text-nowrap">{restaurant?.nameResto || 'Inconnu'}</span></h1>
                                    <h1 className="text-2xl font-semibold font-serif">Prix: <span className="font-normal">{x.prix} DH</span></h1>
                                </div>
                                <div className="w-3/5 h-full">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${x.image_plate}`}
                                        alt={x.name}
                                        className="w-full h-full object-cover hover:brightness-110 hover:scale-105 duration-500"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex w-max animate-scrollX group-hover:[animation-play-state:paused] space-x-10">
                    {menuData.slice(0, 3).map((x, y) => {
                        const restaurant = Restaurants.find(r => r.id === x.restaurant_id);
                        return (
                            <div key={y} className="flex h-80 w-[800px] rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:scale-[1.02] duration-300 bg-white">
                                <div className="w-2/5 bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-500 p-6 text-white flex flex-col justify-center gap-4">
                                    <h1 className="text-2xl font-semibold font-serif">Nom: <span className="font-normal">{x.name}</span></h1>
                                    <h1 className="text-2xl font-semibold font-serif">Restaurant: <span className="font-normal text-nowrap">{restaurant?.nameResto || 'Inconnu'}</span></h1>
                                    <h1 className="text-2xl font-semibold font-serif">Prix: <span className="font-normal">{x.prix} DH</span></h1>
                                </div>
                                <div className="w-3/5 h-full">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${x.image_plate}`}
                                        alt={x.name}
                                        className="w-full h-full object-cover hover:brightness-110 hover:scale-105 duration-500"
                                    />
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
            <div className="h-48 w-10/12 m-auto bg-white mt-3 rounded-xl">
                <div className="h-1/4 flex ">
                    <div className={`h-full w-1/3 flex justify-center items-center ${filtreParNom ? 'border-b-4 text-orange-500 border-orange-400' : ''} `}>
                        <button onClick={() => { setFPN(true); setFPP(false); setFPR(false) }} className='text-xl font-sans '>Filtre par nom</button>
                    </div>
                    <div className={`h-full w-1/3 flex justify-center items-center ${filtreParPrix ? 'border-b-4 text-orange-500 border-orange-400' : ''} `}>
                        <button onClick={() => { setFPN(false); setFPP(true); setFPR(false) }} className='text-xl font-sans '>Filtre par Prix</button>
                    </div>
                    <div className={`h-full w-1/3 flex justify-center items-center ${filtreParResto ? 'border-b-4 text-orange-500 border-orange-400' : ''} `}>
                        <button onClick={() => { setFPN(false); setFPP(false); setFPR(true) }} className='text-xl font-sans '>Filtrer par nom de restaurant</button>
                    </div>
                </div>
                <div className="h-3/4">
                    {filtreParNom && (
                        <div className='h-full w-10/12 m-auto '>
                            <div className="h-2/3 flex  items-center   ">
                                <input
                                    type='text'
                                    value={searchNom}
                                    onChange={(e) => setSearchNom(e.target.value)}
                                    className='w-full h-12 outline-none border-2 border-black rounded-md pl-3'
                                    placeholder="Nom du plat "
                                />
                            </div>
                        </div>
                    )}
                    {filtreParPrix && (
                        <div className='h-full w-10/12 m-auto '>
                            <div className="h-2/3 flex justify-around  items-center   ">
                                <input
                                    type="number"
                                    placeholder='max'
                                    className='w-64 h-12 outline-none border-2 border-black rounded-md pl-3'
                                    value={searchPrixMax}
                                    onChange={(e) => setSearchPrixMax(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder='min'
                                    className='w-64 h-12 outline-none border-2 border-black rounded-md pl-3'
                                    value={searchPrixMin}
                                    onChange={(e) => setSearchPrixMin(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    {filtreParResto && (
                        <div className='h-full w-10/12 m-auto '>
                            <div className="h-2/3 flex  items-center   ">
                                <input
                                    type='text'
                                    className='w-full h-12 outline-none border-2 border-black rounded-md pl-3'
                                    placeholder="Nom du restaurant "
                                    value={searchResto}
                                    onChange={(e) => setSearchResto(e.target.value)}
                                />
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <div style={{ 'scrollbar-width': 'none' }} className=" flex justify-center w-2/3 m-auto my-6  overflow-scroll  space-x-5 scroll-smooth">
                    <button
                        onClick={() => setFPC("Tous")}
                        className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full'
                    >
                        Tous
                    </button>
                    {[...new Set(menuData.map(x => x.category))].map(category => (
                        <button
                            key={category}
                            onClick={() => setFPC(category)}
                            className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full'
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
                {getFilteredMenu().map((x, y) => (
                    <div
                        key={y}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col md:grid md:grid-cols-3"
                    >
                        <Link to={`/detai/${x.id}`} className="block md:col-span-1">
                            <img
                                src={`http://127.0.0.1:8000/storage/${x.image_plate}`}
                                alt={x.name}
                                className="w-full h-full md:h-full object-cover"
                            />
                        </Link>
                        <div className="p-4 md:col-span-2 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">{x.name}</h2>
                                    <span className="text-lg font-semibold text-orange-500">{x.prix} DH</span>
                                </div>
                                <p className="text-gray-600 mt-1 text-sm">
                                    {x.description.length > 80 ? `${x.description.slice(0, 80)}...` : x.description}
                                </p>
                                <Link to={`/showRestaurant/${x.restaurant.id}`}>
                                    <p className="text-sm text-gray-500 mt-1">{x.restaurant.nameResto}</p>
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">{x.category}</p>
                            </div>
                            <div className="mt-4 flex justify-end items-center">
                                <button
                                    onClick={() => {
                                        if (currentUser) {
                                            if (currentUser.role === 'client') {
                                                addToCart(x);
                                            } else {
                                                alert('Seuls les clients peuvent passer une commande.');
                                            }
                                        } else {
                                            alert('Veuillez vous connecter en tant que client pour passer une commande.');
                                        }
                                    }}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition"
                                >
                                    <PiShoppingCartLight className="text-xl" /> Commander
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



