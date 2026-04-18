import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [fullname, setFullname] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateToken = async () => {
        if (!username || !age || !fullname) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/GenerateJWT', {
                header: {
                    alg: "HS512",
                    typ: "JWT"
                },
                claims: {
                    Username: username,
                    Age: parseInt(age),
                    Fullname: fullname
                },
                key: "$AhmedIsAwesome!"
            });
            
            setToken(response.data);
            setError('');
        } catch (err) {
            setError('Erreur lors de la génération du token');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleValidateToken = async () => {
        if (!token) {
            setError('Aucun token à valider');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/ValidateJWT', {
                header: {
                    alg: "HS512"
                },
                token: token,
                key: "$AhmedIsAwesome!"
            });
            
            if (response.data === true) {
                setError('');
                alert('✅ Authentification réussie !');
                if (onLogin) {
                    onLogin(token, { username, age, fullname });
                }
            } else {
                setError('❌ Token invalide');
            }
        } catch (err) {
            setError('Erreur lors de la validation');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🔐 Authentification JWT</h1>
            
            {error && <p style={styles.error}>{error}</p>}
            
            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="👤 Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                
                <input
                    type="number"
                    placeholder="📅 Âge"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={styles.input}
                />
                
                <input
                    type="text"
                    placeholder="📝 Nom complet"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    style={styles.input}
                />
                
                <button 
                    onClick={handleGenerateToken} 
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? '⏳ Chargement...' : '🔑 Générer Token'}
                </button>
                
                {token && (
                    <>
                        <div style={styles.tokenContainer}>
                            <label style={styles.label}>Token généré :</label>
                            <textarea
                                readOnly
                                value={token}
                                style={styles.textarea}
                                rows="4"
                            />
                        </div>
                        <button 
                            onClick={handleValidateToken} 
                            style={{...styles.button, ...styles.validateButton}}
                            disabled={loading}
                        >
                            {loading ? '⏳ Vérification...' : '✅ Valider Token'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        color: '#1a73e8',
        marginBottom: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '400px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        outline: 'none',
        transition: 'border-color 0.3s'
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#1a73e8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    validateButton: {
        backgroundColor: '#34a853'
    },
    tokenContainer: {
        marginTop: '10px'
    },
    label: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '5px',
        display: 'block'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        resize: 'none',
        backgroundColor: '#f8f9fa'
    },
    error: {
        color: '#dc3545',
        backgroundColor: '#f8d7da',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center'
    }
};

export default Login;