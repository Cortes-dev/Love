import React, { useState, useEffect } from 'react';

const Carrusel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        '../../../public/001.jpg',
        '../../../public/1.jpg',
        '../../../public/2.jpg',
        '../../../public/3.jpg',
        '../../../public/4.jpg',
        '../../../public/5.jpg',

    ];
    const videoUrl = '../../../public/video001.mp4';

    useEffect(() => {
        if (currentIndex < images.length) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + 1));
            }, 2000); // Cambia de imagen cada 3 segundos

            return () => clearInterval(interval);
        }
    }, [currentIndex, images.length]);

    return (
        <div className="relative w-[375px] h-64 md:h-96 lg:h-112 shadow-md shadow-black-500">
            {currentIndex < images.length ? (
                <>
                    <img
                        src={images[currentIndex]}
                        alt={`Imagen ${currentIndex + 1}`}
                        className="w-full h-full object-contain rounded-md"
                    />
                    {/* Indicadores circulares */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full border ${index === currentIndex ? 'transparent border-white' : 'transparent border-gray-700'
                                    }`}
                            ></div>
                        ))}
                    </div>
                </>
            ) : (
                <video
                    className="w-full h-full object-cover rounded-md"
                    autoPlay
                    loop
                    muted
                    controls={false}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                </video>
            )}
        </div>
    );
};

export default Carrusel;