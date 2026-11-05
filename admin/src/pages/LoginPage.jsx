import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRAND } from '../utils/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@propertygateway.in');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-emerald-600 via-amber-400 to-emerald-500 shadow-xl mb-4">
          <img src="/logo.png" alt="Property Gateway" className="w-full h-full rounded-full object-cover bg-black" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
          Property Gateway
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Chennai Real Estate Admin & Lead Desk
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-6 shadow-xl rounded-xl sm:px-10 border border-slate-700/80">
          
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@propertygateway.in"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="rounded-lg bg-slate-900/80 p-3.5 border border-slate-700 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  Quick Demo Access
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-slate-300 hover:text-white underline underline-offset-2 text-[11px]"
                >
                  Auto Fill
                </button>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Email: <code className="text-slate-200">admin@propertygateway.in</code><br />
                Password: <code className="text-slate-200">admin123</code>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-slate-500">
              Developed by Strategy 360 Digital Marketing Agency
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
