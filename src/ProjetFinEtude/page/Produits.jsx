import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Produits() {
    const [Ajouter, setAjo] = useState(true)
    const [Supprimer, setSep] = useState(false)
    const [Modifier, setMod] = useState(false)
    const [plats, setPlats] = useState([])
    const [name, setName] = useState('')
    const [image_plate, setImg] = useState(null)
    const [description, setDesc] = useState('')
    const [category, setCat] = useState('')
    const [prix, setPrix] = useState('')

    const user = useSelector(s => s.Tache.currentUser);
    const AjouterPlate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ID', user.id);
        formData.append('name', name);
        formData.append('prix', prix);
        formData.append('category', category);
        formData.append('description', description);
        if (image_plate instanceof File) {
            formData.append('image_plate', image_plate);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Plat ajouté avec succès:', response.data);
            alert("Plat ajouté avec succès !");
        } catch (error) {
            console.error('Erreur lors de l’ajout:', error);
            alert("Échec de l’ajout.");
        }
    };
    const handelMenu = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/menuPourUnResto', {
                params: {
                    id: user.id
                }
            });
            setPlats(response.data)
            console.log(plats);
            console.log(response.data);


        } catch (error) {
            console.error('Erreur lors de l’ajout:', error);
            alert("Erreur")
        }
    };
    const handleSupprimer = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/menu/${id}`);
            setPlats(prev => prev.filter(plat => plat.id !== id));

            console.log("Plat supprimé avec succès", response.data);
            alert("Plat supprimé avec succès !");
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            alert("Erreur lors de la suppression !");
        }
    };
    return (
        <div className=' w-full h-full px-10 pt-2 '>
            <p className=' text-3xl font-serif font-bold '>Bonjour {user?.name}</p>
            <div className="mt-3 w-full  ">
                <div className="flex space-x-6">
                    <button onClick={() => { setAjo(true); setMod(false); setSep(false) }} className={` font-serif font-medium border-b-2 text-xl h-10 ${Ajouter ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Ajouter un nouveau plat </button>
                    <button onClick={(e) => { setAjo(false); setMod(true); setSep(false); handelMenu(e) }} className={` font-serif font-medium border-b-2 text-xl h-10 ${Modifier ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Modifier le plat </button>
                    <button onClick={(e) => { setAjo(false); setMod(false); setSep(true); handelMenu(e) }} className={` font-serif font-medium border-b-2 text-xl h-10 ${Supprimer ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Supprimer le plat </button>
                    {(Supprimer || Modifier) && (
                        <div className="relative h-10 flex items-center">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-80 pl-10 pr-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                            <IoSearchOutline className="absolute top-2 left-2 text-gray-500 text-xl" />
                        </div>
                    )}
                </div>
                {
                    Ajouter && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
                            <form onSubmit={AjouterPlate}>
                                <div className="flex items-center space-x-4">
                                    <label className="w-32 h-32 border-dashed border-2 border-gray-400 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-600">
                                        {image_plate ? (
                                            <img
                                                src={URL.createObjectURL(image_plate)}
                                                alt="image_plate"
                                                className="w-32 h-32 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <span className="text-4xl">+</span>
                                                <span className="text-sm text-center">Une photo du plat</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setImg(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-gray-700">Nom du plat</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full border rounded-lg p-2 bg-gray-100"
                                            placeholder="Entrez le nom du plat"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Prix du plat</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setPrix(e.target.value)}
                                            className="w-full border rounded-lg p-2 bg-gray-100"
                                            placeholder="Entrez le prix"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">categorie du plat</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setCat(e.target.value)}
                                            className="w-full border rounded-lg p-2 bg-gray-100"
                                            placeholder="Entrez le categorie"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Description du plat</label>
                                        <textarea
                                            onChange={(e) => setDesc(e.target.value)}
                                            className="w-full border rounded-lg p-2 bg-gray-100" rows="3"
                                            placeholder="Entrez la description"
                                            required
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                <button type='submit' className="mt-5 bg-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-400">Ajouter</button>
                            </form>
                        </div>

                    )
                }
                {
                    Modifier && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[490px]">
                                <table className="w-full text-sm ">
                                    <thead className="text-sm  bg-zinc-100 text-violet-700 font-bold ">
                                        <tr>
                                            <td className="px-6 py-3 w-1/12">Photo</td>
                                            <td className="px-6 py-3 w-8/12">Nom</td>
                                            <td className="px-6 py-3 w-2/12">Prix</td>
                                            <td className="px-6 py-3 w-1/12">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plats.map((plat, index) =>
                                            <tr key={index} className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100">
                                                <td className="px-6 py-1   whitespace-nowrap">
                                                    <img src={`http://127.0.0.1:8000/storage/${plat.image_plate}`} alt="profil" width={50} height={50} />
                                                </td>
                                                <td className="px-6 py-1">{plat.name}</td>
                                                <td className="px-6 py-1">{plat.prix} </td>
                                                <td className="px-6 py-1"><FaPencil className='hover:text-green-700 text-xl' /></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
                {
                    Supprimer && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border h-[520px]">
                            <div className="relative overflow-x-auto  sm:rounded-lg  scroll-smooth h-[490px]">
                                <table className="w-full text-sm ">
                                    <thead className="text-sm  bg-zinc-100 text-violet-700 font-bold ">
                                        <tr>
                                            <td className="px-6 py-3 w-1/12">Photo</td>
                                            <td className="px-6 py-3 w-8/12">Nom</td>
                                            <td className="px-6 py-3 w-2/12">Prix</td>
                                            <td className="px-6 py-3 w-1/12">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plats.map((plat, index) =>
                                            <tr key={index} className="  text-black  odd:bg-zinc-300 even:bg-zinc-100 border-t border-gray-100">
                                                <td className="px-6 py-1   whitespace-nowrap">
                                                    <img src={`http://127.0.0.1:8000/storage/${plat.image_plate}`} alt="profil" width={50} height={50} />
                                                </td>
                                                <td className="px-6 py-1">{plat.name}</td>
                                                <td className="px-6 py-1">{plat.prix} </td>
                                                <td className="px-6 py-1"><FaTrashCan className='hover:text-red-700 text-xl' onClick={() => handleSupprimer(plat.id)} /></td>
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
