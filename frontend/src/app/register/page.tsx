'use client';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/data');
                const data = await response.json();
                setCsrfToken(data.csrf_token);
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken 
                },
                body: JSON.stringify({ username, password ,email })
            });
            const data = await response.json();
            // Handle authentication response for now
            if (data.message === 'Registration successful') {
                router.push('/');
              
            } else {
                console.log("Error:", data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
       
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
             
            </form>
        </div>
    );
};

export default Register;
