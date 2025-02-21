import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Carrusel.css';

const images = [
    '/001.jpg',
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/new1.jpg',
    '/new2.jpg',
    '/new3.jpg',
    '/vid001.mp4' // El video debe estar al final del array
];

const Carrusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState('');
    const intervalRef = useRef(null);
    const videoRef = useRef(null);

    const isVideoPlaying = images[currentIndex].endsWith('.mp4');

    // Función para cambiar de slide
    const changeSlide = useCallback((direction) => {
        setDirection(direction > 0 ? 'right' : 'left');
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + direction;
            if (newIndex >= images.length) newIndex = 0; // Vuelve al inicio si llega al final
            if (newIndex < 0) newIndex = images.length - 1; // Vuelve al final si llega al inicio
            return newIndex;
        });
        setTimeout(() => setIsTransitioning(false), 300); // Duración de la transición
    }, []);

    // Función para iniciar el intervalo automático
    const startInterval = useCallback(() => {
        if (isVideoPlaying) return; // No inicia el intervalo si es un video
        intervalRef.current = setInterval(() => changeSlide(1), 5000); // Cambia cada 5 segundos
    }, [changeSlide, isVideoPlaying]);

    // Función para pausar el intervalo
    const pauseInterval = useCallback(() => {
        clearInterval(intervalRef.current);
    }, []);

    // Efecto para manejar el intervalo automático
    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current); // Limpia el intervalo al desmontar
    }, [startInterval]);

    // Efecto para manejar el video
    useEffect(() => {
        if (isVideoPlaying && videoRef.current) {
            videoRef.current.play(); // Reproduce el video automáticamente
            videoRef.current.onended = () => {
                changeSlide(1); // Cambia al siguiente slide cuando el video termina
            };
        }
    }, [isVideoPlaying, changeSlide]);

    // Manejo de eventos táctiles para deslizar
    const handleTouchStart = (e) => {
        const startX = e.touches[0].clientX;
        const handleTouchMove = (e) => {
            const diffX = startX - e.touches[0].clientX;
            if (Math.abs(diffX) > 50) { // Sensibilidad al deslizar
                changeSlide(diffX > 0 ? 1 : -1);
                document.removeEventListener('touchmove', handleTouchMove);
            }
        };
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', handleTouchMove);
        }, { once: true });
        pauseInterval();
    };

    return (
        <div
            className="relative w-full h-96 md:h-96 lg:h-112 shadow-lg overflow-hidden rounded-t-md"
            onTouchStart={handleTouchStart}
            role="region"
            aria-label="Carrusel de imágenes"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#FCE4EC] to-[#F9E0F9] z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-40">
                <h2 className="text-7xl font-extrabold text-[#6A1B9A] drop-shadow-2xl animate-pulse text-center">Te Amo 💜</h2>
            </div>

            <div className="absolute inset-0 z-20">
                {isVideoPlaying ? (
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover rounded-t-md"
                        autoPlay
                        muted
                        aria-label="Video en reproducción"
                    >
                        <source src={images[currentIndex]} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                ) : (
                    <>
                        <div className={`carousel-image-container ${isTransitioning ? `slide-out-${direction}` : 'slide-in'}`}>
                            <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} className="w-full h-full object-cover rounded-t-md" />
                        </div>
                        <button
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#CABBE9] text-[#4A154B] p-2 rounded-full shadow-lg hover:bg-[#4A154B] hover:text-[#CABBE9] transition-all duration-300"
                            onClick={() => { changeSlide(-1); pauseInterval(); }}
                            aria-label="Anterior"
                        >
                            &#10094;
                        </button>
                        <button
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#CABBE9] text-[#4A154B] p-2 rounded-full shadow-lg hover:bg-[#4A154B] hover:text-[#CABBE9] transition-all duration-300"
                            onClick={() => { changeSlide(1); pauseInterval(); }}
                            aria-label="Siguiente"
                        >
                            &#10095;
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full border transition-all duration-300 ${index === currentIndex ? 'bg-[#CABBE9] border-[#4A154B]' : 'bg-transparent border-[#4A154B]'}`}
                                    aria-label={`Indicador de diapositiva ${index + 1}`}
                                ></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(Carrusel);