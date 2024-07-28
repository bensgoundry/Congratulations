function Login({ onLogin }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                onLogin();
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

function Congratulations() {
    return (
        <div className="container">
            <h1 className="congratulations">Congratulations!</h1>
            <p>You've successfully logged in!</p>
        </div>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <div className="App">
            {isLoggedIn ? (
                <Congratulations />
            ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);