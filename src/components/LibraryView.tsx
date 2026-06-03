import React, { useState } from 'react';
import { Track, LibraryItem } from '../types';
import { images } from '../data';
import { Search, Plus, ListFilter, Grid, List, Pin, PlusCircle, Sparkles, Folder, Radio, User, BellRing, Heart } from 'lucide-react';

interface LibraryViewProps {
  onPlayTrack: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  libraryList: LibraryItem[];
  onAddLibraryItem: (item: LibraryItem) => void;
}

type LibraryFilterType = 'all' | 'playlist' | 'artist' | 'album' | 'podcast';

export default function LibraryView({
  onPlayTrack,
  currentTrack,
  isPlaying,
  libraryList,
  onAddLibraryItem
}: LibraryViewProps) {
  const [activeFilter, setActiveFilter] = useState<LibraryFilterType>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistType, setNewPlaylistType] = useState<'playlist' | 'artist' | 'album' | 'podcast'>('playlist');

  // Filter items based on active chip
  const filteredItems = libraryList.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    const newItem: LibraryItem = {
      id: 'custom-' + Date.now(),
      name: newPlaylistName,
      type: newPlaylistType,
      coverUrl: newPlaylistType === 'artist' ? images.velvetEchoes : images.cyberpunk2077, // reuse high-quality place images
      subtitle: newPlaylistType.charAt(0).toUpperCase() + newPlaylistType.slice(1) + ' • Custom Added',
      tracks: []
    };

    onAddLibraryItem(newItem);
    setNewPlaylistName('');
    setShowAddModal(false);
  };

  return (
    <div className="pb-40 text-on-surface">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md py-4 flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight select-none text-white">Your Library</h1>
        </div>
        <div className="flex items-center gap-4 text-on-surface">
          <Search className="w-5 h-5 text-on-surface hover:text-white cursor-pointer transition-colors" />
          <button 
            onClick={() => setShowAddModal(true)}
            className="p-1 hover:bg-surface-container-high rounded-full transition-all cursor-pointer text-on-surface hover:text-white"
            aria-label="Add custom library item"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="px-4 mt-2">
        
        {/* Filter Chips row */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2 -mx-4 px-4 sticky top-16 bg-background/90 backdrop-blur-sm z-30">
          {(['all', 'playlist', 'artist', 'album', 'podcast'] as const).map((filter) => {
            const label = filter.charAt(0).toUpperCase() + filter.slice(1) + (filter === 'all' ? '' : 's');
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-white text-black' 
                    : 'bg-surface-container-highest/60 hover:bg-surface-container-highest text-on-surface'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Sorting / View controls */}
        <div className="flex justify-between items-center py-3 mb-2">
          <div className="flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-white transition-colors cursor-pointer select-none">
            <ListFilter className="w-4 h-4 text-primary" />
            <span>Recents</span>
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="p-1 text-on-surface-variant hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Toggle layout grid view"
          >
            {viewMode === 'list' ? (
              <Grid className="w-4 h-4" />
            ) : (
              <List className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Library Lists or Grid */}
        {viewMode === 'list' ? (
          /* List Mode */
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const isArtist = item.type === 'artist';
              const isCurrentItem = item.tracks?.some((track) => track.id === currentTrack?.id) ?? false;
              
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.tracks && item.tracks.length > 0) {
                      onPlayTrack(item.tracks[0]);
                    }
                  }}
                  className={`group flex items-center gap-4 p-2 rounded-lg hover:bg-surface-container/60 transition-colors cursor-pointer active:scale-99 border ${
                    isCurrentItem ? 'bg-primary/5 border-primary/30' : 'border-transparent hover:border-white/5'
                  }`}
                >
                  {/* Specialized graphic for Liked Songs or regular artworks */}
                  {item.coverUrl === 'gradient' ? (
                    <div className="relative w-14 h-14 rounded-lg bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center shadow-md shrink-0">
                      <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
                    </div>
                  ) : item.coverUrl === 'podcast-green' ? (
                    <div className="relative w-14 h-14 rounded-lg bg-[#006450] flex items-center justify-center shadow-md shrink-0">
                      <BellRing className="w-6 h-6 text-primary" />
                    </div>
                  ) : (
                    <div className={`w-14 h-14 shrink-0 overflow-hidden shadow-md ${isArtist ? 'rounded-full' : 'rounded-lg'}`}>
                      <img 
                        src={item.coverUrl} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        alt={item.name} 
                      />
                    </div>
                  )}

                  <div className="flex-1 overflow-hidden min-w-0">
                    <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5 truncate">
                      {isCurrentItem && isPlaying && (
                        <span className="text-primary font-black mr-0.5 shrink-0">Playing</span>
                      )}
                      {item.pinned && (
                        <Pin className="w-3.5 h-3.5 rotate-45 text-primary fill-primary mr-0.5 shrink-0" />
                      )}
                      <span>
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Grid Mode */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredItems.map((item) => {
              const isArtist = item.type === 'artist';
              const isCurrentItem = item.tracks?.some((track) => track.id === currentTrack?.id) ?? false;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.tracks && item.tracks.length > 0) {
                      onPlayTrack(item.tracks[0]);
                    }
                  }}
                  className={`hover:bg-surface-container/60 p-3 rounded-lg transition-all duration-300 flex flex-col items-center text-center cursor-pointer active:scale-98 relative group border ${
                    isCurrentItem ? 'bg-primary/5 border-primary/30' : 'border-transparent hover:border-white/5'
                  }`}
                >
                  {item.coverUrl === 'gradient' ? (
                    <div className="relative w-24 h-24 rounded-lg bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center shadow-lg mb-2 shrink-0">
                      <Heart className="w-10 h-10 text-white fill-white" />
                    </div>
                  ) : item.coverUrl === 'podcast-green' ? (
                    <div className="relative w-24 h-24 rounded-lg bg-[#006450] flex items-center justify-center shadow-lg mb-2 shrink-0">
                      <BellRing className="w-8 h-8 text-primary" />
                    </div>
                  ) : (
                    <div className={`w-24 h-24 shrink-0 overflow-hidden mb-2 shadow-lg ${isArtist ? 'rounded-full' : 'rounded-lg'}`}>
                      <img 
                        src={item.coverUrl} 
                        className="w-full h-full object-cover" 
                        alt={item.name} 
                      />
                    </div>
                  )}

                  <h3 className="font-bold text-xs text-white truncate max-w-full group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-on-surface-variant mt-0.5 truncate max-w-full">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) and click event custom adding list */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-4 w-12 h-12 bg-primary hover:bg-[#6fff90] text-black rounded-full flex items-center justify-center shadow-2xl active:scale-90 duration-150 transition-all z-40 animate-bounce pulse-ring cursor-pointer"
        aria-label="Create item"
      >
        <PlusCircle className="w-6 h-6 shrink-0" />
      </button>

      {/* Add Custom Playlist Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleAddNewItem}
            className="w-full max-w-sm bg-surface-container rounded-2xl border border-white/10 p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center gap-2 text-white font-extrabold pb-2 border-b border-white/5">
              <Sparkles className="w-5 h-5 text-primary shrink-0" />
              <span>Create Custom Library Element</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-on-surface-variant font-bold mb-1.5 uppercase tracking-wider">
                  Select Item Genre Type
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setNewPlaylistType('playlist')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] gap-1 transition-all ${newPlaylistType === 'playlist' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container-high border-white/5 text-on-surface-variant'}`}
                  >
                    <Folder className="w-4 h-4 shrink-0" /> Playlist
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPlaylistType('artist')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] gap-1 transition-all ${newPlaylistType === 'artist' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container-high border-white/5 text-on-surface-variant'}`}
                  >
                    <User className="w-4 h-4 shrink-0" /> Artist
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPlaylistType('album')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] gap-1 transition-all ${newPlaylistType === 'album' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container-high border-white/5 text-on-surface-variant'}`}
                  >
                    <Folder className="w-4 h-4 shrink-0" /> Album
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPlaylistType('podcast')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] gap-1 transition-all ${newPlaylistType === 'podcast' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-container-high border-white/5 text-on-surface-variant'}`}
                  >
                    <Radio className="w-4 h-4 shrink-0" /> Podcast
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant font-bold mb-1.5 uppercase tracking-wider">
                  Title Custom Label
                </label>
                <input
                  type="text"
                  required
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="e.g. Dreamy Instrumental Mix, John Coltrane..."
                  className="w-full bg-surface-container-high text-white text-sm font-medium p-3 rounded-lg border border-white/10 focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-primary text-black font-extrabold text-xs rounded-full hover:scale-102 transition-transform cursor-pointer"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="py-2.5 px-4 bg-surface-container-high text-white font-bold text-xs rounded-full hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
