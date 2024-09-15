import './skeleton.css';
import React, { useState, useRef, useEffect } from 'react';
import audio from '../../assets/sounds/audio.mp3';
import buttonDance from '../../assets/sounds/buttonDance.mp3';

const Skeleton = () => {
  const [skeleton, setSkeleton] = useState('off');
  const audioRef = useRef(new Audio(audio));

  useEffect(() => {
      const handleAudioEnded = () => {
      setSkeleton('off');
    };

    const currentAudio = audioRef.current;
    currentAudio.addEventListener('ended', handleAudioEnded);

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
    <div className='container-skeleton'>
      <div className={`skeletonOff ${skeleton}`} id='static'></div>
      <button onClick={handleClick} className='dance'>Dance</button>
    </div>
  );
};

export default Skeleton;