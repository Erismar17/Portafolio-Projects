import './skeleton.css';
import React, { useState, useRef, useEffect } from 'react';
import audio from '../../assets/sounds/audio.mp3';
import buttonDance from '../../assets/sounds/buttonDance.mp3';

const Skeleton = () => {
  const [skeleton, setSkeleton] = useState('off'); // Controla si el muñeco está bailando
  const audioRef = useRef(new Audio(audio)); // Mantén una referencia a la instancia de audio

  useEffect(() => {
    // Escuchar el evento 'ended' cuando el audio finaliza
    const handleAudioEnded = () => {
      setSkeleton('off'); // Detén la animación cuando termine la canción
    };

    const currentAudio = audioRef.current;
    currentAudio.addEventListener('ended', handleAudioEnded); // Asigna el evento

    // Cleanup del evento al desmontar el componente
    return () => {
      currentAudio.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const handleClick = () => {
    const buttonSound = new Audio(buttonDance);
    
    if (skeleton === 'off') {
      setSkeleton('on');
      buttonSound.play();
      audioRef.current.play();
    } else {
      setSkeleton('off');
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <div className={`skeletonOff ${skeleton}`} id='static'></div>
      <button onClick={handleClick} className='dance'>Dance</button>
    </div>
  );
};

export default Skeleton;
