'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

import { toasterStyle } from '@/app/css/styles'
import { Toaster, toast } from 'react-hot-toast';

import './Login.css'

export default function WaiterLogin() {

	const router = useRouter();

	const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
	// Lo almacena en la variable daily_code
	const daily_code = urlParams.get('daily_code');

	const [nombre, setNombre] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Realizar la petición a la API para guardar el nombre del mozo
			const res = await axios.post(`${API_BASE_URL}/mozos`, { nombre, daily_code });
			console.log('Nombre del mozo guardado:', res.data);
			// Limpiar el campo de entrada después de guardar el nombre
			setNombre('');
			toast.success('Mozo guardado', { style: toasterStyle });
			localStorage.setItem('waiter_token', res.data.data.token);
			localStorage.setItem('waiter_name', nombre);
			setTimeout(() => {
				router.push('/dashboard/rol/waiter');
			}, 1000);
		} catch (error) {
			console.error('Error al guardar el nombre del mozo:', error);
		}
	};

	return (
		<main>
			<div className='login__head'>
				<p>Nombre del mozo</p>
				<input type="text" placeholder='Ingresar nombre' className='input' value={nombre} onChange={(e) => setNombre(e.target.value)} />
				<button type='submit' className='btn btn__pink' onClick={handleSubmit}>Guardar</button>
				<Toaster />
			</div>
		</main>
	)
}
