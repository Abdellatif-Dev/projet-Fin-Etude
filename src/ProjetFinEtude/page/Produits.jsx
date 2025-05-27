import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData } from "../Store/CreteSlice";

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
    const [platAModifier, setPlatAModifier] = useState(null);
    const [recherche, setRecherche] = useState(''); 
    const dispatch =useDispatch();
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
            dispatch(fetchMenuData());
        } catch (error) {
            console.error('Erreur lors de l’ajout:', error);
            alert("Échec de l’ajout.");
        }
    };
    const ModifierPlate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('prix', prix);
        formData.append('category', category);
        formData.append('description', description);
        if (image_plate instanceof File) {
            formData.append('image_plate', image_plate);
        }
         try {
            const response = await axios.post(`http://127.0.0.1:8000/api/menu/${platAModifier.id}?_method=PUT`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data);
            setPlatAModifier(null);
            handelMenu(e);
            setMod(true);
            dispatch(fetchMenuData())
        } catch (error) {
            alert("Échec de la modification.");
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
            dispatch(fetchMenuData())
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
                    <button onClick={() => {
                        setAjo(true); setMod(false); setPlatAModifier(null);
                        setRecherche(''); setSep(false)
                    }} className={` font-serif font-medium border-b-2 text-xl h-10 ${Ajouter ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Ajouter un nouveau plat </button>
                    <button onClick={(e) => {
                        setAjo(false); setMod(true); setSep(false); setPlatAModifier(null);
                        setRecherche(''); handelMenu(e)
                    }} className={` font-serif font-medium border-b-2 text-xl h-10 ${Modifier ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Modifier le plat </button>
                    <button onClick={(e) => {
                        setAjo(false); setMod(false); setSep(true); setPlatAModifier(null);
                        setRecherche(''); handelMenu(e)
                    }} className={` font-serif font-medium border-b-2 text-xl h-10 ${Supprimer ? '  border-violet-700 text-violet-600 hover:text-violet-900 hover:border-violet-900' : 'text-black hover:text-gray-800'}`}>Supprimer le plat </button>
                    {(Supprimer || Modifier) && (
                        <div className="relative h-10 flex items-center">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={recherche}
                                onChange={(e) => setRecherche(e.target.value)}
                                className="w-80 pl-10 pr-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                            <IoSearchOutline className="absolute top-2 left-2 text-gray-500 text-xl" />
                        </div>
                    )}
                </div>
                {
                    Ajouter && (
                        <div className="mt-2 p-4 bg-white rounded-lg shadow-md border">
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
                                <button type='submit' className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Ajouter</button>
                            </form>
                        </div>

                    )
                }
                {
                    Modifier && (

                        <div className="overflow-x-auto h-[500px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-2/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom  </th>
                                        <th className="px-4 py-3 w-4/12">description</th>
                                        <th className="px-4 py-3 w-2/12 text-right">Prix</th>
                                        <th className="px-4 py-3 w-2/12 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plats.filter((x) =>
                                        x.name.toLowerCase().includes(recherche.toLowerCase())
                                    ).map((x, y) => (
                                        <tr
                                            key={y}
                                            className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${x.image_plate}`}
                                                    alt="menu"
                                                    className="w-12 h-12 rounded object-cover shadow"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{x.name}</td>
                                            <td className="px-4 py-2 break-words">{x.description}</td>
                                            <td className="px-4 py-2 text-right text-nowrap">{x.prix} DH</td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex justify-center">
                                                    <FaPencil className='hover:text-green-700 text-xl' onClick={() => {
                                                        setMod(false);
                                                        setPlatAModifier(x);
                                                        setName(x.name);
                                                        setPrix(x.prix);
                                                        setCat(x.category);
                                                        setDesc(x.description);
                                                        setImg(null);
                                                    }} />
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
                    Supprimer && (

                        <div className="overflow-x-auto h-[500px]">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 w-2/12">Photo</th>
                                        <th className="px-4 py-3 w-2/12">Nom  </th>
                                        <th className="px-4 py-3 w-4/12">description</th>
                                        <th className="px-4 py-3 w-2/12 text-right">Prix</th>
                                        <th className="px-4 py-3 w-2/12 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plats.filter((x) =>
                                        x.name.toLowerCase().includes(recherche.toLowerCase())
                                    ).map((x, y) => (
                                        <tr
                                            key={y}
                                            className="odd:bg-white even:bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${x.image_plate}`}
                                                    alt="menu"
                                                    className="w-12 h-12 rounded object-cover shadow"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{x.name}</td>
                                            <td className="px-4 py-2 break-words">{x.description}</td>
                                            <td className="px-4 py-2 text-right text-nowrap">{x.prix} DH</td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex justify-center">
                                                    <FaTrashCan className='hover:text-red-700 text-xl' onClick={() => handleSupprimer(x.id)} />
                                                </div>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )
                }
                {platAModifier && (
                    <div className="mt-2 p-4 bg-white rounded-lg shadow-md border ">
                        <form onSubmit={ModifierPlate}>
                            <div className="flex items-center space-x-4">
                                <label className="w-32 h-32 border-dashed border-2 border-gray-400 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-600 relative">
                                    <img
                                        src={
                                            image_plate
                                                ? URL.createObjectURL(image_plate)
                                                : `http://127.0.0.1:8000/storage/${platAModifier.image_plate}`
                                        }
                                        alt="image_plate"
                                        className="w-32 h-32 object-cover rounded"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center text-white text-xs opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-sm">Changer l'image</span>
                                    </div>
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
                                        value={name}
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
                                        value={prix}
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
                                        value={category}
                                        onChange={(e) => setCat(e.target.value)}
                                        className="w-full border rounded-lg p-2 bg-gray-100"
                                        placeholder="Entrez le categorie"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Description du plat</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDesc(e.target.value)}
                                        className="w-full border rounded-lg p-2 bg-gray-100" rows="3"
                                        placeholder="Entrez la description"
                                        required
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <button type='submit' className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Enregistrer les modifications</button>
                        </form>

                    </div>
                )}

            </div>
        </div>
    )
}
