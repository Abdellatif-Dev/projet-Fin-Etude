import React from 'react';

export default function AboutUs() {
    return (
        <div className="w-full bg-white text-gray-800">
            <section className="relative h-[50vh] w-full">
                <img
                    src="/restaurant-banner.jpg"
                    alt="Bannière"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <h1 className="text-white text-5xl font-bold">À propos de nous</h1>
                </div>
            </section>
            <section className="py-16 px-8 lg:px-20">
                <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Notre mission</h2>
                <p className="text-xl text-center max-w-3xl mx-auto">
                    Nous sommes la plateforme idéale pour connecter les restaurants à leurs clients en toute simplicité.
                    Nous offrons aux propriétaires de restaurants une opportunité unique de présenter leurs menus et de vendre leurs plats directement via notre site.
                </p>
                <div className="mt-12 flex justify-center">
                    <img src="/team-collab.jpg" alt="Collaboration" className="rounded-xl shadow-lg w-full max-w-4xl object-cover" />
                </div>
            </section>
            <section className="bg-yellow-50 py-14 px-8 lg:px-20">
                <h2 className="text-2xl font-bold text-center text-red-600 mb-6">📢 Avis important pour les restaurants</h2>
                <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto">
                    Nous informons nos partenaires restaurateurs qu'une commission de <span className="font-bold text-red-600">10%</span>
                    est prélevée sur chaque vente réalisée via notre plateforme.
                    Il s'agit de notre unique source de revenu, utilisée pour couvrir les frais de fonctionnement et améliorer nos services.
                </p>
            </section>
            <section className="bg-slate-900 py-16 px-8 lg:px-20 text-white">
                <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">Contactez-nous</h2>
                <form className="max-w-2xl mx-auto space-y-6">
                    <input
                        type="text"
                        placeholder="Nom complet"
                        className="w-full p-3 rounded-lg text-black"
                    />
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        className="w-full p-3 rounded-lg text-black"
                    />
                    <textarea
                        rows={5}
                        placeholder="Votre message"
                        className="w-full p-3 rounded-lg text-black"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-600 transition"
                    >
                        Envoyer
                    </button>
                </form>
            </section>

        </div>
    );
}
