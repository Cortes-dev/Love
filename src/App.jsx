import { useRef, useEffect, useState } from 'react';
import './App.css';
import Carrusel from './assets/components/Carrusel';
import TextLove from './assets/components/TextLove';
import musica from '../public/musica.mp3';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play()
        .then(() => {
          audio.muted = false;
        })
        .catch(error => console.log("Autoplay bloqueado:", error));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <main className="min-h-screen bg-[#4A154B] flex flex-col">
        <div className="sticky top-0 z-10">
          <Carrusel />
        </div>

        <div className="flex-1 bg-gradient-to-b from-[#FCE4EC] to-[#f3cff3] p-6 rounded-b-3xl shadow-2xl text-center relative">
          <span className="text-lg font-medium text-[#6A1B9A] bg-white px-4 py-1 rounded-full shadow-md absolute top-4 left-1/2 transform -translate-x-1/2">
            21/02/2025
          </span>

          <h1 className="text-6xl font-extrabold text-[#6A1B9A] text-center py-8 animate-pulse drop-shadow-lg">
            Nuestro Romance 💜
          </h1>

          <TextLove />
        </div>

        <div className="fixed bottom-5 right-5 text-4xl">
          <span className="text-[#CABBE9]">💜</span>
          <span className="text-[#F9E0F9]">💖</span>
        </div>
      </main>

      {/* Botón de inicio de música */}
      <button 
        className="fixed bottom-5 left-5 bg-[#6A1B9A] text-white px-4 py-2 rounded-full shadow-lg" 
        onClick={togglePlay}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      <audio loop controls={false} ref={audioRef}>
        <source src={musica} type="audio/mp3" />
      </audio>
    </>
  );
}

export default App;
