import React, { useState, useEffect } from 'react';
import { LegalCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  X, 
  PhoneCall, 
  Tag, 
  CheckCircle2, 
  Scale
} from 'lucide-react';

export const BookConsultationModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    userProfile, 
    createLead,
    preselectedServiceForBooking,
    setPreselectedServiceForBooking,
    preselectedVoucherCodeForBooking,
    setPreselectedVoucherCodeForBooking,
    userVouchers,
    authors,
    language
  } = useApp();

  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const [fullName, setFullName] = useState(userProfile.fullName || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [enterpriseName, setEnterpriseName] = useState(userProfile.enterpriseName || '');
  const [position, setPosition] = useState(userProfile.position || '');
  const [practiceArea, setPracticeArea] = useState<LegalCategory>(preselectedServiceForBooking || 'M&A');
  const [serviceDetail, setServiceDetail] = useState('');
  const [notes, setNotes] = useState('');
  const [voucherCode, setVoucherCode] = useState(preselectedVoucherCodeForBooking || '');
  const [selectedLawyerId, setSelectedLawyerId] = useState(authors[0]?.id || 'lawyer-1');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedServiceForBooking) {
      setPracticeArea(preselectedServiceForBooking);
    }
    if (preselectedVoucherCodeForBooking) {
      setVoucherCode(preselectedVoucherCodeForBooking);
    }
  }, [preselectedServiceForBooking, preselectedVoucherCodeForBooking]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !serviceDetail) return;

    const chosenLawyer = authors.find(a => a.id === selectedLawyerId) || authors[0];
    const assignedLawyer = chosenLawyer ? `${chosenLawyer.name} (${chosenLawyer.role})` : 'LS. Phạm Quốc Tuấn (Managing Partner)';

    createLead({
      customerName: fullName,
      phone,
      email,
      enterpriseName: enterpriseName || 'Doanh nghiệp FDI / Nội địa',
      position: position || 'Đại diện Doanh nghiệp',
      practiceArea,
      serviceDetail,
      notes: notes ? `${notes} (Voucher: ${voucherCode || 'Không'})` : `Voucher: ${voucherCode || 'Không'}`,
      appliedVoucherCode: voucherCode || undefined,
      assignedLawyerName: assignedLawyer,
      assignedLawyerId: selectedLawyerId,
      priority: 'HIGH'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsBookingModalOpen(false);
      setPreselectedServiceForBooking(null);
      setPreselectedVoucherCodeForBooking(null);
    }, 2800);
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setPreselectedServiceForBooking(null);
    setPreselectedVoucherCodeForBooking(null);
  };

  const availableVouchers = userVouchers.filter(uv => uv.status === 'AVAILABLE');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#112216] w-full max-w-lg overflow-hidden shadow-2xl border border-[#DCE5DF] flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#F6F8F6] px-5 py-4 border-b border-[#DCE5DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#EAF4ED] border border-[#C2D5C8] flex items-center justify-center">
              <Scale className="w-4 h-4 text-[#1B5E34]" />
            </div>
            <div>
              <h3 className="text-sm font-brand-sans font-bold text-[#112216] uppercase tracking-wider">{t.booking.modalTitle}</h3>
              <p className="text-[11px] text-[#526357]">{t.booking.modalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3 my-auto">
            <div className="w-16 h-16 bg-[#EAF4ED] border border-[#C2D5C8] flex items-center justify-center text-[#1B5E34]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-brand-sans font-bold text-[#112216] uppercase tracking-wide">{t.booking.successTitle}</h3>
            <p className="text-xs text-[#526357] max-w-xs leading-relaxed">
              {language === 'vi' 
                ? `Luật sư chuyên trách của DIMAC Law Firm sẽ liên hệ với Quý doanh nghiệp qua số điện thoại `
                : `A dedicated partner at DIMAC Law Firm will contact your enterprise via `}
              <strong className="text-[#112216] font-mono">{phone}</strong>
              {language === 'vi' ? ' trong vòng 30 phút làm việc.' : ' within 30 business minutes.'}
            </p>
            {voucherCode && (
              <span className="text-[11px] font-mono font-bold text-[#1B5E34] bg-[#EAF4ED] px-3 py-1 border border-[#C2D5C8]">
                {language === 'vi' ? `Đã ghi nhận Voucher: ${voucherCode}` : `Voucher Applied: ${voucherCode}`}
              </span>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 bg-white">
            {/* Practice Area selector */}
            <div>
              <label className="block text-xs font-bold text-[#112216] mb-1.5 uppercase text-[10px] tracking-wider font-mono">
                {t.booking.practiceArea} <span className="text-[#A0322D]">*</span>
              </label>
              <select
                value={practiceArea}
                onChange={(e) => setPracticeArea(e.target.value as LegalCategory)}
                className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
              >
                <option value="M&A">{t.categories['M&A'] || 'M&A'} (Mergers & Acquisitions)</option>
                <option value="Đầu tư">{t.categories['Đầu tư'] || 'Đầu tư'}</option>
                <option value="Bất động sản">{t.categories['Bất động sản'] || 'Bất động sản'}</option>
                <option value="Năng lượng">{t.categories['Năng lượng'] || 'Năng lượng'}</option>
                <option value="Tranh chấp & Tố tụng">{t.categories['Tranh chấp & Tố tụng'] || 'Tranh chấp & Tố tụng'}</option>
                <option value="Thuế & Tài chính">{t.categories['Thuế & Tài chính'] || 'Thuế & Tài chính'}</option>
                <option value="Lao động">{t.categories['Lao động'] || 'Lao động'}</option>
                <option value="Doanh nghiệp">{t.categories['Doanh nghiệp'] || 'Doanh nghiệp'}</option>
              </select>
            </div>

            {/* Select Preferred Partner Lawyer */}
            <div>
              <label className="block text-xs font-bold text-[#112216] mb-1.5 uppercase text-[10px] tracking-wider font-mono">
                {t.booking.assignedLawyer}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {authors.map(lawyer => (
                  <div
                    key={lawyer.id}
                    onClick={() => setSelectedLawyerId(lawyer.id)}
                    className={`flex items-center gap-2.5 p-2 border cursor-pointer transition ${
                      selectedLawyerId === lawyer.id
                        ? 'bg-[#EAF4ED] border-[#1B5E34] text-[#112216] shadow-xs'
                        : 'bg-[#F8FAF9] border-[#DCE5DF] text-[#526357] hover:border-[#1B5E34]'
                    }`}
                  >
                    <img 
                      src={lawyer.avatar} 
                      alt={lawyer.name} 
                      className="w-8 h-8 object-cover border border-[#DCE5DF]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#112216] truncate font-brand-sans">{lawyer.name}</p>
                      <p className="text-[10px] text-[#526357] truncate">{lawyer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise & Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#526357] mb-1 tracking-wider font-mono">
                  {t.booking.fullName} <span className="text-[#A0322D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="VD: Trần Minh Tuấn"
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#526357] mb-1 tracking-wider font-mono">
                  {t.booking.phone} <span className="text-[#A0322D]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="VD: 0909 123 456"
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#526357] mb-1 tracking-wider font-mono">
                  {t.booking.enterprise}
                </label>
                <input
                  type="text"
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                  placeholder="VD: Tập đoàn Vanguard"
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#526357] mb-1 tracking-wider font-mono">
                  {t.booking.position}
                </label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="VD: Giám đốc Pháp chế / In-house"
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>
            </div>

            {/* Service Requirement Details */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#526357] mb-1 tracking-wider font-mono">
                {t.booking.serviceDetail} <span className="text-[#A0322D]">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={serviceDetail}
                onChange={(e) => setServiceDetail(e.target.value)}
                placeholder={language === 'vi' ? "VD: Cần rà soát Hợp đồng chuyển nhượng cổ phần 65% hoặc thẩm định pháp lý dự án năng lượng..." : "E.g., Need to review 65% share transfer contract or renewable energy project due diligence..."}
                className="w-full bg-[#F8FAF9] border border-[#DCE5DF] p-3 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34] leading-relaxed"
              />
            </div>

            {/* Voucher Selection / Input */}
            <div className="bg-[#F8FAF9] p-3 border border-[#DCE5DF]">
              <label className="block text-xs font-bold text-[#1B5E34] mb-1.5 flex items-center gap-1 uppercase tracking-wider font-mono">
                <Tag className="w-3.5 h-3.5" />
                {t.booking.applyVoucher}
              </label>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  placeholder={t.booking.voucherPlaceholder}
                  className="flex-1 bg-white border border-[#DCE5DF] px-3 py-1.5 text-xs text-[#112216] font-mono uppercase focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              {availableVouchers.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-[#526357] font-mono">{t.booking.availableVouchers}:</span>
                  {availableVouchers.map(uv => (
                    <button
                      type="button"
                      key={uv.id}
                      onClick={() => setVoucherCode(uv.voucher.code)}
                      className={`text-[10px] font-mono px-2 py-0.5 border transition ${
                        voucherCode === uv.voucher.code
                          ? 'bg-[#1B5E34] text-white border-[#1B5E34] font-bold'
                          : 'bg-white text-[#526357] border-[#DCE5DF] hover:border-[#1B5E34]'
                      }`}
                    >
                      {uv.voucher.code} ({uv.voucher.type === 'PERCENTAGE' ? `-${uv.voucher.discountPercentage}%` : uv.voucher.type === 'FIXED_AMOUNT' ? '-2 triệu' : (language === 'vi' ? 'Miễn phí 1h' : 'Free 1h')})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>{t.booking.submitBtn}</span>
              </button>
              <p className="text-[10px] text-[#798C7F] text-center mt-2">
                {language === 'vi' 
                  ? 'Thông tin được bảo mật tuyệt đối theo Nghị định 13/2023/NĐ-CP & Quy tắc đạo đức nghề Luật sư.'
                  : 'Strictly confidential in compliance with Decree 13/2023/ND-CP & Code of Legal Ethics.'}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
