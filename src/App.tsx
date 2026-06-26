/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { AppTab, Track, LibraryItem, RegisteredUser } from './types';
import { getTrack, libraryItems, allTracks } from './data';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import LibraryView from './components/LibraryView';
import MiniPlayer from './components/MiniPlayer';
import NowPlayingView from './components/NowPlayingView';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import WhatsNewView from './components/WhatsNewView';
import NowPlayingSidebar from './components/NowPlayingSidebar';
import { 
  Home, 
  Search, 
  Library, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Heart, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Plus, 
  PanelRight
} from 'lucide-react';

const readRegisteredUser = (): RegisteredUser | null => {
  try {
    const user = localStorage.getItem('registeredUser');
    if (!user) return null;
    const parsed = JSON.parse(user) as Partial<RegisteredUser>;
    if (!parsed.name || !parsed.email || !parsed.favoriteGenre) return null;
    return {
      name: String(parsed.name),
      email: String(parsed.email),
      favoriteGenre: parsed.favoriteGenre,
    } as RegisteredUser;
  } catch {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('registeredUser');
    return null;
  }
};

const getYouTubePlayerUrl = (embedUrl: string) =>
  `${embedUrl}?playsinline=1&rel=0&enablejsapi=1`;

export default function App() {
  const youtubePlayerRef = useRef<HTMLIFrameElement | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  
  // User registration & login state
  const [isRegistered, setIsRegistered] = useState<boolean>(() => localStorage.getItem('isRegistered') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('isLoggedIn') === 'true');
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | null>(() => readRegisteredUser());
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Track playback state
  const [currentTrack, setCurrentTrack] = useState<Track>(() => getTrack('starboy'));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(102); // start halfway on 1:42 specifically like Starboy screenshot
  const [isNowPlayingFullscreen, setIsNowPlayingFullscreen] = useState<boolean>(false);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(true);

  // Volume simulation features
  const [volumeValue, setVolumeValue] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Liked tracks persistence in active state
  const [likedSongIds, setLikedSongIds] = useState<string[]>(['starboy']);

  // Library items dynamic listings
  const [libraryList, setLibraryList] = useState<LibraryItem[]>(() => libraryItems);

  // Shuffle and repeat state
  const [shuffleActive, setShuffleActive] = useState<boolean>(false);
  const [repeatActive, setRepeatActive] = useState<boolean>(false);

  // Sidebar add playlist mini modal
  const [showSidebarAdd, setShowSidebarAdd] = useState<boolean>(false);
  const [sidebarPlaylistName, setSidebarPlaylistName] = useState<string>('');

  const sendYouTubeCommand = (func: string, args: unknown[] = []) => {
    youtubePlayerRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args,
      }),
      '*'
    );
  };

  // Tab activation gating wrapper
  const handleSelectTab = (tab: AppTab) => {
    if (tab === 'search' && !isLoggedIn) {
      if (isRegistered) {
        setShowLoginModal(true);
      } else {
        setShowRegisterModal(true);
      }
      return;
    }
    setActiveTab(tab);
  };

  // Play audio track helper
  const handlePlayTrack = (track: Track) => {
    if (!isLoggedIn) {
      if (isRegistered) {
        setShowLoginModal(true);
      } else {
        setShowRegisterModal(true);
      }
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    setPlaybackTime(0); // reset clock for new tracked asset
  };

  // Toggle play/pause simulation
  const handlePlayPauseToggle = () => {
    if (!isLoggedIn) {
      if (isRegistered) {
        setShowLoginModal(true);
      } else {
        setShowRegisterModal(true);
      }
      return;
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Logout Action
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  // Handle Login Success — redirect to dashboard
  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setRegisteredUser(readRegisteredUser());
    setActiveTab('home');
  };

  // Handle Register Success — show login modal for them to login
  const handleRegisterSuccess = () => {
    setIsRegistered(true);
    setShowRegisterModal(false);
    // Immediately prompt the user to login with their new credentials
    setShowLoginModal(true);
  };

  // Handle switching to next song in list
  const handleNextTrack = () => {
    if (shuffleActive) {
      let randomIndex = Math.floor(Math.random() * allTracks.length);
      if (allTracks.length > 1 && allTracks[randomIndex].id === currentTrack.id) {
        randomIndex = (randomIndex + 1) % allTracks.length;
      }
      setCurrentTrack(allTracks[randomIndex]);
    } else {
      const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % allTracks.length : 0;
      setCurrentTrack(allTracks[nextIndex]);
    }
    setPlaybackTime(0);
  };

  // Handle switching to previous song in list
  const handlePrevTrack = () => {
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    let prevIndex = currentIndex >= 0 ? currentIndex - 1 : allTracks.length - 1;
    if (prevIndex < 0) {
      prevIndex = allTracks.length - 1;
    }
    setCurrentTrack(allTracks[prevIndex]);
    setPlaybackTime(0);
  };

  // Like / Unlike song
  const handleToggleLike = (trackId: string) => {
    setLikedSongIds((ids) =>
      ids.includes(trackId) ? ids.filter((id) => id !== trackId) : [...ids, trackId]
    );
  };

  // Append new item to user library
  const handleAddLibraryItem = (newItem: LibraryItem) => {
    setLibraryList((items) => [newItem, ...items]);
  };

  // Create custom library item from desktop sidebar
  const handleCreateSidebarPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarPlaylistName.trim()) return;

    const newItem: LibraryItem = {
      id: 'custom-sidebar-' + Date.now(),
      name: sidebarPlaylistName,
      type: 'playlist',
      coverUrl: 'gradient',
      subtitle: 'Custom Playlist',
      tracks: [currentTrack]
    };

    handleAddLibraryItem(newItem);
    setSidebarPlaylistName('');
    setShowSidebarAdd(false);
  };

  // Master timeline continuous loop simulation inside App.tsx
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isPlaying && currentTrack) {
      timer = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= currentTrack.durationSeconds) {
            if (repeatActive) {
              sendYouTubeCommand('seekTo', [0, true]);
              sendYouTubeCommand('playVideo');
              return 0; // custom restart same song
            } else {
              handleNextTrack();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentTrack, repeatActive, shuffleActive]);

  // Keyboard controls for standard user navigation (space to pause/play, escape to maximize-minimize)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPauseToggle();
      } else if (e.code === 'Escape') {
        setIsNowPlayingFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isRegistered]);

  useEffect(() => {
    if (!currentTrack.youtubeEmbedUrl) return;

    sendYouTubeCommand(isPlaying ? 'playVideo' : 'pauseVideo');
  }, [currentTrack.id, currentTrack.youtubeEmbedUrl, isPlaying]);

  useEffect(() => {
    if (!currentTrack.youtubeEmbedUrl) return;

    sendYouTubeCommand('setVolume', [isMuted ? 0 : volumeValue]);
    sendYouTubeCommand(isMuted ? 'mute' : 'unMute');
  }, [currentTrack.youtubeEmbedUrl, isMuted, volumeValue]);

  // Format Helper: 102 seconds -> "1:42"
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Scrubber click action helper
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const computedPercentage = Math.max(0, Math.min(100, clickX / rect.width));
    const newSeconds = Math.round((computedPercentage / 100) * currentTrack.durationSeconds);
    setPlaybackTime(newSeconds);
    sendYouTubeCommand('seekTo', [newSeconds, true]);
    if (isPlaying) {
      sendYouTubeCommand('playVideo');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#120d0d] font-sans text-on-surface flex flex-col justify-between overflow-x-hidden select-none">
      {currentTrack.youtubeEmbedUrl && (
        <iframe
          ref={youtubePlayerRef}
          key={currentTrack.youtubeEmbedUrl}
          title={`${currentTrack.title} audio player`}
          src={getYouTubePlayerUrl(currentTrack.youtubeEmbedUrl)}
          className="fixed -left-[9999px] top-0 h-px w-px opacity-0 pointer-events-none"
          allow="autoplay; encrypted-media"
          aria-hidden="true"
          onLoad={() => {
            sendYouTubeCommand('setVolume', [isMuted ? 0 : volumeValue]);
            sendYouTubeCommand(isMuted ? 'mute' : 'unMute');
            if (!isPlaying) return;
            sendYouTubeCommand('playVideo');
          }}
        />
      )}
      
      {/* Background radial gradient representing absolute depths and infinite space ambient frames */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1414] via-[#120d0d] to-[#070505] pointer-events-none z-0" />

      {/* Primary Split-Screen desktop dashboard layout */}
      <div className="relative z-10 flex flex-1 w-full h-screen overflow-hidden">
        
        {/* LEFT COLUMN: Persistent Left Desktop Sidebar (Visible only on md: screens and up) */}
        <aside className="hidden md:flex flex-col w-[260px] bg-black/50 border-r border-white/5 shrink-0 h-full overflow-hidden flex-col select-none">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5 bg-black/25">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md">
              <span className="text-black font-extrabold text-sm transform -rotate-10 select-none">D</span>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight leading-none uppercase">D Music</h2>
            </div>
          </div>

          {/* Quick Navigation Panel */}
          <div className="p-4 space-y-1">
            <button
              onClick={() => handleSelectTab('home')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'home' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-5 h-5 shrink-0" />
              <span>Dashboard Home</span>
            </button>

            <button
              onClick={() => handleSelectTab('search')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'search' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-5 h-5 shrink-0" />
              <span>Search Music</span>
            </button>

            <button
              onClick={() => handleSelectTab('library')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'library' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5'
              }`}
            >
              <Library className="w-5 h-5 shrink-0" />
              <span>Manage Library</span>
            </button>
          </div>

          {/* Scrolling Library Section on Sidebar */}
          <div className="flex-1 overflow-y-auto px-4 py-2 border-t border-white/5 space-y-3 no-scrollbar pb-24">
            <div className="flex justify-between items-center px-2 py-1">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                Pinned Playlists
              </span>
              <button 
                onClick={() => setShowSidebarAdd(!showSidebarAdd)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors font-bold text-primary"
                title="Create playlist"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Sidebar quick playlist creation form */}
            {showSidebarAdd && (
              <form onSubmit={handleCreateSidebarPlaylist} className="bg-surface-container/80 p-2.5 rounded-lg border border-white/10 space-y-2 animate-in slide-in-from-top">
                <input
                  required
                  type="text"
                  placeholder="Playlist name..."
                  value={sidebarPlaylistName}
                  onChange={(e) => setSidebarPlaylistName(e.target.value)}
                  className="w-full bg-[#120d0d] text-xs font-semibold p-2 rounded border border-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="flex gap-1.5 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setShowSidebarAdd(false)}
                    className="px-2 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-white rounded font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-2 py-1 text-[10px] bg-primary text-black rounded font-black hover:scale-102"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}

            {/* Render items into Sidebar directly */}
            <div className="space-y-1.5">
              {libraryList.map((item) => {
                const isCurrentPlayingType = item.tracks && item.tracks.some(t => t.id === currentTrack.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.tracks && item.tracks.length > 0) {
                        handlePlayTrack(item.tracks[0]);
                      }
                    }}
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group ${
                      isCurrentPlayingType ? 'bg-primary/5 border-l-2 border-primary' : 'border-l-2 border-transparent'
                    }`}
                  >
                    <div className="w-8 h-8 rounded shrink-0 overflow-hidden bg-surface-container-highest flex items-center justify-center relative">
                      {item.coverUrl === 'gradient' ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center">
                          <Heart className="w-4.5 h-4.5 text-white fill-white" />
                        </div>
                      ) : (
                        <img src={item.coverUrl} className="w-full h-full object-cover" alt="" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-bold truncate group-hover:text-primary transition-colors ${isCurrentPlayingType ? 'text-primary' : 'text-white'}`}>
                        {item.name}
                      </p>
                      <p className="text-[10px] text-on-surface-variant truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: Scrollable Core Dashboard Workspaces */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar pb-36 relative">
          
          {/* Main Workspace Scrollable Container */}

          <div className="w-full max-w-[1300px] mx-auto">
            {activeTab === 'home' && (
              <HomeView
                onPlayTrack={handlePlayTrack}
                onPlayPauseToggle={handlePlayPauseToggle}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                registeredUser={registeredUser}
                onOpenRegisterModal={() => setShowRegisterModal(true)}
              />
            )}

            {activeTab === 'search' && (
              <SearchView
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                onNavigateToWhatsNew={() => setActiveTab('whatsnew')}
                registeredUser={registeredUser}
                onLogout={handleLogout}
              />
            )}

            {activeTab === 'whatsnew' && (
              <WhatsNewView
                onBack={() => setActiveTab('search')}
              />
            )}

            {activeTab === 'library' && (
              <LibraryView
                onPlayTrack={handlePlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                libraryList={libraryList}
                onAddLibraryItem={handleAddLibraryItem}
              />
            )}
          </div>
        </main>

        {/* RIGHT COLUMN: Right Now Playing Sidebar (Lyrics & Artist details) */}
        {showRightSidebar && currentTrack && (
          <div className="hidden lg:block shrink-0 h-full">
            <NowPlayingSidebar
              track={currentTrack}
              isPlaying={isPlaying}
              playbackTime={playbackTime}
              onPlayPauseToggle={handlePlayPauseToggle}
              onClose={() => setShowRightSidebar(false)}
              likedSongIds={likedSongIds}
              onToggleLike={handleToggleLike}
            />
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* PERSISTENT FULL DESKTOP WEB PLAYER (Bottom Bar - visible on md:) */}
      {/* ========================================== */}
      {currentTrack && (
        <section className="hidden md:grid fixed bottom-0 inset-x-0 h-24 bg-[#171212] border-t border-white/5 z-50 grid-cols-[1fr_minmax(320px,640px)_1fr] items-center px-6 select-none shadow-[0_-12px_24px_rgba(0,0,0,0.5)] backdrop-blur-lg">
          {/* Left Block: Track metadata & like control */}
          <div className="flex items-center gap-4 w-full min-w-0 justify-self-start">
            <div className="relative w-14 h-14 bg-surface-container rounded-lg overflow-hidden shrink-0 border border-white/5 group shadow-md">
              <img
                src={currentTrack.coverUrl}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                alt=""
              />
              <button
                onClick={() => setIsNowPlayingFullscreen(true)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                title="Expand screen player"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            <div className="min-w-0">
              <h4
                className="font-bold text-sm text-white hover:text-primary transition-colors cursor-pointer truncate max-w-[180px]"
                onClick={() => setIsNowPlayingFullscreen(true)}
              >
                {currentTrack.title}
              </h4>
              <p className="text-xs text-on-surface-variant truncate max-w-[180px]">
                {currentTrack.artist}
              </p>
            </div>

            <button
              onClick={() => handleToggleLike(currentTrack.id)}
              className="p-1 px-2.5 transition-transform active:scale-75 hover:scale-110 ml-1"
              aria-label="Toggle favourite button"
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  likedSongIds.includes(currentTrack.id)
                    ? 'text-primary fill-primary filter drop-shadow-[0_0_5px_rgba(83,224,118,0.5)]'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              />
            </button>
          </div>

          {/* Center Block: Controls row & Time scrubber slider */}
          <div className="flex flex-col items-center w-full max-w-xl justify-self-center">
            {/* Play/Pause control suite */}
            <div className="flex items-center gap-6 mb-2">
              <button 
                onClick={() => setShuffleActive(!shuffleActive)}
                className={`p-1.5 transition-colors cursor-pointer ${shuffleActive ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}
                title="Shuffle playlist tracks"
              >
                <Shuffle className="w-4.5 h-4.5" />
              </button>

              <button 
                onClick={handlePrevTrack}
                className="p-1.5 text-white hover:text-primary transition-colors active:scale-95"
                title="Prev song"
              >
                <SkipBack className="w-5 h-5 fill-white hover:fill-primary" />
              </button>

              <button 
                onClick={handlePlayPauseToggle}
                className="w-10 h-10 bg-white text-black hover:scale-105 active:scale-95 transition-transform rounded-full flex items-center justify-center shadow-lg cursor-pointer font-bold"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4.5 h-4.5 text-black fill-black" />
                ) : (
                  <Play className="w-4.5 h-4.5 text-black fill-black ml-0.5" />
                )}
              </button>

              <button 
                onClick={handleNextTrack}
                className="p-1.5 text-white hover:text-primary transition-colors active:scale-95"
                title="Next song"
              >
                <SkipForward className="w-5 h-5 fill-white hover:fill-primary" />
              </button>

              <button 
                onClick={() => setRepeatActive(!repeatActive)}
                className={`p-1.5 transition-colors cursor-pointer ${repeatActive ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}
                title="Repeat track"
              >
                <Repeat className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Inline dynamic scrubber rail */}
            <div className="flex items-center gap-3 w-full text-xs font-medium text-on-surface-variant font-mono">
              <span className="w-9 text-right">{formatTime(playbackTime)}</span>
              
              <div 
                onClick={handleScrubberClick}
                className="relative flex-1 h-1.5 bg-surface-variant rounded-full cursor-pointer group py-2 flex items-center"
              >
                <div className="h-1 bg-white/10 w-full absolute rounded-full"></div>
                <div 
                  className="h-1 bg-primary absolute rounded-full transition-all"
                  style={{ width: `${(playbackTime / currentTrack.durationSeconds) * 100}%` }}
                >
                  {/* Scroller knob */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white border border-primary scale-0 group-hover:scale-100 transition-transform duration-100 rounded-full shadow-md z-20"></div>
                </div>
              </div>

              <span className="w-9 text-left">{formatTime(currentTrack.durationSeconds)}</span>
            </div>
          </div>

          {/* Right Block: Volume panel and fullscreen visualizers */}
          <div className="flex items-center gap-4 justify-end justify-self-end">
            
            {/* Ambient visualizer wave simulation */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-6 px-2 pr-4 text-primary shrink-0 opacity-80" title="Audio spatial visualizer active">
                <span className="w-0.5 bg-primary animation-delay-100 animate-bounce" style={{ height: '70%' }}></span>
                <span className="w-0.5 bg-primary animation-delay-200 animate-bounce" style={{ height: '30%' }}></span>
                <span className="w-0.5 bg-primary animation-delay-300 animate-bounce" style={{ height: '90%' }}></span>
                <span className="w-0.5 bg-primary animation-delay-400 animate-bounce" style={{ height: '50%' }}></span>
              </div>
            )}

            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 hover:bg-white/5 rounded-full text-on-surface-variant hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4.5 h-4.5 text-red-500" />
              ) : (
                <Volume2 className="w-4.5 h-4.5" />
              )}
            </button>

            {/* Interactive volume slider */}
            <div className="w-20 lg:w-28 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volumeValue}
                onChange={(e) => {
                  setVolumeValue(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-full accent-primary bg-white/10 h-1 rounded-lg cursor-pointer outline-none hover:accent-emerald-400"
                title={`${isMuted ? 0 : volumeValue}% Volume`}
              />
            </div>

            <button 
              onClick={() => setShowRightSidebar(!showRightSidebar)}
              className={`p-2 hover:bg-white/5 rounded-full transition-all shrink-0 cursor-pointer ${showRightSidebar ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}
              title="Tampilkan/Sembunyikan Lirik & Info Artis"
            >
              <PanelRight className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setIsNowPlayingFullscreen(true)}
              className="p-2 hover:bg-white/5 text-on-surface-variant hover:text-white rounded-full transition-colors shrink-0 cursor-pointer"
              title="Maximize and show lyrics"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* MOBILE ONLY FLOATING MINI PLAYER & NAVIGATION (md:hidden) */}
      {/* ========================================== */}
      {currentTrack && !isNowPlayingFullscreen && (
        <div className="md:hidden">
          <MiniPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            onOpenFullscreen={() => setIsNowPlayingFullscreen(true)}
            onPlayPauseToggle={handlePlayPauseToggle}
            playbackTime={playbackTime}
            onToggleLike={handleToggleLike}
            isLiked={likedSongIds.includes(currentTrack.id)}
          />
        </div>
      )}

      {/* Primary Now Playing detailed panel sheet */}
      {isNowPlayingFullscreen && currentTrack && (
        <NowPlayingView
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPauseToggle={handlePlayPauseToggle}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          onClose={() => setIsNowPlayingFullscreen(false)}
          playbackTime={playbackTime}
          setPlaybackTime={setPlaybackTime}
          onToggleLike={handleToggleLike}
          isLiked={likedSongIds.includes(currentTrack.id)}
        />
      )}

      {/* Mobile Sticky Navigation Footer (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 w-full z-50 flex justify-around items-center h-16 pb-safe bg-surface-container/95 border-t border-white/5 backdrop-blur-md shadow-2xl">
        <button
          onClick={() => {
            handleSelectTab('home');
            setIsNowPlayingFullscreen(false);
          }}
          className={`flex flex-col items-center justify-center text-center transition-all active:scale-95 duration-100 cursor-pointer ${
            activeTab === 'home' ? 'text-white font-extrabold' : 'text-on-surface-variant hover:text-white'
          }`}
          aria-label="Home link"
        >
          <Home className={`w-5.5 h-5.5 mb-1 ${activeTab === 'home' ? 'text-primary' : ''}`} />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Home</span>
        </button>

        <button
          onClick={() => {
            handleSelectTab('search');
            setIsNowPlayingFullscreen(false);
          }}
          className={`flex flex-col items-center justify-center text-center transition-all active:scale-95 duration-100 cursor-pointer ${
            activeTab === 'search' ? 'text-white font-extrabold' : 'text-on-surface-variant hover:text-white'
          }`}
          aria-label="Search link"
        >
          <Search className={`w-5.5 h-5.5 mb-1 ${activeTab === 'search' ? 'text-primary' : ''}`} />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Search</span>
        </button>

        <button
          onClick={() => {
            handleSelectTab('library');
            setIsNowPlayingFullscreen(false);
          }}
          className={`flex flex-col items-center justify-center text-center transition-all active:scale-95 duration-100 cursor-pointer ${
            activeTab === 'library' ? 'text-white font-extrabold' : 'text-on-surface-variant hover:text-white'
          }`}
          aria-label="Library link"
        >
          <Library className={`w-5.5 h-5.5 mb-1 ${activeTab === 'library' ? 'text-primary' : ''}`} />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Library</span>
        </button>
      </nav>

      {/* Spotify-styled Account Registration Modal to Unlock Features */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Login Modal — shown after registration or when user tries to access features */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
    </div>
  );
}
