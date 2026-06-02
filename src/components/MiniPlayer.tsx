import { Track } from '../types';
import { Play, Pause, Heart, Headphones } from 'lucide-react';

interface MiniPlayerProps {
  track: Track;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  onOpenFullscreen: () => void;
  playbackTime: number;
  onToggleLike: (trackId: string) => void;
  isLiked: boolean;
}

export default function MiniPlayer({
  track,
  isPlaying,
  onOpenFullscreen,
  onPlayPauseToggle,
  playbackTime,
  onToggleLike,
  isLiked
}: MiniPlayerProps) {
  const progressPercentage = (playbackTime / track.durationSeconds) * 100;

  return (
    <div 
      className="fixed bottom-[64px] inset-x-0 mx-auto px-4 z-40 max-w-lg transition-transform duration-300 active:scale-98 animate-in slide-in-from-bottom"
    >
      <div 
        onClick={onOpenFullscreen}
        className="bg-surface-container-high/90 rounded-xl p-2.5 flex items-center justify-between shadow-2xl backdrop-blur-md border border-white/5 relative cursor-pointer group"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-md">
            <img 
              alt={track.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              src={track.coverUrl} 
            />
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-xs text-white truncate leading-none mb-0.5">
              {track.title}
            </p>
            <p className="text-[10px] text-on-surface-variant truncate leading-none">
              {track.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button 
            type="button"
            className="p-1 px-1.5 text-on-surface-variant hover:text-white transition-colors cursor-pointer"
            aria-label="Devices"
          >
            <Headphones className="w-4 h-4 text-[#53e076]" />
          </button>
          
          <button 
            onClick={() => onToggleLike(track.id)}
            type="button" 
            className="p-1 px-1.5 transition-all active:scale-75 cursor-pointer"
            aria-label="Favorite"
          >
            <Heart 
              className={`w-4 h-4 transition-all ${
                isLiked ? 'text-primary fill-primary scale-110' : 'text-on-surface-variant hover:text-white'
              }`} 
            />
          </button>

          <button 
            onClick={onPlayPauseToggle}
            type="button"
            className="p-1.5 text-white hover:text-primary transition-colors shrink-0 cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white" />
            )}
          </button>
        </div>

        {/* Small Progress Line showing at the very bottom edge of card */}
        <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 overflow-hidden rounded-full">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
