import React, { useState, useEffect } from 'react';

const tab = ['img1.png', 'img2.png', 'img3.png'];
const tab1 = ['vd1.mp4', 'vd2.mp4', 'vd3.mp4'];

export default function Home() {
    const [indexVd, setIndexVd] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexVd((x) => (x + 1) % tab1.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <section className='h-svh w-full bg-cover bg-center relative '   >
                <video src={tab1[indexVd]} autoPlay loop muted className='w-full h-full object-cover transition-all  duration-75  absolute -z-20'></video>
                <div className="w-1/2   h-full grid backdrop-blur-lg  grid-cols-1  ">
                    <div className=" col-span-1   ">
                        <div className=" flex justify-center items-center h-full  ">
                            <h1 className='text-4xl text-white'>Bienvenue à </h1>
                            <img src="DawQ1.png" className='pt-4 pl-3' alt="" />
                        </div>
                    </div>
                    <div className="col-span-1 ">
                        <p className='text-2xl text-white text-center mx-20 font-bold '>Le plus grand groupe de restaurants où vous trouverez tout ce que vous désirez aux meilleurs prix</p>
                    </div>
                </div>
            </section>
            <section className='min-h-screen bg-slate-50 py-20 px-10'>
                <h2 className='text-4xl md:text-5xl font-bold text-orange-500 text-center mb-12'>Qui sommes-nous</h2>
                <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
                    <img src="about.jpg" alt="À propos" className='w-full md:w-1/2 rounded-xl shadow-lg' />
                    <div className='md:w-1/2'>
                        <p className='text-lg md:text-xl font-semibold mb-6'>
                            Bienvenue sur <strong>DAWQ</strong>, la plateforme idéale pour connecter les restaurants à leurs clients en toute simplicité ! Nous offrons aux propriétaires de restaurants une opportunité unique de présenter leurs menus et de vendre leurs plats directement via notre site.
                        </p>
                        <button className='py-2 px-6 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white font-bold hover:brightness-110 transition-all'>
                            En savoir plus
                        </button>
                    </div>
                </div>
            </section>

            <section className='h-svh bg-slate-900'>
                <div className="grid grid-cols-8 h-full">
                    <div className="col-span-3">
                        <div className="flex items-center h-full mx-10 ">
                            <p className=' text-2xl text-center text-white font-bold '>
                                Avez-vous des questions ou des préoccupations
                                concernant nos services ? Ou peut-être
                                rencontrez-vous un problème ou
                                souhaitez-vous déposer une réclamation ?
                                Nous sommes là pour vous aider!
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex justify-center h-full">
                            <div
                                className="w-80 h-full  bg-yellow-400 flex justify-center  items-center "
                                style={{
                                    clipPath: 'polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)',
                                }}
                            >
                                <h1 className=' text-7xl rotate-[-1.41rad]  font-extrabold text-slate-900 text-nowrap '>Contactez-nous</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 flex items-center justify-center ">
                        <div className=" w-full h-3/5 mx-20 pt-14 ">
                            <input type="text" className=' block w-full h-12 pl-5  rounded-3xl' placeholder='Entrez votre nom' />
                            <input type="text" className=' block w-full mt-10 h-12 pl-5  rounded-3xl' placeholder='Entrez votre E-mail' />
                            <textarea className=' block w-full mt-10  pl-5  rounded-3xl' rows={7} placeholder='Entrez votre Message'></textarea>
                            <button className=' border-2 border-yellow-500 rounded-3xl text-2xl py-2 px-4 mt-10 text-white hover:bg-yellow-400 hover:border-white hover:text-black hover:drop-shadow-2xl hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)]'>Soumettre</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
