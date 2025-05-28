import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default function Previsions() {
    const [lesCommand, setlesCommand] = useState([])
    const [filtre, setFiltre] = useState('semaine');
    const [chartData, setchartData] = useState([]);
    const [totale, settotale] = useState('0');
    const [attente, setattente] = useState('0');
    const [acceptee, setacceptee] = useState('0');
    const [refusee, setrefusee] = useState('0');
    const [livree, setlivree] = useState('0');
    const [Users, setUsers] = useState();
    const [Profit, setProfit] = useState();

    const user = useSelector(s => s.Tache.currentUser);
    useEffect(() => {
        showCommande();
    }, []);
    useEffect(() => {
        if (user && user.id) {
            showUtilisateurs();
        }
    }, [user]);

    const showUtilisateurs = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/showuser/${user.id}`);
            setUsers(response.data.user);
            setProfit(response.data.Profit);
            console.log(response.data.user);
        } catch (error) {
            console.error('Erreur ', error);
            alert("Erreur");
        }
    };

    const showCommande = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/showCommande/${user.id}`);
            setlesCommand(response.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
            console.log(response.data);
        } catch (error) {
            console.error('Erreur ', error);
            alert("Erreur");
        }
    };

    useEffect(() => {
        const groupedData = {};

        lesCommand.forEach(cmd => {
            const dateObj = new Date(cmd.updated_at);
            let key = "";
            if (filtre === 'semaine') {
                key = dateObj.toISOString().split("T")[0];
            } else if (filtre === 'mois') {
                key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
            } else if (filtre === 'annee') {
                key = `${dateObj.getFullYear()}`;
            }
            if (!groupedData[key]) {
                groupedData[key] = { date: key, 'en attente': 0, "acceptée": 0, 'refusée': 0, 'livrée': 0 };
            }
            if (groupedData[key][cmd.status] !== undefined) {
                groupedData[key][cmd.status] += 1;
            }
        });
        const sortedChartData = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));
        let nb = 7;
        if (filtre === 'mois') nb = 6;
        else if (filtre === 'annee') nb = 5;
        setchartData(sortedChartData.slice(-nb));
    }, [filtre, lesCommand]);
    useEffect(() => {
        settotale(chartData.reduce((acc, cur) =>
            acc + cur['en attente'] + cur["acceptée"] + cur["refusée"] + cur["livrée"], 0));
        setattente(chartData.reduce((acc, cur) => acc + cur["en attente"], 0));
        setacceptee(chartData.reduce((acc, cur) => acc + cur["acceptée"], 0));
        setrefusee(chartData.reduce((acc, cur) => acc + cur["refusée"], 0));
        setlivree(chartData.reduce((acc, cur) => acc + cur["livrée"], 0));
    }, [chartData]);



    return (
        <div className=' w-full h-full px-10 pt-2 '>
            <p className=' text-3xl font-serif font-bold '>Bonjour {user.name}</p>
            <div className="grid grid-cols-3 gap-5 rounded-lg">
                <div className="col-span-2 pt-6">
                    <h1 className='text-center font-medium font-serif text-3xl'>Statistiques des Commandes</h1>
                    <div className="flex justify-end items-center mb-4 space-x-2">
                        <label className="font-medium text-gray-700">Filtrer par :</label>
                        <select
                            className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={filtre}
                            onChange={(e) => setFiltre(e.target.value)}
                        >
                            <option value="semaine"> jours</option>
                            <option value="mois">mois</option>
                            <option value="annee">année</option>
                        </select>
                    </div>
                    <BarChart width={730} height={250} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="en attente" fill="#FF9800" />
                        <Bar dataKey="refusée" fill="#F44336" />
                        <Bar dataKey="acceptée" fill="#2196F3" />
                        <Bar dataKey="livrée" fill="#4CAF50" />
                    </BarChart>
                    <div className="bg-white shadow-md p-1 rounded-md">
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="text-2xl font-bold">{totale}</p>
                    </div>
                    <div className="bg-yellow-100 shadow-md p-1 rounded-md">
                        <p className="text-gray-500 text-sm">En attente</p>
                        <p className="text-2xl font-bold">{attente}</p>
                    </div>
                    <div className="bg-blue-100 shadow-md p-1 rounded-md">
                        <p className="text-gray-500 text-sm">Acceptée</p>
                        <p className="text-2xl font-bold">{acceptee}</p>
                    </div>
                    <div className="bg-red-100 shadow-md p-1 rounded-md">
                        <p className="text-gray-500 text-sm">Refusée</p>
                        <p className="text-2xl font-bold">{refusee}</p>
                    </div>
                    <div className="bg-green-100 shadow-md p-1 rounded-md">
                        <p className="text-gray-500 text-sm">Livrée</p>
                        <p className="text-2xl font-bold">{livree}</p>
                    </div>
                </div>
                <div className="col-span-1 pt-6">
                    {Users && Users.devoirs && Users.devoirs.length > 0 ? (
                        Users.devoirs
                            .filter(devoir => devoir.etat === "non payé")
                            .map((devoir, index) => (
                                <div key={index} className="bg-red-50 p-3 my-2 rounded shadow">
                                    <p className="text-lg font-semibold text-red-700">💰 Devoir à payer</p>
                                    <p className="text-sm text-gray-600">Mois : {devoir.mois} / Année : {devoir.annee}</p>
                                    <p className="text-base font-bold text-red-600">{devoir.montant} DH</p>
                                    <p className="text-sm font-medium text-red-500">Non payé</p>
                                </div>
                            ))
                    ) : (
                        <p className="text-gray-500">Aucun devoir à payer pour le moment.</p>
                    )}
                    {Users && Profit && (
                        (() => {
                            const totalProfit = Profit
                                .filter(p => p.status === "livrée")
                                .reduce((acc, curr) => acc + parseFloat(curr.total_price), 0);

                            const totalDevoirs = Users.devoirs
                                .filter(d => d.etat === "non payé")
                                .reduce((acc, curr) => acc + parseFloat(curr.montant), 0);

                            const profitNet = totalProfit - totalDevoirs;

                            return (
                                <div className="bg-green-50 p-4 rounded shadow-md space-y-2">
                                    <h2 className="text-xl font-bold text-green-800">📈 Résumé Financier</h2>
                                    <p className="text-green-700 font-medium">Bénéfice total : <span className="font-bold">{totalProfit.toFixed(2)} DH</span></p>
                                    <p className="text-green-900 font-semibold">💸 Bénéfice net : <span className="font-bold">{profitNet.toFixed(2)} DH</span></p>
                                </div>
                            );
                        })()
                    )}
                </div>

            </div>
        </div>
    )
}
