import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LogoColorTheme } from '../../types';
import { DimacLogo } from './DimacLogo';
import { 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Palette, 
  RotateCcw, 
  Check, 
  X, 
  Sparkles, 
  Eye, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  Trash2,
  Sliders,
  Type,
  BadgePercent,
  Layers
} from 'lucide-react';

export const LogoManagerModal: React.FC = () => {
  const { 
    isLogoModalOpen, 
    setIsLogoModalOpen, 
    logoConfig, 
    updateLogoConfig, 
    resetLogoToDefault 
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local editing states
  const [activeTab, setActiveTab] = useState<'upload' | 'theme' | 'url'>('upload');
  const [tempCustomImageUrl, setTempCustomImageUrl] = useState<string | null>(logoConfig.customImageUrl || null);
  const [tempBrandName, setTempBrandName] = useState(logoConfig.brandName || 'DIMAC');
  const [tempTagline, setTempTagline] = useState(logoConfig.tagline || 'ASIA PREMIER LAWYERS');
  const [tempShowTagline, setTempShowTagline] = useState(logoConfig.showTagline ?? true);
  const [tempColorTheme, setTempColorTheme] = useState<LogoColorTheme>(logoConfig.colorTheme || 'official');
  const [urlInput, setUrlInput] = useState(logoConfig.customImageUrl || '');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [toastSuccess, setToastSuccess] = useState<string | null>(null);

  if (!isLogoModalOpen) return null;

  // Handle local image file upload with drag & drop support
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ (.png, .jpg, .svg, .webp)');
      return;
    }

    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setTempCustomImageUrl(dataUrl);
      setUrlInput('');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng thả tệp hình ảnh (.png, .jpg, .svg, .webp)');
      return;
    }

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setTempCustomImageUrl(dataUrl);
      setUrlInput('');
    };
    reader.readAsDataURL(file);
  };

  // Handle URL apply
  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setTempCustomImageUrl(urlInput.trim());
      setUploadedFileName('');
      setToastSuccess('Đã tải hình ảnh từ URL thành công!');
      setTimeout(() => setToastSuccess(null), 1500);
    }
  };

  // Preset sample brand themes
  const PRESET_LOGOS = [
    {
      id: 'official-vector',
      name: 'Logo DIMAC Vector Chuẩn 2024',
      desc: 'Sải cánh Đại bàng vút cao & Ngôi sao đỏ thẫm',
      theme: 'official' as LogoColorTheme,
    },
    {
      id: 'gold-vector',
      name: 'DIMAC Luxury Gold Edition',
      desc: 'Phiên bản Vàng hoàng gia ánh kim sang trọng',
      theme: 'gold' as LogoColorTheme,
    },
    {
      id: 'emerald-vector',
      name: 'DIMAC Modern Emerald',
      desc: 'Màu Xanh lục bảo & Đỏ ruby hiện đại',
      theme: 'emerald' as LogoColorTheme,
    },
    {
      id: 'monochrome-vector',
      name: 'DIMAC Corporate Monochrome',
      desc: 'Tone xám đen tinh tế cho ấn phẩm in ấn',
      theme: 'monochrome' as LogoColorTheme,
    },
  ];

  // Quick suggestions for Brand Name
  const BRAND_SUGGESTIONS = [
    'DIMAC',
    'DIMAC LAW FIRM',
    'DIMAC ASIA',
    'DIMAC VIETNAM',
    'DIMAC LEGAL'
  ];

  // Quick suggestions for Taglines
  const TAGLINE_SUGGESTIONS = [
    'Our Strategic Legal Partnership\nPowers Your Business Vision',
    'ASIA PREMIER LAWYERS',
    'YOUR TRUSTED LEGAL PARTNER',
    'LUẬT SƯ DOANH NGHIỆP HÀNG ĐẦU',
    'EXCELLENCE IN LEGAL COUNSEL',
    'COMPLIANCE • INNOVATION • RESULTS'
  ];

  // Save changes to Global Context & LocalStorage
  const handleSave = () => {
    updateLogoConfig({
      customImageUrl: tempCustomImageUrl,
      brandName: tempBrandName.trim() || 'DIMAC',
      tagline: tempTagline.trim() || 'Our Strategic Legal Partnership\nPowers Your Business Vision',
      showTagline: tempShowTagline,
      colorTheme: tempColorTheme,
    });

    setToastSuccess('Cập nhật Logo, Tên thương hiệu và Tagline thành công!');
    setTimeout(() => {
      setToastSuccess(null);
      setIsLogoModalOpen(false);
    }, 800);
  };

  // Reset to default official
  const handleReset = () => {
    resetLogoToDefault();
    setTempCustomImageUrl(null);
    setTempBrandName('DIMAC');
    setTempTagline('Our Strategic Legal Partnership\nPowers Your Business Vision');
    setTempShowTagline(true);
    setTempColorTheme('official');
    setUrlInput('');
    setUploadedFileName('');
    setToastSuccess('Đã khôi phục logo DIMAC về bản chuẩn thương hiệu ban đầu!');
    setTimeout(() => setToastSuccess(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="modal-dimac-logo-manager"
        className="bg-white border border-[#DCE5DF] shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#112216]"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-white border-b border-[#DCE5DF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#EAF4ED] text-[#165A31] flex items-center justify-center border border-[#C2D5C8]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#112216] flex items-center gap-2">
                Cập nhật Logo, Tên thương hiệu & Tagline
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#EAF4ED] text-[#165A31] border border-[#C2D5C8]">
                  Header Brand
                </span>
              </h2>
              <p className="text-xs text-[#526357] mt-0.5">
                Tùy chỉnh hình ảnh logo, tên thương hiệu và câu khẩu hiệu (tagline) hiển thị trên hệ thống
              </p>
            </div>
          </div>
          <button
            id="btn-close-logo-modal"
            onClick={() => setIsLogoModalOpen(false)}
            className="p-1.5 text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2] transition"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Toast Notice */}
          {toastSuccess && (
            <div className="flex items-center gap-2 bg-[#EAF4ED] border border-[#165A31] text-[#165A31] px-4 py-2.5 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastSuccess}</span>
            </div>
          )}

          {/* SECTION 1: Cập nhật Hình ảnh Logo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#165A31] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                1. Cập nhật Hình ảnh Logo
              </label>
              {tempCustomImageUrl && (
                <span className="text-[11px] text-[#165A31] font-semibold flex items-center gap-1 bg-[#EAF4ED] px-2 py-0.5 border border-[#C2D5C8]">
                  <Check className="w-3 h-3" /> Đang dùng ảnh tùy chỉnh
                </span>
              )}
            </div>

            {/* Source Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold transition border ${
                  activeTab === 'upload'
                    ? 'bg-[#165A31] text-white border-[#165A31] shadow-xs'
                    : 'bg-[#F6F8F6] text-[#526357] border-[#DCE5DF] hover:bg-white hover:text-[#112216]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải ảnh từ máy</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('theme')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold transition border ${
                  activeTab === 'theme'
                    ? 'bg-[#165A31] text-white border-[#165A31] shadow-xs'
                    : 'bg-[#F6F8F6] text-[#526357] border-[#DCE5DF] hover:bg-white hover:text-[#112216]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Mẫu Vector DIMAC</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold transition border ${
                  activeTab === 'url'
                    ? 'bg-[#165A31] text-white border-[#165A31] shadow-xs'
                    : 'bg-[#F6F8F6] text-[#526357] border-[#DCE5DF] hover:bg-white hover:text-[#112216]'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Đường dẫn Link URL</span>
              </button>
            </div>

            {/* Tab 1: Upload */}
            {activeTab === 'upload' && (
              <div className="bg-[#F8FAF9] p-4 border border-[#DCE5DF] space-y-3">
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#C2D5C8] hover:border-[#165A31] bg-white p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="image/png, image/jpeg, image/svg+xml, image/webp" 
                    className="hidden" 
                  />
                  <div className="w-12 h-12 rounded-full bg-[#EAF4ED] text-[#165A31] flex items-center justify-center group-hover:scale-110 transition">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#165A31]">Nhấp để chọn tệp</span> hoặc kéo thả hình ảnh logo vào đây
                  </div>
                  <p className="text-[11px] text-[#526357]">
                    Hỗ trợ định dạng PNG (khuyên dùng nền trong suốt), JPG, SVG, WebP (Dung lượng &lt; 3MB)
                  </p>
                </div>

                {tempCustomImageUrl && (
                  <div className="flex items-center justify-between bg-white p-3 border border-[#DCE5DF]">
                    <div className="flex items-center gap-3">
                      <img 
                        src={tempCustomImageUrl} 
                        alt="Logo Preview" 
                        className="w-14 h-10 object-contain bg-[#F1F4F2] p-1 border border-[#DCE5DF]" 
                      />
                      <div>
                        <p className="text-xs font-bold text-[#112216]">
                          {uploadedFileName || 'Ảnh tùy chỉnh đã nạp'}
                        </p>
                        <span className="text-[10px] text-[#165A31] font-semibold">Đang áp dụng cho Header</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTempCustomImageUrl(null);
                        setUploadedFileName('');
                      }}
                      className="p-1.5 text-[#A02B2D] hover:bg-[#FDF0EF] transition border border-transparent hover:border-[#A02B2D]/20 text-xs flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Gỡ ảnh & dùng Vector</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Vector Presets */}
            {activeTab === 'theme' && (
              <div className="space-y-3 bg-[#F8FAF9] p-4 border border-[#DCE5DF]">
                <p className="text-xs text-[#526357]">
                  Chọn phong cách màu sắc chuẩn cho biểu tượng Đại bàng & Ngôi sao vector:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_LOGOS.map(preset => {
                    const isSelected = !tempCustomImageUrl && tempColorTheme === preset.theme;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setTempCustomImageUrl(null);
                          setTempColorTheme(preset.theme);
                        }}
                        className={`p-3.5 border bg-white cursor-pointer transition flex flex-col justify-between gap-2.5 ${
                          isSelected 
                            ? 'border-[#165A31] ring-2 ring-[#165A31]/20 bg-[#F4F9F5]' 
                            : 'border-[#DCE5DF] hover:border-[#165A31]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#112216]">{preset.name}</span>
                          {isSelected && (
                            <span className="p-0.5 bg-[#165A31] text-white rounded-full">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div className="py-2 px-3 bg-[#FAFCFA] border border-[#E5ECE7] flex items-center justify-center">
                          <DimacLogo 
                            variant="horizontal" 
                            size="xs" 
                            colorThemeOverride={preset.theme} 
                            forceVector={true}
                            showTagline={true} 
                          />
                        </div>
                        <p className="text-[10px] text-[#526357]">{preset.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: URL */}
            {activeTab === 'url' && (
              <div className="bg-[#F8FAF9] p-4 border border-[#DCE5DF] space-y-3">
                <label className="block text-xs font-bold text-[#112216]">
                  Nhập liên kết hình ảnh trực tuyến (Image URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/dimac-logo.png"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-[#DCE5DF] bg-white focus:outline-none focus:border-[#165A31]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2 bg-[#165A31] text-white text-xs font-bold hover:bg-[#124b29] transition"
                  >
                    Áp dụng URL
                  </button>
                </div>
                <p className="text-[11px] text-[#526357]">
                  Lưu ý: Đảm bảo đường dẫn hình ảnh có thể truy cập công khai và sử dụng nền trong suốt (PNG) để hiển thị đẹp nhất.
                </p>
              </div>
            )}
          </div>

          {/* SECTION 2: Cập nhật Tên thương hiệu & Tagline */}
          <div className="bg-white p-4 border border-[#DCE5DF] space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-[#165A31] flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" />
              2. Cập nhật Tên thương hiệu & Câu Tagline
            </label>

            {/* Brand Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#112216]">
                Tên thương hiệu (Brand Name):
              </label>
              <input
                id="input-brand-name"
                type="text"
                value={tempBrandName}
                onChange={(e) => setTempBrandName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#165A31] font-bold text-[#165A31]"
                placeholder="DIMAC"
              />
              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-[#526357] font-semibold">Gợi ý nhanh:</span>
                {BRAND_SUGGESTIONS.map(name => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setTempBrandName(name)}
                    className="px-2 py-0.5 bg-[#F1F4F2] hover:bg-[#EAF4ED] text-[#165A31] text-[10px] font-semibold border border-[#DCE5DF] transition"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tagline Input */}
            <div className="space-y-1.5 pt-2 border-t border-[#F1F4F2]">
              <label className="block text-xs font-bold text-[#112216]">
                Câu Tagline / Khẩu hiệu thương hiệu:
              </label>
              <textarea
                id="input-tagline-text"
                rows={2}
                value={tempTagline}
                onChange={(e) => setTempTagline(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#165A31] font-bold text-[#A02B2D] resize-none leading-relaxed"
                placeholder="Our Strategic Legal Partnership&#10;Powers Your Business Vision"
              />
              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-[#526357] font-semibold">Gợi ý nhanh:</span>
                {TAGLINE_SUGGESTIONS.map(slogan => (
                  <button
                    key={slogan}
                    type="button"
                    onClick={() => setTempTagline(slogan)}
                    className="px-2 py-0.5 bg-[#F1F4F2] hover:bg-[#FDF0EF] text-[#A02B2D] text-[10px] font-semibold border border-[#DCE5DF] transition text-left"
                  >
                    {slogan.replace('\n', ' • ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle show tagline */}
            <div className="pt-2 flex items-center justify-between border-t border-[#F1F4F2]">
              <div>
                <span className="text-xs font-bold text-[#112216] block">
                  Hiển thị câu Tagline tại Header
                </span>
                <span className="text-[11px] text-[#526357]">
                  Bật/tắt dòng chữ slogan nhỏ bên dưới tên thương hiệu
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={tempShowTagline} 
                  onChange={(e) => setTempShowTagline(e.target.checked)} 
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#DCE5DF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#C2D5C8] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#165A31]"></div>
              </label>
            </div>
          </div>

          {/* SECTION 3: Xem trước trực tiếp đa giao diện */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#165A31] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              3. Xem trước trực tiếp trên các bề mặt hiển thị
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Web Header Preview */}
              <div className="bg-white border border-[#DCE5DF] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#526357]">
                  <span className="flex items-center gap-1">
                    <Monitor className="w-3 h-3 text-[#165A31]" /> Header Web Desktop
                  </span>
                  <span className="text-[10px] text-[#839687]">Nền sáng chuẩn</span>
                </div>
                <div className="bg-white p-3 border border-[#E2EAE5] flex items-center justify-between shadow-xs">
                  <DimacLogo 
                    variant="horizontal" 
                    size="xs" 
                    customImageUrlOverride={tempCustomImageUrl}
                    colorThemeOverride={tempColorTheme}
                    brandNameOverride={tempBrandName}
                    taglineOverride={tempTagline}
                    showTagline={tempShowTagline}
                  />
                  <div className="hidden sm:block">
                    <span className="text-[8px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 bg-[#EAF4ED] text-[#165A31] border border-[#C2D5C8]">
                      DIGITAL LEGAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Header Preview */}
              <div className="bg-white border border-[#DCE5DF] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#526357]">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-[#165A31]" /> Header Mobile App
                  </span>
                  <span className="text-[10px] text-[#839687]">Kích thước di động</span>
                </div>
                <div className="bg-[#112216] p-2 flex items-center justify-center">
                  <div className="bg-white w-full px-3 py-1.5 flex items-center justify-between">
                    <DimacLogo 
                      variant="horizontal" 
                      size="xs" 
                      customImageUrlOverride={tempCustomImageUrl}
                      colorThemeOverride={tempColorTheme}
                      brandNameOverride={tempBrandName}
                      taglineOverride={tempTagline}
                      showTagline={false}
                    />
                    <span className="px-2 py-0.5 bg-[#165A31] text-[9px] font-bold text-white uppercase">
                      Tư vấn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-[#F8FAF9] border-t border-[#DCE5DF] flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-reset-default-logo"
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#526357] hover:text-[#A02B2D] hover:bg-[#FDF0EF] border border-[#DCE5DF] hover:border-[#A02B2D]/30 transition"
            title="Khôi phục về biểu tượng đại bàng và tên thương hiệu gốc"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-cancel-logo-modal"
              type="button"
              onClick={() => setIsLogoModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2] transition border border-[#DCE5DF]"
            >
              Hủy
            </button>
            <button
              id="btn-save-logo-changes"
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-[#165A31] hover:bg-[#124b29] text-white text-xs font-bold tracking-wide transition shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Áp dụng & Lưu thay đổi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
