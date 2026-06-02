import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Track } from '../types';
import { 
  ChevronDown, 
  MoreVertical, 
  Heart, 
  Shuffle, 
  SkipBack, 
  Play, 
  Pause, 
  SkipForward, 
  Repeat, 
  Laptop, 
  Share2, 
  ListMusic, 
  CheckCircle2,
  Headphones
} from 'lucide-react';

interface NowPlayingViewProps {
  track: Track;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onClose: () => void;
  playbackTime: number;
  setPlaybackTime: Dispatch<SetStateAction<number>>;
  onToggleLike: (trackId: string) => void;
  isLiked: boolean;
}

export default function NowPlayingView({
  track,
  isPlaying,
  onPlayPauseToggle,
  onNextTrack,
  onPrevTrack,
  onClose,
  playbackTime,
  setPlaybackTime,
  onToggleLike,
  isLiked
}: NowPlayingViewProps) {
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const [deviceAirpods, setDeviceAirpods] = useState(true);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Sound Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Auto increment timeline simulation has been consolidated to App.tsx master ticker to prevent dual-timer drift
  useEffect(() => {
    // Left empty since App.tsx master ticker handles continuous time progression
  }, []);

  // Web Audio Synth oscillator code to produce a lovely atmospheric chord pulsing when playing
  useEffect(() => {
    if (isPlaying) {
      // Trigger soft synth note loop
      try {
        const AudioContextCtor =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextCtor) return;
        const audioCtx = audioCtxRef.current || new AudioContextCtor();
        audioCtxRef.current = audioCtx;

        if (audioCtx.state === 'suspended') {
          // Resume on gesture
          const resume = () => {
            audioCtx.resume();
            document.removeEventListener('click', resume);
            document.removeEventListener('touchend', resume);
          };
          document.addEventListener('click', resume);
          document.addEventListener('touchend', resume);
        }

        // Subtly synthesize relaxing lo-fi hums matching the current track mood
        const frequencies = track.id === 'starboy' ? [220, 261, 329, 392] : [110, 165, 220, 147];
        let noteIndex = 0;

        synthIntervalRef.current = window.setInterval(() => {
          if (audioCtx.state === 'suspended') return;
          
          try {
            // Create synth nodes for short decay pulse
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            osc.type = track.id === 'dj-fyp-tiktok' ? 'triangle' : 'sine';
            osc.frequency.value = frequencies[noteIndex % frequencies.length];
            noteIndex++;

            // Low-pass filter to keep it extremely dark, ambient, and high-fidelity
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.1); // low safe volume
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 2.0);
          } catch (e) {
            // console.warn("Synth pulse failed", e);
          }
        }, 3000);
      } catch (e) {
        // Safe fail
      }
    } else {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
    }

    return () => {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    };
  }, [isPlaying, track.id]);

  // Turn off synth context when unmounting
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Format Helper: 102 seconds -> "1:42"
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = (playbackTime / track.durationSeconds) * 100;

  // Handle timeline scrubbing on click
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const computedPercentage = Math.max(0, Math.min(100, clickX / rect.width));
    const newSeconds = Math.round((computedPercentage / 100) * track.durationSeconds);
    setPlaybackTime(newSeconds);
  };

  // Trigger simulated sharing
  const triggerShare = () => {
    setShowShareNotification(true);
    setTimeout(() => {
      setShowShareNotification(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-background/98 z-50 overflow-hidden flex flex-col justify-between p-6 select-none animate-in slide-in-from-bottom duration-300">
      
      {/* Blurred atmospheric gradient mapped smoothly on top third of screen */}
      <div 
        className="absolute inset-x-0 top-0 h-[60%] blur-[90px] opacity-25 rounded-b-full pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${track.color || '#490cf5'} 0%, transparent 80%)`,
        }}
      />

      {/* Header element */}
      <header className="relative z-10 flex justify-between items-center h-16 mt-2">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-color active:scale-90 cursor-pointer"
          aria-label="Minimize"
        >
          <ChevronDown className="w-7 h-7 text-white" />
        </button>
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Playing from playlist
          </span>
          <span className="text-sm font-extrabold text-white">
            Today's Top Hits
          </span>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-color cursor-pointer">
          <MoreVertical className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* Main Artwork section */}
      <main className="relative z-10 flex-grow flex flex-col justify-center gap-6 max-w-sm mx-auto w-full">
        <div className="w-full aspect-square relative group">
          <div 
            className="absolute -inset-4 rounded-2xl opacity-40 blur-2xl transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${track.color || '#490cf5'} 0%, transparent 95%)`,
            }}
          />
          <img 
            alt="Now playing cover art" 
            className={`w-full h-full object-cover rounded-xl shadow-2xl relative z-10 border border-white/10 transform transition-all duration-700 ${isPlaying ? 'scale-100 shadow-primary/10' : 'scale-95 text-gray-500'}`} 
            src={track.coverUrl}
          />
        </div>

        {/* Info & Favorite Heart Toggle */}
        <div className="flex justify-between items-center w-full mt-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h1 className="text-2xl font-black text-white tracking-tight leading-none truncate">
              {track.title}
            </h1>
            <p className="text-sm font-medium text-on-surface-variant truncate">
              {track.artist}
            </p>
          </div>
          <button 
            onClick={() => onToggleLike(track.id)}
            className="p-2 transition-all active:scale-75 group cursor-pointer shrink-0"
            aria-label="Toggle favorite"
          >
            <Heart 
              className={`w-8 h-8 transition-all group-hover:scale-105 duration-200 ${
                isLiked 
                  ? 'text-primary fill-primary scale-110 drop-shadow-[0_0_8px_rgba(83,224,118,0.4)]' 
                  : 'text-on-surface-variant hover:text-white'
              }`} 
            />
          </button>
        </div>

        {/* Timeline controls */}
        <div className="flex flex-col gap-1.5 w-full">
          <div 
            onClick={handleScrubberClick}
            className="progress-container relative w-full h-1 bg-surface-variant rounded-full cursor-pointer group py-1"
          >
            <div className="absolute top-1 left-0 h-1 bg-surface-container rounded-full w-full"></div>
            <div 
              className="absolute top-1 left-0 h-1 bg-primary rounded-full"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Sliding handle knob */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg border border-primary scale-0 group-hover:scale-100 group-active:scale-110 transition-transform duration-150"></div>
            </div>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-on-surface-variant font-bold leading-none">
            <span>{formatTime(playbackTime)}</span>
            <span>{formatTime(track.durationSeconds)}</span>
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="flex justify-between items-center px-1">
          <button 
            onClick={() => setShuffleActive(!shuffleActive)}
            className={`p-2 transition-colors cursor-pointer ${shuffleActive ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}
            aria-label="Toggle shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-6">
            <button 
              onClick={onPrevTrack}
              className="p-2 text-white hover:text-primary transition-colors active:scale-90 cursor-pointer"
              aria-label="Previous track"
            >
              <SkipBack className="w-7 h-7 fill-white hover:fill-primary" />
            </button>

            <button 
              onClick={onPlayPauseToggle}
              className="w-16 h-16 bg-white text-black hover:scale-105 active:scale-95 transition-transform rounded-full flex items-center justify-center shadow-lg cursor-pointer shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-black fill-black" />
              ) : (
                <Play className="w-7 h-7 text-black fill-black ml-1" />
              )}
            </button>

            <button 
              onClick={onNextTrack}
              className="p-2 text-white hover:text-primary transition-colors active:scale-90 cursor-pointer"
              aria-label="Next track"
            >
              <SkipForward className="w-7 h-7 fill-white hover:fill-primary" />
            </button>
          </div>

          <button 
            onClick={() => setRepeatActive(!repeatActive)}
            className={`p-2 transition-colors cursor-pointer ${repeatActive ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}
            aria-label="Toggle repeat"
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

      </main>

      {/* Footer controls */}
      <footer className="relative z-10 flex justify-between items-center h-16 mb-4 max-w-sm mx-auto w-full">
        <button 
          onClick={() => setDeviceAirpods(!deviceAirpods)}
          className={`flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/5 rounded-full transition-colors font-bold text-[10px] uppercase tracking-wider cursor-pointer ${deviceAirpods ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          {deviceAirpods ? (
            <>
              <Headphones className="w-4 h-4 shrink-0 animate-pulse text-[#53e076]" />
              <span>Airpods Pro</span>
            </>
          ) : (
            <>
              <Laptop className="w-4 h-4 shrink-0 text-white" />
              <span>Internal Speaker</span>
            </>
          )}
        </button>

        <div className="flex gap-1">
          <button 
            onClick={triggerShare}
            className="p-2 text-on-surface-variant hover:text-white transition-colors active:scale-90 cursor-pointer"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-on-surface-variant hover:text-white transition-colors cursor-pointer">
            <ListMusic className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Share Toast Notifier overlay */}
      {showShareNotification && (
        <div className="absolute inset-x-0 bottom-16 flex justify-center z-50 animate-in fade-in slide-in-from-bottom duration-200">
          <div className="bg-primary text-black font-extrabold text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-1.5 border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>Sonic Link Copied! Share vibe with your mates.</span>
          </div>
        </div>
      )}
    </div>
  );
}
