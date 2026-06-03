import React, { useState } from 'react';
import { Check, Mail, Lock, User } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (username: string) => void;
}

export default function RegisterModal({ isOpen, onClose, onRegisterSuccess }: RegisterModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Input validations
    if (!name.trim()) {
      setError('Masukkan nama lengkap Anda!');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan alamat email yang valid!');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi harus minimal 6 karakter!');
      return;
    }

    setIsSubmitting(true);

    // Simulate database registration call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Store user details in localStorage
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('registeredUser', JSON.stringify({ name: name.trim(), email: email.trim(), favoriteGenre: 'ambient' }));

      // delay 1.8 seconds to show success checkmark and let the user feel the premium flow
      setTimeout(() => {
        onRegisterSuccess(name);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop with elegant glassmorphism blur */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[365px] bg-[#171212] border border-white/5 rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8)] transform transition-all duration-300 scale-100 z-10 animate-in zoom-in-95 duration-200">

        {/* Dynamic Glow Background */}
        <div className="absolute -top-24 -left-20 w-56 h-56 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-20 w-56 h-56 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-on-surface-variant hover:text-white bg-white/5 hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center transition-all z-20 text-xs"
          title="Tutup"
        >
          ✕
        </button>

        {/* Success Screen Representation */}
        {isSuccess ? (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-75 duration-300">
            {/* Pulsing Success Ring */}
            <div className="relative w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/40 animate-pulse">
              <Check className="w-8 h-8 text-primary stroke-[3]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black tracking-tight text-white uppercase font-sans">
                Registrasi Berhasil!
              </h3>
              <p className="text-on-surface-variant text-[11px] max-w-xs mx-auto leading-relaxed">
                Selamat datang di <strong className="text-primary font-bold">D Music</strong>, <span className="text-white font-semibold">{name}</span>! Menyiapkan lagu favoritmu...
              </p>
            </div>

            {/* Micro loading bar */}
            <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-loader duration-[1500ms]" />
            </div>
          </div>
        ) : (
          /* Register Form Screen */
          <div className="p-5 space-y-4">

            {/* Header Branding with Custom Spotify-style Letter D Logo */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center relative shadow-lg shadow-primary/10">
                {/* Spotify-style D Logo */}
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-black fill-current transform -rotate-10">
                  <rect x="22" y="20" width="12" height="60" rx="5" />
                  <path d="M 45 32 A 18 18 0 0 1 45 68" stroke="black" strokeWidth="10" strokeLinecap="round" fill="transparent" />
                  <path d="M 52 22 A 28 28 0 0 1 52 78" stroke="black" strokeWidth="11" strokeLinecap="round" fill="transparent" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white font-sans uppercase tracking-wider">
                  Daftar Akun D Music
                </h3>
                <p className="text-[10px] text-on-surface-variant leading-relaxed max-w-[260px] mx-auto">
                  Cari lagu favorit dan dengerin musik bebas tanpa batas.
                </p>
              </div>
            </div>

            {/* Error Message banner */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] py-1.5 px-2.5 rounded-lg text-center font-medium animate-shake">
                ⚠️ {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Field: Username / Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">
                  Nama Lengkap / Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-on-surface-variant">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dasep hikmat"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full bg-black/40 text-[11px] p-2 pl-8.5 rounded-lg border border-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Field: Email */}
              <div className="space-y-1">
                <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">
                  E-mail
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-on-surface-variant">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Dasep@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full bg-black/40 text-[11px] p-2 pl-8.5 rounded-lg border border-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Field: Password */}
              <div className="space-y-1">
                <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">
                  Kata Sandi
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-on-surface-variant">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full bg-black/40 text-[11px] p-2 pl-8.5 rounded-lg border border-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-full hover:scale-[1.02] active:scale-98 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin border-2 border-black border-t-transparent rounded-full w-4 h-4" />
                ) : (
                  'Daftar Sekarang'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
