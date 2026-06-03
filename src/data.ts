import { Track, BrowseCategory, LibraryItem } from './types';

// Hotlinked images from the mockup definitions
export const images = {
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc8AYODdXQwyfKBzco8Jidh6CLm5rbKWYbV8H0gqzop6UCOf0wGVI9xH0sSbknpFr20kv-iz9wtSP68kDrlEG_7bT58QpJirJ8PVMt1YbjeyG090cbQ744cC3XFK8vHLNM9K9hwmDWiu9E0GXu_tqUASXIbocEzPnIwxNPSKFM0qsMgABNX4TePVVKiZgAutaOx0eX29nosQIqwaOl97KOMH5DIwQGBp_fzqUURP1OZltANE6I73B0R5uJ03DsPsUFdmpKAATevQ',

  // Genres
  pop: '/category-pop.png',
  hiphop: '/category-hip-hop.png',
  rock: '/category-rock.png',
  podcasts: '/category-podcasts.png',
  mood: '/category-mood.png',
  gaming: '/category-gaming.png',
  latin: '/category-latin.png',
  dance: '/category-dance.png',

  // Tracks / Albums / Playlists
  liveAndLoud: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyADd2k_17BYw6_fKoDjBRbB8DHHEOPgDrMA9vJpWIU0e1N7X62tjDbDSAcSiMLXmMN63A5TpH-MJm9BKlLiI0Mc95ITFQdduzyi5EFif2aUE-9ARi6RSDOGTWfj3VFgbLbx4s1KME8MGBbh0vqhV4lwyB0jIJbTjvBZylDK7_zVKPWIdUv2ehx95oTO8F6YXT5LG11S_skBICfnKuZtg5Mm8_pYMnK31MYSeOrRsqpL8o0gmjPq93iu5UuHVvd_N4gYXgQBVEYQ',
  lofiStudy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGpaU4jxzGyu8HSrmuDDpmBHLIDGTzLh5I9RGWjkwdqRxDK0cJzBudxEx8FISmfwP29r_GSz1rIdOnyhxvr-8BnDjG1GU4-jGFNyqxqrBtOZQRDMGXpvJjBvdbluR39VnQfrYSklaJJvefJGXyWt8IXreM7iCbCR1EBp4BnsuS30xuB47os4FFN79H9MOmAvOLZvoECAYoGIjW7_7JP96Dc6qa0lqpB8ur5ZnOiWja1IIM2ERF9SQEXA5yov7FBkmO7uC9umViMw',
  deepSleep: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY540X-2VqQHMB4K-AfuQhiC1YIf0Hll34yBunErQ-DMSXsjSaOC6JQ3Xb9CbJnUnHR8e8A53ACmli_8UZKyyO13SnzveMVDxOvXNs8c3E4KoJFdf4k5xCk6n-QWZYQGvCmF-CupCWSWsXjJY5HXvw4W77V6NFUvpYsS6j82ZA2puRpZp-irXzOPZjLb_hB3INtPklZQI2ZLY2k9WoHGNreb2bl8gIrhiK6KNlotWT6vpVwt_ZOUMJYmlhUV-JiHHcaUj3x4LGhg',
  summerMix: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABAtIs9ypXFBGJPvj6taGfMewOFbw4NQzGnLzIy-jYunLWQcqpXBxSxeV46N3842McjStMJBOIdHYwe4QCeSBH3aKmIbKBoZvKJw2LmkZ_5mJHP3aoAOPJiNbFqgeFEakk-Bbh7QbsPgrvFLnDj5gvu50oy13Ql_mhB36Sr3YgtMukTO-lBtzj2kuxSVGsU4AXEiNL6RMWLJVBKbyd2HIujafhEsFl1IM6UWgH04vnVr9grpiebpkvlr264sKo8RFmei5QE9GHTA',

  globalHits: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNmDe4aWp8WjLnTIGnHp61YFb2vQbkzWvmd6yAfpAHzJDILmY85MX-VzaU_e4Ohf86MRaJdgNRd8XxAD7nhDD9AhjtWtCBD30PiAS2MgLg44TKHVpbPGOjvfP3OWBDtPBm3GmKHl2AZ0VRjYeCIONEocOXgEuTGfkELy93b3W2taD2sXyzh03KgCogoir-AUBuJi3Oah53-sVU1wNFjsxtD44hJcf72sI0h4kdCl9E0cN_Z4l8aOFuaScHZ1wpI1i4Q2DdMvxmhw',
  // Library Circular Artists and pod
  velvetEchoes: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrwCW3ZfYRrjr3_Vayz40OpQRwLLRqq0-TLBD9uj36sEzN3owoWITOS8Vc1QaRPs7GJF6HeWCQdBfmKRCe0bhEBuQu7nNnBbFNT9wj5crfsMB2EEuzZ7m6LqCPkZO28QpCDFvRTP4fcYb3B0iZ2dIfyACs7z_eCAdq6iamMlngOoEENqETmKRwe6svti_NkCSHID5K-3DLaVev1QIMCdGc39AIx346ZIg7iZUr4j1Wb5RHZ_pXc0EnUQQH48heyEV_Hu19z2zGPA',
  cyberpunk2077: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcCA2trn1D80lSkOrPr7KbmEOl3g1j_pAowebBl4mh80PNQ3HFqg86gXsw15IV9KdkNKy2wU97sN8anlt1-6uoFSGxm91Yae8KGoZFGoOsLaI7c4ZGEDGY2LGaFUxE8cjK-h5yOHIEwkx4WgIMg6Q6eG43DjeNxAVxoVh_KiKeV753O_St1giXyAYnmeC7wYnr87NakjEDHiszKf80xrQ9pdI50VjWsJ9Y2ngp1v0m-myXg19h5nfY03Ky3MEMnODPNMLT4diUMg',
  neonHorizon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGLFXE_YBhUdmI2QM-gG4pF4eImmrfpapa0Gmwb_f-KMdvLNxWwd-i8v17h1WNLWN71f7WHXLo1z2F8KhSbjBJfZbyvmaFt7Kq8xpaCrTjJxelAQeV5Q0RH3TO8O8tKpKUREoDHHeFHui6oxKwzAwDyjxgW_YU2kTrBB5wFurwaoXT_lcItIcNNLzCy-FDDNLMA7m05DWE-03bciFpCXk9jAzQoJS-NjZtyz76a07OLsGvpBnu3wclgTdWdQkP3e8C5dcBVO1npQ',
  internalDialogues: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzRL1OKamjhqk1idZ4mFgmgA4pJFdD5W7N0E_vMvC_lgsb8ijgMbnrey7ZflaKPyzdwCMFS0ru1Rfup9GfN2TD2ajhqEMDX0J88kt7blwZko_YJVbBts3QSx4BFy0CFvPdT5YRqYzC6SA90s4Qt3YnaU2YpAz7PM4uZfPBleD-mH2n6R1Q6kIb-wzBjcOUmDwCbo9jFMkXHScNXEHWS4PieBdzxxj0Oe4OpasmsvdmXCdMVpOWaT_fL9nO-Ib9c8uDdA3YeBsGHQ',
  techDeepDive: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZSDwVZps0_a-W-xXreAYgRnMn7N2nybMjW6C0gMM1fkQAvpPHSMur0uPow5vqa8i-z3NfoCEKExvgF_OD-E_hCTRLewnMubG8e5kweZzYv5WS9KvpZz2PkrUI-uwK_zadVAyFAfgR_ufztsIn-RcVzmzpcxVGEQVwCOtqxqAj0PWJceXe4mkfgeZlg4VNTNMYJRxh-5RIpHai87KqSNnMK-1ToB_kGw9jsAdJ75MrbhSbZSC9sQtuThUN9BZ2ikML5anidEwDbA',

  // Made for you
  releaseRadar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_YbTO3ML__VPf_5vjZlKYLFJWHhTsaxenFwrJisjYycemT6QuNXpouZT0m5KfdkI2ncQHR5CQ-04BdvWbqBxz3sayQLawipoSPjfIQ0cGt0TfwOqDonnWxen1KUvpI1mtIYWPWmTkymnJnY5LsTBPdVZdPa1GR3x5DKi7bRjkQjr4w4G3ojmntD6yLL2jL6G-MHrnOGcRIOknavzGGhsWXRN6af-5A_25kNsgbfwW7W-FgdoDuLS2OHvVVm2jdpUGt1uPhSsCpA',
  onRepeat: '/on-repeat.png',
  rockMix: '/rock-mix.png',
  popMix: '/pop-mix.png',
  podcastStoicism: '/podcast-stoicism.jpg',

  // Good Morning cards
  dailyMix1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOrfWV7kcvw7EMYxWvPWAkhDR_TrpGtPgSBPMAN9bDDwb1P3QPUAsiAsDoWT1X9muGq6Okye2oU_qBEciY-VAUqg8Z_9feMJ5RhHu-J00IG-uCq7YyIlTCCmm2JEmVNnZWBckJiUUDRQkf7ihOAwEwo6NpnEzzOnAggl5VpXqfPvSBK2Cc6epirLnefUk3cB2j61hESAGMOgO7N3F3IiBy8sAYpxFSNuPudgZrwDHohr5Os-JK2bbbMV_a-s4v1TBw_O0HQ1Lp_Q',
  discoverWeekly: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlsB6PeqnAnjHBvIBBCIJ49z0glSn_ggs6k0tN1cJpmjLy1eKc4SEk3Oj0l6TF4wsy7m76Kx8G6bNz1r3OY5ABIUco_YJqSsKpX2J-FxrUA7CSrfDTX6gLV9ip8RR8kOk8zqzDN84CkM5x_1yg87cQEiEDa-D2CPmPXKI9nwclA70LXCs4JA-TVAJjqDZE7x13MojJy_ozDzkfVahOs8iP1xhs9w8HaUofvlHWNO9TIs9N-igq_GhGfkGe-mxIJ2vvJ_BUpG7I2g',
  lofiBeats: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAABqBly6y2Om1qZyD4iP1TSVpLDiEcG121eILFYvr0LbAi3OICuMHEeH21LvVLtLZvrLJrNuWo-MP6wEFZXDKXgmZdeXZEstoR2vSdjMxg1ntcezdaWXGih5DmKoDYO8m7gIN_T8Tcsq6hbefdXf6E-Cv9BcAdfEqRuyLzhTCQ6XHLkRkHu0rZ77bZbbpK5IjHFkzkEvaLe3fYz9FZdNIuuWSzARGyBbsxE7TaRlLsaJZoe-CK89pE-MttQT2gkqQppc-URaog0A',
  topHits: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYpIR7woGGo_wdEwOzq1ee3JIDWY2uoCKMF2-HgrjrnRsPQGbtmmX4VnhrLgxU-YPDEQpWEcXJMunXA24wHdtlrfFdc8ZG1afS5qzVEDyqeWEzhR4qWUeItG1vnkiT3OWZyWIBiW8QwiEAEnOlU0gPp_i-XBJWxmep5b2YiSAyRgtpiWPSdPCJW3SdFz_R7jaN_zxT1JFM219-pP1YptBdu1q73AS54d2d48BXFxNCNSx8xY8P1o3NOkqYSuigSmRUmdVd-i97kA',
  chillMix: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUGszozDZvHAXMHdd1t22QMuBMW79avElMqRFjkqT1raj98KUmuP1HaDOECaLv8HdLWaCHZ3qWr_DpFoExMcprf9nx58G2IDWQNTnlKITO9rLPejHdLMdZ7BhZtNtpbLXG0QVkTVOusathrHwJdjEnrpBoile2IWB_rD0QOtW6LxwFvasH4rIJH1dTxPq5UXzp7u9GRqs6BpbaUPdnVnhwAmU08feCJB_vq1XEYAjTa2PYystjjt1Q8NRPCvdvRjqKvJbLX0iNaQ',
  newMusicFriday: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4SJ6U9OAFzJC8jHF9GRxj6gL9yANVg9_p0cPZ1GeMuYtbwEuSCSIj8RVmNFGgnyMmYbBZStJsnQvAQfoswOZ8SXA4IyEgDOQWPfiDiYm449qCuMg7nDKrpsufuS64ClT7nywnPCFsxr3Z58QkkhKfNGa6TyPJiqsmbongxW1tWUtYxfIygmqtm7AcGvJrtUDoK2hgenL5DXpiNZr3r4uAOPm0IWCkCEy2P2akyc214DtGhPZRNGX6dy91o0_UN0ClxfkhfQPhcg',

  // Now Playing artist headshot
  starboy: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaSBfshaZcnTRAz90dKgXZblie2T4S4cnK_w&s',
  kicauMania: 'https://i.scdn.co/image/ab67616d00001e0212026585b4cd9aa94fea5514',
  mbgBahlil: 'https://sultranesia.com/wp-content/uploads/2025/09/67c6a70245c01.jpg',
  onePiece: 'https://i.scdn.co/image/ab67616d0000b273e99dad7e45ebb84c5db1e89f',
  perungguIniAbadi: 'https://i.scdn.co/image/ab67616d0000b273f14b39abd5730c7ec36114be',
  djJanganMalu: '/dj-jangan-malu-malu-boy.jpg',
  waroxPonorogo: '/warox-ponorogo.jpg',
  bandaNeiraPatahTumbuh: 'https://images.genius.com/a9aa19092b56b4f8ad079c74a6787993.1000x1000x1.png',
  lyoidYou: 'https://i.scdn.co/image/ab67616d0000b27323d59254da6c25c82ba868aa',
  tenxy: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQy1g7BztrfdBq7N_NR4UpSYwMtK92sEaWIA&s',
  theScript: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Script_album.jpg/250px-Script_album.jpg',
  hindia: 'https://i.scdn.co/image/ab67616100005174b786cb6de7505caff17fe11f',
  noSurprisesRadio: 'https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856',
  djFypTiktok: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL-3cOYc60lF6mMFksPt6Gy0hWfWZrUIw1RQ&s',
  scottStreet: 'https://i.scdn.co/image/ab67616d0000b2732a5edd6218037175ddf7c2c8'
};

// Raw tracks available for synthesis & dynamic playback controls
export const allTracks: Track[] = [
  {
    id: 'starboy',
    title: 'Starboy',
    artist: 'The Weeknd, Daft Punk',
    album: 'Starboy',
    coverUrl: images.starboy,
    duration: '4:33',
    durationSeconds: 230,
    isLiked: true,
    youtubeUrl: 'https://youtu.be/34Na4j8AVgA?si=SxpmstwXO2aUwXf4',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/34Na4j8AVgA'
  },
  {
    id: 'scott-street',
    title: 'Scott Street',
    artist: 'Phoebe Bridgers',
    album: 'Stranger in the Alps',
    coverUrl: images.scottStreet,
    duration: '5:06',
    durationSeconds: 306,
    youtubeUrl: 'https://youtu.be/EM1t8H_PE78?si=CoqaBt61H0k_mRI9',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/EM1t8H_PE78'
  },
  {
    id: 'mbg-mas-bahlil-ganteng',
    title: 'MBG Mas Bahlil Ganteng',
    artist: 'Dash Music',
    album: 'MBG Viral Mix',
    coverUrl: images.mbgBahlil,
    duration: '2:00',
    durationSeconds: 120,
    youtubeUrl: 'https://youtu.be/zPWA5SX2uPc?si=Ele6tZpjy0a9ZRzQ',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/zPWA5SX2uPc'
  },
  {
    id: 'lyoid-you',
    title: 'Lyoid You',
    artist: 'Dash Music',
    album: 'Quick Picks',
    coverUrl: images.lyoidYou,
    duration: '4:28',
    durationSeconds: 268,
    youtubeUrl: 'https://youtu.be/YVLHaqeJzEk?si=stfv78sGdxxT4Pi4',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/YVLHaqeJzEk'
  },
  {
    id: 'tenxy',
    title: 'Tenxy',
    artist: 'Dash Music',
    album: 'Quick Picks',
    coverUrl: images.tenxy,
    duration: '3:20',
    durationSeconds: 200,
    youtubeUrl: 'https://youtu.be/qnbwUiSudIk?si=1hZ8GNRNLTsR9mnR',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/qnbwUiSudIk'
  },
  {
    id: 'the-script',
    title: 'The Script',
    artist: 'The Script',
    album: 'Quick Picks',
    coverUrl: images.theScript,
    duration: '4:00',
    durationSeconds: 240,
    youtubeUrl: 'https://youtu.be/gS9o1FAszdk?si=WSFcLRPw0x-qITZ3',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/gS9o1FAszdk'
  },
  {
    id: 'hindia',
    title: 'Hindia',
    artist: 'Hindia',
    album: 'Quick Picks',
    coverUrl: images.hindia,
    duration: '6:14',
    durationSeconds: 374,
    youtubeUrl: 'https://youtu.be/0FiJfOviW4U?si=xefeZ9zafQ2cUVBL',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/0FiJfOviW4U'
  },
  {
    id: 'no-surprises-radio',
    title: 'No Surprises Radio',
    artist: 'Radiohead',
    album: 'Quick Picks',
    coverUrl: images.noSurprisesRadio,
    duration: '3:50',
    durationSeconds: 230,
    youtubeUrl: 'https://youtu.be/LBt60dfwEBY?si=5ZgpWGwK-k0SKLW1',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/LBt60dfwEBY'
  },
  {
    id: 'dj-fyp-tiktok',
    title: 'DJ FYP Tiktok',
    artist: 'Dash Music',
    album: 'Quick Picks',
    coverUrl: images.djFypTiktok,
    duration: '5:50',
    durationSeconds: 350,
    youtubeUrl: 'https://youtu.be/v-yaSwVbbIQ?si=vhdpgTG1obOFuXKI',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/v-yaSwVbbIQ'
  },
  // Trending tracks
  {
    id: 'perunggu-ini-abadi',
    title: 'Ini Abadi',
    artist: 'Perunggu',
    album: 'Perunggu',
    coverUrl: images.perungguIniAbadi,
    duration: '3:52',
    durationSeconds: 232,
    youtubeUrl: 'https://youtu.be/qQDaxjLReck?si=lxrC1DjlIl1n1nSO',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/qQDaxjLReck'
  },
  {
    id: 'dj-jangan-malu-malu-boy',
    title: 'DJ Jangan Malu Malu Boy',
    artist: 'Dash Music',
    album: 'DJ Viral Mix',
    coverUrl: images.djJanganMalu,
    duration: '7:00',
    durationSeconds: 420,
    youtubeUrl: 'https://youtu.be/8vPsQINkL_U?si=QNXmlgg6F3euRcG-',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/8vPsQINkL_U'
  },
  {
    id: 'warox-ponorogo',
    title: 'Warox Ponorogo',
    artist: 'Kajawi',
    album: 'Warox Ponorogo',
    coverUrl: images.waroxPonorogo,
    duration: '4:29',
    durationSeconds: 269,
    youtubeUrl: 'https://youtu.be/JEtqqmW1G8o?si=Jwl9_38jLeKPMCy8',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/JEtqqmW1G8o'
  },
  {
    id: 'banda-neira-patah-tumbuh',
    title: 'Yang Patah Tumbuh, Yang Hilang Berganti',
    artist: 'Banda Neira',
    album: 'Yang Patah Tumbuh, Yang Hilang Berganti',
    coverUrl: images.bandaNeiraPatahTumbuh,
    duration: '6:33',
    durationSeconds: 393,
    youtubeUrl: 'https://youtu.be/DP7dd2_SIvI?si=KdTGCpn2KVsRTdv7',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/DP7dd2_SIvI'
  },
  {
    id: 'kicau-mania',
    title: 'Kicau Mania ',
    artist: '',
    album: '',
    coverUrl: images.kicauMania,
    duration: '3:50',
    durationSeconds: 230,
    youtubeUrl: 'https://youtu.be/5k4llr0of_k?si=6kG09iv_de4VrF92',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/5k4llr0of_k'
  },
  {
    id: 'one-piece-we-did-it',
    title: 'Memories',
    artist: 'Maki Otsuki',
    album: 'Ost one piece',
    coverUrl: images.onePiece,
    duration: '4:31',
    durationSeconds: 271,
    youtubeUrl: 'https://youtu.be/cWWjANOisLo?si=vtt0hQBmkQAjMXrB',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/cWWjANOisLo'
  },
  {
    id: 'one-piece-stealthy-night-shadow',
    title: 'Stealthy Night Shadow',
    artist: 'One Piece Original Soundtrack',
    album: 'Ost one piece',
    coverUrl: images.onePiece,
    duration: '3:16',
    durationSeconds: 196
  },
  {
    id: 'one-piece-gum-gum-bazooka',
    title: 'Gum-Gum Bazooka!!',
    artist: 'One Piece Original Soundtrack',
    album: 'Ost one piece',
    coverUrl: images.onePiece,
    duration: '2:35',
    durationSeconds: 155
  },
  {
    id: 'podcast-stoicism',
    title: 'Filosofi Stoicism: Belajar Menjadi Tak Tergoyahkan (Filsafat Stoikisme/Filosofi Teras) | Part 2',
    artist: 'Ardhianzy',
    album: 'Podcast Episode',
    coverUrl: images.podcastStoicism,
    duration: '13:52',
    durationSeconds: 832,
    youtubeUrl: 'https://youtu.be/lplwONPDUHI?si=lCxOHvmfvQUGW8Hi',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/lplwONPDUHI'
  }
];

// Helper to get tracks by IDs or search keywords
export function getTrack(id: string): Track {
  return allTracks.find(t => t.id === id) || allTracks[0];
}

export const recentlyPlayed = [
  getTrack('scott-street'),
  getTrack('perunggu-ini-abadi'),
  getTrack('banda-neira-patah-tumbuh'),
  getTrack('starboy'),
  getTrack('hindia'),
  getTrack('dj-fyp-tiktok')
];

export const goodMorningItems = [
  { id: 'daily-mix-1', title: 'Daily Mix 1', coverUrl: images.dailyMix1, tracks: recentlyPlayed },
  { id: 'discover-weekly', title: 'Discover Weekly', coverUrl: images.discoverWeekly, tracks: [getTrack('starboy'), getTrack('scott-street')] },
  { id: 'lo-fi-beats', title: 'Lo-fi Beats', coverUrl: images.lofiBeats, tracks: [getTrack('scott-street'), getTrack('perunggu-ini-abadi')] },
  { id: 'top-hits', title: 'Top Hits', coverUrl: images.topHits, tracks: [getTrack('starboy'), getTrack('banda-neira-patah-tumbuh')] },
  { id: 'chill-mix', title: 'Chill Mix', coverUrl: images.chillMix, tracks: [getTrack('scott-street'), getTrack('hindia')] },
  { id: 'new-music-friday', title: 'New Music Friday', coverUrl: images.newMusicFriday, tracks: [getTrack('dj-fyp-tiktok'), getTrack('lyoid-you')] }
];

export const topTrending = [
  { id: 'kicau-mania-trend', title: 'Musik Kicau Mania', subtitle: 'NDARBOY GENK x BANDITOZ YAOW 86', coverUrl: images.kicauMania, color: '#122417', tracks: [getTrack('kicau-mania')] },
  { id: 'perunggu-ini-abadi', title: 'Ini Abadi', subtitle: 'Perunggu', coverUrl: images.perungguIniAbadi, color: '#15130f', tracks: [getTrack('perunggu-ini-abadi')] },
  { id: 'dj-jangan-malu-malu-boy', title: 'DJ Jangan Malu Malu Boy', subtitle: 'DJ Viral Mix', coverUrl: images.djJanganMalu, color: '#13111c', tracks: [getTrack('dj-jangan-malu-malu-boy')] },
  { id: 'warox-ponorogo', title: 'Warox Ponorogo', subtitle: 'Kajawi', coverUrl: images.waroxPonorogo, color: '#2b2a29', tracks: [getTrack('warox-ponorogo')] },
  { id: 'banda-neira-patah-tumbuh', title: 'Yang Patah Tumbuh', subtitle: 'Banda Neira', coverUrl: images.bandaNeiraPatahTumbuh, color: '#141414', tracks: [getTrack('banda-neira-patah-tumbuh')] }
];

export const madeForYou = [
  { id: 'ost-one-piece', title: 'Ost one piece', subtitle: 'We Did It! · Stealthy Night Shadow · Gum-Gum Bazooka!!', coverUrl: images.onePiece, tracks: [getTrack('one-piece-we-did-it'), getTrack('one-piece-stealthy-night-shadow'), getTrack('one-piece-gum-gum-bazooka')] },
  { id: 'on-repeat', title: 'On Repeat', subtitle: 'Songs you\'ve been listening to a lot lately.', coverUrl: images.onRepeat, tracks: [getTrack('scott-street'), getTrack('hindia')] },
  { id: 'rock-mix', title: 'Rock Mix', subtitle: 'Arctic Monkeys, Red Hot Chili Peppers, and more.', coverUrl: images.rockMix, tracks: [getTrack('banda-neira-patah-tumbuh')] },
  { id: 'pop-mix', title: 'Pop Mix', subtitle: 'The hottest pop tracks curated just for you.', coverUrl: images.popMix, tracks: [getTrack('starboy'), getTrack('perunggu-ini-abadi')] }
];

export const browseCategories: BrowseCategory[] = [
  { id: 'pop', name: 'Pop', color: '#8d67ab', coverUrl: images.pop, tracks: [getTrack('starboy'), getTrack('scott-street')] },
  { id: 'hip-hop', name: 'Hip-Hop', color: '#ba5d07', coverUrl: images.hiphop, tracks: [getTrack('starboy'), getTrack('dj-fyp-tiktok')] },
  { id: 'rock', name: 'Rock', color: '#e8115b', coverUrl: images.rock, tracks: [getTrack('banda-neira-patah-tumbuh')] },
  { id: 'podcasts', name: 'Podcasts', color: '#27856a', coverUrl: images.podcasts, tracks: [getTrack('podcast-stoicism')] },
  { id: 'mood', name: 'Mood', color: '#1e3264', coverUrl: images.mood, tracks: [getTrack('scott-street'), getTrack('perunggu-ini-abadi')] },
  { id: 'gaming', name: 'Gaming', color: '#503750', coverUrl: images.gaming, tracks: [getTrack('dj-jangan-malu-malu-boy'), getTrack('dj-fyp-tiktok')] },
  { id: 'latin', name: 'Latin', color: '#e1118c', coverUrl: images.latin, tracks: [getTrack('starboy')] },
  { id: 'dance', name: 'Dance', color: '#d84000', coverUrl: images.dance, tracks: [getTrack('dj-fyp-tiktok'), getTrack('dj-jangan-malu-malu-boy')] }
];

// Complete list of library items including pins, badges, types, circular badges, etc.
export const legacyLibraryItems: LibraryItem[] = [
  {
    id: 'liked-songs',
    name: 'Liked Songs',
    type: 'playlist',
    coverUrl: 'gradient', // Flag for specialized Liked Songs icon
    subtitle: 'Playlist • 1,248 songs',
    pinned: true,
    tracks: [getTrack('starboy'), getTrack('scott-street'), getTrack('perunggu-ini-abadi')]
  },
  {
    id: 'new-episodes',
    name: 'New Episodes',
    type: 'podcast',
    coverUrl: 'podcast-green', // Flag for podcast green notifier
    subtitle: 'Updated Monday',
    pinned: false,
    tracks: []
  },
  {
    id: 'velvet-echoes',
    name: 'The Velvet Echoes',
    type: 'artist',
    coverUrl: images.velvetEchoes,
    subtitle: 'Artist',
    tracks: [getTrack('scott-street')]
  },
  {
    id: 'cyberpunk-pulse',
    name: 'Cyberpunk Pulse 2077',
    type: 'playlist',
    coverUrl: images.cyberpunk2077,
    subtitle: 'Playlist • V-Series',
    tracks: [getTrack('dj-fyp-tiktok'), getTrack('dj-jangan-malu-malu-boy')]
  },
  {
    id: 'neon-horizon',
    name: 'Neon Horizon',
    type: 'artist',
    coverUrl: images.neonHorizon,
    subtitle: 'Artist',
    tracks: [getTrack('hindia'), getTrack('perunggu-ini-abadi')]
  },
  {
    id: 'internal-dialogues',
    name: 'Internal Dialogues',
    type: 'album',
    coverUrl: images.internalDialogues,
    subtitle: 'Album • Lucid State',
    tracks: [getTrack('perunggu-ini-abadi')]
  },
  {
    id: 'tech-deep-dive',
    name: 'The Tech Deep Dive',
    type: 'podcast',
    coverUrl: images.techDeepDive,
    subtitle: 'Podcast • Daily Byte',
    tracks: []
  }
];

// Main library playlists shown in the left sidebar and Library page.
export const libraryItems: LibraryItem[] = [
  {
    id: 'library-kicau-mania',
    name: 'Kicau Mania',
    type: 'playlist',
    coverUrl: images.kicauMania,
    subtitle: 'Playlist • Ndarboy Genk x Banditoz',
    pinned: true,
    tracks: [getTrack('kicau-mania')]
  },
  {
    id: 'library-mbg-bahlil',
    name: 'MBG Mas Bahlil',
    type: 'playlist',
    coverUrl: images.mbgBahlil,
    subtitle: 'Playlist • Viral Mix',
    tracks: [getTrack('mbg-mas-bahlil-ganteng')]
  },
  {
    id: 'library-starboy',
    name: 'Starboy',
    type: 'playlist',
    coverUrl: images.starboy,
    subtitle: 'Playlist • The Weeknd, Daft Punk',
    tracks: [getTrack('starboy')]
  },
  {
    id: 'library-memories',
    name: 'Memories',
    type: 'playlist',
    coverUrl: images.onePiece,
    subtitle: 'Playlist • Maki Otsuki',
    tracks: [getTrack('one-piece-we-did-it')]
  }
];
