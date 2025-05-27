import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../Store/CreteSlice";

export default function Profile() {
    const user = useSelector(s => s.Tache.currentUser);
    const [name, setName] = useState(user?.name || '');
    const [nameResto, setNameResto] = useState(user?.nameResto || '');
    const [address, setAddress] = useState(user?.address || '');
    const [tele, setTele] = useState(user?.tele || '');
    const [description, setDescription] = useState(user?.description || '');
    const [image_resto, setImageResto] = useState(null);

    const dispatch = useDispatch();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ID', user.id);
        formData.append('name', name);
        formData.append('nameResto', nameResto);
        formData.append('address', address);
        formData.append('tele', tele);
        formData.append('description', description);
        if (image_resto instanceof File) {
            formData.append('image_resto', image_resto);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Profil mis à jour avec succès!');
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch(setUser(response.data));
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la mise à jour du profil");
        }
    };
console.log(image_resto);

    return (
        <div className='w-full h-full px-10 pt-2'>
            <p className='text-3xl font-serif font-bold'>Bonjour {name}</p>
            <div className="mt-3 w-full">
                <div className="mt-2 p-4 bg-white rounded-lg shadow-md border">
                    <form onSubmit={handleUpdate} >
                        <div className="flex items-center space-x-4">
                            <label className="w-32 h-32 border-dashed border-2 border-gray-400 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-600">
                                
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setImageResto(e.target.files[0])}
                                />
                                <img src={image_resto===null? `http://127.0.0.1:8000/storage/${user.image_resto}`:URL.createObjectURL(image_resto) } alt={user.name} className='w-32 h-32' />
                            </label>
                            <label className="text-gray-700">Changer la photo du restaurant</label>
                        </div>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    placeholder="Entrez votre nom"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Nom du restaurant</label>
                                <input
                                    type="text"
                                    value={nameResto}
                                    onChange={(e) => setNameResto(e.target.value)}
                                    className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    placeholder="Entrez le nom du restaurant"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Adresse</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    placeholder="Entrez l'adresse"
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
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Description du restaurant</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    rows="3"
                                    placeholder="Entrez la description"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Modifier
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
