// app/game-over/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './game-over.css';
import ScribbleReveal from '@/components/ScribbleReveal';
import { TippingButton } from '@/components/TippingButton';

const allSpeakers = [
  { name: 'Rekha Raju', image: '/assets/speaker_1.jpg' },
  { name: 'Mohan Savarkar', image: '/assets/speaker_2.jpg' },
  { name: 'Vivek Agarwal', image: '/assets/speaker_3.jpg' },
  { name: 'Sudipto Das', image: '/assets/speaker_4.jpg' },
  { name: 'Sankho Kun', image: '/assets/speaker_5.jpg' },
  { name: 'Prof. B. Ravi', image: '/assets/speaker_6.jpg' },
];

export default function GameOverPage() {
  const router = useRouter();
  
  const [isHighScorer, setIsHighScorer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State for the original (single speaker) layout
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [isNameRevealed, setIsNameRevealed] = useState(false);

  useEffect(() => {
    const isGameOver = localStorage.getItem('gameCompleted');
    const finalScore = parseInt(localStorage.getItem('finalScore') || '0', 10);

    if (!isGameOver) {
      router.replace('/');
      return;
    }

    localStorage.removeItem('gameCompleted');
    localStorage.removeItem('finalScore');

    if (finalScore > 1000) {
      setIsHighScorer(true);
    } else {
      setIsHighScorer(false);
      let viewedImages = JSON.parse(localStorage.getItem('viewedImages')) || [];
      let availableSpeakers = allSpeakers.filter(speaker => !viewedImages.includes(speaker.image));

      if (availableSpeakers.length === 0) {
        availableSpeakers = allSpeakers;
        viewedImages = [];
      }

      const randomIndex = Math.floor(Math.random() * availableSpeakers.length);
      const selectedSpeaker = availableSpeakers[randomIndex];
      
      setCurrentSpeaker(selectedSpeaker);

      viewedImages.push(selectedSpeaker.image);
      localStorage.setItem('viewedImages', JSON.stringify(viewedImages));
    }

    setIsLoading(false);
  }, [router]);

  const handleSingleReveal = () => setIsNameRevealed(true);

  if (isLoading) {
    return <div>Loading Experience...</div>;
  }

  // --- HIGH SCORE PAGE RENDER ---
  if (isHighScorer) {
    return (
      <div className="game-over-container">
        <div className="content-wrapper">
          <h1 className="title">
            High Score!
            <span className="subtitle">You've unlocked all speakers.</span>
          </h1>

          {/* The grid now contains cards with both image and text */}
          <div className="speakers-grid">
            {allSpeakers.map((speaker) => (
              <div key={speaker.name} className="speaker-card">
                <div className="speaker-image-container">
                  <ScribbleReveal imageUrl={speaker.image} />
                </div>
                <div className="speaker-info">
                  <p className="speaker-name-grid">{speaker.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="button-group">
            <button className="action-btn" onClick={() => router.push('/')}>Retry</button>
            <button className="action-btn" onClick={() => router.push('/leaderboard')}>Leaderboard</button>
          </div>
        </div>
      </div>
    );
  }

  // --- ORIGINAL SINGLE SPEAKER PAGE RENDER ---
  return (
    <div className="game-over-container">
      <div className="content-wrapper">
        <h1 className="title">
          Speaker Reveal
          <span className="subtitle">Guess the Personality?</span>
        </h1>

        {currentSpeaker && <ScribbleReveal imageUrl={currentSpeaker.image} />}

        <div className="button-group">
          <button className="action-btn" onClick={() => router.push('/')}>Retry</button>
          <button className="action-btn" onClick={() => router.push('/leaderboard')}>Leaderboard</button>
        </div>
      </div>

      <div className="reveal-section">
        {!isNameRevealed ? (
          <TippingButton onTip={handleSingleReveal}>Reveal Name</TippingButton>
        ) : (
          <div className="speaker-name">{currentSpeaker?.name}</div>
        )}
      </div>
    </div>
  );
}
