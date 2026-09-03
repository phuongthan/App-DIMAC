import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../utils/translations';
import { CustomerSegment } from '../../types';
import { 
  Building2, 
  Building,
  Bookmark, 
  ShieldCheck, 
  PhoneCall, 
  Calendar, 
  ChevronRight, 
  Edit3, 
  X, 
  ExternalLink,
  Crown,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Lock,
  LogOut,
  UserCheck,
  FileCheck,
  Award,
  ArrowRight
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    articles, 
    setSelectedArticle,
    setIsBookingModalOpen,
    language,
    firmInfo,
    openFirmInfoModal,
    isAuthenticated,
    setIsAuthModalOpen,
    logout,
    switchDemoSegment,
    currentUserSegment
  } = useApp();

  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);

  // Edit state
  const [name, setName] = useState(userProfile.fullName);
  const [enterprise, setEnterprise] = useState(userProfile.enterpriseName);
  const [pos, setPos] = useState(userProfile.position);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName: name,
      enterpriseName: enterprise,
      position: pos,
      phone,
      email
    });
    setIsEditProfileOpen(false);
  };

  const savedArticles = articles.filter(a => userProfile.savedArticleIds.includes(a.id));

  // --- AUTH GUARD VIEW FOR UNAUTHENTICATED USERS ---
  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F6F8F6] text-[#112216] p-4 pb-20 justify-center items-center">
        <div className="w-full max-w-sm bg-white border border-[#CBD5E1] shadow-lg rounded-xl p-6 text-center">
          {/* Padlock Brand Shield */}
          <div className="w-16 h-16 bg-[#0A2E1A] text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md border border-[#1B5E34]">
            <Lock className="w-8 h-8 text-emerald-300" />
          </div>

          <span className="text-[10px] font-mono font-bold tracking-widest text-[#1B5E34] uppercase bg-[#EAF4ED] px-2.5 py-1 rounded border border-[#C2D5C8]">
            BẢO MẬT HÃNG LUẬT DIMAC
          </span>

          <h2 className="text-lg font-bold text-[#112216] font-brand-sans mt-3">
            Cổng Thân Chủ & Hồ Sơ Pháp Lý
          </h2>

          <p className="text-xs text-[#526357] mt-2 leading-relaxed">
            Nội dung cá nhân, hồ sơ vụ việc, hợp đồng tư vấn thường xuyên và ví voucher đặc quyền chỉ hiển thị khi quý khách đăng nhập tài khoản.
          </p>

          <div className="mt-5 space-y-2.5">
            <button
              id="btn-auth-guard-login"
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-3 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Đăng nhập Cổng Thân chủ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick 1-Click Demo Login to bypass Auth Guard during tests */}
            <div className="pt-3 border-t border-[#E2E8F0]">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E2B13C]" />
                Chọn tài khoản mẫu (Demo Role)
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => switchDemoSegment('ENTERPRISE')}
                  className="p-2 bg-[#F8FAF9] hover:bg-[#EAF4ED] border border-[#CBD5E1] text-[11px] font-bold text-[#1B5E34] rounded text-left transition"
                >
                  🏢 ENTERPRISE
                </button>
                <button
                  onClick={() => switchDemoSegment('SME')}
                  className="p-2 bg-[#F8FAF9] hover:bg-[#EBF8FF] border border-[#CBD5E1] text-[11px] font-bold text-[#2B6CB0] rounded text-left transition"
                >
                  🏭 SME Guard
                </button>
                <button
                  onClick={() => switchDemoSegment('RETAINER_VIP')}
                  className="p-2 bg-[#F8FAF9] hover:bg-[#FAF5FF] border border-[#CBD5E1] text-[11px] font-bold text-[#7E22CE] rounded text-left transition"
                >
                  💎 RETAINER VIP
                </button>
                <button
                  onClick={() => switchDemoSegment('INDIVIDUAL')}
                  className="p-2 bg-[#F8FAF9] hover:bg-[#FFFBEB] border border-[#CBD5E1] text-[11px] font-bold text-[#B45309] rounded text-left transition"
                >
                  👤 CÁ NHÂN HNWI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED USER PROFILE DASHBOARD ---
  const getSegmentBadge = () => {
    switch (currentUserSegment) {
      case 'ENTERPRISE':
        return {
          label: 'DOANH NGHIỆP LỚN / FDI',
          code: 'ENTERPRISE',
          style: 'bg-[#0A2E1A] text-emerald-300 border-[#1B5E34]',
          desc: 'Gói Cố vấn M&A, Dự án & Tuân thủ Pháp chế Doanh nghiệp'
        };
      case 'SME':
        return {
          label: 'DOANH NGHIỆP VỪA & NHỎ',
          code: 'SME',
          style: 'bg-[#1A365D] text-blue-200 border-[#2B6CB0]',
          desc: 'Gói Pháp lý Tinh gọn & Soát xét Hợp đồng Thương mại'
        };
      case 'RETAINER_VIP':
        return {
          label: 'THÂN CHỦ THƯỜNG XUYÊN VIP',
          code: 'RETAINER_VIP',
          style: 'bg-[#3B0764] text-purple-200 border-[#7E22CE]',
          desc: 'Hợp đồng Tư vấn Thường xuyên Diamond Retainer (24/7 Hotline)'
        };
      case 'INDIVIDUAL':
      default:
        return {
          label: 'NHÀ ĐẦU TƯ CÁ NHÂN',
          code: 'INDIVIDUAL',
          style: 'bg-[#451A03] text-amber-200 border-[#B45309]',
          desc: 'Cố vấn Quản trị Tài sản, Bất động sản & Tranh chấp Dân sự'
        };
    }
  };

  const segInfo = getSegmentBadge();

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F6F8F6] text-[#112216] pb-20">
      {/* Profile Header */}
      <div className="bg-white px-4 pt-5 pb-4 border-b border-[#DCE5DF]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.fullName}
                className="w-14 h-14 object-cover rounded border border-[#DCE5DF] shadow-xs"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#A0322D] rounded-full border border-white flex items-center justify-center text-white">
                <Crown className="w-3 h-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-base font-bold text-[#112216] leading-tight font-brand-sans">
                  {userProfile.fullName}
                </h1>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${segInfo.style}`}>
                  {segInfo.code}
                </span>
              </div>
              <p className="text-xs text-[#526357] mt-0.5 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#1B5E34]" />
                <span className="truncate max-w-[200px] font-medium">{userProfile.enterpriseName}</span>
              </p>
              <p className="text-[11px] text-[#798C7F] mt-0.5">
                {userProfile.position}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="p-2 bg-[#F8FAF9] border border-[#DCE5DF] hover:border-[#1B5E34] text-[#526357] hover:text-[#112216] rounded transition"
              title={t.profile.editProfile}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="p-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 rounded transition"
              title="Đăng xuất khỏi tài khoản"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legal Retainer Contract Badge */}
        <div className="mt-3 p-3 bg-gradient-to-r from-[#F8FAF9] to-[#EAF4ED] border border-[#C2D5C8] rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-[#1B5E34] flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-[#1B5E34]" />
              Hợp đồng Cố vấn Thường xuyên: {userProfile.contractCode || 'DIMAC-RT-2026/HN'}
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-white text-[#1B5E34] border border-[#C2D5C8] rounded">
              Hiệu lực đến {userProfile.contractExpiry || '31/12/2026'}
            </span>
          </div>
          <p className="text-[11px] text-[#526357] mt-1 font-medium">
            {segInfo.desc}
          </p>
        </div>

        {/* Action Buttons: Hotline & Booking */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="py-2.5 px-3 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition flex items-center justify-center gap-1.5 rounded"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.profile.bookConsultation}</span>
          </button>

          <button
            onClick={() => setIsHotlineModalOpen(true)}
            className="py-2.5 px-3 bg-[#FDF0EF] hover:bg-[#FCE2E0] text-[#A0322D] font-bold text-xs uppercase tracking-wider border border-[#F5C2BF] transition flex items-center justify-center gap-1.5 rounded"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#A0322D]" />
            <span>{t.profile.hotline}</span>
          </button>
        </div>
      </div>

      {/* Main Sections */}
      <div className="p-4 space-y-4">
        {/* Saved Articles (Offline library) */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1B5E34] flex items-center gap-1.5 font-mono">
              <Bookmark className="w-3.5 h-3.5 text-[#1B5E34]" />
              {t.profile.savedArticlesTitle} ({savedArticles.length})
            </h3>
          </div>

          {savedArticles.length === 0 ? (
            <div className="bg-white p-4 border border-[#DCE5DF] text-center text-xs text-[#798C7F] rounded-lg">
              {t.profile.noSavedArticles}
            </div>
          ) : (
            <div className="space-y-2">
              {savedArticles.map(art => {
                const title = language === 'vi' ? art.title_vi : (art.title_en || art.title_vi);
                const categoryName = t.categories[art.category] || art.category;
                return (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="bg-white border border-[#DCE5DF] hover:border-[#1B5E34] p-3 rounded-lg cursor-pointer transition flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold text-[#1B5E34] uppercase tracking-wider font-mono">
                        {categoryName}
                      </span>
                      <h4 className="text-xs font-bold text-[#112216] truncate mt-0.5 font-brand-sans">
                        {title}
                      </h4>
                      <p className="text-[10px] text-[#798C7F] mt-0.5 font-mono">
                        {art.publishDate} • {art.author.name}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#798C7F] shrink-0" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* DIMAC Law Firm Information Card */}
        <div className="bg-white border border-[#DCE5DF] p-4 space-y-3 text-xs shadow-xs rounded-lg relative group transition-all duration-200 hover:border-[#1B5E34]">
          <div className="flex items-center justify-between gap-2 border-b border-[#E8EFEA] pb-2.5">
            <h4 className="font-bold text-[#112216] flex items-center gap-1.5 uppercase tracking-wider text-xs font-brand-sans">
              <ShieldCheck className="w-4 h-4 text-[#1B5E34]" />
              {firmInfo.firmName || (language === 'vi' ? 'Về DIMAC Law Firm' : 'About DIMAC Law Firm')}
            </h4>
            <button
              onClick={openFirmInfoModal}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B5E34] hover:text-[#144928] bg-[#EAF4ED] hover:bg-[#D7ECD9] px-2 py-1 border border-[#C2D5C8] rounded transition-colors"
              title="Chỉnh sửa thông tin DIMAC"
            >
              <Edit3 className="w-3 h-3" />
              <span>{t.profile.editFirmInfo}</span>
            </button>
          </div>

          <p className="text-[#526357] text-[11px] leading-relaxed">
            {firmInfo.description}
          </p>

          <div className="pt-1 space-y-2 text-[11px] text-[#526357]">
            <p className="flex items-start justify-between gap-2">
              <span className="text-[#798C7F] shrink-0 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#1B5E34]" /> {t.profile.headquarters}:
              </span>
              <span className="font-medium text-right text-[#112216]">{firmInfo.headquarters}</span>
            </p>
            <p className="flex items-center justify-between gap-2">
              <span className="text-[#798C7F] shrink-0 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#798C7F]" /> {t.profile.branches}:
              </span>
              <span className="font-medium text-[#112216]">{firmInfo.branches}</span>
            </p>
            <p className="flex items-center justify-between gap-2">
              <span className="text-[#798C7F] shrink-0 flex items-center gap-1">
                <ExternalLink className="w-3 h-3 text-[#798C7F]" /> {t.profile.website}:
              </span>
              <a 
                href={firmInfo.website.startsWith('http') ? firmInfo.website : `https://${firmInfo.website}`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#1B5E34] hover:underline flex items-center gap-1 font-semibold"
              >
                {firmInfo.website} <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            {firmInfo.hotline && (
              <p className="flex items-center justify-between gap-2">
                <span className="text-[#798C7F] shrink-0 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#A0322D]" /> {t.profile.hotline}:
                </span>
                <a href={`tel:${firmInfo.hotline.replace(/[^0-9+]/g, '')}`} className="font-mono font-bold text-[#A0322D] hover:underline">
                  {firmInfo.hotline}
                </a>
              </p>
            )}
            {firmInfo.email && (
              <p className="flex items-center justify-between gap-2">
                <span className="text-[#798C7F] shrink-0 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#1B5E34]" /> {t.profile.email}:
                </span>
                <a href={`mailto:${firmInfo.email}`} className="font-medium text-[#1B5E34] hover:underline">
                  {firmInfo.email}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Security & Role Testing Toolbar */}
        <div className="p-3 bg-white border border-[#CBD5E1] rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#1B5E34] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#A0322D]" />
              Thử nghiệm Phân khúc (Role Switcher)
            </span>
            <button
              onClick={logout}
              className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              Đăng xuất
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => switchDemoSegment('ENTERPRISE')}
              className={`p-1.5 text-[10px] font-bold border rounded text-left transition ${
                currentUserSegment === 'ENTERPRISE' ? 'bg-[#EAF4ED] border-[#1B5E34] text-[#1B5E34]' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              🏢 ENTERPRISE (M&A)
            </button>
            <button
              onClick={() => switchDemoSegment('SME')}
              className={`p-1.5 text-[10px] font-bold border rounded text-left transition ${
                currentUserSegment === 'SME' ? 'bg-[#EBF8FF] border-[#2B6CB0] text-[#2B6CB0]' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              🏭 SME (EcoTrans)
            </button>
            <button
              onClick={() => switchDemoSegment('RETAINER_VIP')}
              className={`p-1.5 text-[10px] font-bold border rounded text-left transition ${
                currentUserSegment === 'RETAINER_VIP' ? 'bg-[#FAF5FF] border-[#7E22CE] text-[#7E22CE]' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              💎 VIP (Khang Dien)
            </button>
            <button
              onClick={() => switchDemoSegment('INDIVIDUAL')}
              className={`p-1.5 text-[10px] font-bold border rounded text-left transition ${
                currentUserSegment === 'INDIVIDUAL' ? 'bg-[#FFFBEB] border-[#B45309] text-[#B45309]' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              👤 CÁ NHÂN (HNWI)
            </button>
          </div>
        </div>

        {/* App Version & Compliance */}
        <div className="text-center py-2 text-[10px] text-[#798C7F] space-y-1 font-mono">
          <p>DIMAC Legal Practice App v3.0.0 (Build 2026)</p>
          <p>{language === 'vi' ? 'Tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân (PDPD)' : 'Compliant with Decree 13/2023/ND-CP on Personal Data Protection (PDPD)'}</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[#DCE5DF] w-full max-w-md overflow-hidden shadow-2xl rounded-lg">
            <div className="bg-[#F6F8F6] px-5 py-3.5 border-b border-[#DCE5DF] flex items-center justify-between">
              <h3 className="text-xs font-brand-sans font-bold text-[#112216] uppercase tracking-wider">{t.profile.editProfile}</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-[#526357] hover:text-[#112216]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block text-[#112216] font-medium mb-1">{t.profile.fullName}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-[#112216] rounded focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block text-[#112216] font-medium mb-1">{t.profile.enterprise}</label>
                <input
                  type="text"
                  value={enterprise}
                  onChange={(e) => setEnterprise(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-[#112216] rounded focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block text-[#112216] font-medium mb-1">{t.profile.position}</label>
                <input
                  type="text"
                  value={pos}
                  onChange={(e) => setPos(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-[#112216] rounded focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#112216] font-medium mb-1">{t.profile.phone}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-[#112216] rounded focus:outline-none focus:border-[#1B5E34]"
                  />
                </div>
                <div>
                  <label className="block text-[#112216] font-medium mb-1">{t.profile.email}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-[#112216] rounded focus:outline-none focus:border-[#1B5E34]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 bg-white text-[#526357] hover:text-[#112216] border border-[#DCE5DF] rounded"
                >
                  {t.booking.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold uppercase tracking-wider rounded"
                >
                  {t.profile.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hotline Call Modal */}
      {isHotlineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[#DCE5DF] w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center rounded-lg">
            <div className="w-14 h-14 bg-[#FDF0EF] border border-[#F5C2BF] rounded-full flex items-center justify-center text-[#A0322D] mx-auto mb-4 animate-pulse">
              <PhoneCall className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-[#112216] uppercase font-brand-sans">{language === 'vi' ? 'Kết Nối Hotline DIMAC' : 'Connect to DIMAC Hotline'}</h3>
            <p className="text-xs text-[#526357] mt-1">{language === 'vi' ? 'Đường dây nóng tư vấn khẩn cấp và hỗ trợ dịch vụ' : 'Emergency consultation & client support hotline'}</p>

            <div className="my-5 bg-[#F8FAF9] p-4 border border-[#DCE5DF] rounded">
              <span className="text-[11px] text-[#798C7F] block mb-1 uppercase tracking-wider font-mono">{language === 'vi' ? 'Số điện thoại trực ban 24/7:' : '24/7 Hotline Number:'}</span>
              <a 
                href={`tel:${firmInfo.hotline.replace(/[^0-9+]/g, '')}`} 
                className="text-xl font-mono font-black text-[#1B5E34] tracking-wider hover:underline"
              >
                {firmInfo.hotline || '(+84) 903 888 123'}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${firmInfo.hotline.replace(/[^0-9+]/g, '')}`}
                className="flex-1 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider transition text-center rounded"
              >
                {language === 'vi' ? 'Gọi ngay' : 'Call Now'}
              </a>
              <button
                onClick={() => setIsHotlineModalOpen(false)}
                className="flex-1 py-2 bg-white hover:bg-[#F1F4F2] text-[#112216] font-medium text-xs uppercase tracking-wider border border-[#DCE5DF] transition rounded"
              >
                {language === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
