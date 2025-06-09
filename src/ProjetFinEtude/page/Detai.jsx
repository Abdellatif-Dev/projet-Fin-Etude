import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';

export default function Detai() {
    const { id } = useParams()
    const [plats, setPlat] = useState(null)
    const [commandes, setCommandes] = useState(null)
    const [commentes, setCommentes] = useState(null)
    const [commente, setCommente] = useState(false)
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const fetchMenu = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/menu/${id}`)
            console.log('Data from API:', response.data)
            setPlat(response.data.plate)
            setCommandes(response.data.lesCommandes)
            setCommentes(response.data.lesComments)
        } catch (error) {
            console.error('Erreur lors de la récupération:', error)
            alert('Erreur lors de la récupération du menu.')
        }
    }
    useEffect(() => {
        fetchMenu()
    }, [id])
    const user = useSelector(s => s.Tache.currentUser);

    console.log(plats);
    
useEffect(() => {
    if (!user) return;

    let peutCommenter = false;

    if (user.role === 'administrateur') {
        peutCommenter = true;
    }

    if (plats?.restaurant?.id === user.id) {
        peutCommenter = true;
    }

    if (commandes && Array.isArray(commandes)) {
        const aCommandé = commandes.some(c => c.commande.user_id === user.id);
        if (aCommandé) {
            peutCommenter = true;
        }
    }

    setCommente(peutCommenter);
}, [user, commandes, plats]);


    const handleSubmit = async () => {
        if (comment.trim() === '' || rating === 0) {
            alert("Veuillez écrire un commentaire et donner une note.");
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/comments', {
                menu_id: id,
                user_id: user.id,
                comment,
                rating
            });
            alert("Commentaire ajouté avec succès!");
            setComment('');
            setRating(0);
            fetchMenu()
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'envoi du commentaire.");
        }
    };

    if (!plats) return <div>Chargement...</div>
    console.log(commente);
    console.log(plats.comments);

    const ratings =
        commentes && commentes.length > 0
            ? (commentes.reduce((acc, item) => acc + (item.rating || 0), 0) / commentes.length).toFixed(1)
            : 0;
    console.log(ratings);

    const renderStars = (v) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    color={i <= Math.round(v) ? '#FFD700' : '#ccc'}
                    size={20}
                />
            )
        }
        return stars
    }
    return (
        <div className='pt-14 px-20'>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 p-4 ">
                    <img
                        src={`http://127.0.0.1:8000/storage/${plats.image_plate}`}
                        alt={plats.name}
                        className='rounded-md w-full h-auto object-cover'
                    />
                </div>
                <div className="col-span-2 p-5 space-y-5">
                    <h1 className='text-2xl font-serif font-bold text-center'>{plats.name}</h1>
                    <p className='text-xl font-serif'>Nom Restaurant: {plats.restaurant?.nameResto}</p>
                    <p className='text-xl font-serif'>Prix: {plats.prix} DH</p>
                    <p className='text-xl font-serif'>Description: {plats.description}</p>
                    <div className="flex  pl-10items-center mt-2">
                        <span className="text-lg  font-semibold mr-2">Rating:</span>
                        {renderStars(ratings)} <span className='ml-2'>({commentes.length})</span>
                    </div>
                </div>
            </div>
            {commente && (
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Laisser un commentaire</h2>

                    <textarea
                        className="w-full h-28 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="Écrivez votre commentaire ici..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Note:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                        Envoyer
                    </button>
                </div>

            )}
            <div className=" flex w-full overflow-hidden group space-x-10">
                <div className="flex w-max  animate-scrollX1 group-hover:[animation-play-state:paused] space-x-10 ">
                    {commentes.map((x, y) =>
                        <div key={y} className=" h-20 w-[800px] m-20 flex  duration-500">
                            <img src={`http://127.0.0.1:8000/storage/${x.user.image}`} className='h-20 w-20 rounded-full'  alt="" />
                            <div className="">
                                <p className='pl-10 text-2xl font-serif font-medium'>Acteur : {x.user.name} </p>
                                <p className='pl-10 text-xl font-serif '> {x.comment}  </p>
                                <div className="flex  pl-10items-center mt-2">
                                    <span className="text-lg pl-10 font-semibold mr-2">Rating: </span>{renderStars(x.rating)}

                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex w-max animate-scrollX1 group-hover:[animation-play-state:paused] space-x-10 ">
                    {commentes.map((x, y) =>
                        <div key={y} className=" h-20 w-[800px] m-20 flex  duration-500">
                            <img src={`http://127.0.0.1:8000/storage/${x.user.image}`} className='h-20 w-20 rounded-full' alt="" />
                            <div className="">
                                <p className='pl-10 text-2xl font-serif font-medium'>Acteur : {x.user.name} </p>
                                <p className='pl-10 text-xl font-serif '>{x.comment} </p>
                                <div className="flex  items-center mt-2">
                                    <span className="text-lg pl-10 font-semibold mr-2">Rating: </span>{renderStars(x.rating)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
