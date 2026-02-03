/**
 * Login Modal Component
 * Premium cyber-punk styled authentication modal
 */
'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Mail, Lock, User, AlertCircle, CheckCircle2, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setRequiresVerification(false);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccess('Login berhasil!');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1000);
      } else {
        // Register requires email verification
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message || 'Registrasi berhasil! Cek email Anda untuk verifikasi.');
          // Don't close modal, let user see the success message
        } else {
          setError(data.error || 'Registrasi gagal');
        }
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Terjadi kesalahan';
      
      // Check if it's a verification error
      if (errorMessage.includes('verifikasi') || errorMessage.includes('verification')) {
        setRequiresVerification(true);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setError('');
    setSuccess('');
    setIsResending(true);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Email verifikasi berhasil dikirim ulang!');
        setRequiresVerification(false);
      } else {
        setError(data.error || 'Gagal mengirim email');
      }
    } catch {
      setError('Terjadi kesalahan saat mengirim email');
    } finally {
      setIsResending(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setSuccess('');
    setMode('login');
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setSuccess('');
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-bg-primary/90 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-surface/95 backdrop-blur-xl px-6 py-8 text-left shadow-glass transition-all sm:my-8 sm:w-full sm:max-w-md border-2 border-secondary/20">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-text-tertiary hover:text-secondary transition-colors duration-300 rounded-lg p-2 hover:bg-secondary/10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <Dialog.Title className="text-2xl font-bold gradient-text tracking-wide mb-2">
                    {mode === 'login' ? 'Login' : 'Daftar Akun'}
                  </Dialog.Title>
                  <p className="text-sm text-text-tertiary">
                    {mode === 'login'
                      ? 'Masuk ke akun Jakarta Party Squad'
                      : 'Buat akun baru untuk mulai party!'}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-300">{success}</p>
                  </div>
                )}

                {/* Resend Verification Button */}
                {requiresVerification && (
                  <div className="mb-4 p-4 bg-secondary/10 border border-secondary/20 rounded-lg space-y-3">
                    <p className="text-sm text-text-secondary">
                      Email belum diverifikasi. Cek inbox Anda atau kirim ulang link verifikasi.
                    </p>
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={isResending}
                      className="w-full px-4 py-2.5 text-sm font-medium text-secondary border border-secondary/30 rounded-lg hover:bg-secondary/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isResending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Kirim Ulang Email Verifikasi
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field (Register only) */}
                  {mode === 'register' && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-text-muted" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="block w-full pl-10 pr-3 py-3 bg-surface/50 border border-secondary/30 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-text-muted" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 bg-surface/50 border border-secondary/30 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-text-muted" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="block w-full pl-10 pr-3 py-3 bg-surface/50 border border-secondary/30 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300"
                        placeholder="Minimal 6 karakter"
                      />
                    </div>
                    {mode === 'register' && (
                      <p className="mt-1 text-xs text-text-muted">
                        Password harus minimal 6 karakter
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-bg-primary font-bold rounded-lg hover:shadow-glow-lg transition-all duration-400 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
                        <span>Memproses...</span>
                      </>
                    ) : mode === 'login' ? (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Masuk</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Daftar</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Switch Mode */}
                <div className="mt-6 text-center">
                  <button
                    onClick={switchMode}
                    className="text-sm text-text-tertiary hover:text-secondary transition-colors duration-300"
                  >
                    {mode === 'login' ? (
                      <>
                        Belum punya akun?{' '}
                        <span className="font-semibold text-secondary">Daftar sekarang</span>
                      </>
                    ) : (
                      <>
                        Sudah punya akun?{' '}
                        <span className="font-semibold text-secondary">Login</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Divider */}
                <div className="mt-6 pt-6 border-t border-secondary/20">
                  <p className="text-xs text-center text-text-muted">
                    Dengan login/daftar, Anda menyetujui{' '}
                    <a href="/terms" className="text-secondary hover:text-accent transition-colors">
                      Terms
                    </a>{' '}
                    dan{' '}
                    <a href="/privacy" className="text-secondary hover:text-accent transition-colors">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
