export type AppTab = 'home' | 'search' | 'library' | 'whatsnew';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl: string;
  duration: string;         // e.g. "3:50"
  durationSeconds: number;  // e.g. 230
  color?: string;           // Optional background accent color
  isLiked?: boolean;
  youtubeUrl?: string;
  youtubeEmbedUrl?: string;
}

export interface RegisteredUser {
  name: string;
  email: string;
  favoriteGenre: 'kicau' | 'electronic' | 'pop' | 'ambient';
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  color: string;
  tracks: Track[];
  type: 'playlist' | 'album' | 'podcast';
  author?: string;
  pinned?: boolean;
}

export interface BrowseCategory {
  id: string;
  name: string;
  color: string;
  coverUrl: string;
  tracks: Track[];
}

export interface LibraryItem {
  id: string;
  name: string;
  type: 'playlist' | 'artist' | 'album' | 'podcast';
  coverUrl: string;
  subtitle: string;
  pinned?: boolean;
  tracks?: Track[];
}
