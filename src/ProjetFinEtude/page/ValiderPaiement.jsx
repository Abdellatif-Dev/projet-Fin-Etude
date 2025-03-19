import React from 'react'

export default function ValiderPaiement(props) {
    console.log(props.TabComm);

    return (
        <div className='pt-14 h-svh w-full'>
            <div className='w-10/12 mx-auto my-5 bg-stone-200 h-[600px]'>
                <h1 className='text-center text-3xl font-serif'>Valider Votre Paiement</h1>
                <div className="grid grid-cols-5">
                    <div className="col-span-3 px-4">
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-gray-700">Nom </label>
                                <input type="text" className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Entrez le nom " />
                            </div>
                            <div>
                                <label className="block text-gray-700">E-mail</label>
                                <input type="email" className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Entrez E-mail" />
                            </div>
                            <div>
                                <label className="block text-gray-700">telephon</label>
                                <input type="tel" placeholder="06XXXXXXXX" pattern="[0-9]{10}" className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Adresse </label>
                                <input type="text" className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Entrez l'adresse" />                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <h1 className='pt-3 text-center first-letter:uppercase font-serif text-2xl'>panier</h1>
                        <div className="w-full  px-3 ">
                            <table className=' w-full mx-auto bg-slate-300 border-collapse  '>
                                <thead >
                                    <tr >
                                        <td className='w-1/4'>Photo</td>
                                        <td className='w-2/4'>Nom</td>
                                        <td className='w-1/4'>Prix</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="overflow-x-auto  sm:rounded-lg  scroll-smooth w-full  px-3 h-[260px]">
                            <table className='w-full border-collapse  '>
                                <tbody>
                                    {props.TabComm.map((x, y) => (
                                        <tr key={y} className='odd:bg-slate-300 border-b border-gray-400 '>
                                            <td className='w-1/4'><img src={x.image} alt={x.nomPlat} width={50} height={50} /></td>
                                            <td className='w-2/4'>{x.nomPlat}</td>
                                            <td className='w-1/4'>{x.quantity * x.prix}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center text-xl font-bold  h-[30px]">
                            Total: {props.TabComm.reduce((acc, item) => acc + item.quantity * item.prix, 0).toFixed(2)} DH
                        </div>
                    </div>
                </div>
                <div className="flex justify-center h-60 items-center">
                <button className='py-2 px-3  text-3xl  rounded-full bg-gradient-to-b from-yellow-400 via-yellow-600 to-orange-500 hover:shadow-yellow-500 hover:shadow-[0_0px_35px_rgba(0,0,0,1)] hover:bg-gradient-to-t hover:from-yellow-400 hover:via-yellow-600 hover:to-orange-500 '>Valider</button>
                </div>
            </div>
        </div>
    )
}
