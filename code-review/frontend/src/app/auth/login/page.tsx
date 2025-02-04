'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Code smell intencional: URL hardcodeada
const API_URL = 'http://localhost:3000';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Code smell intencional: Falta de validación y manejo de errores
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // Code smell intencional: Almacenamiento inseguro
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            router.push('/dashboard');
        } catch (error) {
            console.log('Error en login:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border p-2"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Login
                </button>
            </form>
        </div>
    );
}