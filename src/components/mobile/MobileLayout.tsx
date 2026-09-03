import React from 'react';
import { useApp } from '../../context/AppContext';
import { DimacLogo } from '../common/DimacLogo';
import { LegalInsightsView } from './LegalInsightsView';
import { VoucherWalletView } from './VoucherWalletView';
import { NotificationCenterView } from './NotificationCenterView';
import { ProfileView } from './ProfileView';
import { ArticleDetailModal } from './ArticleDetailModal';
import { PdfDocumentModal } from './PdfDocumentModal';
import { VoucherQrModal } from './VoucherQrModal';
import { BookConsultationModal } from './BookConsultationModal';
import { PushToast } from './PushToast';
import { AuthModal } from '../common/AuthModal';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  Newspaper, 
  Tag, 
  Bell, 
  User, 
  Wifi, 
  Battery, 
  Signal,
  PhoneCall
} from 'lucide-react';

export const MobileLayout: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const { 
    mobileTab, 
    setMobileTab, 
    unreadNotificationCount, 
    selectedArticle, 
    setSelectedArticle,
    viewingPdfArticle,
    setViewingPdfArticle,
    selectedVoucherForQr,
    setSelectedVoucherForQr,
    setIsBookingModalOpen,
    language,
    setLanguage,
    setIsLogoModalOpen,
    logoConfig,
    isAuthenticated,
    setIsAuthModalOpen,
    currentUserSegment
  } = useApp();

  const handleAccountTabClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setMobileTab('profile');
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  return (
    <div className={`flex flex-col items-center justify-center ${isEmbedded ? 'w-full h-full' : 'min-h-[calc(100vh-60px)] p-2 sm:p-6'}`}>
      {/* Mobile Device Frame - Light Precision Frame */}
      <div className="w-full max-w-[420px] h-[840px] max-h-[92vh] bg-white rounded-[36px] border-[7px] border-[#CBD5E1] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden relative ring-1 ring-[#94A3B8]/30">
        
        {/* Dynamic Island / Top Notch Simulator */}
        <div className="bg-[#F8FAF9] pt-3 pb-1 px-6 flex items-center justify-between z-30 shrink-0 select-none text-[#112216]">
          <span className="text-[11px] font-mono font-bold tracking-tight text-[#1B5E34]">09:41</span>
          
          {/* Dynamic Island Pill */}
          <div className="w-24 h-4 bg-[#112216] rounded-full flex items-center justify-center gap-1.5 shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="w-2 h-2 rounded-full bg-[#A0322D] animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5 text-[#526357]">
            <Signal className="w-3 h-3 text-[#1B5E34]" />
            <Wifi className="w-3 h-3 text-[#1B5E34]" />
            <Battery className="w-3.5 h-3.5 text-[#112216]" />
          </div>
        </div>

        {/* Mobile Top Brand Header - Exact DIMAC Brand */}
        <div className="bg-white px-3.5 py-2 border-b border-[#DCE5DF] flex items-center justify-between shrink-0 z-20 shadow-xs">
          <div 
            id="mobile-header-logo-btn"
            onClick={() => setIsLogoModalOpen(true)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition"
            title="Nhấp để đổi hoặc cập nhật logo, tên thương hiệu, tagline"
          >
            <DimacLogo variant="symbol" size="xs" />
            <div className="flex flex-col justify-center">
              <span className="text-[7.5px] font-bold text-[#A02B2D] uppercase leading-tight tracking-[0.03em] whitespace-pre-line font-sans">
                {logoConfig.tagline || "Our Strategic Legal Partnership\nPowers Your Business Vision"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Segment/Role Indicator Pill */}
            <button
              id="mobile-header-role-pill"
              onClick={() => setIsAuthModalOpen(true)}
              className={`px-1.5 py-0.5 text-[8.5px] font-mono font-extrabold uppercase rounded border transition ${
                !isAuthenticated 
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' 
                  : currentUserSegment === 'ENTERPRISE'
                  ? 'bg-[#0A2E1A] text-emerald-300 border-[#1B5E34]'
                  : currentUserSegment === 'SME'
                  ? 'bg-[#1A365D] text-blue-200 border-[#2B6CB0]'
                  : currentUserSegment === 'RETAINER_VIP'
                  ? 'bg-[#3B0764] text-purple-200 border-[#7E22CE]'
                  : 'bg-[#451A03] text-amber-200 border-[#B45309]'
              }`}
              title="Nhấp để đăng nhập hoặc chuyển đổi phân khúc khách hàng"
            >
              {!isAuthenticated ? 'GUEST' : currentUserSegment === 'RETAINER_VIP' ? 'VIP' : currentUserSegment}
            </button>

            {/* Direct Consultation Shortcut */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#1B5E34] hover:bg-[#144928] text-[10px] font-bold uppercase tracking-wider text-white transition shadow-sm"
              title={t.nav.consultation}
            >
              <PhoneCall className="w-3 h-3 text-white" />
              <span>{t.nav.consultation}</span>
            </button>

            {/* Language Switch */}
            <button
              id="mobile-lang-toggle-btn"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="px-2 py-1 bg-[#F1F4F2] border border-[#DCE5DF] hover:border-[#1B5E34] text-[10px] font-bold uppercase text-[#1B5E34] hover:text-[#144928] transition"
              title="Chuyển ngôn ngữ / Switch Language"
            >
              {language.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Push Notification In-App Toast */}
        <PushToast />

        {/* Tab Viewport */}
        <div className="flex-1 relative flex flex-col overflow-hidden bg-[#F6F8F6]">
          {mobileTab === 'insights' && <LegalInsightsView />}
          {mobileTab === 'vouchers' && <VoucherWalletView />}
          {mobileTab === 'notifications' && <NotificationCenterView />}
          {mobileTab === 'profile' && <ProfileView />}
        </div>

        {/* Mobile Bottom Navigation Bar - Light Brand Style */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#DCE5DF] px-2 py-1.5 z-30 flex items-center justify-around shadow-lg">
          <button
            id="tab-btn-insights"
            onClick={() => setMobileTab('insights')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 transition ${
              mobileTab === 'insights'
                ? 'text-[#1B5E34] font-bold border-b-2 border-[#1B5E34] pb-0.5'
                : 'text-[#64748B] hover:text-[#112216]'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">{t.nav.insights}</span>
          </button>

          <button
            id="tab-btn-vouchers"
            onClick={() => setMobileTab('vouchers')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 transition relative ${
              mobileTab === 'vouchers'
                ? 'text-[#1B5E34] font-bold border-b-2 border-[#1B5E34] pb-0.5'
                : 'text-[#64748B] hover:text-[#112216]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">{t.nav.vouchers}</span>
          </button>

          <button
            id="tab-btn-notifications"
            onClick={() => setMobileTab('notifications')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 transition relative ${
              mobileTab === 'notifications'
                ? 'text-[#1B5E34] font-bold border-b-2 border-[#1B5E34] pb-0.5'
                : 'text-[#64748B] hover:text-[#112216]'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">{t.nav.notifications}</span>
            {unreadNotificationCount > 0 && (
              <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-[#A0322D] text-white text-[8px] font-extrabold flex items-center justify-center rounded-full ring-1 ring-white">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <button
            id="tab-btn-profile"
            onClick={handleAccountTabClick}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 transition ${
              mobileTab === 'profile'
                ? 'text-[#1B5E34] font-bold border-b-2 border-[#1B5E34] pb-0.5'
                : 'text-[#64748B] hover:text-[#112216]'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">{t.nav.account}</span>
          </button>
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="bg-white pb-2 pt-1 flex justify-center z-40">
          <div className="w-28 h-1 bg-[#CBD5E1] rounded-full" />
        </div>
      </div>

      {/* Global Modals rendered on top */}
      <AuthModal />

      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {viewingPdfArticle && (
        <PdfDocumentModal
          article={viewingPdfArticle}
          onClose={() => setViewingPdfArticle(null)}
        />
      )}

      {selectedVoucherForQr && (
        <VoucherQrModal
          userVoucher={selectedVoucherForQr}
          onClose={() => setSelectedVoucherForQr(null)}
        />
      )}

      <BookConsultationModal />
    </div>
  );
};
