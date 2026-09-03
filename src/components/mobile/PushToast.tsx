import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ArrowRight, X, Sparkles, Zap, Tag, Calendar } from 'lucide-react';

export const PushToast: React.FC = () => {
  const { activeToastPush, dismissToastPush, handleDeepLink } = useApp();

  useEffect(() => {
    if (activeToastPush) {
      const timer = setTimeout(() => {
        dismissToastPush();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [activeToastPush, dismissToastPush]);

  if (!activeToastPush) return null;

  const handleClickToast = () => {
    if (activeToastPush.deepLink) {
      handleDeepLink(activeToastPush.deepLink.type, activeToastPush.deepLink.targetId);
    }
    dismissToastPush();
  };

  const getIcon = () => {
    switch (activeToastPush.type) {
      case 'breaking_alert':
        return <Zap className="w-5 h-5 text-[#A0322D] fill-[#A0322D]" />;
      case 'promotion_alert':
        return <Tag className="w-5 h-5 text-[#1B5E34]" />;
      case 'personal_message':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-[#1B5E34]" />;
    }
  };

  return (
    <div className="absolute top-3 left-3 right-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div 
        onClick={handleClickToast}
        className="bg-white/95 backdrop-blur-md text-[#112216] p-3.5 border border-[#1B5E34] shadow-2xl cursor-pointer hover:border-[#144928] transition group"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-[#F6F8F6] flex items-center justify-center shrink-0 border border-[#DCE5DF]">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E34] flex items-center gap-1 font-mono">
                <Sparkles className="w-2.5 h-2.5" />
                DIMAC Push Notification • Vừa xong
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dismissToastPush();
                }}
                className="text-[#798C7F] hover:text-[#112216] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-[#112216] line-clamp-1 group-hover:text-[#1B5E34] transition font-brand-sans">
              {activeToastPush.title}
            </h4>
            <p className="text-[11px] text-[#526357] line-clamp-2 mt-0.5 leading-relaxed">
              {activeToastPush.body}
            </p>

            {activeToastPush.deepLink && (
              <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#1B5E34] group-hover:translate-x-0.5 transition font-mono">
                <span>{activeToastPush.deepLink.label || 'Chạm để xem chi tiết'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
