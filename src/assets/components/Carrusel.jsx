import React, { useState, useEffect, useCallback } from 'react';
import './Carrusel.css';

const Carrusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const images = [
        '/001.jpg',
        '/1.jpg',
        '/2.jpg',
        '/3.jpg',
        '/4.jpg',
        '/5.jpg',
    ];
    const videoUrl = '/video001.mp4';

    const nextSlide = useCallback(() => {
        if (currentIndex < images.length) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setIsTransitioning(false);
            }, 500);
        }
    }, [currentIndex, images.length]);

    useEffect(() => {
        if (currentIndex < images.length) {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, nextSlide, images.length]);

    const isVideoPlaying = currentIndex === images.length;

    return (
        <div className="relative w-full h-96 md:h-96 lg:h-112 shadow-lg overflow-hidden rounded-t-md">
            {/* Fondo detrás del texto */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FCE4EC] to-[#F9E0F9] z-0"></div>

            {/* Texto "Te Amo" al fondo */}
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-40">
                <h2 className="text-7xl font-extrabold text-center text-[#6A1B9A] drop-shadow-2xl animate-pulse">
                    Te Amo 💜
                </h2>
            </div>

            {/* Carrusel de imágenes o video */}
            <div className="absolute inset-0 z-20">
                {!isVideoPlaying ? (
                    <>
                        <div className={`carousel-image-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                            <img
                                src={images[currentIndex]}
                                alt={`Imagen ${currentIndex + 1}`}
                                className="w-full h-full object-cover rounded-t-md"
                            />
                        </div>

                        {/* Indicadores del carrusel */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                                        index === currentIndex
                                            ? 'bg-[#CABBE9] border-[#4A154B]'
                                            : 'bg-transparent border-[#4A154B]'
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </>
                ) : (
                    <video className="w-full h-full object-cover rounded-t-md" autoPlay loop muted controls={false}>
                        <source src={videoUrl} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                )}
            </div>
        </div>
    );
};

export default React.memo(Carrusel);
