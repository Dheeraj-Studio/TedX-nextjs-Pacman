"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../pacman.css';

export default function LeaderboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    fetch('/api/users')
      .then(r => r.ok ? r.json() : {})
      .then(data => {
        // data is an object mapping usernames to user objects
        const arr = Object.keys(data).map(k => data[k]);
        arr.sort((a,b) => (b.highScore || 0) - (a.highScore || 0) || a.username.localeCompare(b.username));
        setUsers(arr);
    }).catch(() => {})
    .finally(() => setLoading(false));
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      color: 'white',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '32px', color: '#FFD700' }}>🏆 Leaderboard</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={() => load()} 
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: loading ? '#666' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? 'Refreshing...' : '🔄 Refresh'}
            </button>
            <button 
              onClick={() => router.push('/')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: '#FFD700',
                color: '#000',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🎮 Back to Game
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            No players yet — play the game to create scores! 🎯
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{
                  background: 'rgba(255, 215, 0, 0.1)',
                  textAlign: 'left'
                }}>
                  <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', color: '#FFD700' }}>🏅 Rank</th>
                  <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', color: '#FFD700' }}>👤 Player</th>
                  <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', color: '#FFD700' }}>🎯 High Score</th>
                  <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 'bold', color: '#FFD700' }}>🎮 Games</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u.username} style={{
                    background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    borderBottom: idx === users.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <td style={{ padding: '14px 16px', fontSize: '16px', fontWeight: 'bold' }}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '16px' }}>{u.username}</td>
                    <td style={{ padding: '14px 16px', fontSize: '16px', fontWeight: 'bold', color: '#FFD700' }}>
                      {u.highScore || 0}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>
                      {Array.isArray(u.scores) ? u.scores.length : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
