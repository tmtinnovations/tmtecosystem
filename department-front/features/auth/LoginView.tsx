import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  User, 
  Zap, 
  ChevronRight, 
  Activity, 
  Eye, 
  EyeOff 
} from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate secure authentication process
    setTimeout(() => {
      onLogin();
      setIsAuthenticating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-tmt-black selection:bg-tmt-emerald/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tmt-emerald opacity-[0.07] blur-[150px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tmt-dark opacity-[0.15] blur-[150px]"></div>
      
      <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-zinc-950/60 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-12 pb-8 text-center border-b border-white/5 bg-white/[0.02]">
            <div className="w-20 h-20 bg-tmt-emerald/10 border border-tmt-emerald/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-tmt-emerald/20 transition-transform hover:scale-105 duration-500">
              <Shield className="w-10 h-10 text-tmt-emerald" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">TMT Department</h1>
            <p className="text-[10px] text-tmt-emerald font-black uppercase tracking-[0.4em] mt-2 opacity-90">Central Operations Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-7">
            <div className="space-y-5">
              {/* Personnel ID */}
              <div className="space-y-2">
                <label htmlFor="personnel-id" className="block text-xs font-semibold text-gray-300 ml-1">
                  Personnel ID or Email
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" aria-hidden="true" />
                  <input 
                    id="personnel-id"
                    type="text" 
                    required
                    placeholder="Enter assigned credentials"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/20 focus:border-tmt-emerald/60 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Secure Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="password" className="block text-xs font-semibold text-gray-300">
                    Secure Password
                  </label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-tmt-emerald transition-colors" aria-hidden="true" />
                  <input 
                    id="password"
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-tmt-emerald/20 focus:border-tmt-emerald/60 transition-all duration-300"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end px-1">
                  <button type="button" className="text-[11px] font-bold text-tmt-emerald/80 hover:text-tmt-emerald transition-colors uppercase tracking-wider">
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Remember ID Checkbox */}
              <div className="flex items-center gap-3 px-1">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className={`w-5 h-5 border rounded-md transition-all duration-200 flex items-center justify-center ${rememberMe ? 'bg-tmt-emerald border-tmt-emerald' : 'bg-white/5 border-white/20 group-hover:border-tmt-emerald/50'}`}>
                      {rememberMe && <Zap className="w-3 h-3 text-white fill-current" />}
                    </div>
                  </div>
                  <span className="ml-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                    Remember identification
                  </span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isAuthenticating}
              className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] transition-all relative overflow-hidden group
                ${isAuthenticating 
                  ? 'bg-tmt-emerald/20 text-tmt-emerald cursor-wait' 
                  : 'bg-tmt-emerald text-white hover:bg-tmt-emerald/90 hover:shadow-2xl hover:shadow-tmt-emerald/30 active:scale-[0.98]'
                }`}
            >
              {isAuthenticating ? (
                <>
                  <Activity className="w-4 h-4 animate-pulse" />
                  Verifying Access...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
                  Secure Sign In
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
              {/* Subtle hover effect overlay */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
            </button>
          </form>

          {/* Footer Metadata */}
          <div className="p-6 bg-black flex justify-between items-center text-[9px] font-black text-gray-500 uppercase tracking-[0.15em] border-t border-white/5">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              Encrypted Session
            </span>
            <span className="opacity-60">System Version 2.5.4</span>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">
          Authorized Personnel Only • Monitoring Active
        </p>
      </div>
    </div>
  );
};

export default LoginView;