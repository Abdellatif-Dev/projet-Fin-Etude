import React from 'react'
import { useParams } from 'react-router-dom'
import { menuData, Restaurants, Reviews, User } from '../data/data';
import { FaStar } from 'react-icons/fa'; 

export default function Detai() {
    let { id } = useParams()
    const plat = menuData.find(x => x.id_Menu === Number(id))
    const review = Reviews.filter(x => x.Menu_id === Number(id))
    const Rating = (review.reduce((acc, item) => acc + item.rating, 0) / review.length).toFixed(1);
    
    

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    color={i <= rating ? '#FFD700' : '#ccc'} 
                    size={20}
                />
            );
        }
        return stars;
    };
    return (
        <div className='pt-14 px-40'>
            <div className="grid grid-cols-3">
                <div className="col-span-1 p-4">
                    <img src={plat.image_url} className=' rounded-md' alt="" />
                </div>
                <div className="col-span-2 p-5  space-y-5">
                    <h1 className='text-2xl font-serif font-bold text-center'>{plat.name} </h1>
                    <p className='text-xl font-serif'>nom Restaurant:{Restaurants.find(x => x.id_Resto === plat.restaurant_id).name_Resto} </p>
                    <p className='text-xl font-serif'>prix :{plat.price} </p>
                    <p className='text-xl font-serif'>description :{plat.description} </p>
                    <div className="flex  pl-10items-center mt-2">
                                <span className="text-lg  font-semibold mr-2">Rating:</span>
                                {renderStars(Rating)} 
                            </div>
                </div>
            </div>
            <div className=" flex w-full overflow-hidden group space-x-10">
                <div className="flex w-max  animate-scrollX1 group-hover:[animation-play-state:paused] space-x-10 ">
                    {review.map((x, y) =>
                        <div key={y} className=" h-20 w-[800px] m-20 flex  duration-500">
                        <img src={`../${User.find(z => z.id_User === x.user_id).image}`} className='h-20 w-20 rounded-full' alt="" />
                        <div className="">
                            <p className='pl-10 text-2xl font-serif font-medium'>Acteur :{User.find(z => z.id_User === x.user_id).name} </p>
                            <p className='pl-10 text-xl font-serif '>{x.comment} </p>
                            <div className="flex  pl-10items-center mt-2">
                                <span className="text-lg pl-10 font-semibold mr-2">Rating:</span>
                                {renderStars(x.rating)} 
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className="flex w-max animate-scrollX1 group-hover:[animation-play-state:paused] space-x-10 ">
                    {review.map((x, y) =>
                        <div key={y} className=" h-20 w-[800px] m-20 flex  duration-500">
                            <img src={`../${User.find(z => z.id_User === x.user_id).image}`} className='h-20 w-20 rounded-full' alt="" />
                            <div className="">
                                <p className='pl-10 text-2xl font-serif font-medium'>Acteur :{User.find(z => z.id_User === x.user_id).name} </p>
                                <p className='pl-10 text-xl font-serif '>{x.comment} </p>
                                <div className="flex  items-center mt-2">
                                    <span className="text-lg pl-10 font-semibold mr-2">Rating:</span>
                                    {renderStars(x.rating)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
