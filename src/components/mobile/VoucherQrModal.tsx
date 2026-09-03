import React, { useState } from 'react';
import { UserVoucherItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

interface VoucherQrModalProps {
  userVoucher: UserVoucherItem;
  onClose: () => void;
}

export const VoucherQrModal: React.FC<VoucherQrModalProps> = ({ userVoucher, onClose }) => {
  const { verifyAndUseVoucher, setIsBookingModalOpen, setPreselectedVoucherCodeForBooking, language } = useApp();
  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const [copiedCode, setCopiedCode] = useState(false);
  const [confirmUseOpen, setConfirmUseOpen] = useState(false);

  const { voucher, status } = userVoucher;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(voucher.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDirectUse = () => {
    verifyAndUseVoucher(voucher.code);
    setConfirmUseOpen(false);
  };

  const handleBookConsultationWithVoucher = () => {
    setPreselectedVoucherCodeForBooking(voucher.code);
    setIsBookingModalOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#112216] w-full max-w-md overflow-hidden shadow-2xl border border-[#DCE5DF] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#F6F8F6] px-5 py-3.5 border-b border-[#DCE5DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#1B5E34] animate-ping"></span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B5E34] font-mono">
              {t.vouchers.qrTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 bg-white">
          {/* Voucher Title Header */}
          <div className="text-center">
            <span className={`inline-block text-[10px] font-bold uppercase px-2.5 py-0.5 mb-1.5 font-mono ${
              status === 'AVAILABLE'
                ? 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]'
                : status === 'USED'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-slate-100 text-slate-500'
            }`}>
              {status === 'AVAILABLE' 
                ? (language === 'vi' ? '• Khả dụng / Sẵn sàng áp dụng' : '• Available / Ready to use') 
                : status === 'USED' 
                ? (language === 'vi' ? '• Đã đối soát & sử dụng' : '• Redeemed & Verified') 
                : (language === 'vi' ? '• Đã hết hạn' : '• Expired')}
            </span>
            <h2 className="text-base font-brand-sans font-bold text-[#112216] uppercase tracking-wide leading-snug">
              {voucher.title}
            </h2>
            <p className="text-xs text-[#526357] mt-1 font-mono">
              {t.vouchers.expiresOn}: <strong className="text-[#112216]">{voucher.endDate}</strong>
            </p>
          </div>

          {/* QR Code & Barcode Canvas Container */}
          <div className="bg-[#F8FAF9] text-[#112216] p-5 shadow-xs flex flex-col items-center justify-center relative border border-[#DCE5DF]">
            {status === 'USED' && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 z-10">
                <CheckCircle2 className="w-12 h-12 text-[#1B5E34] mb-2" />
                <span className="text-[#112216] font-bold text-sm uppercase tracking-wider">{language === 'vi' ? 'Voucher Đã Được Đối Soát' : 'Voucher Has Been Redeemed'}</span>
                <span className="text-xs text-[#526357] mt-1 font-mono">{language === 'vi' ? 'Thời gian:' : 'Time:'} {userVoucher.usedAt || (language === 'vi' ? 'Hôm nay' : 'Today')}</span>
                <span className="text-[11px] text-[#1B5E34] font-mono mt-0.5">{language === 'vi' ? 'Mã HĐ:' : 'Order Ref:'} {userVoucher.orderRef || 'DIMAC-VERIFIED'}</span>
              </div>
            )}

            {/* Generated QR Code Pattern */}
            <div className="relative p-3 bg-white border border-[#DCE5DF] shadow-xs">
              <svg viewBox="0 0 160 160" className="w-36 h-36">
                <rect x="0" y="0" width="160" height="160" fill="#ffffff" />
                {/* Corner markers */}
                <rect x="10" y="10" width="35" height="35" fill="#1B5E34" />
                <rect x="15" y="15" width="25" height="25" fill="#ffffff" />
                <rect x="20" y="20" width="15" height="15" fill="#1B5E34" />

                <rect x="115" y="10" width="35" height="35" fill="#1B5E34" />
                <rect x="120" y="15" width="25" height="25" fill="#ffffff" />
                <rect x="125" y="20" width="15" height="15" fill="#1B5E34" />

                <rect x="10" y="115" width="35" height="35" fill="#1B5E34" />
                <rect x="15" y="120" width="25" height="25" fill="#ffffff" />
                <rect x="20" y="125" width="15" height="15" fill="#1B5E34" />

                {/* Internal data bits */}
                <rect x="55" y="15" width="10" height="10" fill="#1B5E34" />
                <rect x="75" y="15" width="10" height="10" fill="#1B5E34" />
                <rect x="95" y="15" width="10" height="10" fill="#1B5E34" />
                
                <rect x="55" y="35" width="20" height="10" fill="#1B5E34" />
                <rect x="85" y="35" width="15" height="10" fill="#1B5E34" />

                <rect x="15" y="55" width="15" height="10" fill="#1B5E34" />
                <rect x="40" y="55" width="35" height="10" fill="#1B5E34" />
                <rect x="85" y="55" width="20" height="10" fill="#1B5E34" />
                <rect x="115" y="55" width="30" height="10" fill="#1B5E34" />

                <rect x="25" y="75" width="20" height="15" fill="#1B5E34" />
                <rect x="55" y="75" width="50" height="15" fill="#1B5E34" />
                <rect x="115" y="75" width="25" height="15" fill="#1B5E34" />

                <rect x="15" y="95" width="30" height="10" fill="#1B5E34" />
                <rect x="55" y="95" width="20" height="10" fill="#1B5E34" />
                <rect x="85" y="95" width="35" height="10" fill="#1B5E34" />
                <rect x="130" y="95" width="15" height="10" fill="#1B5E34" />

                <rect x="55" y="115" width="15" height="20" fill="#1B5E34" />
                <rect x="80" y="115" width="25" height="10" fill="#1B5E34" />
                <rect x="115" y="115" width="15" height="25" fill="#1B5E34" />
                <rect x="135" y="125" width="15" height="15" fill="#1B5E34" />

                {/* Center DIMAC Brand Mark */}
                <rect x="65" y="65" width="30" height="30" fill="#1B5E34" />
                <text x="80" y="84" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">D</text>
              </svg>
            </div>

            {/* Simulated Barcode */}
            <div className="w-full mt-4 flex flex-col items-center">
              <div className="w-48 h-9 barcode-stripes"></div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-sm font-bold tracking-widest text-[#112216] bg-white px-3 py-1 border border-[#DCE5DF]">
                  {voucher.code}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 bg-[#F1F4F2] hover:bg-[#E8EFEA] text-[#112216] border border-[#DCE5DF] transition"
                  title="Sao chép mã"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-[#1B5E34]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-[#526357] mt-2 text-center">
              {t.vouchers.qrInstruction}
            </p>
          </div>

          {/* Applicable Services & Conditions */}
          <div className="bg-[#F8FAF9] p-4 border border-[#DCE5DF] space-y-2 text-xs">
            <h4 className="font-bold text-[#1B5E34] flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              {t.vouchers.termsConditions}
            </h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {voucher.applicableServices.map(srv => {
                const srvName = t.categories[srv] || srv;
                return (
                  <span key={srv} className="text-[10px] font-mono bg-white border border-[#DCE5DF] px-2 py-0.5 text-[#334155]">
                    ✓ {srvName}
                  </span>
                );
              })}
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[#526357] text-[11px] pt-1">
              {voucher.terms.map((term, idx) => (
                <li key={idx}>{term}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F6F8F6] p-4 border-t border-[#DCE5DF] flex flex-col gap-2">
          {status === 'AVAILABLE' && (
            <>
              <button
                onClick={handleBookConsultationWithVoucher}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'vi' ? 'Đặt lịch tư vấn & Áp dụng voucher này ngay' : 'Book Consultation & Apply this Voucher'}</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => setConfirmUseOpen(true)}
                  className="text-[#526357] hover:text-[#1B5E34] text-[11px] underline"
                >
                  {language === 'vi' ? 'Xác nhận đã sử dụng trực tiếp tại quầy?' : 'Confirm redeemed in-person?'}
                </button>
                <button
                  onClick={onClose}
                  className="text-[#526357] hover:text-[#112216] font-medium"
                >
                  {language === 'vi' ? 'Đóng' : 'Close'}
                </button>
              </div>
            </>
          )}

          {status !== 'AVAILABLE' && (
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-white hover:bg-[#F1F4F2] border border-[#DCE5DF] text-[#112216] font-semibold text-xs uppercase tracking-wider transition"
            >
              {language === 'vi' ? 'Đóng' : 'Close'}
            </button>
          )}
        </div>

        {/* Confirm direct use modal overlay */}
        {confirmUseOpen && (
          <div className="absolute inset-0 bg-white/98 flex flex-col items-center justify-center p-6 text-center z-20">
            <AlertCircle className="w-10 h-10 text-[#A0322D] mb-2" />
            <h4 className="text-sm font-brand-sans font-bold text-[#112216] uppercase tracking-wider">
              {language === 'vi' ? 'Xác nhận đổi trạng thái?' : 'Confirm status change?'}
            </h4>
            <p className="text-xs text-[#526357] mt-1 leading-relaxed">
              {language === 'vi' ? 'Bạn có chắc muốn chuyển voucher này sang trạng thái ' : 'Are you sure you want to mark this voucher as '}
              <strong>{language === 'vi' ? 'ĐÃ SỬ DỤNG' : 'USED'}</strong>?
            </p>
            <div className="flex items-center gap-2 mt-4 w-full">
              <button
                onClick={handleDirectUse}
                className="flex-1 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white text-xs font-bold uppercase tracking-wider transition"
              >
                {language === 'vi' ? 'Đồng ý xác nhận' : 'Confirm'}
              </button>
              <button
                onClick={() => setConfirmUseOpen(false)}
                className="flex-1 py-2 bg-white border border-[#DCE5DF] text-[#526357] text-xs font-medium uppercase tracking-wider"
              >
                {language === 'vi' ? 'Hủy bỏ' : 'Cancel'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
