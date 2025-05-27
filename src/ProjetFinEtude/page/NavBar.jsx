import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../Store/CreteSlice";
import { RiLockPasswordFill } from 'react-icons/ri';
export default function NavBar() {
    const [login, setLogin] = useState(false)
    const [client, setClient] = useState(false)
    const [resto, setResto] = useState(false)
    const [show, setShow] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(s => s.Tache.currentUser)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
            });
            navigate('/Menu');
            setClient(false);
            setName('');
            setEmail('');
            setPassword('');
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert('Erreur: ' + (error.response.data.message || 'Vérifiez les champs.'));
            } else {
                alert('Erreur de connexion au serveur.');
            }
            console.error(error);
        }
    };
    const handleSubmitResto = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/registerResto', {
                name,
                email,
                password,
            });
            navigate('/dashbord');
            setResto(false);
            setName('');
            setEmail('');
            setPassword('');
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert('Erreur: ' + (error.response.data.message || 'Vérifiez les champs.'));
            } else {
                alert('Erreur de connexion au serveur.');
            }
            console.error(error);
        }
    };
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });
            navigate('/');
            setLogin(false);
            setEmail('');
            setPassword('');
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                alert('Erreur: ' + (error.response.data.message || 'Vérifiez les champs.'));
            } else {
                alert('Erreur de connexion au serveur.');
            }
            console.error(error);
        }
    };
    const logout = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/logout',);
            navigate('/');
            dispatch(setUser(null));
            console.log(response.data)
            localStorage.removeItem('user');

        } catch (error) {
            if (error.response) {
                alert('Erreur: ' + (error.response.data.message || 'Vérifiez les champs.'));
            } else {
                alert('Erreur de connexion au serveur.');
            }
            console.error(error);
        }
    };






    return (
        <div className=' h-svh  absolute z-20'>
            <div className='    '>
                <div className='bg-black flex justify-between h-14 text-white fixed  w-full  '>
                    <div className="flex justify-center items-center h-14 mx-5">
                        <img src="DawQ.png" alt="" className='h-10' />
                    </div>
                    <div className="flex  h-14 w-1/2">
                        <div className=" w-1/4  flex justify-center items-center h-14">
                            <NavLink to='/' className={({ isActive }) => `text-2xl hover:text-yellow-300 active:text-yellow-500 ${isActive & login === false ? 'text-yellow-300' : 'text-white'}`}>Home</NavLink>
                        </div>
                        <div className=" w-1/4  flex justify-center items-center h-14">
                            <NavLink to='/Menu' className={({ isActive }) => `text-2xl hover:text-yellow-300 active:text-yellow-500 ${isActive & login === false ? 'text-yellow-300' : 'text-white'}`}> Menu</NavLink>
                        </div>
                        <div className=" w-1/4  flex justify-center items-center h-14">
                            <NavLink to='/About' className={({ isActive }) => `text-2xl hover:text-yellow-300 active:text-yellow-500 ${isActive & login === false ? 'text-yellow-300' : 'text-white'}`}>About us</NavLink>
                        </div>
                        {user == null ? (
                            <div className=" w-1/4  flex justify-center items-center h-14">

                                <button
                                    onClick={() => setLogin(true)}
                                    className={`text-2xl hover:text-yellow-300 active:text-yellow-500 ${login ? 'text-yellow-300' : 'text-white'}`}>
                                    Login
                                </button>
                            </div>
                        ) : (
                            <div
                                className="w-1/4"
                                onMouseEnter={() => setShow(true)}
                                onMouseLeave={() => setShow(false)}
                            >
                                <div className="h-14 flex justify-center items-center">
                                    <a className="text-2xl hover:text-yellow-300 active:text-yellow-500">
                                        {user.name}
                                    </a>
                                </div>

                                {show && (
                                    <div className="bg-black">
                                        <div className="h-10 text-xl text-center">
                                            <a href="/dashbord">Dashboard</a>
                                        </div>
                                        <div className="h-10 text-xl text-center">
                                            <a href="/logout" onClick={logout}>Logout</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {login && (
                    <div className="h-full fixed  ">
                        <div className=' h-full p-16 bg-slate-950 bg-opacity-85 w-dvw flex justify-center items-center '>
                            <div className=" mx-10 grid grid-cols-5 z-10 h-full w-full ">
                                <div className="col-span-3 bg-slate-200 rounded-l-2xl">
                                    <form onSubmit={handleSubmitLogin}>
                                        <div className=" flex items-center h-1/5 justify-center">
                                            <h1 className=' text-4xl pt-3  font-serif font-medium'>SE CONNECTER</h1>
                                        </div>

                                        <div className="flex items-center h-3/5 justify-center ">
                                            <div className='w-full'>

                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <MdEmail className="text-gray-500" />
                                                    <input
                                                        type="email"
                                                        placeholder="Adresse email"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <RiLockPasswordFill className="text-gray-500" />
                                                    <input
                                                        type="password"
                                                        placeholder="Mot de passe"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mx-12 mt-7 flex items-center gap-2">
                                                    <input type="checkbox" id="rememberMe" className="cursor-pointer scale-150" />
                                                    <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer">Se souvenir de moi</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center h-1/5 justify-center ">
                                            <button
                                                type='submit'
                                                className='text-2xl  bg-orange-500 text-2 hover:bg-orange-600 text-white px-4 py-2 rounded-full'>
                                                Se Connecter
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-span-2 w-full h-full bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 rounded-r-2xl ">
                                    <div className="flex justify-end h-1/6">
                                        <IoCloseSharp onClick={() => setLogin(false)} className='text-4xl font-bold text-black cursor-pointer' />
                                    </div>
                                    <div className=" w-full h-5/6 flex justify-center items-center ">
                                        <div className=" w-full ">
                                            <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant que client</h1>
                                            <div className="flex justify-center my-7 font-serif">
                                                <button onClick={() => { setClient(true); setLogin(false); setResto(false) }} className='  border-2 border-white rounded-full text-2xl hover:scale-110 hover:bg-white hover:text-orange-500 text-white py-2 px-5 '>S'inscrire</button>
                                            </div>
                                            <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant que restaurateur</h1>
                                            <div className="flex justify-center my-7 font-serif">
                                                <button onClick={() => { setClient(false); setLogin(false); setResto(true) }} className='  border-2 border-white rounded-full text-2xl hover:scale-110 hover:bg-white hover:text-orange-500 text-white py-2 px-5 '>S'inscrire</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {client && (

                    <div className="h-full fixed  ">
                        <div className=' h-full p-16 bg-slate-950 bg-opacity-85 w-dvw flex justify-center items-center '>
                            <div className=" mx-10 grid grid-cols-5 z-10 h-full w-full ">

                                <div className="col-span-2 w-full h-full bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 rounded-l-2xl ">
                                    <div className=" w-full h-full flex justify-center items-center ">

                                        <div className=" w-full h-full flex justify-center items-center ">
                                            <div className=" w-full ">
                                                <div className=" w-full ">
                                                    <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant que restaurateur</h1>
                                                    <div className="flex justify-center my-7 font-serif">
                                                        <button onClick={() => { setClient(false); setLogin(false); setResto(true) }} className='  border-2 hover:bg-white hover:text-orange-500 border-white rounded-full text-2xl hover:scale-110 text-white py-2 px-5 '>S'inscrire</button>
                                                    </div>
                                                </div>
                                                <div className=" w-full ">
                                                    <h1 className='text-center font-serif text-2xl text-white'>Se Connecter</h1>
                                                    <div className="flex justify-center my-7 font-serif">
                                                        <button onClick={() => { setClient(false); setLogin(true); setResto(false) }} className='  border-2 hover:bg-white hover:text-orange-500 border-white rounded-full text-2xl hover:scale-110 text-white py-2 px-5 '>Se Connecter</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 bg-slate-200 rounded-r-2xl">
                                    <div className="flex justify-end h-1/6">

                                        <IoCloseSharp onClick={() => setClient(false)} className='text-4xl font-bold text-black cursor-pointer' />
                                    </div>
                                    <div className=" flex items-center h-1/6 justify-center">
                                        <h1 className=' text-4xl pt-3  font-serif font-medium'>S'inscrire</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>

                                        <div className="flex items-center h-3/6 justify-center">
                                            <div className='w-full'>
                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <FaUser className="text-gray-500" />
                                                    <input
                                                        type="text"
                                                        placeholder="Nom d'utilisateur"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <MdEmail className="text-gray-500" />
                                                    <input
                                                        type="email"
                                                        placeholder="Adresse email"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <RiLockPasswordFill className="text-gray-500" />
                                                    <input
                                                        type="password"
                                                        placeholder="Mot de passe"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mx-12 mt-7 flex items-center gap-2">
                                                    <input type="checkbox" id="rememberMe" className="cursor-pointer scale-150" />
                                                    <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer">Se souvenir de moi</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center h-1/6 justify-center">
                                            <button
                                                type="submit"
                                                className='text-2xl bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full'
                                            >
                                                S'inscrire
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {resto && (

                    <div className="h-full fixed  ">
                        <div className=' h-full p-16 bg-slate-950 bg-opacity-85 w-dvw flex justify-center items-center '>
                            <div className=" mx-10 grid grid-cols-5 z-10 h-full w-full ">

                                <div className="col-span-2 w-full h-full bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 rounded-l-2xl ">
                                    <div className=" w-full h-full flex justify-center items-center ">
                                        <div className=" w-full ">
                                            <div className=" w-full ">
                                                <h1 className='text-center font-serif text-2xl text-white'>S'inscrire en tant que client</h1>
                                                <div className="flex justify-center my-7 font-serif">
                                                    <button onClick={() => { setClient(true); setLogin(false); setResto(false) }} className='  border-2 hover:bg-white hover:text-orange-500 border-white rounded-full text-2xl hover:scale-110 text-white py-2 px-5 '>S'inscrire</button>
                                                </div>
                                            </div>
                                            <div className=" w-full ">
                                                <h1 className='text-center font-serif text-2xl text-white'>Se Connecter</h1>
                                                <div className="flex justify-center my-7 font-serif">
                                                    <button onClick={() => { setClient(false); setLogin(true); setResto(false) }} className='  border-2 hover:bg-white hover:text-orange-500 border-white rounded-full text-2xl hover:scale-110 text-white py-2 px-5 '>Se Connecter</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 bg-slate-200 rounded-r-2xl">
                                    <div className="flex justify-end h-1/6">

                                        <IoCloseSharp onClick={() => setClient(false)} className='text-4xl font-bold text-black cursor-pointer' />
                                    </div>
                                    <div className=" flex items-center h-1/6 justify-center">
                                        <h1 className=' text-4xl pt-3  font-serif font-medium'>S'inscrire</h1>
                                    </div>
                                    <form onSubmit={handleSubmitResto}>

                                        <div className="flex items-center h-3/6 justify-center">
                                            <div className='w-full'>
                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <FaUser className="text-gray-500" />
                                                    <input
                                                        type="text"
                                                        placeholder="Nom d'utilisateur"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <MdEmail className="text-gray-500" />
                                                    <input
                                                        type="email"
                                                        placeholder="Adresse email"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative flex mx-10 items-center mt-5 border rounded-2xl bg-white px-3">
                                                    <RiLockPasswordFill className="text-gray-500" />
                                                    <input
                                                        type="password"
                                                        placeholder="Mot de passe"
                                                        className="ml-2 w-full p-2 outline-none bg-transparent"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mx-12 mt-7 flex items-center gap-2">
                                                    <input type="checkbox" id="rememberMe" className="cursor-pointer scale-150" required />
                                                    <label htmlFor="rememberMe" className="text-gray-700 cursor-pointer">Se souvenir de moi</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center h-1/6 justify-center">
                                            <button
                                                type="submit"
                                                className='text-2xl bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full'
                                            >
                                                S'inscrire
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}