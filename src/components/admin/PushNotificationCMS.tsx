import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  NotificationType, 
  TargetAudience, 
  LegalCategory 
} from '../../types';
import { 
  Send, 
  Bell, 
  Zap, 
  Tag, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Users,
  Smartphone
} from 'lucide-react';

const CATEGORIES: LegalCategory[] = [
  'M&A',
  'Đầu tư',
  'Bất động sản',
  'Năng lượng',
  'Tranh chấp & Tố tụng',
  'Thuế & Tài chính',
  'Lao động',
  'Doanh nghiệp'
];

export const PushNotificationCMS: React.FC = () => {
  const { 
    notifications, 
    sendPushNotification, 
    articles, 
    vouchers 
  } = useApp();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState<NotificationType>('breaking_alert');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('all');
  const [targetCategory, setTargetCategory] = useState<LegalCategory>('M&A');
  const [deepLinkType, setDeepLinkType] = useState<'article' | 'voucher' | 'consultation'>('article');
  const [deepLinkTargetId, setDeepLinkTargetId] = useState<string>(articles[0]?.id || '');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    let deepLinkLabel = 'Xem ngay';
    if (deepLinkType === 'article') {
      const art = articles.find(a => a.id === deepLinkTargetId);
      deepLinkLabel = art ? `Xem: ${art.title_vi.slice(0, 30)}...` : 'Xem bài viết';
    } else if (deepLinkType === 'voucher') {
      const v = vouchers.find(voc => voc.id === deepLinkTargetId);
      deepLinkLabel = v ? `Mở E-Voucher ${v.code}` : 'Mở Ví Voucher';
    } else {
      deepLinkLabel = 'Đặt lịch tư vấn trực tiếp';
    }

    sendPushNotification({
      title,
      body,
      type,
      targetAudience,
      targetCategory: targetAudience === 'category_interest' ? targetCategory : undefined,
      deepLink: {
        type: deepLinkType,
        targetId: deepLinkTargetId,
        label: deepLinkLabel
      },
      scheduledAt: isScheduled ? scheduledAt : undefined
    });

    setSentSuccess(true);
    setTitle('');
    setBody('');
    setTimeout(() => setSentSuccess(false), 3500);
  };

  const getEstimatedAudienceCount = () => {
    switch (targetAudience) {
      case 'all': return '12.500 thiết bị';
      case 'enterprise_leads': return '4.200 doanh nghiệp';
      case 'vip_clients': return '850 khách hàng VIP';
      case 'in_house_counsel': return '1.600 Trưởng ban Pháp chế';
      case 'category_interest': return `3.100 người quan tâm ${targetCategory}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title */}
      <div className="pb-4 border-b border-[#DCE5DF]">
        <h2 className="text-xl font-brand-sans font-bold text-[#112216] flex items-center gap-2 uppercase tracking-wide">
          <Send className="w-5 h-5 text-[#1B5E34]" />
          Quản Lý Chiến Dịch Push Notification
        </h2>
        <p className="text-xs text-[#526357] mt-0.5">
          Tích hợp Firebase Cloud Messaging (FCM) & Apple APNs: Bắn thông báo khẩn, tặng voucher và điều hướng Deep-link.
        </p>
      </div>

      {/* Grid: Form Composer + Live Mobile Lockscreen Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Composer (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#DCE5DF] p-5 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#DCE5DF] pb-3">
            <h3 className="text-xs font-brand-sans font-bold text-[#112216] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#1B5E34]" />
              Soạn Thông Báo Đẩy Mới
            </h3>
            <span className="text-[10px] text-[#1B5E34] bg-[#EAF4ED] border border-[#C2D5C8] px-2.5 py-0.5 font-mono uppercase tracking-wider">
              ⚡ FCM/APNs: 50.000 msg/2m
            </span>
          </div>

          <form onSubmit={handleSendPush} className="space-y-4">
            {/* Notification Type */}
            <div>
              <label className="block font-bold text-[#112216] mb-1.5 uppercase text-[10px] tracking-wider">Loại thông báo</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setType('breaking_alert')}
                  className={`p-2 border text-left transition ${
                    type === 'breaking_alert'
                      ? 'bg-[#FDF0EF] border-[#A0322D] text-[#A0322D] font-bold'
                      : 'bg-[#F8FAF9] border-[#DCE5DF] text-[#526357] hover:border-[#A0322D]'
                  }`}
                >
                  <span className="flex items-center gap-1 text-[11px] text-[#A0322D] font-bold uppercase tracking-wider">
                    <Zap className="w-3 h-3 fill-[#A0322D]" /> Flash Alert
                  </span>
                  <span className="text-[10px] text-[#798C7F] block mt-0.5">Cảnh báo khẩn</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('weekly_digest')}
                  className={`p-2 border text-left transition ${
                    type === 'weekly_digest'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                      : 'bg-[#F8FAF9] border-[#DCE5DF] text-[#526357] hover:border-blue-600'
                  }`}
                >
                  <span className="flex items-center gap-1 text-[11px] text-blue-700 font-bold uppercase tracking-wider">
                    <Bell className="w-3 h-3" /> Digest
                  </span>
                  <span className="text-[10px] text-[#798C7F] block mt-0.5">Điểm tin tuần</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('promotion_alert')}
                  className={`p-2 border text-left transition ${
                    type === 'promotion_alert'
                      ? 'bg-[#EAF4ED] border-[#1B5E34] text-[#1B5E34] font-bold'
                      : 'bg-[#F8FAF9] border-[#DCE5DF] text-[#526357] hover:border-[#1B5E34]'
                  }`}
                >
                  <span className="flex items-center gap-1 text-[11px] text-[#1B5E34] font-bold uppercase tracking-wider">
                    <Tag className="w-3 h-3" /> Voucher
                  </span>
                  <span className="text-[10px] text-[#798C7F] block mt-0.5">Tặng ưu đãi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('personal_message')}
                  className={`p-2 border text-left transition ${
                    type === 'personal_message'
                      ? 'bg-amber-50 border-amber-600 text-amber-800 font-bold'
                      : 'bg-[#F8FAF9] border-[#DCE5DF] text-[#526357] hover:border-amber-600'
                  }`}
                >
                  <span className="flex items-center gap-1 text-[11px] text-amber-800 font-bold uppercase tracking-wider">
                    <Calendar className="w-3 h-3" /> Lịch hẹn
                  </span>
                  <span className="text-[10px] text-[#798C7F] block mt-0.5">Tư vấn / Nhắc</span>
                </button>
              </div>
            </div>

            {/* Target Audience Segment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#112216] mb-1 uppercase text-[10px] tracking-wider">
                  Phân khúc khách hàng mục tiêu
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                >
                  <option value="all">Tất cả người dùng (All Devices)</option>
                  <option value="enterprise_leads">Khách hàng Doanh nghiệp (Leads)</option>
                  <option value="vip_clients">Khách hàng VIP / Retainer</option>
                  <option value="in_house_counsel">Trưởng ban Pháp chế Doanh nghiệp</option>
                  <option value="category_interest">Theo chuyên ngành quan tâm</option>
                </select>
              </div>

              {targetAudience === 'category_interest' ? (
                <div>
                  <label className="block font-bold text-[#112216] mb-1 uppercase text-[10px] tracking-wider">
                    Chuyên ngành cụ thể
                  </label>
                  <select
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value as LegalCategory)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex flex-col justify-end">
                  <div className="bg-[#F8FAF9] px-3 py-2 border border-[#DCE5DF] text-[#526357] flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono">Ước tính quy mô:</span>
                    <strong className="text-[#1B5E34] font-mono">{getEstimatedAudienceCount()}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Title & Body */}
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#112216] mb-1">
                  Tiêu đề thông báo (Title) <span className="text-[#A0322D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: [FLASH ALERT] Nghị định 80/2024 về DPPA chính thức có hiệu lực"
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1">
                  Nội dung chi tiết (Push Body) <span className="text-[#A0322D]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="VD: Doanh nghiệp năng lượng và khách hàng tiêu thụ lớn cần nắm rõ 05 điều kiện ký kết hợp đồng..."
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] p-3 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34] leading-relaxed"
                />
              </div>
            </div>

            {/* Deep-link Action Target */}
            <div className="bg-[#F8FAF9] p-3.5 border border-[#DCE5DF] space-y-2.5">
              <label className="block font-bold text-[#112216] uppercase text-[10px] tracking-wider">
                Hành động khi bấm vào thông báo (Deep-Link Navigation)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={deepLinkType}
                  onChange={(e) => setDeepLinkType(e.target.value as any)}
                  className="bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                >
                  <option value="article">Mở Bài viết pháp lý (Article Detail)</option>
                  <option value="voucher">Mở Chi tiết E-Voucher (Voucher QR)</option>
                  <option value="consultation">Mở Modal Đặt lịch tư vấn (Booking)</option>
                </select>

                {deepLinkType === 'article' && (
                  <select
                    value={deepLinkTargetId}
                    onChange={(e) => setDeepLinkTargetId(e.target.value)}
                    className="bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  >
                    {articles.map(a => (
                      <option key={a.id} value={a.id}>{a.title_vi.slice(0, 40)}...</option>
                    ))}
                  </select>
                )}

                {deepLinkType === 'voucher' && (
                  <select
                    value={deepLinkTargetId}
                    onChange={(e) => setDeepLinkTargetId(e.target.value)}
                    className="bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  >
                    {vouchers.map(v => (
                      <option key={v.id} value={v.id}>{v.code} - {v.title}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Scheduled push toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="schedCheck"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="w-4 h-4 accent-[#1B5E34]"
                />
                <label htmlFor="schedCheck" className="text-xs text-[#526357] cursor-pointer">
                  Lên lịch phát thông báo tự động
                </label>
              </div>

              {isScheduled && (
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="bg-[#F8FAF9] border border-[#DCE5DF] px-2 py-1 text-xs text-[#112216]"
                />
              )}
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Phát Lệnh Gửi Push Notification (FCM / APNs)</span>
              </button>

              {sentSuccess && (
                <div className="mt-2 p-2 bg-[#EAF4ED] border border-[#C2D5C8] text-[#1B5E34] text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Đã phát thông báo thành công tới tất cả thiết bị mục tiêu!
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right: Live Lockscreen Preview & Broadcast History (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* iOS / Android Simulated Lockscreen Push Banner */}
          <div className="bg-white border border-[#DCE5DF] p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#526357] font-mono flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#1B5E34]" />
                Xem trước trên Màn hình khóa (Live Preview)
              </span>
              <span className="text-[9px] text-[#798C7F] font-mono">iOS & Android</span>
            </div>

            <div className="bg-[#112216] text-white p-3.5 border border-[#275935] shadow-lg space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[#C2D5C8]">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-[#1B5E34] flex items-center justify-center font-bold text-[9px] text-white">D</div>
                  <span className="font-bold tracking-wide">DIMAC LAW</span>
                </div>
                <span className="text-[9px]">Vừa xong</span>
              </div>

              <h4 className="text-xs font-bold leading-tight font-brand-sans text-white">
                {title || 'Tiêu đề thông báo đẩy mẫu hiển thị tại đây...'}
              </h4>
              <p className="text-[11px] text-[#DCE5DF] leading-snug">
                {body || 'Nội dung chi tiết thông báo pháp lý sẽ được hiển thị đầy đủ trên màn hình khóa của khách hàng.'}
              </p>
            </div>
          </div>

          {/* Broadcast History */}
          <div className="bg-white border border-[#DCE5DF] p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-brand-sans font-bold uppercase tracking-wider text-[#112216] flex items-center justify-between">
              <span>Lịch Sử Phát Sóng ({notifications.length})</span>
              <span className="text-[10px] text-[#1B5E34] font-mono font-normal">Real-time Telemetry</span>
            </h3>

            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className="p-3 bg-[#F8FAF9] border border-[#DCE5DF] space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-[#112216] truncate max-w-[220px]">
                      {n.title}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8] font-bold shrink-0">
                      {n.sentCount > 0 ? `${((n.openCount / n.sentCount) * 100).toFixed(0)}% mở` : 'Mới'}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#526357] line-clamp-1">{n.body}</p>

                  <div className="flex items-center justify-between text-[10px] text-[#798C7F] font-mono pt-1 border-t border-[#E8EFEA]">
                    <span>{new Date(n.createdAt).toLocaleDateString('vi-VN')} {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>Gửi: {n.sentCount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
