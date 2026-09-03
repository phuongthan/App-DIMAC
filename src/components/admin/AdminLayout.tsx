import React from 'react';
import { useApp } from '../../context/AppContext';
import { DimacLogo } from '../common/DimacLogo';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ArticleCMS } from './ArticleCMS';
import { PushNotificationCMS } from './PushNotificationCMS';
import { VoucherCMS } from './VoucherCMS';
import { LeadManagementCMS } from './LeadManagementCMS';
import { LawyersCMS } from './LawyersCMS';
import { 
  BarChart3, 
  FileText, 
  Send, 
  Tag, 
  Users, 
  Shield, 
  ChevronRight,
  Palette,
  Scale,
  Building2
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { 
    adminTab, 
    setAdminTab, 
    currentRole, 
    setCurrentRole,
    articles,
    vouchers,
    leads,
    notifications,
    authors,
    setIsLogoModalOpen,
    openFirmInfoModal,
    firmInfo
  } = useApp();

  const unreadLeadsCount = leads.filter(l => l.status === 'NEW').length;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-60px)] bg-[#F6F8F6] text-[#112216]">
      {/* Sidebar - DIMAC Brand System */}
      <aside className="w-full md:w-64 bg-white border-r border-[#DCE5DF] flex flex-col shrink-0">
        {/* Brand header */}
        <div className="p-4 border-b border-[#DCE5DF] bg-[#F8FAF9]">
          <div 
            id="admin-sidebar-logo-container"
            onClick={() => setIsLogoModalOpen(true)}
            className="bg-white p-2.5 border border-[#DCE5DF] shadow-xs flex items-center justify-center cursor-pointer hover:border-[#165A31] transition group relative"
            title="Nhấp để cập nhật logo, tên thương hiệu và tagline"
          >
            <DimacLogo variant="horizontal" theme="light" size="xs" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsLogoModalOpen(true)}
              className="text-[10px] text-[#165A31] hover:text-[#124b29] hover:underline font-bold flex items-center gap-1"
              title="Đổi logo và thương hiệu"
            >
              <Palette className="w-3 h-3 text-[#165A31]" />
              <span>Đổi Logo & Brand</span>
            </button>
            <span className="text-[9px] bg-[#1B5E34] text-white px-2 py-0.5 font-bold tracking-wider uppercase">Enterprise</span>
          </div>
        </div>

        {/* Role Selector (Admin / Editor / Marketing) */}
        <div className="p-3 bg-[#F8FAF9] m-3 border border-[#DCE5DF]">
          <div className="flex items-center justify-between text-[10px] text-[#1B5E34] mb-1.5 uppercase tracking-wider font-bold">
            <span className="flex items-center gap-1.5 font-mono">
              <Shield className="w-3.5 h-3.5 text-[#1B5E34]" /> Vai trò CMS:
            </span>
          </div>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as any)}
            className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] font-medium focus:outline-none focus:border-[#1B5E34]"
          >
            <option value="admin">Quản trị viên (Super Admin)</option>
            <option value="editor">Biên tập viên (Legal Editor)</option>
            <option value="marketing">Phụ trách Marketing (Growth)</option>
          </select>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-1 text-xs">
          <button
            id="admin-nav-analytics"
            onClick={() => setAdminTab('analytics')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 transition uppercase tracking-wider font-bold ${
              adminTab === 'analytics'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className={`w-4 h-4 ${adminTab === 'analytics' ? 'text-white' : 'text-[#1B5E34]'}`} />
              <span>Báo Cáo & Thống Kê</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            id="admin-nav-articles"
            onClick={() => setAdminTab('articles')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 transition uppercase tracking-wider font-bold ${
              adminTab === 'articles'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${adminTab === 'articles' ? 'text-white' : 'text-[#1B5E34]'}`} />
              <span>Quản Lý Bài Viết</span>
            </div>
            <span className={`font-mono text-[10px] px-1.5 py-0.5 ${
              adminTab === 'articles' ? 'bg-white/20 text-white' : 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]'
            }`}>
              {articles.length}
            </span>
          </button>

          <button
            id="admin-nav-lawyers"
            onClick={() => setAdminTab('lawyers')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 transition uppercase tracking-wider font-bold ${
              adminTab === 'lawyers'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Scale className={`w-4 h-4 ${adminTab === 'lawyers' ? 'text-white' : 'text-[#1B5E34]'}`} />
              <span>Đội Ngũ Luật Sư</span>
            </div>
            <span className={`font-mono text-[10px] px-1.5 py-0.5 ${
              adminTab === 'lawyers' ? 'bg-white/20 text-white' : 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]'
            }`}>
              {authors.length}
            </span>
          </button>

          <button
            id="admin-nav-push"
            onClick={() => setAdminTab('push')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 transition uppercase tracking-wider font-bold ${
              adminTab === 'push'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Send className={`w-4 h-4 ${adminTab === 'push' ? 'text-white' : 'text-[#1B5E34]'}`} />
              <span>Push Notifications</span>
            </div>
            <span className={`font-mono text-[10px] px-1.5 py-0.5 ${
              adminTab === 'push' ? 'bg-white/20 text-white' : 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]'
            }`}>
              {notifications.length}
            </span>
          </button>

          <button
            id="admin-nav-vouchers"
            onClick={() => setAdminTab('vouchers')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 transition uppercase tracking-wider font-bold ${
              adminTab === 'vouchers'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Tag className={`w-4 h-4 ${adminTab === 'vouchers' ? 'text-white' : 'text-[#1B5E34]'}`} />
              <span>Kho Voucher & Quét</span>
            </div>
            <span className={`font-mono text-[10px] px-1.5 py-0.5 ${
              adminTab === 'vouchers' ? 'bg-white/20 text-white' : 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]'
            }`}>
              {vouchers.length}
            </span>
          </button>

          <button
            id="admin-nav-leads"
            onClick={() => setAdminTab('leads')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 transition uppercase tracking-wider font-bold ${
              adminTab === 'leads'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className={`w-4 h-4 ${adminTab === 'leads' ? 'text-white' : 'text-[#1B5E34]'}`} />
              <span>Yêu Cầu Tư Vấn (CRM)</span>
            </div>
            {unreadLeadsCount > 0 ? (
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[#A0322D] text-white font-bold">
                {unreadLeadsCount} mới
              </span>
            ) : (
              <span className={`font-mono text-[10px] px-1.5 py-0.5 ${
                adminTab === 'leads' ? 'bg-white/20 text-white' : 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]'
              }`}>
                {leads.length}
              </span>
            )}
          </button>
        </nav>

        {/* Footer info & DIMAC Settings */}
        <div className="p-3 border-t border-[#DCE5DF] bg-[#F8FAF9] text-[11px] text-[#526357] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold tracking-wider uppercase text-[#112216] truncate max-w-[130px]" title={firmInfo.firmName}>
              {firmInfo.firmName || 'DIMAC Law Firm'}
            </span>
            <span className="text-[#1B5E34] font-mono font-semibold flex items-center gap-1 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E34] animate-pulse"></span> Online
            </span>
          </div>

          <button
            type="button"
            onClick={openFirmInfoModal}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-[#EAF4ED] border border-[#DCE5DF] hover:border-[#1B5E34] text-[#1B5E34] text-[10px] font-bold uppercase tracking-wider transition shadow-2xs"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Tùy Chỉnh Thông Tin DIMAC</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
        {adminTab === 'analytics' && <AnalyticsDashboard />}
        {adminTab === 'articles' && <ArticleCMS />}
        {adminTab === 'lawyers' && <LawyersCMS />}
        {adminTab === 'push' && <PushNotificationCMS />}
        {adminTab === 'vouchers' && <VoucherCMS />}
        {adminTab === 'leads' && <LeadManagementCMS />}
      </main>
    </div>
  );
};
