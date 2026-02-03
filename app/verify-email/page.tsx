/**
 * Email Verification Page
 * /verify-email?token=xxx
 */
'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const hasVerified = useRef(false); // Prevent double verification

  useEffect(() => {
    // Skip if already verified
    if (hasVerified.current) {
      return;
    }

    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Token verifikasi tidak ditemukan');
        return;
      }

      // Mark as verified before API call to prevent double calls
      hasVerified.current = true;

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email berhasil diverifikasi!');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/?login=true');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Terjadi kesalahan saat verifikasi');
          // Reset flag on error so user can retry
          hasVerified.current = false;
        }
      } catch {
        setStatus('error');
        setMessage('Terjadi kesalahan. Silakan coba lagi.');
        // Reset flag on error so user can retry
        hasVerified.current = false;
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary flex items-center justify-center py-12 px-4">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-surface/80 backdrop-blur-xl rounded-3xl border border-secondary/20 shadow-glass p-8 sm:p-12">
            
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {status === 'loading' && (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-secondary animate-spin" />
                </div>
              )}
              {status === 'success' && (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center animate-scale-in">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
              )}
              {status === 'error' && (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500/20 to-rose-500/20 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-400" />
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              {status === 'loading' && 'Memverifikasi Email...'}
              {status === 'success' && 'Email Terverifikasi!'}
              {status === 'error' && 'Verifikasi Gagal'}
            </h1>

            {/* Message */}
            <p className="text-text-secondary text-center mb-8">
              {message}
            </p>

            {/* Actions */}
            {status === 'success' && (
              <div className="space-y-4">
                <p className="text-sm text-text-tertiary text-center">
                  Redirecting to login in 3 seconds...
                </p>
                <Link
                  href="/?login=true"
                  className="block w-full px-6 py-3 text-center text-sm font-semibold bg-gradient-to-r from-secondary to-accent rounded-full hover:shadow-glow transition-all duration-300"
                >
                  Login Sekarang
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <Link
                  href="/"
                  className="block w-full px-6 py-3 text-center text-sm font-semibold bg-gradient-to-r from-secondary to-accent rounded-full hover:shadow-glow transition-all duration-300"
                >
                  Kembali ke Beranda
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="block w-full px-6 py-3 text-center text-sm font-medium text-text-secondary border border-secondary/20 rounded-full hover:bg-secondary/10 transition-all duration-300"
                >
                  Coba Lagi
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary flex items-center justify-center py-12 px-4">
          <Container>
            <div className="max-w-md mx-auto">
              <div className="bg-surface/80 backdrop-blur-xl rounded-3xl border border-secondary/20 shadow-glass p-8 sm:p-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-secondary animate-spin" />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Loading...
                </h1>
              </div>
            </div>
          </Container>
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
