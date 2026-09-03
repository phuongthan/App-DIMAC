import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserVoucherStatus, UserVoucherItem, CustomerSegment } from '../../types';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  Tag, 
  Sparkles, 
  QrCode, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Gift,
  ShieldCheck,
  Building2,
  Building,
  UserCheck,
  Layers,
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';

export const VoucherWalletView: React.FC = () => {
  const { 
    filteredUserVouchers, 
    setSelectedVoucherForQr, 
    redeemVoucherCode,
    language,
    isAuthenticated,
    currentUserSegment,
    switchDemoSegment,
    setIsAuthModalOpen
  } = useApp();

  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const [activeTab, setActiveTab] = useState<UserVoucherStatus>('AVAILABLE');
  const [segmentFilter, setSegmentFilter] = useState<'ALL_ELIGIBLE' | 'EXCLUSIVE_ONLY' | 'COMMON_ONLY'>('ALL_ELIGIBLE');
  const [inputCode, setInputCode] = useState('');
  const [redeemFeedback, setRedeemFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const res = redeemVoucherCode(inputCode);
    setRedeemFeedback(res);
    if (res.success) {
      setInputCode('');
      setActiveTab('AVAILABLE');
    }
    setTimeout(() => {
      setRedeemFeedback(null);
    }, 5000);
  };

  // Status filtering
  const statusFiltered = filteredUserVouchers.filter(v => v.status === activeTab);

  // Sub-filter by segment category if requested
  const currentList = statusFiltered.filter(item => {
    if (segmentFilter === 'EXCLUSIVE_ONLY') {
      return item.voucher.targetSegments && !item.voucher.targetSegments.includes('ALL');
    }
    if (segmentFilter === 'COMMON_ONLY') {
      return item.voucher.targetSegments && item.voucher.targetSegments.includes('ALL');
    }
    return true;
  });

  const availableVouchers = filteredUserVouchers.filter(v => v.status === 'AVAILABLE');
  const usedVouchers = filteredUserVouchers.filter(v => v.status === 'USED');
  const expiredVouchers = filteredUserVouchers.filter(v => v.status === 'EXPIRED');

  const getSegmentMeta = (segment: CustomerSegment | null) => {
    switch (segment) {
      case 'ENTERPRISE':
        return {
          title: 'Khách hàng Doanh nghiệp / Tập đoàn',
          shortName: 'ENTERPRISE',
          badgeText: 'Đặc quyền Doanh nghiệp',
          badgeStyle: 'bg-[#0A2E1A] text-emerald-300 border-[#1B5E34]',
          icon: Building2,
          color: '#1B5E34'
        };
      case 'SME':
        return {
          title: 'Doanh nghiệp vừa và nhỏ',
          shortName: 'SME',
          badgeText: 'Ưu đãi Doanh nghiệp SME',
          badgeStyle: 'bg-[#1A365D] text-blue-200 border-[#2B6CB0]',
          icon: Building,
          color: '#2B6CB0'
        };
      case 'RETAINER_VIP':
        return {
          title: 'Hợp đồng Tư vấn Thường xuyên VIP',
          shortName: 'RETAINER VIP',
          badgeText: 'Đặc quyền Retainer VIP',
          badgeStyle: 'bg-[#3B0764] text-purple-200 border-[#7E22CE]',
          icon: ShieldCheck,
          color: '#7E22CE'
        };
      case 'INDIVIDUAL':
        return {
          title: 'Khách hàng Cá nhân / Nhà đầu tư HNWI',
          shortName: 'CÁ NHÂN',
          badgeText: 'Khách hàng Cá nhân',
          badgeStyle: 'bg-[#451A03] text-amber-200 border-[#B45309]',
          icon: UserCheck,
          color: '#B45309'
        };
      default:
        return {
          title: 'Khách vãng lai (Chưa đăng nhập)',
          shortName: 'GUEST',
          badgeText: 'Chưa xác thực phân khúc',
          badgeStyle: 'bg-slate-800 text-slate-300 border-slate-600',
          icon: Lock,
          color: '#475569'
        };
    }
  };

  const currentMeta = getSegmentMeta(currentUserSegment);
  const SegmentIcon = currentMeta.icon;

  const renderVoucherBadge = (item: UserVoucherItem) => {
    const { voucher } = item;
    const isAll = voucher.targetSegments?.includes('ALL');

    if (isAll) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F1F5F9] text-[#1E293B] border border-[#CBD5E1] rounded">
          <Layers className="w-2.5 h-2.5 text-[#64748B]" />
          <span>{language === 'vi' ? (voucher.segmentBadgeVi || 'Áp dụng Toàn bộ') : (voucher.segmentBadgeEn || 'All Clients')}</span>
        </span>
      );
    }

    if (voucher.targetSegments?.includes('ENTERPRISE')) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#0A2E1A] text-emerald-300 border border-[#1B5E34] rounded">
          <Building2 className="w-2.5 h-2.5 text-emerald-400" />
          <span>{language === 'vi' ? (voucher.segmentBadgeVi || 'Đặc quyền Doanh nghiệp') : (voucher.segmentBadgeEn || 'Enterprise Exclusive')}</span>
        </span>
      );
    }

    if (voucher.targetSegments?.includes('SME')) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#1A365D] text-blue-200 border border-[#2B6CB0] rounded">
          <Building className="w-2.5 h-2.5 text-blue-300" />
          <span>{language === 'vi' ? (voucher.segmentBadgeVi || 'Ưu đãi SME') : (voucher.segmentBadgeEn || 'SME Advantage')}</span>
        </span>
      );
    }

    if (voucher.targetSegments?.includes('RETAINER_VIP')) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#3B0764] text-purple-200 border border-[#7E22CE] rounded">
          <ShieldCheck className="w-2.5 h-2.5 text-purple-300" />
          <span>{language === 'vi' ? (voucher.segmentBadgeVi || 'Đặc quyền Retainer VIP') : (voucher.segmentBadgeEn || 'VIP Retainer Privilege')}</span>
        </span>
      );
    }

    if (voucher.targetSegments?.includes('INDIVIDUAL')) {
      return (
        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#451A03] text-amber-200 border border-[#B45309] rounded">
          <UserCheck className="w-2.5 h-2.5 text-amber-300" />
          <span>{language === 'vi' ? (voucher.segmentBadgeVi || 'Khách hàng Cá nhân') : (voucher.segmentBadgeEn || 'Individual Privilege')}</span>
        </span>
      );
    }

    return null;
  };

  const renderDiscountTag = (item: UserVoucherItem) => {
    const { voucher } = item;
    if (voucher.type === 'PERCENTAGE') {
      return (
        <div className="flex items-baseline gap-1 text-[#1B5E34] font-extrabold font-mono">
          <span className="text-xl">-{voucher.discountPercentage}%</span>
          <span className="text-[10px] uppercase font-sans text-[#526357]">
            {t.vouchers.maxDiscount} {voucher.maxDiscountAmount ? `${(voucher.maxDiscountAmount / 1000000).toFixed(0)}M` : ''}
          </span>
        </div>
      );
    } else if (voucher.type === 'FIXED_AMOUNT') {
      return (
        <div className="flex items-baseline gap-1 text-[#1B5E34] font-extrabold font-mono">
          <span className="text-xl">-{voucher.fixedDiscountAmount ? (voucher.fixedDiscountAmount / 1000000).toFixed(0) : ''}M</span>
          <span className="text-[10px] uppercase font-sans text-[#526357]">{t.vouchers.directDiscount}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 text-[#A0322D] font-extrabold">
          <Gift className="w-4 h-4 text-[#A0322D]" />
          <span className="text-xs font-sans uppercase tracking-wide">
            {voucher.giftServiceTitle ? 'ĐẶC QUYỀN LUẬT SƯ' : t.vouchers.freePartnerHour}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F6F8F6] text-[#112216] pb-20">
      {/* Top Banner & Segmentation Status Card */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-[#DCE5DF]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1B5E34] uppercase tracking-[0.2em] font-mono">
              <Gift className="w-3.5 h-3.5 text-[#1B5E34]" />
              {t.vouchers.headerSub}
            </div>
            <h1 className="text-base font-brand-sans font-bold text-[#112216] mt-0.5 uppercase tracking-wide">
              {t.vouchers.headerTitle}
            </h1>
          </div>
          
          <div className="bg-[#EAF4ED] border border-[#C2D5C8] px-3 py-1 text-center rounded">
            <span className="text-[9px] text-[#1B5E34] block font-bold uppercase tracking-wider font-mono">
              {t.vouchers.availableTab}
            </span>
            <span className="text-sm font-bold text-[#1B5E34] font-mono">
              {availableVouchers.length}
            </span>
          </div>
        </div>

        {/* Customer Segment Active Indicator Bar */}
        <div className="mt-3 p-2.5 rounded border border-[#DCE5DF] bg-[#F8FAF9] flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded bg-[#112216] text-white flex items-center justify-center shrink-0">
              <SegmentIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-[#526357] font-semibold uppercase">Ví Voucher theo Phân khúc:</span>
                <span className={`px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded border ${currentMeta.badgeStyle}`}>
                  {currentMeta.shortName}
                </span>
              </div>
              <p className="text-xs font-bold text-[#112216] truncate">
                {currentMeta.title}
              </p>
            </div>
          </div>

          {!isAuthenticated ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2.5 py-1 bg-[#1B5E34] hover:bg-[#144928] text-white text-[10px] font-bold uppercase tracking-wider rounded transition shrink-0 shadow-2xs flex items-center gap-1"
            >
              <span>Đăng nhập</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2 py-1 bg-white hover:bg-[#EAF4ED] border border-[#CBD5E1] text-[#1B5E34] text-[10px] font-bold uppercase tracking-wider rounded transition shrink-0"
              title="Đổi phân khúc khách hàng để test"
            >
              Đổi vai
            </button>
          )}
        </div>

        {/* Guest Warning if not authenticated */}
        {!isAuthenticated && (
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Chưa đăng nhập. Bạn đang xem các ưu đãi phổ thông. Hãy đăng nhập để mở khóa các đặc quyền M&A, VIP Retainer, và gói Doanh nghiệp.
            </span>
          </div>
        )}

        {/* Redeem code input box with Segment protection */}
        <form onSubmit={handleRedeem} className="mt-3">
          <div className="flex items-center gap-2 bg-[#F8FAF9] border border-[#DCE5DF] focus-within:border-[#1B5E34] p-1 rounded">
            <div className="pl-2.5 text-[#1B5E34]">
              <Tag className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Nhập mã ưu đãi (VD: DIMAC-MA20, DIMAC-CORP-MA2H...)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="flex-1 bg-transparent px-2 py-1 text-xs text-[#112216] placeholder-[#798C7F] font-mono uppercase focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputCode.trim()}
              className="px-3.5 py-1.5 bg-[#1B5E34] hover:bg-[#144928] disabled:opacity-40 disabled:hover:bg-[#1B5E34] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm rounded"
            >
              {t.vouchers.redeemBtn}
            </button>
          </div>

          {/* Feedback message */}
          {redeemFeedback && (
            <div className={`mt-2 p-2.5 text-xs flex items-start gap-2 border rounded ${
              redeemFeedback.success
                ? 'bg-[#EAF4ED] border-[#C2D5C8] text-[#1B5E34]'
                : 'bg-[#FDF0EF] border-[#F5C2BF] text-[#A0322D]'
            }`}>
              {redeemFeedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-[#1B5E34] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#A0322D] shrink-0 mt-0.5" />
              )}
              <span className="leading-tight">{redeemFeedback.message}</span>
            </div>
          )}
        </form>

        {/* 3 Wallet Tabs (AVAILABLE / USED / EXPIRED) */}
        <div className="grid grid-cols-3 gap-1 bg-[#F1F4F2] p-1 border border-[#DCE5DF] mt-3 text-xs font-semibold rounded">
          <button
            onClick={() => setActiveTab('AVAILABLE')}
            className={`py-1.5 transition text-center flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider font-bold rounded ${
              activeTab === 'AVAILABLE'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216]'
            }`}
          >
            <span>{t.vouchers.availableTab}</span>
            <span className={`text-[10px] px-1 py-0.2 font-mono rounded ${
              activeTab === 'AVAILABLE' ? 'bg-white/20 text-white' : 'bg-white text-[#1B5E34] border border-[#DCE5DF]'
            }`}>
              {availableVouchers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('USED')}
            className={`py-1.5 transition text-center flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider font-bold rounded ${
              activeTab === 'USED'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216]'
            }`}
          >
            <span>{t.vouchers.usedTab}</span>
            <span className={`text-[10px] px-1 py-0.2 font-mono rounded ${
              activeTab === 'USED' ? 'bg-white/20 text-white' : 'bg-white text-[#526357] border border-[#DCE5DF]'
            }`}>
              {usedVouchers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('EXPIRED')}
            className={`py-1.5 transition text-center flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider font-bold rounded ${
              activeTab === 'EXPIRED'
                ? 'bg-[#1B5E34] text-white shadow-xs'
                : 'text-[#526357] hover:text-[#112216]'
            }`}
          >
            <span>{t.vouchers.expiredTab}</span>
            <span className={`text-[10px] px-1 py-0.2 font-mono rounded ${
              activeTab === 'EXPIRED' ? 'bg-white/20 text-white' : 'bg-white text-[#526357] border border-[#DCE5DF]'
            }`}>
              {expiredVouchers.length}
            </span>
          </button>
        </div>

        {/* Quick Segment Filter Pill Toggle */}
        <div className="flex items-center gap-1 mt-2.5 overflow-x-auto pb-0.5 text-[10px] font-semibold">
          <span className="text-[#64748B] shrink-0 mr-1">Bộ lọc:</span>
          
          <button
            onClick={() => setSegmentFilter('ALL_ELIGIBLE')}
            className={`px-2 py-0.5 rounded transition shrink-0 ${
              segmentFilter === 'ALL_ELIGIBLE'
                ? 'bg-[#112216] text-white'
                : 'bg-white text-[#526357] border border-[#CBD5E1] hover:bg-slate-50'
            }`}
          >
            Tất cả hợp lệ ({statusFiltered.length})
          </button>

          <button
            onClick={() => setSegmentFilter('EXCLUSIVE_ONLY')}
            className={`px-2 py-0.5 rounded transition shrink-0 ${
              segmentFilter === 'EXCLUSIVE_ONLY'
                ? 'bg-[#1B5E34] text-white'
                : 'bg-white text-[#1B5E34] border border-[#CBD5E1] hover:bg-slate-50'
            }`}
          >
            Đặc quyền phân khúc
          </button>

          <button
            onClick={() => setSegmentFilter('COMMON_ONLY')}
            className={`px-2 py-0.5 rounded transition shrink-0 ${
              segmentFilter === 'COMMON_ONLY'
                ? 'bg-[#1B5E34] text-white'
                : 'bg-white text-[#526357] border border-[#CBD5E1] hover:bg-slate-50'
            }`}
          >
            Ưu đãi phổ thông (ALL)
          </button>
        </div>
      </div>

      {/* Vouchers List */}
      <div className="px-4 py-4 space-y-3">
        {currentList.length === 0 && (
          <div className="text-center py-12 px-4 bg-white border border-[#DCE5DF] rounded-lg">
            <Gift className="w-8 h-8 text-[#A0B0A5] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#112216] uppercase tracking-wider">
              {activeTab === 'AVAILABLE'
                ? 'Không có voucher khả dụng cho bộ lọc này'
                : activeTab === 'USED'
                ? t.vouchers.emptyUsed
                : t.vouchers.emptyExpired}
            </h4>
            <p className="text-xs text-[#526357] mt-1">
              {segmentFilter !== 'ALL_ELIGIBLE'
                ? 'Thử chọn lại "Tất cả hợp lệ" hoặc chuyển đổi phân khúc tài khoản để xem các ưu đãi tương ứng.'
                : t.vouchers.emptyAvailableSub}
            </p>
          </div>
        )}

        {currentList.map(item => {
          const { voucher, status } = item;
          const isAvailable = status === 'AVAILABLE';
          const title = language === 'vi' ? voucher.title : (voucher.title_en || voucher.title);
          const description = language === 'vi' ? voucher.description_vi : (voucher.description_en || voucher.description_vi);

          return (
            <div
              key={item.id}
              className={`border transition shadow-xs rounded-lg overflow-hidden flex flex-col justify-between ${
                isAvailable
                  ? 'bg-white border-[#DCE5DF] hover:border-[#1B5E34]'
                  : status === 'USED'
                  ? 'bg-[#F8FAF9] border-[#DCE5DF] opacity-85'
                  : 'bg-[#F8FAF9] border-[#DCE5DF] opacity-60'
              }`}
            >
              {/* Ticket Top Strip */}
              <div className="p-4 relative">
                {/* Segment Badge + Voucher Code */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div>
                    {renderVoucherBadge(item)}
                  </div>

                  <span className="font-mono text-xs font-bold uppercase bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8] px-2 py-0.5 rounded">
                    {voucher.code}
                  </span>
                </div>

                {/* Header: Discount value */}
                <div className="mb-2">
                  {renderDiscountTag(item)}
                </div>

                {/* Title & Description */}
                <h3 className="text-sm font-bold text-[#112216] leading-snug font-brand-sans">
                  {title}
                </h3>
                <p className="text-xs text-[#526357] mt-1 leading-relaxed">
                  {description}
                </p>

                {/* Applicable Services Pills */}
                {voucher.applicableServices && voucher.applicableServices.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {voucher.applicableServices.map(srv => {
                      const translatedSrv = (t.categories as Record<string, string>)[srv] || srv;
                      return (
                        <span key={srv} className="text-[9px] text-[#526357] bg-[#F1F4F2] px-1.5 py-0.5 border border-[#DCE5DF] rounded">
                          • {translatedSrv}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Ticket Perforated Divider */}
              <div className="relative flex items-center justify-between px-2">
                <div className="w-2.5 h-5 bg-[#F6F8F6] -ml-2.5 border-r border-[#DCE5DF] rounded-r-full" />
                <div className="flex-1 border-t border-dashed border-[#DCE5DF] mx-2" />
                <div className="w-2.5 h-5 bg-[#F6F8F6] -mr-2.5 border-l border-[#DCE5DF] rounded-l-full" />
              </div>

              {/* Ticket Bottom Strip: Dates & Action */}
              <div className="p-4 pt-3 bg-[#F8FAF9] flex items-center justify-between gap-2 text-xs border-t border-[#E8EFEA]">
                <div className="flex items-center gap-1.5 text-[#526357] text-[10px] uppercase tracking-wider font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#1B5E34]" />
                  <span>{t.vouchers.expiresOn} {voucher.endDate}</span>
                </div>

                {isAvailable ? (
                  <button
                    onClick={() => setSelectedVoucherForQr(item)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition rounded"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{t.vouchers.useNow}</span>
                  </button>
                ) : status === 'USED' ? (
                  <div className="flex items-center gap-1 text-[10px] text-[#1B5E34] font-semibold bg-[#EAF4ED] px-2 py-0.5 border border-[#C2D5C8] uppercase tracking-wider font-mono rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1B5E34]" />
                    <span>{t.vouchers.usedOn} {item.usedAt || 'Trước đó'}</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-[#798C7F] font-medium uppercase tracking-wider font-mono">
                    {t.vouchers.expiredTab}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
