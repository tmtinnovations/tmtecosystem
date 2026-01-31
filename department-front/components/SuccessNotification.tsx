import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X, Sparkles } from 'lucide-react';

interface SuccessNotificationProps {
  isVisible: boolean;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  isVisible,
  type,
  title,
  message,
  onClose
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const configs = {
    success: {
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-600',
      shadow: 'shadow-emerald-500/30',
      border: 'border-emerald-400/20',
      iconBg: 'bg-white/20',
    },
    error: {
      icon: XCircle,
      gradient: 'from-rose-500 to-rose-600',
      shadow: 'shadow-rose-500/30',
      border: 'border-rose-400/20',
      iconBg: 'bg-white/20',
    },
    warning: {
      icon: AlertTriangle,
      gradient: 'from-amber-500 to-amber-600',
      shadow: 'shadow-amber-500/30',
      border: 'border-amber-400/20',
      iconBg: 'bg-white/20',
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
      {/* Backdrop glow */}
      <div className={`absolute inset-0 bg-gradient-radial from-${type === 'success' ? 'emerald' : type === 'error' ? 'rose' : 'amber'}-500/5 to-transparent`} />
      
      {/* Notification Card */}
      <div className={`
        relative pointer-events-auto
        bg-gradient-to-br ${config.gradient}
        rounded-3xl p-6 min-w-[320px] max-w-md
        shadow-2xl ${config.shadow}
        border ${config.border}
        animate-in zoom-in-95 fade-in duration-500
        backdrop-blur-xl
      `}>
        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full blur-xl" />
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white/80" />
        </button>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl ${config.iconBg} flex items-center justify-center mb-4 backdrop-blur-sm`}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Sparkle decoration for success */}
          {type === 'success' && (
            <Sparkles className="absolute top-0 right-8 w-5 h-5 text-white/40 animate-pulse" />
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>

          {/* Message */}
          <p className="text-sm text-white/80">{message}</p>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full mt-5 overflow-hidden">
            <div 
              className="h-full bg-white/60 rounded-full animate-[shrink_4s_linear_forwards]"
              style={{ 
                animation: 'shrink 4s linear forwards',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default SuccessNotification;
