// app/game-over/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './game-over.css';
import ScribbleReveal from '@/components/ScribbleReveal';
import { TippingButton } from '@/components/TippingButton';

// --- CHANGE 1: Store speaker data (image and name) ---
const allSpeakers = [
  { name: 'Rekha Raju', image: '/assets/speaker_1.jpg' },
  { name: 'Mohan Savarkar', image: '/assets/speaker_2.jpg' },
  { name: 'Vivek Agarwal', image: '/assets/speaker_3.jpg' },
  { name: 'Sudipto Das', image: '/assets//speaker_4.jpg' },
  { name: 'Sankho Kun', image: '/assets/speaker_5.jpg' },
  { name: 'Prof. B. Ravi', image: '/assets/speaker_6.jpg' },
  // Add the real names for each speaker here
];

export default function GameOverPage() {
  const router = useRouter();
  
  // --- CHANGE 2: Update state to hold the entire speaker object ---
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [isNameRevealed, setIsNameRevealed] = useState(false);
  useEffect(() => {
  // 🚨 Prevent direct access to game-over
  const isGameOver = localStorage.getItem('gameCompleted');
  if (!isGameOver) {
    router.replace('/'); // Redirect home if accessed directly
    return;
  }

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
}, [router]);

  useEffect(() => {
    // Use the image path as the unique identifier in localStorage
    let viewedImages = JSON.parse(localStorage.getItem('viewedImages')) || [];

    let availableSpeakers = allSpeakers.filter(speaker => !viewedImages.includes(speaker.image));
    
    if (availableSpeakers.length === 0) {
      // If all have been seen, reset the list
      availableSpeakers = allSpeakers;
      viewedImages = [];
    }

    const randomIndex = Math.floor(Math.random() * availableSpeakers.length);
    const selectedSpeaker = availableSpeakers[randomIndex];
    
    // Set the entire speaker object in state
    setCurrentSpeaker(selectedSpeaker);

    // Add the viewed image path to localStorage
    viewedImages.push(selectedSpeaker.image);
    localStorage.setItem('viewedImages', JSON.stringify(viewedImages));
  }, []);

  // --- CHANGE 3: Create the handler for the button's onTip event ---
    const handleReveal = () => {
    console.log(`Revealing name: ${currentSpeaker?.name}`);
    setIsNameRevealed(true);
    localStorage.removeItem('gameCompleted');
    };


  // Render a loading state or null while the speaker is being selected
  if (!currentSpeaker) {
    return <div>Loading... Experience</div>;
  }

  return (
    <div className="game-over-container">
      <div className="content-wrapper">
        <h1 className="title">
          Speaker Reveal
          <span className="subtitle">Guess the Personality?</span>
        </h1>

        {/* The ScribbleReveal component now gets the image URL from the state object */}
        <ScribbleReveal imageUrl={currentSpeaker.image} />

        <div className="button-group">
          <button className="action-btn" onClick={() => router.push('/')}>
            Retry
          </button>
          <button className="action-btn" onClick={() => router.push('/leaderboard')}>
            Leaderboard
          </button>
        </div>
      </div>

      {/* --- CHANGE 4: Conditional rendering for the reveal button/name --- */}
      <div className="reveal-section">
        {!isNameRevealed ? (
          <TippingButton onTip={handleReveal}>
            Reveal Name
          </TippingButton>
        ) : (
          <div className="speaker-name">
            {currentSpeaker.name}
          </div>
        )}
      </div>
    </div>
  );
}
