import { useState, useMemo } from 'react';
import { Track, RegisteredUser } from '../types';
import { browseCategories, allTracks } from '../data';
import { 
  Search, 
  Bell, 
  Play, 
  ArrowLeft, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface SearchViewProps {
  onPlayTrack: (track: Track) => void;
  currentTrack: Track | null;
  onNavigateToWhatsNew: () => void;
  registeredUser?: RegisteredUser | null;
  onLogout?: () => void;
}

export default function SearchView({ 
  onPlayTrack, 
  currentTrack, 
  onNavigateToWhatsNew,
  registeredUser,
  onLogout
}: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof browseCategories[0] | null>(null);

  // States for interactive A user menu and modals
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileDetailModal, setShowProfileDetailModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Filter tracks dynamically based on user input
  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allTracks.filter(
      (track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="pb-40 text-on-surface">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md py-4 flex justify-between items-center px-4">
        <h1 className="text-2xl font-extrabold tracking-tight select-none text-white">Search</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={onNavigateToWhatsNew}
            className="p-1.5 hover:bg-surface-container-high rounded-full transition-all cursor-pointer text-on-surface hover:text-white relative animate-pulse"
            aria-label="What's New Notification Bell"
          >
            <Bell className="w-6 h-6 animate-swing" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-[#120d0d]" />
          </button>
          
          {/* User Profile Button with Letter 'A' and dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-9 h-9 rounded-full bg-primary hover:bg-[#34bc62] active:scale-95 transition-all flex items-center justify-center shrink-0 border border-white/10 font-black text-black text-sm relative cursor-pointer"
              aria-label="User profile options menu"
            >
              A
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-[#120d0d]" />
            </button>

            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setShowProfileMenu(false)} 
                />
                
                <div className="absolute right-0 mt-2 w-48 bg-[#171212] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3 border-b border-white/5 bg-black/20">
                    <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Signed in as</p>
                    <p className="text-xs font-extrabold text-white truncate">
                      {registeredUser?.name || 'Awan'}
                    </p>
                    <p className="text-[9px] text-primary font-bold tracking-wider">
                      ★ Premium Account
                    </p>
                  </div>
                  
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowProfileDetailModal(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#b3b3b3] hover:text-white hover:bg-white/5 rounded-lg transition-all text-left cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-primary" />
                      Profil Anda
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowSettingsModal(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#b3b3b3] hover:text-white hover:bg-white/5 rounded-lg transition-all text-left cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-primary" />
                      Pengaturan
                    </button>
                    
                    <div className="h-px bg-white/5 my-1" />
                    
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onLogout) {
                          onLogout();
                        }
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 mt-2">
        {/* Search Bar Container */}
        <div className="sticky top-16 bg-background pt-1 pb-4 z-30">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-surface-container-highest group-focus-within:text-primary transition-colors" />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-black font-medium py-3.5 pl-12 pr-4 rounded-full border-none focus:ring-2 focus:ring-primary transition-all shadow-xl placeholder:text-gray-500 text-sm focus:outline-none"
              placeholder="What do you want to listen to?"
              type="text"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-500 hover:text-black font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Search Results */}
        {searchQuery.trim() !== '' ? (
          <section className="space-y-4 animate-in fade-in duration-200">
            <h2 className="text-base font-bold text-white tracking-tight">Search Results</h2>
            {filteredTracks.length > 0 ? (
              <div className="space-y-2">
                {filteredTracks.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => onPlayTrack(track)}
                      className="flex items-center gap-3 p-2 bg-surface-container-low/40 rounded-lg hover:bg-surface-container/60 transition-colors cursor-pointer group border border-transparent hover:border-white/5"
                    >
                      <div className="w-12 h-12 rounded overflow-hidden bg-surface-container-highest shrink-0 relative">
                        <img src={track.coverUrl} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary fill-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${isCurrent ? 'text-primary' : 'text-white'}`}>
                          {track.title}
                        </p>
                        <p className="text-xs text-on-surface-variant truncate">
                          {track.artist}
                        </p>
                      </div>
                      <span className="text-xs text-on-surface-variant mr-1">{track.duration}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-on-surface-variant space-y-2">
                <p className="text-sm">No matches found for "{searchQuery}"</p>
                <p className="text-xs">Check spelling or search for alternative electronic genres.</p>
              </div>
            )}
          </section>
        ) : selectedCategory ? (
          /* Category Filter Opened */
          <section className="space-y-4 animate-in slide-in-from-right duration-300">
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high hover:bg-surface-container-highest text-white rounded-full text-xs font-semibold cursor-pointer mb-2 transition-colors border border-white/5"
            >
              <ArrowLeft className="w-4 h-4" /> Go back to categories
            </button>

            <div className="flex items-center gap-3 py-2">
              <span 
                className="w-4 h-4 rounded-full block animate-pulse shrink-0" 
                style={{ backgroundColor: selectedCategory.color }} 
              />
              <h2 className="text-xl font-black text-white tracking-tight">
                {selectedCategory.name} Playlist
              </h2>
            </div>

            <div className="space-y-2">
              {selectedCategory.tracks.map((track) => {
                const isCurrent = currentTrack?.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => onPlayTrack(track)}
                    className="flex items-center gap-3 p-2 bg-surface-container-low/40 rounded-lg hover:bg-surface-container/60 transition-colors cursor-pointer group border border-transparent hover:border-white/5"
                  >
                    <div className="w-12 h-12 rounded overflow-hidden bg-surface-container-highest shrink-0 relative">
                      <img src={track.coverUrl} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary fill-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${isCurrent ? 'text-primary' : 'text-white'}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-on-surface-variant truncate">
                        {track.artist}
                      </p>
                    </div>
                    <span className="text-xs text-on-surface-variant mr-1">{track.duration}</span>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          /* Bento Category Grid (Default Screen) */
          <section className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold mb-4 text-white tracking-tight">Browse All</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {browseCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className="browse-card relative h-40 rounded-xl overflow-hidden cursor-pointer select-none transition-all duration-300 hover:scale-102 hover:shadow-xl active:scale-95 group border border-white/5 shadow-md flex flex-col justify-between"
                  style={{ backgroundColor: category.color }}
                >
                  <div className="p-4 relative z-10">
                    <span className="font-extrabold text-lg text-white block tracking-tight select-none">
                      {category.name}
                    </span>
                  </div>
                  
                  {/* Skewed album arts matching the Spotify/Sonic Depth mockup */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden transform rotate-25 translate-x-3 translate-y-3 shadow-2xl transition-transform duration-300 group-hover:rotate-15 group-hover:translate-x-1 group-hover:translate-y-1">
                    <img
                      className="w-full h-full object-cover"
                      alt={category.name}
                      src={category.coverUrl}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 1. Profile Detail Modal */}
      {showProfileDetailModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-xs bg-[#171212] border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowProfileDetailModal(false)}
              className="absolute top-3 right-3 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center transition-all text-xs cursor-pointer"
              title="Tutup"
            >
              ✕
            </button>
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-primary text-black font-black text-xl flex items-center justify-center mx-auto border-2 border-white/5 shadow-lg shadow-primary/20">
                A
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white font-sans uppercase tracking-wider">
                  Profil Anggota
                </h3>
                <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-0.5">
                  ★ Member Premium
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-black/30 p-3 rounded-xl border border-white/5 text-[11px] font-semibold">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-on-surface-variant">Nama</span>
                <span className="text-white">{registeredUser?.name || 'Awan'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-on-surface-variant">E-mail</span>
                <span className="text-white truncate max-w-[120px]">{registeredUser?.email || 'awan@example.com'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-on-surface-variant">Genre</span>
                <span className="text-primary truncate max-w-[120px] font-bold text-right">
                  {registeredUser?.favoriteGenre === 'kicau' ? '🐦 Kicau Mania' : 
                   registeredUser?.favoriteGenre === 'electronic' ? '⚡ Electronic' : 
                   registeredUser?.favoriteGenre === 'pop' ? '🎵 Pop Hits' : '🌌 Ambient'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowProfileDetailModal(false)}
              className="w-full py-2 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-full hover:scale-102 transition-all shadow-md cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

      {/* 2. Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-xs bg-[#171212] border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-3 right-3 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center transition-all text-xs cursor-pointer"
              title="Tutup"
            >
              ✕
            </button>
            
            <div className="text-center space-y-1">
              <h3 className="text-sm font-extrabold text-white font-sans uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-primary" /> Pengaturan Audio
              </h3>
              <p className="text-[9px] text-on-surface-variant leading-relaxed">
                Sesuaikan kualitas keluaran suara D Music
              </p>
            </div>

            <div className="space-y-3 py-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Ultra Bass Booster</p>
                  <p className="text-[8px] text-on-surface-variant">Kualitas bass ekstra kencang</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-8 h-4.5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Streaming Kualitas Tinggi</p>
                  <p className="text-[8px] text-on-surface-variant">Gunakan bitrate HD 320kbps</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-8 h-4.5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Hemat Data Seluler</p>
                  <p className="text-[8px] text-on-surface-variant">Hanya streaming via Wi-Fi</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-8 h-4.5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-full hover:scale-102 transition-all shadow-md cursor-pointer mt-2"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
