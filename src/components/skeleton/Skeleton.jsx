import './skeleton.css';
import React, { useState } from 'react';
import audio from '../../assets/sounds/audio.mp3';
import buttonDance from '../../assets/sounds/buttonDance.mp3';

const Skeleton = () => {
  const [skeleton, setSkeleton] = useState('off');
  const [setAudioPlaying] = useState(null);

  const handleClick = () => {
    const buttonSound = new Audio(buttonDance);
    const audioTrack = new Audio(audio);

    if (skeleton === 'off') {
      setSkeleton('on');
      buttonSound.play();
      audioTrack.play();
      setAudioPlaying(audioTrack);
    } else {
      setSkeleton('off');
      audioTrack.pause();
      setAudioPlaying(null);
    }
  };

  return (
    <div className='dance'>
      <div
        className={`skeletonOff ${skeleton}`}
        id='static'
        onClick={handleClick}>
        Dance
      </div>
    </div>
  );
};
export default Skeleton;