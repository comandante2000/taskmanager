import { useState ,useEffect } from 'react';
import Link from 'next/link';
import { TextField, Button, Checkbox, FormControlLabel,Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');
    const router = useRouter();
    useEffect(() => {
     let creds= localStorage.getItem('remember');
     if(creds === "true"){
        setUsername("admin");
        setPassword("admin");
     }
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
        // Send username and password to backend for authentication
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken // Include CSRF token in the request headers
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            // Handle authentication response
            if (data.message === 'Login successful') {
             localStorage.setItem('remember',rememberMe.toString());
             console.log(localStorage.getItem('remember'));
             console.log("Login successful");
                router.push('/homepage');
            } else {
             
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
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    label="Remember me"
                    className="mb-4"
                    style={{ color: 'black' }}
                />
              <div className="flex justify-between">
              <Link href="/register">
                    <Typography variant="body1" color="primary" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                        Register
                    </Typography>
               </Link>
                    <span style={{ color: 'black' }}>or</span>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
