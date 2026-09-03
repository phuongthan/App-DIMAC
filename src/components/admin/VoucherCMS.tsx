import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VoucherType } from '../../types';
import { 
  Tag, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ScanLine, 
  X, 
  Sparkles
} from 'lucide-react';

export const VoucherCMS: React.FC = () => {
  const { 
    vouchers, 
    createVoucher, 
    verifyAndUseVoucher 
  } = useApp();

  // Create Voucher Form State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<VoucherType>('PERCENTAGE');
  const [discountPercent, setDiscountPercent] = useState(20);
  const [maxDiscount, setMaxDiscount] = useState(10000000);
  const [fixedAmount, setFixedAmount] = useState(2000000);
  const [giftService, setGiftService] = useState('Miễn phí 01 giờ tư vấn cùng Luật sư Partner');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('2026-12-31');
  const [totalIssued, setTotalIssued] = useState(100);
  const [servicesInput, setServicesInput] = useState('Rà soát Hợp đồng, Thẩm định M&A, Tư vấn FDI');

  // Scanner / Verification Tool State (FR-06.3)
  const [scanInputCode, setScanInputCode] = useState('');
  const [orderRefInput, setOrderRefInput] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; voucher?: any } | null>(null);

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title) return;

    createVoucher({
      code: code.trim().toUpperCase(),
      title,
      description_vi: desc || title,
      type,
      discountPercentage: type === 'PERCENTAGE' ? Number(discountPercent) : undefined,
      maxDiscountAmount: type === 'PERCENTAGE' ? Number(maxDiscount) : undefined,
      fixedDiscountAmount: type === 'FIXED_AMOUNT' ? Number(fixedAmount) : undefined,
      giftServiceTitle: type === 'SERVICE_GIFT' ? giftService : undefined,
      startDate,
      endDate,
      totalIssued: Number(totalIssued) || 100,
      userLimit: 1,
      applicableServices: servicesInput.split(',').map(s => s.trim()).filter(Boolean),
      terms: [
        'Áp dụng cho khách hàng sử dụng dịch vụ của DIMAC Law Firm.',
        'Mỗi hợp đồng dịch vụ chỉ được áp dụng 01 mã ưu đãi duy nhất.',
        'Không quy đổi thành tiền mặt.'
      ],
      bannerGradient: 'from-emerald-900 via-teal-900 to-slate-900'
    });

    setIsCreateOpen(false);
    setCode('');
    setTitle('');
    setDesc('');
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInputCode.trim()) return;

    const res = verifyAndUseVoucher(scanInputCode.trim().toUpperCase(), orderRefInput);
    setScanResult(res);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DCE5DF]">
        <div>
          <h2 className="text-xl font-brand-sans font-bold text-[#112216] flex items-center gap-2 uppercase tracking-wide">
            <Tag className="w-5 h-5 text-[#1B5E34]" />
            Quản Lý Kho E-Voucher & Quét Đối Soát
          </h2>
          <p className="text-xs text-[#526357] mt-0.5">
            Phát hành mã ưu đãi (% phí, tiền mặt, giờ tư vấn Partner) và đối soát trực tiếp khi khách hàng ký Hợp đồng dịch vụ.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Chương Trình E-Voucher Mới</span>
        </button>
      </div>

      {/* Grid: Voucher List + QR Scanner / Validator Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Vouchers Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#DCE5DF] overflow-hidden shadow-xs">
            <div className="p-4 bg-[#F6F8F6] border-b border-[#DCE5DF] flex items-center justify-between">
              <h3 className="text-xs font-brand-sans font-bold uppercase tracking-wider text-[#112216]">
                Danh Sách Mã Ưu Đãi Trên Hệ Thống ({vouchers.length})
              </h3>
              <span className="text-[11px] text-[#1B5E34] font-mono font-semibold">DIMAC Promotion Engine</span>
            </div>

            <div className="divide-y divide-[#DCE5DF] text-xs text-[#112216]">
              {vouchers.map(v => (
                <div key={v.id} className="p-4 hover:bg-[#F8FAF9] transition space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold uppercase px-2.5 py-0.5 bg-[#F6F8F6] text-[#1B5E34] border border-[#DCE5DF]">
                          {v.code}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          v.type === 'PERCENTAGE' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          v.type === 'FIXED_AMOUNT' ? 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]' : 'bg-[#FDF0EF] text-[#A0322D] border border-[#F5C2BF]'
                        }`}>
                          {v.type === 'PERCENTAGE' ? `Giảm ${v.discountPercentage}%` :
                           v.type === 'FIXED_AMOUNT' ? `Giảm ${(v.fixedDiscountAmount! / 1000000).toFixed(0)} Triệu` : 'Tặng 1h Partner'}
                        </span>
                        {v.targetSegments && (
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            v.targetSegments.includes('ALL') ? 'bg-slate-100 text-slate-700 border-slate-300' :
                            v.targetSegments.includes('ENTERPRISE') ? 'bg-[#0A2E1A] text-emerald-300 border-[#1B5E34]' :
                            v.targetSegments.includes('SME') ? 'bg-[#1A365D] text-blue-200 border-[#2B6CB0]' :
                            v.targetSegments.includes('RETAINER_VIP') ? 'bg-[#3B0764] text-purple-200 border-[#7E22CE]' :
                            'bg-[#451A03] text-amber-200 border-[#B45309]'
                          }`}>
                            {v.segmentBadgeVi || v.targetSegments.join(', ')}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-[#112216] mt-1">{v.title}</h4>
                      <p className="text-[11px] text-[#526357]">{v.description_vi}</p>
                    </div>

                    <div className="text-right shrink-0 font-mono text-[11px]">
                      <span className="text-[#798C7F] block text-[10px]">Đã dùng / Cấp</span>
                      <strong className="text-[#1B5E34]">{v.usedCount} / {v.totalIssued}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-[#798C7F] pt-1 border-t border-[#E8EFEA]">
                    <span>Hạn dùng: <strong className="text-[#112216] font-mono">{v.endDate}</strong></span>
                    <span className="truncate max-w-[240px]">Áp dụng: {v.applicableServices.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: QR Code Scanner & Manual Validator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#DCE5DF] p-5 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#DCE5DF] pb-3">
              <h3 className="text-xs font-brand-sans font-bold text-[#112216] uppercase tracking-wider flex items-center gap-1.5">
                <ScanLine className="w-4 h-4 text-[#1B5E34]" />
                Công Cụ Quét / Đối Soát Voucher
              </h3>
              <span className="text-[10px] text-[#1B5E34] bg-[#EAF4ED] border border-[#C2D5C8] px-2 py-0.5 font-mono uppercase">
                FR-06.3 Validator
              </span>
            </div>

            <p className="text-[#526357] text-[11px] leading-relaxed">
              Nhập mã E-Voucher hiển thị trên điện thoại của khách hàng hoặc quét Barcode / QR Code tại quầy tiếp đón DIMAC:
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-3">
              <div>
                <label className="block font-bold text-[#112216] mb-1">Mã E-Voucher khách hàng cung cấp</label>
                <input
                  type="text"
                  required
                  placeholder="VD: DIMAC-MA20 hoặc DIMAC-PARTNER1H"
                  value={scanInputCode}
                  onChange={(e) => setScanInputCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs font-mono uppercase text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1">Số Hợp đồng dịch vụ pháp lý (Order Ref)</label>
                <input
                  type="text"
                  placeholder="VD: HĐ-2026/M&A-042"
                  value={orderRefInput}
                  onChange={(e) => setOrderRefInput(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs font-mono text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kiểm Tra & Đối Soát Voucher</span>
              </button>
            </form>

            {/* Verification Result Feedback */}
            {scanResult && (
              <div className={`p-4 border text-xs space-y-2 animate-in fade-in ${
                scanResult.success
                  ? 'bg-[#EAF4ED] border-[#C2D5C8] text-[#112216]'
                  : 'bg-[#FDF0EF] border-[#F5C2BF] text-[#A0322D]'
              }`}>
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                  {scanResult.success ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#1B5E34]" />
                      <span className="text-[#1B5E34]">Xác thực Thành Công!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-[#A0322D]" />
                      <span>Xác thực Thất Bại</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed">{scanResult.message}</p>
                {scanResult.voucher && (
                  <div className="pt-2 border-t border-[#C2D5C8] font-mono text-[11px] text-[#1B5E34] space-y-0.5">
                    <p>• Mã: {scanResult.voucher.code}</p>
                    <p>• Chương trình: {scanResult.voucher.title}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Voucher Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#112216] w-full max-w-lg border border-[#DCE5DF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="bg-[#F6F8F6] px-5 py-4 border-b border-[#DCE5DF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#1B5E34]" />
                <h3 className="text-sm font-brand-sans font-bold text-[#112216] uppercase tracking-wider">
                  Tạo Chương Trình E-Voucher Mới
                </h3>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 bg-white text-[#526357] hover:text-[#112216] border border-[#DCE5DF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateVoucher} className="p-5 overflow-y-auto space-y-4 text-xs bg-white">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#112216] mb-1">
                    Mã Voucher (Code) <span className="text-[#A0322D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: DIMAC-FDI2026"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs font-mono uppercase text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#112216] mb-1">Loại ưu đãi</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as VoucherType)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  >
                    <option value="PERCENTAGE">Giảm theo % phí</option>
                    <option value="FIXED_AMOUNT">Giảm số tiền cố định (VNĐ)</option>
                    <option value="SERVICE_GIFT">Tặng gói dịch vụ / Giờ tư vấn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1">
                  Tên chương trình ưu đãi <span className="text-[#A0322D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Ưu đãi 20% Thẩm định pháp lý M&A Quý 3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              {type === 'PERCENTAGE' && (
                <div className="grid grid-cols-2 gap-3 bg-[#F8FAF9] p-3 border border-[#DCE5DF]">
                  <div>
                    <label className="block text-[10px] text-[#526357] mb-1">% Giảm giá</label>
                    <input
                      type="number"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#526357] mb-1">Giảm tối đa (VNĐ)</label>
                    <input
                      type="number"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(Number(e.target.value))}
                      className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] font-mono"
                    />
                  </div>
                </div>
              )}

              {type === 'FIXED_AMOUNT' && (
                <div className="bg-[#F8FAF9] p-3 border border-[#DCE5DF]">
                  <label className="block text-[10px] text-[#526357] mb-1">Số tiền giảm trực tiếp (VNĐ)</label>
                  <input
                    type="number"
                    value={fixedAmount}
                    onChange={(e) => setFixedAmount(Number(e.target.value))}
                    className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] font-mono"
                  />
                </div>
              )}

              {type === 'SERVICE_GIFT' && (
                <div className="bg-[#F8FAF9] p-3 border border-[#DCE5DF]">
                  <label className="block text-[10px] text-[#526357] mb-1">Chi tiết gói dịch vụ tặng kèm</label>
                  <input
                    type="text"
                    value={giftService}
                    onChange={(e) => setGiftService(e.target.value)}
                    className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216]"
                  />
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-[#526357] mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-2 py-1.5 text-xs text-[#112216]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#526357] mb-1">Ngày hết hạn</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-2 py-1.5 text-xs text-[#112216]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#526357] mb-1">Số lượng phát</label>
                  <input
                    type="number"
                    value={totalIssued}
                    onChange={(e) => setTotalIssued(Number(e.target.value))}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-2 py-1.5 text-xs text-[#112216] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#526357] mb-1">Các dịch vụ áp dụng (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={servicesInput}
                  onChange={(e) => setServicesInput(e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DCE5DF]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 bg-white text-[#526357] hover:text-[#112216] border border-[#DCE5DF]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold uppercase tracking-wider"
                >
                  Phát Hành E-Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
