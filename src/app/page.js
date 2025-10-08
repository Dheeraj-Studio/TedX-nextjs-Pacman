'use client';

import { useEffect } from 'react';
import './pacman.css';

export default function PacmanGamePage() {
  useEffect(() => {
    // Load scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initGame = async () => {
      try {
        await loadScript('/js/three.js');
        await loadScript('/js/helvetiker_regular.typeface.js');
        await loadScript('/js/game.js');
        
        // Start the game
        if (window.startGame) {
          window.startGame();
        }
      } catch (error) {
        console.error('Failed to load game scripts:', error);
      }
    };

    initGame();
  }, []);

  return (
    <>
      {/* Main game and UI structure */}
      <div id="game-container">
        <div id="lives"></div>
        <div id="score">Score: 0</div>
        <button id="help-button">HELP</button>
      </div>
      <div id="controls-container">
        <div id="wasd-controls">
          <button className="control-btn" id="btn-w">W</button>
          <button className="control-btn" id="btn-a">A</button>
          <button className="control-btn" id="btn-s">S</button>
          <button className="control-btn" id="btn-d">D</button>
        </div>
      </div>
      <div id="help-dialog" className="dialog" style={{ display: 'none' }}>
        <h2>CONTROLS</h2>
        <p><strong>Desktop:</strong> Use WASD keys...</p>
        <p><strong>Mobile:</strong> Tap the W/A/S/D buttons...</p>
        <button id="close-help-button">Close</button>
      </div>
    </>
  );
}
