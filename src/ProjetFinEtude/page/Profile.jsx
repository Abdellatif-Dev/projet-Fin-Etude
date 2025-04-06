import React from 'react'

export default function Profile() {
    return (
        <div className=' w-full h-full px-10 pt-2 '>
            <p className=' text-3xl font-serif font-bold '>Bonjour XXX</p>
            <div className="mt-3 w-full  ">
                <div className="mt-2 p-4 bg-white rounded-lg shadow-md border">
                    <div className="flex items-center space-x-4">
                        <label className="w-32 h-32 border-dashed border-2 border-gray-400 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-gray-600">
                            <span className="text-4xl">+</span>
                            <input type="file" className="hidden" />
                        </label>
                        <label className="text-gray-700">Changer la photo du restaurant</label>
                    </div>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-gray-700">Nom </label>
                            <input type="text" className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Entrez le nom " />
                        </div>
                        <div>
                            <label className="block text-gray-700">Nom du restaurant</label>
                            <input type="text" className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Entrez le nom du restaurant" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Adresse</label>
                            <input type="text" className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Entrez l'adresse" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Description du restaurant</label>
                            <textarea className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" rows="3" placeholder="Entrez la description"></textarea>
                        </div>
                    </div>
                    <button className="mt-5 bg-violet-600 px-4 py-2 rounded-lg text-white hover:bg-violet-700">Modifier</button>
                </div>
            </div>
        </div>
    )
}
