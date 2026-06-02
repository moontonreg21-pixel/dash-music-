import { useState } from 'react';
import { Info, X, ArrowLeft } from 'lucide-react';

interface WhatsNewViewProps {
  onBack: () => void;
}

export default function WhatsNewView({ onBack }: WhatsNewViewProps) {
  const [showBlueBanner, setShowBlueBanner] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'music' | 'podcast'>('music');

  return (
    <div className="min-h-screen text-white pb-32 animate-in fade-in slide-in-from-right duration-200">
      
      {/* 1. Header Alert Banner: Blue bar exactly like the image schema */}
      {showBlueBanner && (
        <div className="w-full bg-[#0d6efd] text-white p-3.5 flex items-start sm:items-center justify-between gap-3 relative select-none animate-in slide-in-from-top duration-300">
          <div className="flex items-start sm:items-center gap-2.5 max-w-[90%]">
            <Info className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0 text-white fill-transparent stroke-[2.5]" />
            <p className="text-xs sm:text-sm font-semibold tracking-wide leading-relaxed">
              Looking for the latest from creators you follow? Check the <a href="#music" onClick={(e) => { e.preventDefault(); setActiveFilter('music'); }} className="underline hover:text-white/85 transition-colors">Music</a> or <a href="#podcast" onClick={(e) => { e.preventDefault(); setActiveFilter('podcast'); }} className="underline hover:text-white/85 transition-colors">Podcast</a> feeds on Home
            </p>
          </div>
          <button 
            onClick={() => setShowBlueBanner(false)}
            className="p-1 hover:bg-[#0b5ed7] rounded-full transition-colors shrink-0 cursor-pointer"
            aria-label="Close notification banner"
            title="Tutup banner info"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Main Page Container */}
      <div className="px-6 py-6 max-w-2xl mx-auto space-y-6">
        
        {/* Navigation Indicator & Main Title */}
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-white text-xs font-bold transition-all bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Pencarian
          </button>

          <header className="space-y-1.5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
              What's New
            </h1>
            <p className="text-sm text-[#b3b3b3] font-medium leading-relaxed">
              The latest releases from artists, podcasts, and shows you follow.
            </p>
          </header>
        </div>

        {/* Filter Pill Tab Suite exactly matching the style in the input image */}
        <div className="flex gap-2.5 pt-1.5 select-none">
          <button
            onClick={() => setActiveFilter('music')}
            className={`py-2 px-4 rounded-full text-xs font-black transition-all cursor-pointer ${
              activeFilter === 'music' 
                ? 'bg-[#2a2a2a] text-white border border-[#3b3b3b]' 
                : 'bg-[#121212] hover:bg-[#1f1f1f] text-[#a7a7a7] hover:text-white border border-transparent'
            }`}
          >
            Music
          </button>
          
          <button
            onClick={() => setActiveFilter('podcast')}
            className={`py-2 px-4 rounded-full text-xs font-black transition-all cursor-pointer ${
              activeFilter === 'podcast' 
                ? 'bg-[#2a2a2a] text-white border border-[#3b3b3b]' 
                : 'bg-[#121212] hover:bg-[#1f1f1f] text-[#a7a7a7] hover:text-white border border-transparent'
            }`}
          >
            Podcast & Shows
          </button>
        </div>

        {/* Dynamic empty state content with extreme styling accuracy */}
        <div className="pt-16 pb-20 px-4 text-center space-y-3 animate-in fade-in duration-300">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
            We don't have any updates for you yet
          </h2>
          <p className="text-xs sm:text-sm text-[#a7a7a7] font-semibold max-w-md mx-auto leading-relaxed">
            When there's news, we'll post it here. Follow your favorite artists and podcasts to stay updated on them too.
          </p>
        </div>

      </div>
    </div>
  );
}
