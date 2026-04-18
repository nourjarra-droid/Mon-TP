import React from 'react';

const Dashboard = ({ user, token, onLogout }) => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🏠 Tableau de bord</h1>
                <p style={styles.subtitle}>Authentification réussie !</p>
                
                <div style={styles.info}>
                    <h2>👤 Informations utilisateur :</h2>
                    <p><strong>Nom d'utilisateur :</strong> {user?.username}</p>
                    <p><strong>Âge :</strong> {user?.age}</p>
                    <p><strong>Nom complet :</strong> {user?.fullname}</p>
                    
                    <h3>🔑 Token JWT :</h3>
                    <textarea 
                        readOnly 
                        value={token} 
                        style={styles.textarea} 
                        rows="4"
                    />
                </div>
                
                <button onClick={onLogout} style={styles.button}>
                    🚪 Déconnexion
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5'
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '500px',
        textAlign: 'center'
    },
    title: {
        color: '#1a73e8',
        marginBottom: '10px'
    },
    subtitle: {
        color: '#34a853',
        marginBottom: '30px'
    },
    info: {
        textAlign: 'left',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '11px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        resize: 'none',
        backgroundColor: 'white'
    },
    button: {
        padding: '12px 30px',
        fontSize: '16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    }
};

export default Dashboard;