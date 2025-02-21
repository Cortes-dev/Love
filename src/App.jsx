import { useState, useRef, useEffect } from 'react';
import './App.css';
import Carrusel from './assets/components/Carrusel';
import TextLove from './assets/components/TextLove';

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => console.log("Autoplay bloqueado:", error));
      }
      
    };

    // Espera la interacción del usuario antes de reproducir
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[#4A154B] flex flex-col">
        {/* Carrusel fijo en la parte superior */}
        <div className="sticky top-0 z-10">
          <Carrusel />
        </div>

        {/* Texto debajo del carrusel */}
        <div className="flex-1 bg-gradient-to-b from-[#FCE4EC] to-[#f3cff3] p-6 rounded-b-3xl shadow-2xl text-center relative">
          {/* Fecha con diseño elegante */}
          <span className="text-lg font-medium text-[#6A1B9A] bg-white px-4 py-1 rounded-full shadow-md absolute top-4 left-1/2 transform -translate-x-1/2">
            21/02/2025
          </span>

          {/* Título con efecto romántico */}
          <h1 className="text-6xl font-extrabold text-[#6A1B9A] text-center py-8 animate-pulse drop-shadow-lg">
            Nuestro Romance 💜
          </h1>

          {/* Componente de texto */}
          <TextLove />
        </div>

        {/* Detalles decorativos (corazones) */}
        <div className="fixed bottom-5 right-5 text-4xl">
          <span className="text-[#CABBE9]">💜</span>
          <span className="text-[#F9E0F9]">💖</span>
        </div>
      </main>

      {/* Reproductor de audio oculto */}
      <audio ref={audioRef} loop>
        <source src="/musica.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}

export default App;
