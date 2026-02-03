/**
 * Login Page Client Component
 * Handles login and registration with redirect support
 */
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';

export function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const redirectPath = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isLogin) {
        // Login successful
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 1000);
      } else {
        // Registration successful
        setSuccess('Registration successful! Please check your email to verify your account.');
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ email: formData.email, password: '', name: '' });
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-strong">
          <div className="text-center mb-8">
            <Heading level={1} className="text-3xl mb-2 gradient-text">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Heading>
            <Text size="base" color="secondary">
              {isLogin ? 'Login to access your dashboard' : 'Join Jakarta Party Squad'}
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (register only) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                placeholder="••••••••"
                required
                minLength={8}
              />
              {!isLogin && (
                <Text size="xs" color="secondary" className="mt-1 text-text-tertiary">
                  Minimum 8 characters
                </Text>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <Text size="sm" className="text-red-300">
                  {error}
                </Text>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <Text size="sm" className="text-green-300">
                  {success}
                </Text>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <Text size="sm" color="secondary">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                className="text-secondary hover:text-accent transition-colors font-semibold"
              >
                {isLogin ? 'Create one' : 'Login'}
              </button>
            </Text>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-text-tertiary hover:text-secondary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
