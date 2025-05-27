import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function ShowRestaurant() {
    const [data, setData] = useState(null)
    const [commentes, setCommntes] = useState([])
    const [ratings, setRatings] = useState(0)
    const [commente, setCommente] = useState(false)
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const { id } = useParams()
    const fetchRestaurant = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            console.log('Data from API:', response.data)
            setData(response.data.restaurant)
            setCommntes(response.data.lesComments)
        } catch (error) {
            console.error('Erreur lors de la récupération:', error)
        }
    }
    useEffect(() => {
        fetchRestaurant()
    }, [id])
    useEffect(() => {
        const valeur =
            commentes.length > 0
                ? (commentes.reduce((acc, item) => acc + (item.rating || 0), 0) / commentes.length).toFixed(1)
                : 0;
        setRatings(valeur)
    }, [commentes])
    const user = useSelector(s => s.Tache.currentUser);

    useEffect(() => {
        if (data?.commande_details && Array.isArray(data.commande_details)) {
            const aCommenté = data.commande_details.some(c => c.commande.user_id === user.id);
            setCommente(aCommenté);
        }
    }, [data, user]);
    const handleSubmit = async () => {
        if (comment.trim() === '' || rating === 0) {
            alert("Veuillez écrire un commentaire et donner une note.");
            return;
        }
        try {
            const responce = await axios.post('http://127.0.0.1:8000/api/ajouterCommenteResto', {
                restaurant_id: id,
                user_id: user.id,
                comment,
                rating
            });
            alert(responce.data);
            setComment('');
            setRating(0);
            fetchRestaurant()
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'envoi du commentaire.");
        }
    };
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
    if (!data) return <div>Chargement...</div>
    return (
        <div className="pt-20 px-8 md:px-20 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-6 gap-6">

                <div className="md:col-span-2 flex justify-center items-center">
                    <img
                        src={`http://127.0.0.1:8000/storage/${data?.image_resto}`}
                        alt="Restaurant"
                        className="w-48 h-48 rounded-full border-4 border-yellow-400 object-cover"
                    />
                </div>

                <div className="md:col-span-4 space-y-4">
                    <h1 className="text-4xl font-bold text-center md:text-left text-gray-800">
                        {data?.nameResto}
                    </h1>

                    <div className="text-gray-700 text-lg">
                        <p>
                            <span className="font-semibold text-gray-900">Restaurateur:</span> {data?.name}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-900">Adresse:</span> {data?.address}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-900">Description:</span> {data?.description}
                        </p>
                    </div>

                    <div className="flex items-center mt-4">
                        <span className="text-lg font-semibold text-gray-800 mr-2">Rating:</span>
                        {renderStars(ratings)}
                        <span className="ml-2 text-sm text-gray-600">({commentes.length || 0} avis)</span>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Menu</h2>

                <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar">
                    {data?.menus?.map((x, y) => (
                        <div
                            key={y}
                            className="w-64 h-[300px] bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex-shrink-0 overflow-hidden"
                        >
                            <Link to={`/detai/${x.id}`}>
                                <img
                                    src={`http://127.0.0.1:8000/storage/${x.image_plate}`}
                                    alt={x.name}
                                    className="w-full h-32 object-cover rounded-t-xl"
                                />
                            </Link>
                            <div className="p-3 flex flex-col justify-between h-[calc(100%-8rem)]">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-md font-bold text-gray-800 truncate">{x.name}</h3>
                                        <span className="text-sm font-semibold text-orange-500">${x.prix}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-tight overflow-hidden text-ellipsis">
                                        {x.description.length > 60 ? `${x.description.slice(0, 60)}...` : x.description}
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 italic mt-2">{x.category}</p>
                            </div>
                        </div>
                    ))}
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
                    {commentes?.map((x, y) =>
                        <div key={y} className=" h-20 w-[800px] m-20 flex  duration-500">
                            <img src={`http://127.0.0.1:8000/storage/${x.user.image}`} className='h-20 w-20 rounded-full' alt="" />
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
                    {commentes?.map((x, y) =>
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
