import { useRef, useState } from 'react';
import { Track, RegisteredUser } from '../types';
import { getTrack, topTrending, madeForYou } from '../data';
import {
  ArrowLeft,
  Clock3,
  Download,
  List,
  MoreHorizontal,
  PlusCircle,
  Search,
  Settings,
  Shuffle,
  Play,
  Pause,
  Sliders,
  ChevronRight
} from 'lucide-react';

interface HomeViewProps {
  onPlayTrack: (track: Track) => void;
  onPlayPauseToggle: () => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  registeredUser?: RegisteredUser | null;
  onOpenRegisterModal?: () => void;
}

export default function HomeView({
  onPlayTrack,
  onPlayPauseToggle,
  currentTrack,
  isPlaying,
  registeredUser,
  onOpenRegisterModal
}: HomeViewProps) {
  // Good morning / Good evening greeting based on Indonesian/local times
  const greeting = (() => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const [activeTab, setActiveTab] = useState<'all' | 'music' | 'podcasts'>('all');
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPlaybackSpeed, setCurrentPlaybackSpeed] = useState('1.0x');
  const topTrendingScrollerRef = useRef<HTMLDivElement | null>(null);

  const handleSettingsToggle = () => setShowSettings(!showSettings);
  const handleTopTrendingNext = () => {
    const scroller = topTrendingScrollerRef.current;
    if (!scroller) return;

    const cardStep = 176;
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const nextScrollLeft =
      scroller.scrollLeft + cardStep >= maxScrollLeft
        ? 0
        : scroller.scrollLeft + cardStep;

    scroller.scrollTo({
      left: nextScrollLeft,
      behavior: 'smooth',
    });
  };
  const podcastEpisode = getTrack('podcast-stoicism');
  const podcastSelected = currentTrack?.id === podcastEpisode.id;
  const podcastPlaying = podcastSelected && isPlaying;
  const handlePodcastTabClick = () => {
    setActiveTab('podcasts');
  };

  const quickPicks = [
    {
      id: 'scott-street',
      title: 'Scott Street',
      coverUrl: getTrack('scott-street').coverUrl,
      track: getTrack('scott-street'),
    },
    {
      id: 'MBG-Mas Bahlil Ganteng',
      title: 'MBG Mas Bahlil Ganteng',
      coverUrl: getTrack('mbg-mas-bahlil-ganteng').coverUrl,
      track: getTrack('mbg-mas-bahlil-ganteng'),
    },
    {
      id: 'lyoid-you',
      title: 'Lyoid You',
      coverUrl: getTrack('lyoid-you').coverUrl,
      track: getTrack('lyoid-you'),
    },
    {
      id: 'hindia-membasuh',
      title: 'Hindia - membasuh',
      coverUrl: getTrack('hindia').coverUrl,
      track: getTrack('hindia'),
    },
    {
      id: 'tenxy',
      title: 'Tenxy-Berubah',
      coverUrl: getTrack('tenxy').coverUrl,
      track: getTrack('tenxy'),
    },
    {
      id: 'no-surprises',
      title: 'No Surprises',
      coverUrl: getTrack('no-surprises-radio').coverUrl,
      track: getTrack('no-surprises-radio'),
    },
    {
      id: 'the-script',
      title: 'Man who cant be moved',
      coverUrl: getTrack('the-script').coverUrl,
      track: getTrack('the-script'),
    },
    {
      id: 'dj-fyp-tiktok',
      title: 'DJ Blac hole',
      coverUrl: getTrack('dj-fyp-tiktok').coverUrl,
      track: getTrack('dj-fyp-tiktok'),
    },
  ];
  const activePlaylist = madeForYou.find((playlist) => playlist.id === activePlaylistId);
  const activePlaylistDurationSeconds =
    activePlaylist?.tracks.reduce((total, track) => total + track.durationSeconds, 0) ?? 0;
  const activePlaylistDurationText = (() => {
    const minutes = Math.floor(activePlaylistDurationSeconds / 60);
    const seconds = activePlaylistDurationSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  })();
  const playlistDescriptions: Record<string, string> = {
    'ost-one-piece': 'Petualangan, drama, dan energi bajak laut dalam tiga track pilihan.',
    'on-repeat': 'Lagu favorit yang sering kamu putar, dikumpulkan dalam satu halaman playlist.',
    'rock-mix': 'Pilihan rock bertenaga untuk sesi dengar yang lebih kencang dan fokus.',
    'pop-mix': 'Koleksi pop pilihan dengan track yang enak diputar dari dashboard Dash Music.',
  };
  const playlistVisualThemes: Record<string, {
    headerBase: string;
    imageLayer: string;
    headerOverlay: string;
    bodyBackground: string;
  }> = {
    'ost-one-piece': {
      headerBase: '#101929',
      imageLayer: `radial-gradient(circle at 16% 20%, rgba(56, 189, 248, 0.46), transparent 34%), radial-gradient(circle at 82% 10%, rgba(245, 158, 11, 0.34), transparent 30%), linear-gradient(110deg, rgba(8, 12, 24, 0.42), rgba(45, 15, 9, 0.58)), url(${activePlaylist?.coverUrl ?? ''})`,
      headerOverlay: 'linear-gradient(to bottom, rgba(3, 7, 18, 0.18), rgba(14, 21, 38, 0.46) 54%, rgba(18, 13, 13, 0.98))',
      bodyBackground: 'linear-gradient(to bottom, #15233b 0%, #120d0d 88%)',
    },
    'on-repeat': {
      headerBase: '#15148c',
      imageLayer: `radial-gradient(circle at 18% 18%, rgba(132, 255, 66, 0.34), transparent 28%), radial-gradient(circle at 74% 22%, rgba(244, 63, 191, 0.5), transparent 35%), linear-gradient(110deg, rgba(18, 19, 136, 0.36), rgba(190, 24, 93, 0.48)), url(${activePlaylist?.coverUrl ?? ''})`,
      headerOverlay: 'linear-gradient(to bottom, rgba(20, 17, 120, 0.1), rgba(88, 28, 135, 0.42) 54%, rgba(18, 13, 13, 0.96))',
      bodyBackground: 'linear-gradient(to bottom, #23146f 0%, #120d0d 88%)',
    },
    'rock-mix': {
      headerBase: '#0714a8',
      imageLayer: `radial-gradient(circle at 15% 18%, rgba(236, 252, 68, 0.32), transparent 30%), radial-gradient(circle at 82% 26%, rgba(255, 64, 139, 0.46), transparent 34%), linear-gradient(110deg, rgba(6, 21, 160, 0.42), rgba(88, 15, 120, 0.46)), url(${activePlaylist?.coverUrl ?? ''})`,
      headerOverlay: 'linear-gradient(to bottom, rgba(7, 18, 120, 0.14), rgba(56, 16, 96, 0.42) 54%, rgba(18, 13, 13, 0.98))',
      bodyBackground: 'linear-gradient(to bottom, #1b1774 0%, #120d0d 88%)',
    },
    'pop-mix': {
      headerBase: '#2614a8',
      imageLayer: `radial-gradient(circle at 16% 22%, rgba(217, 255, 57, 0.34), transparent 30%), radial-gradient(circle at 78% 18%, rgba(255, 78, 205, 0.52), transparent 38%), linear-gradient(110deg, rgba(37, 32, 178, 0.36), rgba(236, 72, 153, 0.44)), url(${activePlaylist?.coverUrl ?? ''})`,
      headerOverlay: 'linear-gradient(to bottom, rgba(37, 27, 140, 0.08), rgba(115, 30, 130, 0.42) 54%, rgba(18, 13, 13, 0.96))',
      bodyBackground: 'linear-gradient(to bottom, #25156e 0%, #120d0d 88%)',
    },
  };
  const activePlaylistDescription =
    activePlaylist ? playlistDescriptions[activePlaylist.id] ?? activePlaylist.subtitle : '';
  const activePlaylistTheme =
    activePlaylist ? playlistVisualThemes[activePlaylist.id] ?? playlistVisualThemes['pop-mix'] : playlistVisualThemes['pop-mix'];

  if (activePlaylist) {
    return (
      <div className="pb-40 text-on-surface animate-in fade-in duration-200">
        <section
          className="relative min-h-[290px] overflow-hidden"
          style={{ background: activePlaylistTheme.headerBase }}
        >
          <div
            className="absolute inset-0 opacity-80 blur-2xl scale-110"
            style={{
              backgroundImage: activePlaylistTheme.imageLayer,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: activePlaylistTheme.headerOverlay }}
          />
          <div className="relative z-10 px-5 pt-5 pb-8">
            <button
              onClick={() => setActivePlaylistId(null)}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white hover:bg-black/55 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <p className="text-xs font-black uppercase tracking-wide text-white/90">
              Public Playlist
            </p>
            <h1 className="mt-3 text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
              {activePlaylist.title}
            </h1>
            <p className="mt-5 max-w-4xl text-sm font-bold text-white/90">
              {activePlaylistDescription}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-white/85">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-black">D</span>
              <span>Made for Dash Music</span>
              <span>•</span>
              <span>{activePlaylist.tracks.length} songs</span>
              <span>•</span>
              <span>{activePlaylistDurationText}</span>
            </div>
          </div>
        </section>

        <section
          className="px-5 py-5"
          style={{ background: activePlaylistTheme.bodyBackground }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <button
                onClick={() => onPlayTrack(activePlaylist.tracks[0])}
                className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
                aria-label={`Play ${activePlaylist.title}`}
              >
                <Play className="w-6 h-6 fill-black ml-1" />
              </button>
              <img
                src={activePlaylist.coverUrl}
                alt={activePlaylist.title}
                className="w-11 h-11 rounded-md object-cover border border-white/10"
              />
              <button className="text-on-surface-variant hover:text-white transition-colors" aria-label="Shuffle playlist">
                <Shuffle className="w-7 h-7" />
              </button>
              <button className="text-on-surface-variant hover:text-white transition-colors" aria-label="Save playlist">
                <PlusCircle className="w-8 h-8" />
              </button>
              <button className="text-on-surface-variant hover:text-white transition-colors" aria-label="Download playlist">
                <Download className="w-7 h-7" />
              </button>
              <button className="text-on-surface-variant hover:text-white transition-colors" aria-label="More options">
                <MoreHorizontal className="w-8 h-8" />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-5 text-on-surface-variant">
              <Search className="w-5 h-5" />
              <button className="text-xs font-bold hover:text-white transition-colors">Custom order</button>
              <List className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-[36px_minmax(0,1.5fr)_minmax(120px,1fr)_120px_44px] items-center gap-3 border-b border-white/10 px-2 pb-3 text-xs font-bold text-on-surface-variant">
              <span className="text-center">#</span>
              <span>Title</span>
              <span className="hidden sm:block">Album</span>
              <span className="hidden md:block">Date added</span>
              <Clock3 className="w-4 h-4 justify-self-end" />
            </div>

            <div className="space-y-1 pt-2">
              {activePlaylist.tracks.map((track, index) => {
                const isCurrent = currentTrack?.id === track.id;
                const playingThis = isCurrent && isPlaying;

                return (
                  <button
                    key={track.id}
                    onClick={() => onPlayTrack(track)}
                    className={`group grid w-full grid-cols-[36px_minmax(0,1.5fr)_minmax(120px,1fr)_120px_44px] items-center gap-3 rounded-md px-2 py-2 text-left transition-colors ${isCurrent ? 'bg-primary/10 text-primary' : 'text-white hover:bg-white/10'
                      }`}
                  >
                    <span className="text-center text-sm text-on-surface-variant group-hover:hidden">
                      {index + 1}
                    </span>
                    <Play className="hidden w-4 h-4 fill-current justify-self-center group-hover:block" />
                    <span className="flex items-center gap-3 min-w-0">
                      <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded object-cover" />
                      <span className="min-w-0">
                        <span className={`block truncate text-sm font-bold ${isCurrent ? 'text-primary' : 'text-white'}`}>
                          {track.title}
                        </span>
                        <span className="block truncate text-xs text-on-surface-variant">
                          {playingThis ? 'Now playing' : track.artist}
                        </span>
                      </span>
                    </span>
                    <span className="hidden sm:block truncate text-xs text-on-surface-variant">{track.album}</span>
                    <span className="hidden md:block text-xs text-on-surface-variant">Today</span>
                    <span className="justify-self-end text-xs text-on-surface-variant">{track.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pb-40 text-on-surface">
      {/* Upper header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md transition-all duration-200 py-4 flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight select-none text-white">
            {greeting}{registeredUser ? `, ${registeredUser.name}` : ''}
          </h1>
        </div>
        <button
          onClick={handleSettingsToggle}
          className="p-2 rounded-full bg-white/5 text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Open audio settings"
          title="Audio settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <div className="px-4 space-y-8 mt-2">

        {/* Quick Filter Pill Buttons (unrequested but within normal bounds if styled beautifully for UX, but wait, keeping visual elements pristine is higher priority) */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-primary text-black' : 'bg-surface-container-high text-on-surface hover:border-on-surface-variant border border-transparent'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === 'music' ? 'bg-primary text-black' : 'bg-surface-container-high text-on-surface hover:border-on-surface-variant border border-transparent'}`}
          >
            Music
          </button>
          <button
            onClick={handlePodcastTabClick}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === 'podcasts' ? 'bg-primary text-black' : 'bg-surface-container-high text-on-surface hover:border-on-surface-variant border border-transparent'}`}
          >
            Podcasts
          </button>
        </div>

        {/* Registration Promo Card if unregistered */}
        {!registeredUser && onOpenRegisterModal && (
          <div className="bg-gradient-to-r from-emerald-950/20 to-primary/5 border border-primary/20 p-5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="space-y-1 max-w-lg">
              <h3 className="text-lg font-black text-white leading-tight">
                Daftar Akun D Music Untuk Mencari & Mendengar Bebas!
              </h3>
              <p className="text-xs text-on-surface-variant">
                Registrasi cepat satu kali untuk mengaktifkan pemutar musik premium, kolom pencarian lagu, dan masteran kicau mania juara.
              </p>
            </div>
            <button
              onClick={onOpenRegisterModal}
              className="px-5 py-2.5 bg-primary text-black font-black uppercase text-[10px] tracking-wider rounded-full hover:scale-105 active:scale-95 transition-all text-center self-start md:self-center cursor-pointer shadow-md shadow-primary/10"
            >
              Daftar Sekarang (Gratis)
            </button>
          </div>
        )}

        {activeTab === 'podcasts' ? (
          <section className="overflow-hidden rounded-2xl border border-white/5 bg-[#111] shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
            <div
              className="relative min-h-[300px] overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.94), rgba(0,0,0,0.62) 52%, rgba(0,0,0,0.88)), url(${podcastEpisode.coverUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/50" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-5 p-5 md:p-8 min-h-[300px]">
                <img
                  src={podcastEpisode.coverUrl}
                  alt={podcastEpisode.title}
                  className="h-36 w-36 md:h-40 md:w-40 rounded-md object-cover border border-white/10 shadow-2xl"
                />
                <div className="max-w-4xl space-y-3">
                  <p className="text-xs font-black text-white/90">Podcast Episode</p>
                  <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white">
                    {podcastEpisode.title}
                  </h2>
                  <p className="text-2xl font-extrabold text-white">Ardhianzy</p>
                </div>
              </div>
            </div>

            <div className="bg-[#242424] px-5 md:px-8 py-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#b3b3b3]">
                <span>Video</span>
                <span>•</span>
                <span>May 4, 2025</span>
                <span>•</span>
                <span>13 min 52 sec</span>
                <span className="ml-1 h-1 w-28 rounded-full bg-white/25">
                  <span className="block h-full w-2/3 rounded-full bg-white/80" />
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={() => {
                    if (podcastSelected) {
                      onPlayPauseToggle();
                      return;
                    }
                    onPlayTrack(podcastEpisode);
                  }}
                  className="h-14 w-14 rounded-full bg-primary text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
                  aria-label={podcastPlaying ? 'Pause podcast' : 'Play podcast'}
                >
                  {podcastPlaying ? (
                    <Pause className="w-6 h-6 fill-black" />
                  ) : (
                    <Play className="w-6 h-6 fill-black ml-1" />
                  )}
                </button>
                <button className="text-on-surface-variant hover:text-white transition-colors" aria-label="Download podcast">
                  <Download className="w-8 h-8" />
                </button>
                <button className="text-on-surface-variant hover:text-white transition-colors" aria-label="Save podcast">
                  <PlusCircle className="w-8 h-8" />
                </button>
                <button className="text-on-surface-variant hover:text-white transition-colors" aria-label="More podcast options">
                  <MoreHorizontal className="w-8 h-8" />
                </button>
              </div>

              <div className="mt-6 rounded-lg bg-white/[0.03] border border-white/5 p-3">
                <button
                  onClick={() => onPlayTrack(podcastEpisode)}
                  className="group flex w-full items-center gap-3 text-left"
                >
                  <img
                    src={podcastEpisode.coverUrl}
                    alt={podcastEpisode.title}
                    className="h-14 w-14 rounded object-cover border border-white/10"
                  />
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-sm font-black ${podcastSelected ? 'text-primary' : 'text-white'}`}>
                      {podcastEpisode.title}
                    </span>
                    <span className="block truncate text-xs text-on-surface-variant">
                      {podcastPlaying ? 'Now playing' : 'Ardhianzy • Podcast Episode'}
                    </span>
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant">{podcastEpisode.duration}</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
        {/* Section 1: Quick Picks */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {quickPicks.map((item) => {
              const isCurrent = currentTrack?.id === item.track.id;
              const playingThis = isCurrent && isPlaying;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isCurrent) {
                      onPlayPauseToggle();
                      return;
                    }
                    onPlayTrack(item.track);
                  }}
                  className={`group h-12 sm:h-14 flex items-center text-left rounded overflow-hidden border transition-all cursor-pointer active:scale-98 ${isCurrent ? 'bg-primary/15 border-primary/35 ring-1 ring-primary/20' : 'bg-white/10 border-transparent hover:bg-white/15 hover:border-white/10'
                    }`}
                  aria-label={playingThis ? `Pause ${item.title}` : `Play ${item.title}`}
                >
                  <div className="relative h-full aspect-square shrink-0 overflow-hidden bg-surface-container-highest">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className={`px-3 text-sm font-extrabold leading-tight whitespace-pre-line line-clamp-2 ${isCurrent ? 'text-primary' : 'text-white'
                    }`}>
                    {item.title}
                  </span>
                  <span className={`ml-auto mr-3 w-8 h-8 rounded-full bg-primary text-black items-center justify-center shadow-lg shrink-0 transition-all ${isCurrent ? 'flex scale-100' : 'hidden scale-95 group-hover:flex group-hover:scale-100'}`}>
                    {playingThis ? (
                      <Pause className="w-4 h-4 fill-black" />
                    ) : (
                      <Play className="w-4 h-4 fill-black ml-0.5" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Made for You (Horizontal Scroll or Compact visual grid layout) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Made for You</h2>
            <button className="text-xs font-bold text-on-surface-variant hover:text-white transition-colors cursor-pointer">
              Show all
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar scroll-smooth">
            {madeForYou.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => {
                  if (
                    playlist.id === 'ost-one-piece' ||
                    playlist.id === 'pop-mix' ||
                    playlist.id === 'on-repeat' ||
                    playlist.id === 'rock-mix'
                  ) {
                    setActivePlaylistId(playlist.id);
                    return;
                  }
                  if (playlist.tracks.length > 0) {
                    onPlayTrack(playlist.tracks[0]);
                  }
                }}
                className="w-40 shrink-0 group cursor-pointer active:scale-98"
              >
                <div className="relative aspect-square w-40 mb-3 overflow-hidden rounded-xl bg-surface-container shadow-lg">
                  <img
                    alt={playlist.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={playlist.coverUrl}
                  />
                  {/* Spotify-style hover play button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="p-3 bg-primary-container text-on-primary rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform">
                      <Play className="w-6 h-6 text-black fill-black" />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-sm text-white truncate mb-1">
                  {playlist.title}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2">
                  {playlist.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Top Trending (Featuring gorgeous custom card styles) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Top Trending</h2>
            <button
              onClick={handleTopTrendingNext}
              className="h-8 w-8 rounded-full text-on-surface-variant hover:bg-white/10 hover:text-white active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Geser Top Trending"
              title="Geser Top Trending"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div ref={topTrendingScrollerRef} className="flex gap-4 overflow-x-auto pb-3 no-scrollbar scroll-smooth">
            {topTrending.map((trending) => (
              <div
                key={trending.id}
                onClick={() => {
                  if (trending.tracks.length > 0) {
                    onPlayTrack(trending.tracks[0]);
                  }
                }}
                className="w-40 shrink-0 bg-surface-container-low/60 hover:bg-surface-container/80 p-3 rounded-lg transition-all duration-300 relative group cursor-pointer active:scale-98 border border-white/5"
              >
                <div className="aspect-square w-full rounded-lg bg-surface-container-highest mb-3 overflow-hidden relative">
                  <img
                    alt={trending.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={trending.coverUrl}
                  />

                  {/* Floater play button */}
                  <div className="absolute bottom-2 right-2 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-10 h-10 bg-primary text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white truncate">
                  {trending.title}
                </h3>
                <p className="text-xs text-on-surface-variant truncate">
                  {trending.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>
          </>
        )}
      </div>

      {/* Settings Panel Backdrop Slider */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-surface-container-highest">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" /> Audio Studio Settings
              </h3>
              <button
                onClick={handleSettingsToggle}
                className="text-xs text-on-surface-variant hover:text-white px-3 py-1 bg-white/5 rounded-full"
              >
                Close
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm text-on-surface">
              <div>
                <p className="text-xs text-on-surface-variant mb-2">DSP Equalizer Profile</p>
                <div className="grid grid-cols-2 gap-2">
                  <span className="p-2.5 bg-primary/10 border border-primary/30 text-primary text-center rounded font-semibold text-xs">
                    Dynamic EQ
                  </span>
                  <span className="p-2.5 bg-surface-container-high text-white text-center rounded text-xs border border-white/10 cursor-not-allowed">
                    Ambient Warm
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-on-surface-variant mb-2">Simulated Playback Pitch</p>
                <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded border border-white/5">
                  <span className="font-medium text-xs text-white">Playback Speed</span>
                  <select
                    value={currentPlaybackSpeed}
                    onChange={(e) => setCurrentPlaybackSpeed(e.target.value)}
                    className="bg-transparent text-primary text-xs font-bold border-none focus:ring-0 cursor-pointer"
                  >
                    <option value="0.75x" className="bg-surface-container">0.75x (Chill)</option>
                    <option value="1.0x" className="bg-surface-container">1.0x (Standard)</option>
                    <option value="1.25x" className="bg-surface-container">1.25x (Rhythmic)</option>
                    <option value="1.5x" className="bg-surface-container">1.5x (Fast)</option>
                  </select>
                </div>
              </div>

              <div>
                <p className="text-xs text-on-surface-variant mb-1">Developer Credits</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Design system built on the 8px grid alignment. Developed natively using highly accessible contrast specifications. Set up with deep tonal layering and rich micro-interactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
