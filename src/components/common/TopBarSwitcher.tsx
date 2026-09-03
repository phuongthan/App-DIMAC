import React from 'react';
import { useApp } from '../../context/AppContext';
import { DimacLogo } from './DimacLogo';
import { LogoManagerModal } from './LogoManagerModal';
import { DemoRoleSwitcher } from './DemoRoleSwitcher';
import { 
  Smartphone, 
  LayoutDashboard, 
  Columns3, 
  Sparkles, 
  Globe,
  UploadCloud,
  Palette,
  Building2
} from 'lucide-react';

export const TopBarSwitcher: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    language, 
    setLanguage, 
    sendPushNotification,
    articles,
    vouchers,
    setIsLogoModalOpen,
    openFirmInfoModal
  } = useApp();

  const handleSimulateBreakingPush = () => {
    sendPushNotification({
      title: '⚡ KHẨN CẤP: Thay đổi Luật Thuế & Đầu tư Nước ngoài 2024',
      body: 'Cập nhật hướng dẫn mới nhất về chính sách thuế tối thiểu toàn cầu (Pillar 2) đối với các tập đoàn FDI.',
      type: 'breaking_alert',
      targetAudience: 'all',
      targetCategory: 'Thuế & Tài chính',
      deepLink: { type: 'article', targetId: articles[0]?.id || 'art-1', label: 'Xem phân tích ngay' }
    });
  };

  const handleSimulateVoucherPush = () => {
    sendPushNotification({
      title: '🎁 DIMAC Tặng Mã Ưu Đãi 20% Dịch vụ Pháp lý M&A',
      body: 'Mã DIMAC-MA20 đã được nạp trực tiếp vào Ví E-Voucher của quý doanh nghiệp. Hạn dùng đến 31/12/2026.',
      type: 'promotion_alert',
      targetAudience: 'enterprise_leads',
      deepLink: { type: 'voucher', targetId: vouchers[0]?.id || 'vouch-1', label: 'Mở Ví Voucher' }
    });
  };

  return (
    <>
      <header className="bg-white text-[#112216] border-b border-[#DCE5DF] sticky top-0 z-40 px-3 sm:px-6 lg:px-8 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo & Logo Update Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              id="header-brand-logo-button"
              onClick={() => setIsLogoModalOpen(true)}
              className="flex items-center cursor-pointer p-1 -m-1 rounded hover:bg-[#F1F4F2] transition group relative"
              title="Nhấp để cập nhật logo, tên thương hiệu và tagline"
            >
              <DimacLogo variant="horizontal" size="xs" />
              
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] text-[#165A31] bg-[#EAF4ED] border border-[#C2D5C8] group-hover:border-[#165A31] group-hover:bg-[#DCEDE0] px-2 py-0.5 ml-2.5 font-bold uppercase tracking-wider transition shadow-2xs">
                <UploadCloud className="w-3 h-3 text-[#165A31]" />
                <span>Cập nhật Logo</span>
              </span>
            </div>

            <div className="hidden lg:block border-l border-[#DCE5DF] pl-3">
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]">
                DIGITAL LEGAL PLATFORM
              </span>
            </div>
          </div>

          {/* View Mode Selector Tabs */}
          <div className="flex items-center bg-[#F1F4F2] p-1 border border-[#DCE5DF]">
            <button
              id="btn-mode-mobile"
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 text-xs uppercase tracking-wider font-bold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-[#1B5E34] text-white shadow-sm'
                  : 'text-[#526357] hover:text-[#112216] hover:bg-white/70'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile App</span>
            </button>

            <button
              id="btn-mode-split"
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 text-xs uppercase tracking-wider font-bold transition-all ${
                viewMode === 'split'
                  ? 'bg-[#1B5E34] text-white shadow-sm'
                  : 'text-[#526357] hover:text-[#112216] hover:bg-white/70'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Song song (Live Sync)</span>
              <span className="md:hidden">Split</span>
            </button>

            <button
              id="btn-mode-admin"
              onClick={() => setViewMode('admin')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 text-xs uppercase tracking-wider font-bold transition-all ${
                viewMode === 'admin'
                  ? 'bg-[#1B5E34] text-white shadow-sm'
                  : 'text-[#526357] hover:text-[#112216] hover:bg-white/70'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </button>
          </div>

          {/* Quick Tools & Branding Button */}
          <div className="flex items-center gap-2">
            {/* Demo Role Switcher for Customer Segmentation & Auth Testing */}
            <DemoRoleSwitcher />

            {/* Direct Logo & Brand Customizer Button */}
            <button
              id="btn-quick-logo-manager"
              onClick={() => setIsLogoModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F6F8F6] border border-[#DCE5DF] hover:border-[#165A31] hover:bg-[#EAF4ED] text-[#165A31] text-xs font-bold transition"
              title="Mở bảng cập nhật Logo, Tên thương hiệu và Tagline"
            >
              <Palette className="w-3.5 h-3.5 text-[#165A31]" />
              <span className="hidden sm:inline text-[11px]">Đổi Logo</span>
            </button>

            {/* Direct Firm Info Customizer Button */}
            <button
              id="btn-quick-firm-info-manager"
              onClick={openFirmInfoModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F6F8F6] border border-[#DCE5DF] hover:border-[#165A31] hover:bg-[#EAF4ED] text-[#165A31] text-xs font-bold transition"
              title="Tùy chỉnh thông tin DIMAC (Trụ sở, Hotline, Website, Giới thiệu)"
            >
              <Building2 className="w-3.5 h-3.5 text-[#165A31]" />
              <span className="hidden sm:inline text-[11px]">Thông tin DIMAC</span>
            </button>

            {/* Quick Simulation Triggers */}
            <div className="hidden xl:flex items-center gap-2 bg-[#F6F8F6] px-3 py-1.5 border border-[#DCE5DF] text-[11px]">
              <span className="text-[#526357] flex items-center gap-1 uppercase tracking-wider font-bold text-[10px]">
                <Sparkles className="w-3 h-3 text-[#A0322D]" />
                Demo Push:
              </span>
              <button
                id="btn-trigger-breaking-push"
                onClick={handleSimulateBreakingPush}
                className="text-[#A0322D] hover:bg-[#FDF0EF] px-2 py-0.5 font-bold transition border border-transparent hover:border-[#A02B2D]/30"
                title="Mô phỏng gửi thông báo Breaking Legal Alert"
              >
                ⚡ Flash Alert
              </button>
              <span className="text-[#DCE5DF]">|</span>
              <button
                id="btn-trigger-voucher-push"
                onClick={handleSimulateVoucherPush}
                className="text-[#1B5E34] hover:bg-[#EAF4ED] px-2 py-0.5 font-bold transition border border-transparent hover:border-[#1B5E34]/30"
                title="Mô phỏng gửi thông báo tặng Voucher 20%"
              >
                🎁 E-Voucher
              </button>
            </div>

            {/* Global Language Toggle */}
            <button
              id="btn-global-language"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F8F6] border border-[#DCE5DF] hover:border-[#1B5E34] text-xs font-bold uppercase tracking-widest text-[#1B5E34] transition"
              title="Đổi ngôn ngữ giao diện (Bilingual Vi/En)"
            >
              <Globe className="w-3.5 h-3.5 text-[#1B5E34]" />
              <span>{language}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Logo & Brand Customizer Modal */}
      <LogoManagerModal />
    </>
  );
};
