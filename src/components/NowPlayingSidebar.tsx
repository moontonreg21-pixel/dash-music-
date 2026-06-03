import { useMemo, useState } from 'react';
import { Track } from '../types';
import { 
  X, 
  Share2, 
  Heart,
  Users,
  Play,
  Pause
} from 'lucide-react';

interface NowPlayingSidebarProps {
  track: Track;
  isPlaying: boolean;
  playbackTime: number;
  onPlayPauseToggle: () => void;
  onClose: () => void;
  likedSongIds: string[];
  onToggleLike: (id: string) => void;
}

// Structured lyrics & bio data for anti-AI-slop professional look & feel
const trackDetailsMap: Record<string, {
  lyrics: string[];
  bio: string;
  artistPhoto: string;
  monthlyListeners: string;
  genreTags: string[];
  animatedImageUrl?: string;
}> = {
  'starboy': {
    lyrics: [
      "I'm tryna put you in the worst mood, ah",
      "P1 cleaner than your church shoes, ah",
      "Milli point two is just a hurt tool, ah",
      "House so empty, need a centerpiece",
      "20 carats, cost a hundred G's",
      "Look what you've done...",
      "I'm a motherf*ckin' Starboy",
      "Look what you've done...",
      "I'm a motherf*ckin' Starboy"
    ],
    bio: "The Weeknd (Abel Tesfaye) is a Canadian singer-songwriter and record producer known for his sonic versatility, dark lyrics, and instantly recognizable falsetto vocals.",
    artistPhoto: "/starboy.jpg",
    monthlyListeners: "114,249,150",
    genreTags: ["R&B", "Pop", "Synthpop"]
  },
  'kicau-mania': {
    lyrics: [
      "Tak rumat seka piyik",
      "Tak loloh nganggo jangkrik",
      "Aku pamit nggantang, ya, Dhik",
      "Muga rejekine apik",
      "Untuk para kicau mania",
      "Masih bersama Ndarboy Genk",
      "Banditoz Yaow 86",
      "All Yaow ready?",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania",
      "Ora nggantang, ora mangan, ra nduwe gaji bulanan",
      "Lah wong dudu cah kantoran, tangga-tangga padha isin",
      "Yen kepethuk isih esuk, aku uwis ngelus manuk",
      "Lungguh ndhodhok, nyumet rokok, manukku wis manthuk-manthuk",
      "Penak dadi cah gantangan, ditelateni, ya lumayan",
      "Start seka mung latberan, ra wedi ro sing bos-bosan",
      "Manuk sekti mandraguna, modhal nekat karo ndonga",
      "Kicau mania gawan bayi, manukku wani kemaki",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Burungku datang, semua senang",
      "Burung berjuang, suara lantang",
      "Burung berdendang di atas tiang",
      "Ra kudu kondhang, sing penting menang",
      "Burungku gacor, wis mesthi skor",
      "Burungku merji, ra sah dha meri",
      "Burung menari, naikkan tensi",
      "Angkatlah topi, minat? Mangga japri",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Gas pol ndangak, digas pol ndangak-ndangak",
      "Manukku siap nembak, poinku ra keoyak",
      "Ra isa gliyak-gliyak, stelan wis gas pol ndangak",
      "Muraiku menang mutlak, liyane mung padha nyimak",
      "Aku ra golek musuh, ya ora seneng rusuh",
      "Yen padha kepethuk, aja lali aruh-aruh",
      "Padha cah gantangan, ra sah iren-irenan",
      "Seduluran merga hobi, muga berkah ngrejekeni",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)",
      "Kicau, kicau, kicau mania (hm)."
    ],
    bio: "Track pilihan Dash Music untuk para kicau mania, diambil langsung dari audio YouTube yang kamu pilih.",
    artistPhoto: "https://i.ytimg.com/vi/5k4llr0of_k/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAH0IF3wkiOU3qVAhmB9wmj7oxE6g",
    monthlyListeners: "85,420",
    genreTags: ["Viral", "Kicau Mania", "Dash Music"],
    animatedImageUrl: "/kicau-scuba-cat.gif"
  },
  'mbg-mas-bahlil-ganteng': {
    lyrics: [
      "MBG",
      "Mas Bahlil Ganteng",
      "Buah apa?",
      "Yang paling manis",
      "BUAAAHLILLLL",
      "Tambah ganteng aja",
      "My little bolu ketan",
      "Ups kanda suka dinda punya gaya",
      "Sialan dia",
      "Makin lucu guys",
      "Kalau diperhatiin lama-lama mirip",
      "ZAYN MALIK IHH",
      "My Bahlil Ganteng",
      "Makin glowing ajanih",
      "My Koko Bahlil kecintaanku",
      "My little cilok pentol",
      "Kecap dinda",
      "Dulu sekarang benci",
      "Semenjak kanda Mas Bayu ganteng"
    ],
    bio: "Track viral pilihan Dash Music dengan audio YouTube yang diputar langsung dari link pilihan pengguna.",
    artistPhoto: "https://sultranesia.com/wp-content/uploads/2025/09/67c6a70245c01.jpg",
    monthlyListeners: "128,000",
    genreTags: ["Viral", "Remix", "Dash Music"]
  },
  'one-piece-we-did-it': {
    lyrics: [
      "Chiisana koro ni wa takara no chizu ga",
      "Saat kumasih seorang anak kecil, sebuah peta harta karun",
      "Atama no naka ni ukandeite",
      "Selalu terbayang di dalam benakku",
      "Itsudemo sagashita kiseki no basho o",
      "Aku tlah lama mencari sebuah tempat ajaib",
      "Shiranai dareka ni makenai you ni",
      "Berharap takkan kalah dari seseorang yang tak ku kenal",
      "Ima de wa",
      "Tapi sekarang",
      "hokori darake no mainichi",
      "Hari-hariku dipenuhi dengan debu",
      "Itsu no hi ka",
      "Entah sejak kapan",
      "Subete no Toki ni mi o makaseru dake",
      "Ku hanya menyerahkan semuanya pada waktu",
      "Moshimo sekai ga kawaru no nara",
      "Andai dunia ini berubah",
      "Nani mo shiranai koro no watashi ni Tsurete itte",
      "Bawalah aku ke masa saat aku belum mengenal apa-apa",
      "Omoide ga iro asenai you ni",
      "Agar kenangan ku tak perlahan-lahan menghilang",
      "Chiisana koro kara uta o utatte",
      "Ku bernyanyi dari aku masih anak kecil",
      "Yume miru kokoro atatameteta",
      "Tuk memberi kehangatan pada hatiku yang penuh impian",
      "Minna de maneshita himitsu no merodii",
      "Melodi rahasia yang ditiru oleh semua orang",
      "Kondo wa jouzu ni kikoeru you ni",
      "Kali ini kita dapat memperdengarkannya dengan lebih baik",
      "Ima de wa",
      "Tapi sekarang",
      "tameiki tsuite bakari de",
      "Aku selalu berkeluh kesah",
      "Dare mo mada hontou no",
      "Tak seorang pun dari kita",
      "Yume sae tsukamenai mama",
      "Dapat menggapai impian yang sesungguhnya",
      "Moshimo jidai ga modoru no nara",
      "Seandainya waktu berputar kembali",
      "Namida o shitta koro no watashi ni tsurete itte",
      "Bawalah aku ke masa saat aku tahu apa itu air mata",
      "Setsunasa ga oitsukanai you ni",
      "Agar kesedihan ini tak membelenggu diriku",
      "Moshimo sekai ga kawaru no nara",
      "Andai dunia ini berubah",
      "Nani mo shiranai koro no watashi ni Tsurete itte",
      "Bawalah aku ke masa saat aku belum mengenal apa-apa",
      "Omoide ga iro asenai you ni",
      "Agar kenangan ku tak perlahan-lahan menghilang",
      "Tsurete itte",
      "Bawalah aku kembali",
      "Setsunasa ga oitsukanai you ni",
      "Agar kesedihan ini tak membelenggu diriku"
    ],
    bio: "Memories dari Maki Otsuki, lagu ending One Piece yang dipilih untuk playlist Ost one piece di Dash Music.",
    artistPhoto: "https://i.scdn.co/image/ab67616d0000b273e99dad7e45ebb84c5db1e89f",
    monthlyListeners: "1,250,000",
    genreTags: ["Anime", "One Piece", "J-Pop"]
  },
  'perunggu-ini-abadi': {
    lyrics: [
      "Dihentak sunyi, geram gusarmu mulai",
      "Gerayangi kupingku",
      "Dibungkam lagi janji yang sumbang itu",
      "Tak semenarik dulu"
    ],
    bio: "Ini Abadi dari Perunggu, track pilihan Dash Music.",
    artistPhoto: "https://i.scdn.co/image/ab67616d0000b273f14b39abd5730c7ec36114be",
    monthlyListeners: "720,000",
    genreTags: ["Indie", "Indonesia", "Perunggu"]
  },
  'dj-jangan-malu-malu-boy': {
    lyrics: [
      "Pandangku hanya padamu",
      "Hanya kamu",
      "Seakan dunia memberhentikan waktu",
      "1000 kata membanjiri pikiranku",
      "Tapi ku malu-malu",
      "Mungkin di lain waktu?",
      "Isi pikiranku kamu",
      "Jadi terlalu banyak buang waktu",
      "Dari atas sampai bawah, anggun",
      "Baby know that I just wanna be with you, uh",
      "Siang-siang kepikiran",
      "Malam-malam sendirian",
      "Scrolling Tik-Tok feednya isi cinta-cintaan",
      "Know that one day i will",
      "Ask u to be mine",
      "Boy, jangan malu malu",
      "Boy, kamu itu lucu",
      "Boy, don't waste my time so please say it now",
      "Kamu mau apa",
      "Semua aku bisa",
      "Just look at my eyes, sure you wouldnt think twice",
      "Pandangku hanya padamu",
      "Hanya kamu",
      "Seakan dunia memberhentikan waktu",
      "1000 kata membanjiri pikiranku",
      "Tapi ku malu-malu",
      "Mungkin di lain waktu?",
      "I see you lookin', got that little cute thing",
      "Cuz in my heart, (i'll)let the games begin",
      "Lihat mata kamu, I'm feelin' the heat",
      "You're a nerd, but I cant defeat",
      "Cuz I chose you first, baby",
      "Gonna love you back, baby",
      "Asalkan bisa jaga hati",
      "Ni xian shuo ai wo, wo jiu kending yongyuan ai ni",
      "I ain't trynna lose you baby (wo ai ni)",
      "Walau aku malu-malu lately (ooh)",
      "Soal percintaan ku paling sabi",
      "(tapi)",
      "Aku harap kamu cukup paham (paham sayang)",
      "Ku introvert level 99 (Iya sayang)",
      "Tapi akan ku beranikan (Kapan woi)",
      "Tapi jangan pakai tanya kapan",
      "Pandangku hanya padamu",
      "Hanya kamu",
      "Seakan dunia memberhentikan waktu",
      "1000 kata membanjiri pikiranku",
      "Tapi ku malu-malu",
      "Mungkin di lain waktu?"
    ],
    bio: "DJ Jangan Malu Malu Boy, track viral pilihan Dash Music yang diputar langsung dari YouTube.",
    artistPhoto: "/dj-jangan-malu-malu-boy.jpg",
    monthlyListeners: "430,000",
    genreTags: ["DJ", "Viral", "TikTok"]
  },
  'warox-ponorogo': {
    lyrics: [
      "Kuwi wis kondang kaloka",
      "Waroke saking Ponorogo",
      "Andhap asor tepo seliro",
      "Tansah manunggaling roso",
      "Warok iku sejatining manungso",
      "Sing kawentar sakti mondroguno",
      "Tumoto lelakuning jiwo",
      "Tumuju roso sampurno",
      "Lungguh anteng klambi sarwo ireng",
      "Mesti nganggo udeng ketingal kereng",
      "Mripat mendeleng ojo sampek digunem",
      "Mergo yen nesu iso koyo macan nggereng",
      "Warok iku memayu hayuning bawono",
      "Tetep merdiko kawit rikolo semono",
      "Tansah manembah marang sing kuoso",
      "Ngabekti jiwo rogo tumrap nuso lan bongso",
      "Ajarane luhur becik budi pakertine",
      "Ngolah rogo ugo ngolah moto batine",
      "Kuat imane ugo toto patrape",
      "Dadio manungso sing jejeg ono gunane",
      "Poro murid digembleng ilmu kasekten",
      "Supoyo uripe tansah dahat kinabekten",
      "Laku durjono kudu biso leren",
      "Ihtiar mesti nanging kudu tetep senden",
      "Kuwi wis kondang kaloka",
      "Waroke saking Ponorogo",
      "Andhap asor tepo seliro",
      "Tansah manunggaling roso",
      "Warok iku sejatining manungso",
      "Sing kawentar sakti mondroguno",
      "Tumoto lelakuning jiwo",
      "Tumuju roso sampurno",
      "Warok Ponorogo iku prasojo",
      "Kawit Gunoseco tekan Suro Menggolo",
      "Ojo podho sembrono yen simbah paring sabdo",
      "Kuwi podho gatekno ojo dilalekno",
      "Simbah warok iku guru sejati",
      "Menehi kaweruh kanggo lakuning ati",
      "Ilmune pesti ojo diblenjani",
      "Iki putumu ayo ngaji lan nyawiji",
      "Kuwi wis kondang kaloka",
      "Waroke saking Ponorogo",
      "Andhap asor tepo seliro",
      "Tansah manunggaling roso",
      "Warok iku sejatining manungso",
      "Sing kawentar sakti mondroguno",
      "Tumoto lelakuning jiwo",
      "Tumuju roso sampurno",
      "Kuwi wis kondang kaloka",
      "Waroke saking Ponorogo",
      "Andhap asor tepo seliro",
      "Tansah manunggaling roso",
      "Warok iku sejatining manungso",
      "Sing kawentar sakti mondroguno",
      "Tumoto lelakuning jiwo",
      "Tumuju roso sampurno"
    ],
    bio: "Warox Ponorogo dari Kajawi, track budaya pilihan Dash Music yang diputar langsung dari YouTube.",
    artistPhoto: "/warox-ponorogo.jpg",
    monthlyListeners: "210,000",
    genreTags: ["Jawa", "Budaya", "Kajawi"]
  },
  'banda-neira-patah-tumbuh': {
    lyrics: [
      "Jatuh dan tersungkur di tanah aku",
      "Berselimut debu sekujur tubuhku",
      "Panas dan menyengat",
      "Rebah dan berkarat",
      "Yang yang patah tumbuh yang hilang berganti"
    ],
    bio: "Yang Patah Tumbuh, Yang Hilang Berganti dari Banda Neira, track pilihan Dash Music.",
    artistPhoto: "https://images.genius.com/a9aa19092b56b4f8ad079c74a6787993.1000x1000x1.png",
    monthlyListeners: "980,000",
    genreTags: ["Folk", "Indonesia", "Banda Neira"]
  },
  'scott-street': {
    lyrics: [
      "Walking Scott Street, feeling like a stranger",
      "With an open heart, open container",
      "I've got a stack of mail and a tall can",
      "It's a shower beer, it's a payment plan",
      "There's helicopters over my head",
      "Every night when I go to bed",
      "Spending money and I earned it",
      "When I'm lonely, that's when I'll burn it",
      "Do you feel ashamed",
      "When you hear my name?",
      "I asked you, \"How is your sister?\"",
      "\"I heard she got her degree\"",
      "And I said, \"That makes me feel old\"",
      "You said, \"What does that make me?\"",
      "I asked you, \"How is playing drums?\"",
      "You said, \"It's too much shit to carry\"",
      "\"And what about the band?\"",
      "You said, \"They're all getting married\"",
      "Do you feel ashamed",
      "When you hear my name?",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "Ooh-ooh, ooh",
      "anyway, don't be a stranger",
      "(Ooh-ooh, ooh)",
      "(Ooh-ooh, ooh) anyway, don't be a stranger",
      "don't be a stranger",
      "(Ooh-ooh, ooh)",
      "Ooh-ooh, ooh"
    ],
    bio: "Scott Street dari Phoebe Bridgers, track pilihan Dash Music yang diputar langsung dari YouTube.",
    artistPhoto: "https://i.scdn.co/image/ab67616d0000b2732a5edd6218037175ddf7c2c8",
    monthlyListeners: "3,200,000",
    genreTags: ["Indie", "Folk", "Phoebe Bridgers"]
  },
  'lofi-study': {
    lyrics: [
      "[Relaxing vinyl crackle loop active]",
      "*Chilled piano chords floating delicately*",
      "[Soft spring rain tapping on the window]",
      "Focus your vision, relax your shoulders",
      "Let the quiet thoughts guide your work..."
    ],
    bio: "Lofi Beats Curator focuses purely on cozy study companions, integrating real-world ambient field recordings with organic lofi percussion textures.",
    artistPhoto: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80",
    monthlyListeners: "3,820,115",
    genreTags: ["Chillhop", "Lofi Beats", "Focus"]
  }
};

const defaultDetailFallback = {
  lyrics: [
    "No official lyrics available for this track yet.",
    "Try listening closely & feel the atmospheric rhythm!",
    "[Enjoying premium high-definition audio engine]"
  ],
  bio: "This talented designer under the D Music curation banner creates high-fidelity relaxing tunes and soundscapes tailored perfectly for your mood.",
  artistPhoto: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80",
  monthlyListeners: "512,330",
  genreTags: ["Acoustic", "Independent Artist", "Atmospheric"]
};

export default function NowPlayingSidebar({
  track,
  isPlaying,
  playbackTime,
  onPlayPauseToggle,
  onClose,
  likedSongIds,
  onToggleLike
}: NowPlayingSidebarProps) {
  const mappedDetails = trackDetailsMap[track.id];
  const details = mappedDetails || {
    ...defaultDetailFallback,
    bio: `${track.title} dari ${track.artist || 'Dash Music'} adalah track pilihan Dash Music yang mengikuti cover dan identitas musik yang sedang kamu putar.`,
    artistPhoto: track.coverUrl,
    genreTags: [
      track.album || 'Dash Music',
      track.artist || 'Playlist',
      'Now Playing'
    ].filter(Boolean)
  };
  const isLiked = likedSongIds.includes(track.id);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const activeLyricIndex = useMemo(() => {
    if (details.lyrics.length === 0) return 0;
    const secondsPerLine = Math.max(1, track.durationSeconds / details.lyrics.length);
    return Math.min(details.lyrics.length - 1, Math.floor(playbackTime / secondsPerLine));
  }, [details.lyrics.length, playbackTime, track.durationSeconds]);

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <aside 
      id="right-now-playing-sidebar"
      className="w-full lg:w-[340px] xl:w-[360px] bg-black/40 border-l border-white/5 h-full shrink-0 flex flex-col overflow-hidden select-none animate-in slide-in-from-right duration-200 z-30"
    >
      
      {/* 1. Header: Simple header containing only the close button */}
      <div className="flex items-center justify-end px-5 py-3.5 border-b border-white/5 bg-[#121212]/80 shrink-0 select-none">
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/5 rounded-full text-[#b3b3b3] hover:text-white transition-colors cursor-pointer"
          title="Close Panel"
          aria-label="Close sidebar"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* 2. Scrollable content suite */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-32">
        
        {/* Cover Album Frame matching exactly the user requested layout */}
        <div className="space-y-4">
          <div className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-surface-container">
            {details.animatedImageUrl ? (
              <img
                src={details.animatedImageUrl}
                alt={`${track.title} animated GIF`}
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.dataset.fallbackApplied === "true") return;
                  image.dataset.fallbackApplied = "true";
                  image.src = track.coverUrl;
                }}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
              />
            ) : (
              <img
                src={track.coverUrl}
                alt={track.title}
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.dataset.fallbackApplied === "true") return;
                  image.dataset.fallbackApplied = "true";
                  image.src = "/category-pop.png";
                }}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
              />
            )}
          </div>

          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight hover:text-primary cursor-pointer transition-colors truncate">
                {track.title}
              </h2>
              <p className="text-xs text-on-surface-variant font-medium truncate">
                {track.artist}
              </p>
            </div>

            {/* Quick Actions Panel: Share, Add & Like */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={onPlayPauseToggle}
                className="p-2 bg-white text-black hover:bg-primary rounded-full transition-all active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-black" />
                ) : (
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                )}
              </button>

              <button 
                onClick={handleShare}
                className="p-2 hover:bg-white/5 text-on-surface-variant hover:text-white rounded-full transition-all active:scale-95 cursor-pointer relative"
                title="Bagikan Tautan"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && (
                  <span className="absolute -top-7 right-0 text-[8px] bg-primary text-black font-extrabold px-1.5 py-0.5 rounded shadow-xl whitespace-nowrap">
                    Disalin!
                  </span>
                )}
              </button>

              <button 
                onClick={() => onToggleLike(track.id)}
                className="p-2 hover:bg-white/5 rounded-full transition-all active:scale-95 cursor-pointer"
                title="Sukai"
              >
                <Heart 
                  className={`w-4 h-4 transition-all ${
                    isLiked ? 'text-primary fill-primary' : 'text-on-surface-variant hover:text-white'
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Lyrics Card Frame exactly styled with deep emerald/yellow aesthetics */}
        <section className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex justify-between items-center relative z-10">
            <h3 className="text-xs font-black uppercase tracking-wider text-primary">
              Lyrics
            </h3>
          </div>

          <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1 text-xs select-text scroll-smooth">
            {details.lyrics.map((line, idx) => {
              const isHighlight = idx === activeLyricIndex;
              return (
                <p 
                  key={idx} 
                  className={`leading-relaxed font-bold transition-all transition-colors duration-300 ${
                    isHighlight 
                      ? 'text-white text-sm scale-101 border-l-2 border-primary pl-2' 
                      : 'text-[#e2e2e2]/60 hover:text-white pl-2'
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        </section>

        {/* 4. "About the Artist" layout with custom photograph and statistics */}
        <section className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative aspect-video w-full bg-surface-container">
            <img 
              src={details.artistPhoto} 
              alt={track.artist} 
              onError={(event) => {
                const image = event.currentTarget;
                if (image.dataset.fallbackApplied === "true") {
                  image.src = "/category-pop.png";
                  return;
                }
                image.dataset.fallbackApplied = "true";
                image.src = track.coverUrl;
              }}
              className="w-full h-full object-cover brightness-[0.7]" 
            />
            {/* Title card overlay exactly styled */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#151111] via-black/20 to-black/30 p-4 flex flex-col justify-between">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest bg-black/60 text-white rounded-full px-2.5 py-1 w-fit border border-white/10 backdrop-blur-sm">
                About the artist
              </span>
              
              <div className="space-y-0.5">
                <h4 className="text-base font-black text-white leading-none tracking-tight">
                  {track.artist}
                </h4>
                <div className="flex items-center gap-1 text-[9px] text-gray-300 font-bold">
                  <Users className="w-3 h-3 text-primary shrink-0" />
                  <span>{details.monthlyListeners} monthly listeners</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium select-text">
              {details.bio}
            </p>

            <div className="flex flex-wrap gap-1 pt-1.5">
              {details.genreTags.map(tag => (
                <span 
                  key={tag} 
                  className="text-[8.5px] font-extrabold text-[#b3b3b3] bg-white/5 border border-white/5 px-2 py-0.5 rounded-full uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`w-full py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                isFollowing 
                  ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                  : 'bg-white text-black hover:bg-primary hover:text-black hover:scale-102 active:scale-98'
              }`}
            >
              {isFollowing ? '✓ Following Artist' : 'Follow Artist'}
            </button>

            {track.youtubeUrl && (
              <a
                href={track.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider text-center bg-primary text-black hover:bg-white transition-colors cursor-pointer"
              >
                Play on YouTube
              </a>
            )}
          </div>
        </section>

      </div>
    </aside>
  );
}
