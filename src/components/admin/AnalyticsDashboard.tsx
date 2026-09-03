import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Eye, 
  Send, 
  Tag, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  Scale
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { adminStats, articles, vouchers, leads, notifications } = useApp();

  const totalArticleViews = articles.reduce((acc, a) => acc + a.viewsCount, 0);
  const totalVouchersClaimed = vouchers.reduce((acc, v) => acc + v.usedCount, 0);
  const totalLeadsCount = leads.length;

  const categoryBreakdown = [
    { name: 'M&A & Đầu tư', count: 8, views: 18450, percentage: 38 },
    { name: 'Bất động sản', count: 3, views: 9820, percentage: 24 },
    { name: 'Tranh chấp (VIAC)', count: 2, views: 5610, percentage: 18 },
    { name: 'Thuế & Tài chính', count: 3, views: 4120, percentage: 12 },
    { name: 'Lao động & Doanh nghiệp', count: 2, views: 2890, percentage: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DCE5DF]">
        <div>
          <h2 className="text-xl font-brand-sans font-bold text-[#112216] uppercase tracking-wide">
            Báo Cáo & Thống Kê Tổng Quan
          </h2>
          <p className="text-xs text-[#526357] mt-0.5">
            Dữ liệu hoạt động hệ thống, lượt đọc tin pháp lý, hiệu quả Push Notification và chuyển đổi Lead.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#1B5E34] bg-[#EAF4ED] border border-[#C2D5C8] px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1B5E34] animate-pulse" />
            Hệ thống chuẩn SLA 99.9%
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Articles & Views */}
        <div className="bg-white border border-[#DCE5DF] hover:border-[#1B5E34] transition p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-[#526357] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526357]">Bài viết & Lượt đọc</span>
            <div className="w-8 h-8 bg-[#EAF4ED] text-[#1B5E34] flex items-center justify-center border border-[#C2D5C8]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#112216] font-mono">{articles.length}</span>
            <span className="text-xs text-[#798C7F] font-mono">bài xuất bản</span>
          </div>
          <div className="mt-2 text-xs text-[#1B5E34] flex items-center gap-1 font-mono">
            <Eye className="w-3.5 h-3.5" />
            <span>{totalArticleViews.toLocaleString()} tổng lượt xem</span>
          </div>
        </div>

        {/* Push Notification Open Rate */}
        <div className="bg-white border border-[#DCE5DF] hover:border-[#1B5E34] transition p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-[#526357] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526357]">Tỉ lệ mở Push Noti</span>
            <div className="w-8 h-8 bg-[#EAF4ED] text-[#1B5E34] flex items-center justify-center border border-[#C2D5C8]">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#112216] font-mono">{adminStats.averagePushOpenRate}%</span>
            <span className="text-xs text-[#1B5E34] font-semibold flex items-center font-mono">
              <ArrowUpRight className="w-3 h-3" /> +4.2%
            </span>
          </div>
          <div className="mt-2 text-xs text-[#798C7F] flex items-center gap-1 font-mono">
            <span>{notifications.length} chiến dịch đã phát</span>
          </div>
        </div>

        {/* E-Vouchers Used & Conversion */}
        <div className="bg-white border border-[#DCE5DF] hover:border-[#1B5E34] transition p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-[#526357] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526357]">Voucher Đã Đối Soát</span>
            <div className="w-8 h-8 bg-[#EAF4ED] text-[#1B5E34] flex items-center justify-center border border-[#C2D5C8]">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#112216] font-mono">{totalVouchersClaimed}</span>
            <span className="text-xs text-[#798C7F] font-mono">lượt áp dụng HĐ</span>
          </div>
          <div className="mt-2 text-xs text-[#1B5E34] flex items-center gap-1 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tiết kiệm ~185M VNĐ</span>
          </div>
        </div>

        {/* Active Inquiries / Consultation Leads */}
        <div className="bg-white border border-[#DCE5DF] hover:border-[#1B5E34] transition p-4 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between text-[#526357] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#526357]">Yêu Cầu Tư Vấn</span>
            <div className="w-8 h-8 bg-[#FDF0EF] text-[#A0322D] flex items-center justify-center border border-[#F5C2BF]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#112216] font-mono">{totalLeadsCount}</span>
            <span className="text-xs text-[#798C7F] font-mono">khách hàng DN</span>
          </div>
          <div className="mt-2 text-xs text-[#1B5E34] flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Tỷ lệ chốt HĐ: 68%</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Practice Area Popularity & Push Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Practice Area Views Breakdown */}
        <div className="bg-white border border-[#DCE5DF] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-brand-sans font-bold text-[#112216] uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#1B5E34]" />
              Quan Tâm Theo Chuyên Ngành Pháp Luật
            </h3>
            <span className="text-[11px] text-[#798C7F] font-mono">Lượt đọc</span>
          </div>

          <div className="space-y-3 pt-1">
            {categoryBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#112216]">{item.name}</span>
                  <span className="text-[#526357] font-mono">
                    {item.views.toLocaleString()} lượt ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-[#F1F4F2] overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      idx === 0 ? 'bg-[#1B5E34]' :
                      idx === 1 ? 'bg-blue-600' :
                      idx === 2 ? 'bg-[#A0322D]' :
                      idx === 3 ? 'bg-emerald-600' : 'bg-slate-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Push Notifications Telemetry */}
        <div className="bg-white border border-[#DCE5DF] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-brand-sans font-bold text-[#112216] uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-[#1B5E34]" />
              Hiệu Quả Chiến Dịch Thông Báo Gần Nhất
            </h3>
            <span className="text-[11px] text-[#798C7F] font-mono">FCM / APNs</span>
          </div>

          <div className="space-y-3 pt-1">
            {notifications.slice(0, 3).map(noti => {
              const openRate = noti.sentCount > 0 ? ((noti.openCount / noti.sentCount) * 100).toFixed(1) : '42.0';
              return (
                <div key={noti.id} className="bg-[#F8FAF9] p-3 border border-[#DCE5DF] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#112216] truncate max-w-[260px]">
                      {noti.title}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#1B5E34] bg-[#EAF4ED] px-2 py-0.5 border border-[#C2D5C8]">
                      Tỉ lệ mở: {openRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#526357] font-mono">
                    <span>Đã gửi: {noti.sentCount.toLocaleString()} thiết bị</span>
                    <span>Lượt mở: {noti.openCount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Active Leads Summary */}
      <div className="bg-white border border-[#DCE5DF] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-brand-sans font-bold text-[#112216] uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1B5E34]" />
            Khách Hàng Doanh Nghiệp Cần Tư Vấn Gần Nhất
          </h3>
          <span className="text-[11px] text-[#798C7F]">Xử lý trong ngày</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {leads.slice(0, 3).map(lead => (
            <div key={lead.id} className="bg-[#F8FAF9] p-3.5 border border-[#DCE5DF] space-y-2 hover:border-[#1B5E34] transition">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-white text-[#1B5E34] border border-[#DCE5DF]">
                  {lead.practiceArea}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider ${
                  lead.status === 'NEW' ? 'bg-[#FDF0EF] text-[#A0322D] border border-[#F5C2BF]' :
                  lead.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]'
                }`}>
                  {lead.status === 'NEW' ? 'Mới' : lead.status === 'IN_PROGRESS' ? 'Đang tư vấn' : 'Đã ký HĐ'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#112216] truncate">{lead.customerName}</h4>
              <p className="text-[11px] text-[#526357] truncate font-medium">{lead.enterpriseName}</p>
              <p className="text-[11px] text-[#798C7F] line-clamp-2">{lead.serviceDetail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
