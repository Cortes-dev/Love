import { useRef, useEffect, useState } from 'react';
import './App.css';
import Carrusel from './assets/components/Carrusel';
import TextLove from './assets/components/TextLove';
import musica from '../public/musica.mp3';

function App() {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = () => {
      audio.play()
        .then(() => {
          audio.muted = false; // Asegurar que el audio se desmutea
        })
        .catch(error => console.log("Autoplay bloqueado:", error));
    };

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);

    // Intenta reproducir con un pequeño retraso para evitar bloqueos
    setTimeout(playAudio, 1000);

    // En caso de bloqueo, agregar evento de interacción para activarlo
    document.addEventListener('click', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

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

      {/* Barra de progreso del audio */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gray-300">
        <div
          className="h-full bg-[#6A1B9A] transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <audio autoPlay loop controls={false} ref={audioRef}>
        <source src={musica} type="audio/mp3" />
      </audio>
    </>
  );
}

export default App;
