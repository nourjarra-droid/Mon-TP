import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setToken('');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            {isAuthenticated ? (
                <Dashboard 
                    user={user} 
                    token={token} 
                    onLogout={handleLogout} 
                />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;