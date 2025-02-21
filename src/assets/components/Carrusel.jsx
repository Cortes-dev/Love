import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Carrusel.css';

const images = ['/001.jpg', '/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg', '/new1.jpg', '/new2.jpg', '/new3.jpg'];
const videoUrl = '/vid001.mp4';

const Carrusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const intervalRef = useRef(null);

    const isVideoPlaying = currentIndex === images.length;

    const changeSlide = useCallback((direction) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex + direction;
                return Math.max(0, Math.min(newIndex, images.length));
            });
            setIsTransitioning(false);
        }, 0);
    }, []);

    useEffect(() => {
        if (isVideoPlaying) return;

        intervalRef.current = setInterval(() => changeSlide(1), 3000);
        return () => clearInterval(intervalRef.current);
    }, [changeSlide, isVideoPlaying]);


    useEffect(() => {
        if (currentIndex === images.length) {
            setCurrentIndex(0);
        }
    }, [currentIndex]);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        console.log('touch end');
    };

    // Cancelacion de riel automatico
    useEffect(() => {
        return () => {
            handleTouchEnd();
        };
    }, []);



    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const diffX = startX - e.touches[0].clientX;
        if (Math.abs(diffX) > 0) {
            changeSlide(diffX > 0 ? 1 : -1);
            setIsDragging(false);
        }
    };

    return (
        <div
            className="relative w-full h-96 md:h-96 lg:h-112 shadow-lg overflow-hidden rounded-t-md"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#FCE4EC] to-[#F9E0F9] z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-40">
                <h2 className="text-7xl font-extrabold text-[#6A1B9A] drop-shadow-2xl animate-pulse text-center">Te Amo 💜</h2>
            </div>

            <div className="absolute inset-0 z-20">
                {isVideoPlaying ? (
                    <video className="w-full h-full object-cover rounded-t-md" autoPlay loop muted>
                        <source src={videoUrl} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                ) : (
                    <>
                        <div className={`carousel-image-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                            <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} className="w-full h-full object-cover rounded-t-md" />
                        </div>
                        <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#CABBE9] text-[#4A154B] p-2 rounded-full shadow-lg hover:bg-[#4A154B] hover:text-[#CABBE9] transition-all duration-300" onClick={() => changeSlide(-1)}>
                            &#10094;
                        </button>
                        <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#CABBE9] text-[#4A154B] p-2 rounded-full shadow-lg hover:bg-[#4A154B] hover:text-[#CABBE9] transition-all duration-300" onClick={() => changeSlide(1)}>
                            &#10095;
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <div key={index} className={`w-3 h-3 rounded-full border transition-all duration-300 ${index === currentIndex ? 'bg-[#CABBE9] border-[#4A154B]' : 'bg-transparent border-[#4A154B]'}`}></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(Carrusel);
