import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FirmInfo } from '../../types';
import { 
  Building2, 
  X, 
  RotateCcw, 
  Save, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  FileText,
  Calendar
} from 'lucide-react';

export const FirmInfoEditModal: React.FC = () => {
  const { 
    firmInfo, 
    updateFirmInfo, 
    resetFirmInfoToDefault, 
    isFirmInfoModalOpen, 
    closeFirmInfoModal 
  } = useApp();

  const [formData, setFormData] = useState<FirmInfo>(firmInfo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isFirmInfoModalOpen) {
      setFormData(firmInfo);
      setSaveSuccess(false);
    }
  }, [isFirmInfoModalOpen, firmInfo]);

  if (!isFirmInfoModalOpen) return null;

  const handleChange = (field: keyof FirmInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFirmInfo(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      closeFirmInfoModal();
    }, 700);
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục toàn bộ thông tin hãng luật DIMAC về mặc định ban đầu?')) {
      resetFirmInfoToDefault();
      closeFirmInfoModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col border border-[#DCE5DF] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#112216] text-white flex items-center justify-between border-b border-[#2C4835]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#1B5E34] text-white border border-[#2C4835]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide uppercase font-brand-sans">
                Tùy Chỉnh Thông Tin DIMAC
              </h2>
              <p className="text-xs text-[#98A2B3]">
                Cập nhật thông tin doanh nghiệp, địa chỉ trụ sở, hotline và dịch vụ
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={closeFirmInfoModal}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#F9FBFA]">
          {saveSuccess && (
            <div className="p-3 bg-[#EAF4ED] border border-[#1B5E34] text-[#1B5E34] text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#1B5E34]" />
              <span>Đã lưu và cập nhật thông tin DIMAC Law Firm thành công!</span>
            </div>
          )}

          {/* Live Preview Card */}
          <div className="bg-white border border-[#C2D5C8] p-4 relative shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E34] font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Xem trước hiển thị thực tế
              </span>
              <span className="text-[10px] text-[#798C7F] bg-[#F4F7F5] px-2 py-0.5 border border-[#DCE5DF]">
                Live Preview
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#112216] uppercase tracking-wider text-xs font-brand-sans">
                  {formData.firmName || 'DIMAC Law Firm'}
                </h4>
                {formData.taxId && (
                  <span className="text-[10px] text-[#798C7F] font-mono">MST: {formData.taxId}</span>
                )}
              </div>
              <p className="text-[#526357] text-[11px] leading-relaxed">
                {formData.description || 'Chưa nhập mô tả giới thiệu.'}
              </p>

              <div className="pt-2 border-t border-[#E8EFEA] space-y-1.5 text-[11px] text-[#526357]">
                <p className="flex items-center justify-between gap-2">
                  <span className="text-[#798C7F] shrink-0">Trụ sở chính:</span>
                  <span className="font-medium text-right text-[#112216] truncate">{formData.headquarters}</span>
                </p>
                <p className="flex items-center justify-between gap-2">
                  <span className="text-[#798C7F] shrink-0">Chi nhánh:</span>
                  <span className="font-medium text-[#112216]">{formData.branches}</span>
                </p>
                <p className="flex items-center justify-between gap-2">
                  <span className="text-[#798C7F] shrink-0">Website:</span>
                  <span className="text-[#1B5E34] font-semibold">{formData.website}</span>
                </p>
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-dashed border-[#E8EFEA] text-[10px]">
                  <span className="text-[#798C7F]">Hotline: <strong className="text-[#A0322D]">{formData.hotline}</strong></span>
                  <span className="text-[#798C7F]">Email: <strong className="text-[#112216]">{formData.email}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 text-xs">
            {/* Firm Name & Tagline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#112216] mb-1">
                  Tên Hãng Luật / Doanh nghiệp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firmName}
                  onChange={(e) => handleChange('firmName', e.target.value)}
                  placeholder="VD: DIMAC Law Firm"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1">
                  Slogan / Định vị thương hiệu
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="VD: Leading Business & Corporate Law Firm"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-[#112216] mb-1">
                Giới thiệu tóm tắt (Description) <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Giới thiệu năng lực, định hướng và dịch vụ chính của DIMAC..."
                className="w-full bg-white border border-[#DCE5DF] p-3 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34] leading-relaxed resize-none"
              />
            </div>

            {/* Headquarters & Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#112216] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1B5E34]" />
                  Trụ sở chính (Headquarters)
                </label>
                <input
                  type="text"
                  required
                  value={formData.headquarters}
                  onChange={(e) => handleChange('headquarters', e.target.value)}
                  placeholder="VD: Tầng 6, Tòa nhà D-Square, TP. Hồ Chí Minh"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#1B5E34]" />
                  Chi nhánh (Branches)
                </label>
                <input
                  type="text"
                  value={formData.branches}
                  onChange={(e) => handleChange('branches', e.target.value)}
                  placeholder="VD: Hà Nội, Đà Nẵng, Cần Thơ"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>
            </div>

            {/* Hotline & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#112216] mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#A0322D]" />
                  Hotline 24/7
                </label>
                <input
                  type="text"
                  value={formData.hotline}
                  onChange={(e) => handleChange('hotline', e.target.value)}
                  placeholder="VD: (+84) 903 888 123"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#1B5E34]" />
                  Email liên hệ
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="VD: contact@dimac-law.com"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>
            </div>

            {/* Website & Working Hours & Tax */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-[#112216] mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#1B5E34]" />
                  Website chính thức
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="dimac-law.com"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#526357]" />
                  Giờ làm việc
                </label>
                <input
                  type="text"
                  value={formData.workingHours}
                  onChange={(e) => handleChange('workingHours', e.target.value)}
                  placeholder="VD: Thứ 2 - Thứ 6: 08:30 - 18:00"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#112216] mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#526357]" />
                  Năm thành lập / MST
                </label>
                <input
                  type="text"
                  value={formData.taxId || ''}
                  onChange={(e) => handleChange('taxId', e.target.value)}
                  placeholder="VD: 0313364952 (MST)"
                  className="w-full bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-[#DCE5DF] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 border border-[#DCE5DF] bg-white hover:bg-[#F4F7F5] text-[#526357] text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục mặc định</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeFirmInfoModal}
                className="px-4 py-2 border border-[#DCE5DF] bg-white hover:bg-[#F4F7F5] text-[#526357] text-xs font-semibold transition"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Lưu thông tin</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
