import React from 'react'
import { useParams } from 'react-router-dom'
import { menuData, Restaurants, Reviews,User } from '../data/data';

export default function Detai() {
    let { id } = useParams()
    const plat = menuData.find(x=>x.id_Menu===Number(id))
    console.log(plat);
    console.log(id);
    const review= Reviews.filter(x=>x.Menu_id===Number(id))
    console.log(review);
    console.log(User.find(z=>z.id_User===3).image);
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
                </div>
            </div> 
            <div className=" flex w-full overflow-hidden group space-x-10">

                <div className="flex w-max animate-scrollX group-hover:[animation-play-state:paused] space-x-10 ">
                    {review.map((x, y) =>
                        <div key={y} className="bg-slate-200 h-36 w-[1000px] flex  duration-500">

                            <img src={`../${User.find(z=>z.id_User===x.user_id).image}`} className='h-36 w-36' alt="" />
                            <div className="">
                                <p>user :{User.find(z=>z.id_User===x.user_id).name} </p>
                                <p>{x.comment} </p>
                            </div>

                        </div>
                    )}
                </div>
                <div className="flex w-max animate-scrollX group-hover:[animation-play-state:paused] space-x-10 ">
                    {review.map((x, y) =>
                        <div key={y} className="bg-slate-200 h-36 w-[1000px] flex  duration-500">

                            <img src={`../${User.find(z=>z.id_User===x.user_id).image}`} className='h-36 w-36' alt="" />
                            <div className="">
                                <p>user :{User.find(z=>z.id_User===x.user_id).name} </p>
                                <p>{x.comment} </p>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
