import React, { useEffect, useRef } from 'react';

interface MediaPlayerProps {
  mediaSrc: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRemove: () => void;
  onEnd: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ mediaSrc, isPlaying, onTogglePlay, onRemove, onEnd }) => {
  const mediaRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play().catch((error) => console.error('Error playing video:', error));
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <video
        ref={mediaRef}
        controls
        className="w-full max-w-xl h-auto rounded-lg shadow-lg"
        onEnded={onEnd}
      >
        <source src={mediaSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-between mt-2 w-full max-w-xl">
        <button
          className="bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-2 px-4 rounded"
          onClick={onTogglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2 px-4 rounded"
          onClick={onRemove}
        >
          Remove Media
        </button>
      </div>
    </div>
  );
};

export default MediaPlayer;
