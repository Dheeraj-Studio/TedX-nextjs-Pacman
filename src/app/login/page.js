'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../pacman.css';

export default function LoginPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const name = input.trim();
    if (!name) return;
    setLoading(true);
    try {
      const res = await fetch('/api/users', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: name }) });
      if (res.ok) {
        localStorage.setItem('pacman_username', name);
        router.push('/');
      } else {
        console.error('failed login');
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      color: 'white',
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 24,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '32px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
        minWidth: '300px'
      }}>
        <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', color: '#FFD700' }}>🟡 Pac-Man 3D</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', gap: 12, alignItems: 'center', flexDirection: 'column' }}>
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Enter username"
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px',
              width: '200px',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: loading ? '#666' : '#FFD700',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Joining...' : 'Join Game'}
          </button>
        </form>
      </div>
      <div>
        <button 
          onClick={() => router.push('/leaderboard')}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
}
