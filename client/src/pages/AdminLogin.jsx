import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, AlertCircle, KeyRound, CheckCircle } from 'lucide-react';

export default function AdminLogin({ setCurrentPage }) {
  const { login, loading } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState('admin');
  const [password, setPassword] = useState('TridentAdmin@2026!');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(usernameOrEmail, password);
    if (res.success) {
      setCurrentPage('admin');
    } else {
      setError(res.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full rounded-3xl bg-white dark:bg-navy-900 border-2 border-pinkTheme-200/90 dark:border-white/10 shadow-2xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-pinkTheme-100 border border-pinkTheme-200 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-black text-2xl text-black dark:text-white">
            Command Center Login
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Authorized Personnel Access Only • SSL 256-Bit Encrypted
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-pinkTheme-50/50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-black dark:text-white focus:outline-none focus:border-primary-500 focus:bg-white text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating Officer...' : 'Authorize & Enter Command Center'}
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="p-3.5 rounded-xl bg-pinkTheme-50 dark:bg-navy-950 border border-pinkTheme-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-400 space-y-1">
          <p className="font-bold text-black dark:text-slate-200 flex items-center">
            <Shield className="w-3.5 h-3.5 text-primary-600 mr-1" />
            Default Administrator Credentials:
          </p>
          <p>User: <span className="font-mono text-primary-700 dark:text-primary-400 font-bold">admin</span></p>
          <p>Password: <span className="font-mono text-primary-700 dark:text-primary-400 font-bold">TridentAdmin@2026!</span></p>
        </div>

      </div>
    </div>
  );
}
