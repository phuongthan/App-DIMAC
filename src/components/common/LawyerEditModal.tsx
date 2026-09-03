import React, { useState, useEffect } from 'react';
import { Author } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Check, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Image as ImageIcon, 
  Scale, 
  RotateCcw,
  FileText,
  AlertCircle
} from 'lucide-react';

const PRESET_AVATARS = [
  { label: 'Nam 1 (Partner)', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80' },
  { label: 'Nam 2 (Managing)', url: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=200&auto=format&fit=crop&q=80' },
  { label: 'Nữ 1 (Partner)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
  { label: 'Nam 3 (Senior)', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
  { label: 'Nữ 2 (Senior)', url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&auto=format&fit=crop&q=80' },
  { label: 'Nam 4 (Associate)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
];

const ROLE_SUGGESTIONS = [
  'Managing Partner',
  'Partner',
  'Senior Counsel',
  'Senior Associate',
  'Associate',
  'Of Counsel',
];

const POSITION_SUGGESTIONS = [
  'Trưởng Ban M&A, FDI & Năng lượng',
  'Phụ trách Bất động sản, Xây dựng & Dự án',
  'Luật sư Điều hành & Trưởng Ban Giải quyết Tranh chấp',
  'Chuyên viên Cấp cao Thuế, Tài chính & Doanh nghiệp',
  'Phụ trách Thị trường Vốn & Ngân hàng',
  'Trưởng Ban Sở hữu Trí tuệ & Chuyển giao Công nghệ',
  'Ban Lao động & Tuân thủ Pháp lý Doanh nghiệp',
];

export const LawyerEditModal: React.FC = () => {
  const { 
    isLawyerEditModalOpen, 
    closeLawyerEditModal, 
    editingLawyer, 
    updateAuthor, 
    addAuthor 
  } = useApp();

  const [name, setName] = useState('');
  const [role, setRole] = useState('Partner');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0].url);
  const [isPartner, setIsPartner] = useState(true);
  const [bio, setBio] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (editingLawyer) {
      setName(editingLawyer.name || '');
      setRole(editingLawyer.role || 'Partner');
      setPosition(editingLawyer.position || '');
      setEmail(editingLawyer.email || '');
      setPhone(editingLawyer.phone || '');
      setAvatar(editingLawyer.avatar || PRESET_AVATARS[0].url);
      setIsPartner(Boolean(editingLawyer.isPartner));
      setBio(editingLawyer.bio || '');
    } else {
      setName('');
      setRole('Partner');
      setPosition('');
      setEmail('');
      setPhone('');
      setAvatar(PRESET_AVATARS[0].url);
      setIsPartner(true);
      setBio('');
    }
    setSavedSuccess(false);
  }, [editingLawyer, isLawyerEditModalOpen]);

  if (!isLawyerEditModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingLawyer) {
      updateAuthor({
        id: editingLawyer.id,
        name: name.trim(),
        role: role.trim() || 'Partner',
        position: position.trim(),
        email: email.trim(),
        phone: phone.trim(),
        avatar: avatar.trim() || PRESET_AVATARS[0].url,
        isPartner,
        bio: bio.trim(),
      });
    } else {
      addAuthor({
        name: name.trim(),
        role: role.trim() || 'Partner',
        position: position.trim(),
        email: email.trim(),
        phone: phone.trim(),
        avatar: avatar.trim() || PRESET_AVATARS[0].url,
        isPartner,
        bio: bio.trim(),
      });
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      closeLawyerEditModal();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="lawyer-edit-modal"
        className="bg-white border border-[#DCE5DF] shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCE5DF] bg-[#F8FAF9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-[#1B5E34] text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#112216] font-brand-sans uppercase tracking-wider">
                {editingLawyer ? 'Cập Nhật Thông Tin Luật Sư' : 'Thêm Luật Sư / Chuyên Gia Mới'}
              </h3>
              <p className="text-[11px] text-[#526357]">
                Thông tin được đồng bộ tự động tới bài viết, biểu mẫu tư vấn và CRM
              </p>
            </div>
          </div>
          <button
            onClick={closeLawyerEditModal}
            className="p-1.5 text-[#526357] hover:text-[#112216] hover:bg-[#EAEFEA] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {savedSuccess && (
            <div className="p-3 bg-[#EAF4ED] border border-[#1B5E34] text-[#1B5E34] text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Đã lưu cập nhật thông tin Luật sư thành công!</span>
            </div>
          )}

          {/* Live Preview Card */}
          <div className="bg-[#F8FAF9] border border-[#DCE5DF] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-[#798C7F] font-mono tracking-wider">
                Xem trước giao diện Thẻ Luật sư (Preview)
              </span>
              {isPartner && (
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8] font-mono">
                  Partner
                </span>
              )}
            </div>
            <div className="flex items-start gap-3.5">
              <img
                src={avatar || PRESET_AVATARS[0].url}
                alt={name || 'Luật sư'}
                className="w-13 h-13 object-cover border border-[#DCE5DF] shrink-0 bg-white"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_AVATARS[0].url;
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#112216] font-brand-sans">
                  {name || 'LS. Tên Luật sư'}
                </h4>
                <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-semibold text-[#1B5E34]">{role || 'Partner'}</span>
                  {position && (
                    <>
                      <span className="text-xs text-[#798C7F]">•</span>
                      <span className="text-xs text-[#526357]">{position}</span>
                    </>
                  )}
                </div>
                {(email || phone) && (
                  <p className="text-[11px] text-[#798C7F] font-mono mt-1 flex flex-wrap gap-3">
                    {email && <span>Email: {email}</span>}
                    {phone && <span>Hotline: {phone}</span>}
                  </p>
                )}
                {bio && (
                  <p className="text-[11px] text-[#526357] mt-1.5 italic line-clamp-2 leading-relaxed">
                    "{bio}"
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tên Luật sư */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#112216] uppercase tracking-wider mb-1 font-mono">
                Họ và Tên Luật sư <span className="text-[#A0322D]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#798C7F] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: LS. Nguyễn Danh Công"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34] font-bold text-[#112216]"
                />
              </div>
            </div>

            {/* Chức vụ / Cấp bậc (Role) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#112216] uppercase tracking-wider mb-1 font-mono">
                Chức danh / Cấp bậc (Role) <span className="text-[#A0322D]">*</span>
              </label>
              <div className="relative mb-2">
                <Briefcase className="w-4 h-4 text-[#798C7F] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="VD: Partner / Managing Partner / Senior Associate"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34] font-semibold text-[#112216]"
                />
              </div>
              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {ROLE_SUGGESTIONS.map(sug => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setRole(sug)}
                    className={`px-2 py-0.5 text-[10px] font-semibold border transition ${
                      role === sug
                        ? 'bg-[#1B5E34] text-white border-[#1B5E34]'
                        : 'bg-[#F1F4F2] text-[#526357] border-[#DCE5DF] hover:bg-[#EAEFEA]'
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Vị trí / Ban chuyên trách (Position / Practice Area) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#112216] uppercase tracking-wider mb-1 font-mono">
                Vị trí / Ban Chuyên trách (Position & Practice Group)
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="VD: Trưởng Ban M&A, FDI & Năng lượng"
                className="w-full px-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34] text-[#112216] mb-2"
              />
              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {POSITION_SUGGESTIONS.map(pos => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setPosition(pos)}
                    className={`px-2 py-0.5 text-[10px] border transition ${
                      position === pos
                        ? 'bg-[#1B5E34] text-white border-[#1B5E34]'
                        : 'bg-[#F1F4F2] text-[#526357] border-[#DCE5DF] hover:bg-[#EAEFEA]'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#112216] uppercase tracking-wider mb-1 font-mono">
                Email liên hệ
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#798C7F] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@dimac-law.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34] font-mono text-[#112216]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-[#112216] uppercase tracking-wider mb-1 font-mono">
                Số điện thoại / Hotline
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#798C7F] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(+84) 903 888 123"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34] font-mono text-[#112216]"
                />
              </div>
            </div>

            {/* Partner Toggle */}
            <div className="sm:col-span-2 flex items-center gap-3 p-3 bg-[#F8FAF9] border border-[#DCE5DF]">
              <input
                id="is-partner-checkbox"
                type="checkbox"
                checked={isPartner}
                onChange={(e) => setIsPartner(e.target.checked)}
                className="w-4 h-4 text-[#1B5E34] accent-[#1B5E34] rounded-none cursor-pointer"
              />
              <label htmlFor="is-partner-checkbox" className="text-xs font-bold text-[#112216] cursor-pointer">
                Đánh dấu là Thành viên Hợp danh / Cấp cao (Partner Status)
                <span className="block text-[10px] font-normal text-[#526357] mt-0.5">
                  Hiển thị huy hiệu Partner màu xanh đặc trưng của DIMAC trên thẻ thông tin
                </span>
              </label>
            </div>

            {/* Avatar Selection */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#112216] uppercase tracking-wider mb-1 font-mono">
                Ảnh đại diện (Avatar URL)
              </label>
              <div className="flex gap-2 mb-2.5">
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34] font-mono text-[#112216]"
                />
              </div>
              {/* Presets */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_AVATARS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(p.url)}
                    className={`flex flex-col items-center gap-1 p-1.5 border transition ${
                      avatar === p.url
                        ? 'border-[#1B5E34] bg-[#EAF4ED]'
                        : 'border-[#DCE5DF] hover:border-[#798C7F] bg-white'
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="w-10 h-10 object-cover" />
                    <span className="text-[9px] text-[#526357] font-semibold truncate w-full text-center">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bio / Giới thiệu tóm tắt */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#112216] uppercase tracking-wider mb-1 font-mono">
                Tóm tắt kinh nghiệm & Lĩnh vực phụ trách (Bio)
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="VD: Hơn 15 năm kinh nghiệm tư vấn tái cấu trúc vốn, M&A và các dự án năng lượng tái tạo FDI..."
                className="w-full px-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34] text-[#112216] leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#DCE5DF]">
            <button
              type="button"
              onClick={closeLawyerEditModal}
              className="px-4 py-2 text-xs font-semibold text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2] border border-[#DCE5DF] transition uppercase tracking-wider"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#1B5E34] hover:bg-[#144928] text-white transition uppercase tracking-wider shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{editingLawyer ? 'Lưu Thay Đổi' : 'Thêm Mới Luật Sư'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
