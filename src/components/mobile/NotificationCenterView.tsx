import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationType, LegalCategory } from '../../types';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  Bell, 
  Zap, 
  Tag, 
  Calendar, 
  CheckCheck, 
  SlidersHorizontal, 
  ArrowRight, 
  X,
  Check
} from 'lucide-react';

const CATEGORY_LIST: LegalCategory[] = [
  'M&A',
  'Đầu tư',
  'Bất động sản',
  'Năng lượng',
  'Tranh chấp & Tố tụng',
  'Thuế & Tài chính',
  'Lao động',
  'Doanh nghiệp'
];

export const NotificationCenterView: React.FC = () => {
  const { 
    notifications, 
    unreadNotificationCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    handleDeepLink,
    userProfile,
    updateNotificationPrefs,
    language
  } = useApp();

  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const [activeFilter, setActiveFilter] = useState<'ALL' | NotificationType>('ALL');
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'ALL') return true;
    return n.type === activeFilter;
  });

  const handleNotificationClick = (item: typeof notifications[0]) => {
    markNotificationAsRead(item.id);
    if (item.deepLink) {
      handleDeepLink(item.deepLink.type, item.deepLink.targetId);
    }
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'breaking_alert':
        return <Zap className="w-4 h-4 text-[#A0322D] fill-[#A0322D]" />;
      case 'promotion_alert':
        return <Tag className="w-4 h-4 text-[#1B5E34]" />;
      case 'personal_message':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-[#1B5E34]" />;
    }
  };

  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case 'breaking_alert': return t.notifications.flashAlertFilter;
      case 'promotion_alert': return t.notifications.voucherFilter;
      case 'personal_message': return t.notifications.consultationFilter;
      default: return 'Digest';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F6F8F6] text-[#112216] pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-[#DCE5DF]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1B5E34] uppercase tracking-[0.2em] font-mono">
              <Bell className="w-3.5 h-3.5 text-[#1B5E34]" />
              {t.notifications.headerSub}
            </div>
            <h1 className="text-base font-brand-sans font-bold text-[#112216] mt-0.5 uppercase tracking-wide">
              {t.notifications.headerTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#526357] hover:text-[#1B5E34] px-2.5 py-1.5 bg-[#F6F8F6] border border-[#DCE5DF] hover:border-[#1B5E34] transition"
                title={t.notifications.markAllRead}
              >
                <CheckCheck className="w-3.5 h-3.5 text-[#1B5E34]" />
                <span className="hidden sm:inline">{t.notifications.markAllRead}</span>
              </button>
            )}

            {/* FR-04: Preference settings */}
            <button
              onClick={() => setIsPrefModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#526357] hover:text-[#112216] px-2.5 py-1.5 bg-[#F6F8F6] border border-[#DCE5DF] hover:border-[#1B5E34] transition"
              title={t.notifications.settings}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1B5E34]" />
              <span className="hidden sm:inline">{t.notifications.settings}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mt-3">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider font-bold whitespace-nowrap transition border ${
              activeFilter === 'ALL'
                ? 'bg-[#1B5E34] text-white border-[#1B5E34] shadow-xs'
                : 'bg-white text-[#526357] border-[#DCE5DF] hover:text-[#112216]'
            }`}
          >
            {t.notifications.allFilter} ({notifications.length})
          </button>
          <button
            onClick={() => setActiveFilter('breaking_alert')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider font-bold whitespace-nowrap transition border ${
              activeFilter === 'breaking_alert'
                ? 'bg-[#A0322D] text-white border-[#A0322D]'
                : 'bg-white text-[#526357] border-[#DCE5DF] hover:text-[#112216]'
            }`}
          >
            ⚡ {t.notifications.flashAlertFilter}
          </button>
          <button
            onClick={() => setActiveFilter('promotion_alert')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider font-bold whitespace-nowrap transition border ${
              activeFilter === 'promotion_alert'
                ? 'bg-[#1B5E34] text-white border-[#1B5E34]'
                : 'bg-white text-[#526357] border-[#DCE5DF] hover:text-[#112216]'
            }`}
          >
            🎁 {t.notifications.voucherFilter}
          </button>
          <button
            onClick={() => setActiveFilter('personal_message')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider font-bold whitespace-nowrap transition border ${
              activeFilter === 'personal_message'
                ? 'bg-blue-700 text-white border-blue-800'
                : 'bg-white text-[#526357] border-[#DCE5DF] hover:text-[#112216]'
            }`}
          >
            📅 {t.notifications.consultationFilter}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 px-4 bg-white border border-[#DCE5DF]">
            <Bell className="w-8 h-8 text-[#A0B0A5] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#112216] uppercase tracking-wider">{t.notifications.empty}</h4>
            <p className="text-xs text-[#526357] mt-1">
              {t.notifications.emptySub}
            </p>
          </div>
        )}

        {filteredNotifications.map(item => (
          <div
            key={item.id}
            onClick={() => handleNotificationClick(item)}
            className={`p-4 border transition cursor-pointer relative flex flex-col justify-between ${
              !item.isRead
                ? 'bg-white border-[#1B5E34] shadow-sm hover:border-[#144928]'
                : 'bg-[#F8FAF9] border-[#DCE5DF] hover:border-[#1B5E34] opacity-90'
            }`}
          >
            <div>
              {/* Top Row: Type & Timestamp & Unread Dot */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#F6F8F6] border border-[#DCE5DF] flex items-center justify-center">
                    {getIcon(item.type)}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#1B5E34] font-mono">
                    {getTypeLabel(item.type)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#798C7F] font-mono">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                  </span>
                  {!item.isRead && (
                    <span className="w-2 h-2 bg-[#A0322D]" />
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <h3 className={`text-xs font-bold leading-snug mt-1 font-brand-sans ${!item.isRead ? 'text-[#112216]' : 'text-[#334155]'}`}>
                {item.title}
              </h3>
              <p className="text-xs text-[#526357] mt-1 leading-relaxed">
                {item.body}
              </p>
            </div>

            {/* Deep Link Action */}
            {item.deepLink && (
              <div className="mt-3 pt-2.5 border-t border-[#E8EFEA] flex items-center justify-between text-xs text-[#1B5E34] font-bold uppercase tracking-wider font-mono">
                <span className="text-[10px]">{language === 'vi' ? (item.deepLink.label || 'Xem chi tiết') : 'View Details'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FR-04: Notification Preference Settings Modal */}
      {isPrefModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#112216] w-full max-w-md border border-[#DCE5DF] shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
            <div className="bg-[#F6F8F6] px-5 py-4 border-b border-[#DCE5DF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1B5E34]" />
                <h3 className="text-xs font-brand-sans font-bold text-[#112216] uppercase tracking-wider">{t.notifications.prefModalTitle}</h3>
              </div>
              <button
                onClick={() => setIsPrefModalOpen(false)}
                className="p-1 bg-white text-[#526357] hover:text-[#112216] border border-[#DCE5DF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <p className="text-[#526357] text-[11px] leading-relaxed">
                {t.notifications.prefModalSub}
              </p>

              {/* Main Channels */}
              <div className="space-y-2 bg-[#F8FAF9] p-3.5 border border-[#DCE5DF]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#112216] block">{t.notifications.prefFlashAlert}</span>
                    <span className="text-[10px] text-[#526357]">{t.notifications.prefFlashAlertSub}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={userProfile.notificationPrefs.breakingAlerts}
                    onChange={(e) => updateNotificationPrefs({
                      ...userProfile.notificationPrefs,
                      breakingAlerts: e.target.checked
                    })}
                    className="w-4 h-4 accent-[#1B5E34] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#DCE5DF]">
                  <div>
                    <span className="font-bold text-[#112216] block">{t.notifications.prefWeeklyDigest}</span>
                    <span className="text-[10px] text-[#526357]">{t.notifications.prefWeeklyDigestSub}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={userProfile.notificationPrefs.weeklyDigest}
                    onChange={(e) => updateNotificationPrefs({
                      ...userProfile.notificationPrefs,
                      weeklyDigest: e.target.checked
                    })}
                    className="w-4 h-4 accent-[#1B5E34] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#DCE5DF]">
                  <div>
                    <span className="font-bold text-[#112216] block">{t.notifications.prefPromotions}</span>
                    <span className="text-[10px] text-[#526357]">{t.notifications.prefPromotionsSub}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={userProfile.notificationPrefs.promotions}
                    onChange={(e) => updateNotificationPrefs({
                      ...userProfile.notificationPrefs,
                      promotions: e.target.checked
                    })}
                    className="w-4 h-4 accent-[#1B5E34] cursor-pointer"
                  />
                </div>
              </div>

              {/* Categories Subscriptions */}
              <div>
                <label className="font-bold text-[#1B5E34] mb-2 block uppercase tracking-wider text-[10px] font-mono">
                  {t.notifications.prefCategories}
                </label>
                <div className="space-y-1.5">
                  {CATEGORY_LIST.map(cat => {
                    const isChecked = userProfile.notificationPrefs.subscribedCategories[cat] ?? true;
                    const catName = t.categories[cat] || cat;
                    return (
                      <div
                        key={cat}
                        onClick={() => {
                          updateNotificationPrefs({
                            ...userProfile.notificationPrefs,
                            subscribedCategories: {
                              ...userProfile.notificationPrefs.subscribedCategories,
                              [cat]: !isChecked
                            }
                          });
                        }}
                        className="flex items-center justify-between p-2.5 bg-[#F8FAF9] border border-[#DCE5DF] hover:border-[#1B5E34] cursor-pointer transition"
                      >
                        <span className="font-medium text-[#112216] text-xs">{catName}</span>
                        <div className={`w-4 h-4 flex items-center justify-center border transition ${
                          isChecked ? 'bg-[#1B5E34] border-[#1B5E34] text-white' : 'border-[#DCE5DF] bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F6F8F6] border-t border-[#DCE5DF]">
              <button
                onClick={() => setIsPrefModalOpen(false)}
                className="w-full py-2 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition text-center"
              >
                {t.notifications.savePrefBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

