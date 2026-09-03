import React, { useState } from 'react';
import { LegalArticle } from '../../types';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  X, 
  Download, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

interface PdfDocumentModalProps {
  article: LegalArticle;
  onClose: () => void;
}

export const PdfDocumentModal: React.FC<PdfDocumentModalProps> = ({ article, onClose }) => {
  const { firmInfo, language } = useApp();
  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const pdf = article.pdfAttachment;
  if (!pdf) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#DCE5DF] w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* PDF Topbar */}
        <div className="bg-[#F6F8F6] px-4 py-3 border-b border-[#DCE5DF] flex items-center justify-between gap-3 text-[#112216]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-[#FDF0EF] border border-[#F5C2BF] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-[#A0322D]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-[#112216] truncate font-brand-sans">
                {pdf.title}
              </h3>
              <p className="text-[11px] text-[#526357] flex items-center gap-2 font-mono">
                <span>{language === 'vi' ? 'Số hiệu:' : 'Doc No:'} {pdf.docNumber}</span>
                <span>•</span>
                <span>{pdf.fileSize}</span>
                <span>•</span>
                <span>{pdf.pageCount} {t.article.pages}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#1B5E34] hover:bg-[#144928] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
              title={language === 'vi' ? 'Tải văn bản PDF' : 'Download PDF Document'}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>{language === 'vi' ? 'Đã tải về' : 'Downloaded'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'vi' ? 'Tải PDF' : 'Download PDF'}</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216] transition"
              title={t.article.closeArticle}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Controls Toolbar */}
        <div className="bg-[#F8FAF9] px-4 py-2 border-b border-[#DCE5DF] flex flex-wrap items-center justify-between gap-2 text-xs text-[#526357]">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#798C7F] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'vi' ? 'Tìm từ khóa trong văn bản...' : 'Search in document...'}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="bg-white border border-[#DCE5DF] pl-8 pr-3 py-1 text-xs text-[#112216] placeholder-[#798C7F] focus:outline-none focus:border-[#1B5E34] w-44 sm:w-56"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white border border-[#DCE5DF] px-1 py-0.5">
              <button
                onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))}
                className="p-1 hover:text-[#112216]"
                title={language === 'vi' ? 'Thu nhỏ' : 'Zoom Out'}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-mono">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
                className="p-1 hover:text-[#112216]"
                title={language === 'vi' ? 'Phóng to' : 'Zoom In'}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[11px] text-[#526357] font-mono hidden sm:inline">
              {language === 'vi' ? 'Trang' : 'Page'} 1 / {pdf.pageCount}
            </span>
          </div>
        </div>

        {/* PDF Content Paper Simulator */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#EDF1EE] flex justify-center">
          <div 
            style={{ width: `${Math.round(620 * (zoomLevel / 100))}px` }}
            className="bg-[#FFFFFF] text-[#1A1F2C] shadow-lg p-8 sm:p-12 relative border border-[#DCE5DF] min-h-[750px] transition-all"
          >
            {/* Red Seal / Official Legal Document Stamp Simulation */}
            <div className="absolute top-10 right-8 w-24 h-24 border-2 border-dashed border-[#A0322D]/60 flex flex-col items-center justify-center text-center rotate-[-12deg] pointer-events-none p-1 bg-white/70">
              <span className="text-[8px] font-bold text-[#A0322D] uppercase tracking-tighter">{firmInfo.firmName || 'DIMAC LAW FIRM'}</span>
              <ShieldCheck className="w-5 h-5 text-[#A0322D] my-0.5" />
              <span className="text-[7px] text-[#A0322D] font-semibold">VERIFIED LEGAL DOC</span>
              <span className="text-[6px] text-[#A0322D]/80 font-mono">2026 / OFFICIAL</span>
            </div>

            {/* Document Header */}
            <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
              <p className="text-[11px] font-bold tracking-widest text-slate-700 uppercase font-brand-sans">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p className="text-[10px] font-medium text-slate-700 underline underline-offset-4">Độc lập - Tự do - Hạnh phúc</p>
              <div className="mt-4">
                <span className="text-xs font-bold text-[#1B5E34] uppercase tracking-wide bg-[#EAF4ED] px-2.5 py-0.5 border border-[#C2D5C8] font-mono">
                  {pdf.docNumber}
                </span>
              </div>
            </div>

            {/* Document Title */}
            <div className="text-center mb-6">
              <h2 className="text-base sm:text-lg font-legal-doc font-bold text-slate-900 leading-snug">
                {pdf.title}
              </h2>
              <p className="text-xs text-[#526357] mt-1 italic font-legal-doc">
                {language === 'vi' ? '(Ban hành kèm Báo cáo thẩm định chuyên môn bởi Ban Pháp chế DIMAC Law Firm)' : '(Issued with Special Legal Assessment Report by DIMAC Law Firm)'}
              </p>
            </div>

            {/* Document Content Sample */}
            <div className="text-xs sm:text-sm text-slate-800 space-y-4 leading-relaxed font-legal-doc">
              <p className="font-semibold text-slate-900">
                {language === 'vi' ? 'CHƯƠNG I: QUY ĐỊNH CHUNG' : 'CHAPTER I: GENERAL PROVISIONS'}
              </p>
              <p>
                <strong>{language === 'vi' ? 'Điều 1. Phạm vi điều chỉnh:' : 'Article 1. Scope of regulation:'}</strong> {language === 'vi' ? 'Văn bản quy định về cơ chế mua bán điện trực tiếp (DPPA), hoạt động đầu tư, chính sách ưu đãi và quản lý nhà nước đối với các dự án năng lượng tái tạo, khu công nghiệp và hạ tầng FDI tại Việt Nam.' : 'This document regulates direct power purchase agreements (DPPA), investment activities, incentive policies, and state governance for renewable energy projects, industrial parks, and FDI infrastructure in Vietnam.'}
              </p>
              <p>
                <strong>{language === 'vi' ? 'Điều 2. Đối tượng áp dụng:' : 'Article 2. Applicable entities:'}</strong> {language === 'vi' ? 'Cơ quan quản lý nhà nước có thẩm quyền, các tập đoàn năng lượng tái tạo, khách hàng sử dụng điện lớn (FDI/trong nước) tham gia mua bán điện qua lưới điện quốc gia hoặc đường dây riêng.' : 'Competent state regulatory authorities, renewable energy developers, large power consumers (FDI/domestic) participating in power purchases via the national grid or dedicated lines.'}
              </p>
              
              <div className="p-4 bg-[#EAF4ED] border-l-4 border-[#1B5E34] text-xs text-slate-800 my-4 font-sans">
                <p className="font-bold text-[#1B5E34] mb-1 flex items-center gap-1 font-brand-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B5E34]" />
                  {language === 'vi' ? 'Ghi chú pháp lý từ Luật sư DIMAC Law Firm:' : 'Legal note from DIMAC Law Firm Senior Counsel:'}
                </p>
                <p className="text-[#334155]">
                  {pdf.summaryText || (language === 'vi' ? 'Quy định mới tạo điều kiện rút ngắn 40% thời gian thực hiện thủ tục thẩm định dự án cho doanh nghiệp FDI công nghệ cao.' : 'The new decree streamlines appraisal timelines by 40% for high-tech FDI enterprises.')}
                </p>
              </div>

              <p className="font-semibold text-slate-900 pt-2">
                {language === 'vi' ? 'CHƯƠNG II: HỢP ĐỒNG MUA BÁN ĐIỆN & CƠ CHẾ GIÁ' : 'CHAPTER II: POWER PURCHASE CONTRACTS & PRICING MECHANISM'}
              </p>
              <p>
                {language === 'vi' ? '1. Khách hàng sử dụng điện lớn được ký hợp đồng kỳ hạn dạng chênh lệch (CfD) với đơn vị phát điện năng lượng tái tạo theo quy tắc thị trường điện giao ngay.' : '1. Large power consumers are eligible to enter into Contracts for Difference (CfD) with renewable power generators in accordance with spot electricity market rules.'}
              </p>
              <p>
                {language === 'vi' ? '2. Được ưu tiên kết nối với các tổ chức tài chính quốc tế để phát hành trái phiếu xanh và hưởng cơ chế ưu đãi giảm phát thải ESG.' : '2. Prioritized connection with international financial institutions for green bond issuance and ESG emission reduction incentives.'}
              </p>
            </div>

            {/* Document Footer */}
            <div className="mt-12 pt-6 border-t border-slate-300 flex justify-between items-end text-[11px] text-slate-600 font-brand-sans">
              <div>
                <p className="font-semibold text-slate-800">{firmInfo.firmName || 'DIMAC Law Firm'} Archive</p>
                <p>Hotline: {firmInfo.hotline || '(+84) 903 888 123'} | {firmInfo.website || 'www.dimac-law.com'}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">{language === 'vi' ? 'TM. HỘI ĐỒNG PHÁP LÝ' : 'FOR LEGAL BOARD'}</p>
                <p className="italic font-legal-doc">{language === 'vi' ? 'Đã ký và xác thực điện tử' : 'Signed and digitally certified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom action bar */}
        <div className="bg-[#F6F8F6] px-4 py-2.5 border-t border-[#DCE5DF] flex items-center justify-between text-xs text-[#526357]">
          <span>{language === 'vi' ? 'Tài liệu phát hành nội bộ & dành cho khách hàng DIMAC' : 'Internal publication for DIMAC privileged clients'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#DCE5DF] hover:bg-[#F1F4F2] text-[#112216] font-medium transition"
          >
            {language === 'vi' ? 'Đóng xem trước' : 'Close Preview'}
          </button>
        </div>
      </div>
    </div>
  );
};
