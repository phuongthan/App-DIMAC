import React, { useState, useEffect } from 'react';
import { LegalArticle, Language } from '../../types';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  X, 
  Bookmark, 
  Share2, 
  Calendar, 
  Clock, 
  Eye, 
  FileText, 
  Check, 
  PhoneCall, 
  Mail, 
  Sparkles,
  Edit3,
  Building2
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: LegalArticle;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  const { 
    authors,
    userProfile, 
    toggleBookmarkArticle, 
    setViewingPdfArticle,
    setIsBookingModalOpen,
    setPreselectedServiceForBooking,
    openLawyerEditModal,
    language,
    setLanguage
  } = useApp();

  const [articleLang, setArticleLang] = useState<Language>(language);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync internal article lang when global language changes
  useEffect(() => {
    setArticleLang(language);
  }, [language]);

  const t = TRANSLATIONS[articleLang] || TRANSLATIONS.vi;
  const isSaved = userProfile.savedArticleIds.includes(article.id);

  // Get freshest author data from AppContext state
  const currentAuthor = authors.find(a => a.id === article.author.id) || article.author;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleConsultLawyer = () => {
    setPreselectedServiceForBooking(article.category);
    setIsBookingModalOpen(true);
  };

  const handleLanguageChange = (newLang: Language) => {
    setArticleLang(newLang);
    setLanguage(newLang);
  };

  const isVi = articleLang === 'vi';
  const title = isVi ? article.title_vi : (article.title_en || article.title_vi);
  const summary = isVi ? article.summary_vi : (article.summary_en || article.summary_vi);
  const content = isVi ? article.content_vi : (article.content_en || article.content_vi);
  const categoryName = t.categories[article.category] || article.category;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#112216] w-full max-w-2xl h-full sm:h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#DCE5DF]">
        {/* Sticky Header with Bilingual Toggle & Actions */}
        <div className="bg-[#F6F8F6] px-4 py-3 border-b border-[#DCE5DF] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]">
              {categoryName}
            </span>
            {article.isFlashAlert && (
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#FDF0EF] text-[#A0322D] border border-[#F5C2BF]">
                ⚡ {t.insights.flashAlertBadge}
              </span>
            )}
          </div>

          {/* Bilingual Switch & Actions */}
          <div className="flex items-center gap-2">
            {/* Bilingual Toggle on Header */}
            <div className="flex items-center bg-white border border-[#DCE5DF] p-0.5">
              <button
                onClick={() => handleLanguageChange('vi')}
                className={`px-2.5 py-1 text-[10px] font-bold transition ${
                  articleLang === 'vi'
                    ? 'bg-[#1B5E34] text-white'
                    : 'text-[#526357] hover:text-[#112216]'
                }`}
                title="Đọc bản Tiếng Việt"
              >
                VN
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2.5 py-1 text-[10px] font-bold transition ${
                  articleLang === 'en'
                    ? 'bg-[#1B5E34] text-white'
                    : 'text-[#526357] hover:text-[#112216]'
                }`}
                title="Read English translation"
              >
                EN
              </button>
            </div>

            {/* Bookmark Offline */}
            <button
              onClick={() => toggleBookmarkArticle(article.id)}
              className={`p-2 border transition ${
                isSaved 
                  ? 'bg-[#EAF4ED] border-[#1B5E34] text-[#1B5E34]' 
                  : 'bg-white border-[#DCE5DF] text-[#526357] hover:text-[#112216]'
              }`}
              title={isSaved ? t.article.savedBookmark : t.article.saveBookmark}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#1B5E34]' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216] transition relative"
              title={t.article.shareArticle}
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#1B5E34]" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216] transition"
              title={t.article.closeArticle}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 bg-white">
          {/* Article Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-brand-sans font-bold text-[#112216] leading-snug">
              {title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#526357]">
              <span className="flex items-center gap-1.5 font-mono text-[#1B5E34] font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#1B5E34]" />
                {article.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#798C7F]" />
                {article.estimatedReadTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-mono">
                <Eye className="w-3.5 h-3.5 text-[#798C7F]" />
                {article.viewsCount.toLocaleString()} {t.article.views}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {article.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono text-[#1B5E34] bg-[#EAF4ED] px-2 py-0.5 border border-[#C2D5C8]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Executive Summary Box */}
          <div className="bg-[#F8FAF9] border-l-4 border-[#1B5E34] border-y border-r border-[#DCE5DF] p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B5E34] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#A0322D]" />
              {t.article.executiveSummary}
            </div>
            <p className="text-sm text-[#334155] leading-relaxed font-medium">
              {summary}
            </p>
          </div>

          {/* PDF Attachment Box */}
          {article.pdfAttachment && (
            <div className="bg-[#FDF0EF] border border-[#F5C2BF] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 bg-white border border-[#F5C2BF] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#A0322D]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#A0322D] font-mono">
                    {t.article.officialAttachment}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#112216] truncate">
                    {article.pdfAttachment.title}
                  </h4>
                  <p className="text-[11px] text-[#526357] font-mono">
                    {article.pdfAttachment.docNumber} • {article.pdfAttachment.fileSize} • {article.pdfAttachment.pageCount} {t.article.pages}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => setViewingPdfArticle(article)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#A0322D] hover:bg-[#7A2622] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.article.viewPdfDirectly}</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Article Content */}
          <div className="prose max-w-none text-[#2D3748] text-sm leading-relaxed space-y-4 font-legal-doc">
            {content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-base font-brand-sans font-bold text-[#112216] pt-3 border-t border-[#DCE5DF] flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-[#1B5E34] inline-block"></span>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 text-[#334155] text-xs sm:text-sm font-sans">
                    {paragraph.split('\n').map((item, itemIdx) => (
                      <li key={itemIdx} dangerouslySetInnerHTML={{ 
                        __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#112216]">$1</strong>') 
                      }} />
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-xs sm:text-sm leading-relaxed text-[#334155]" dangerouslySetInnerHTML={{
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#112216] font-semibold">$1</strong>')
                }} />
              );
            })}
          </div>

          {/* Author & Lawyer Consultation Card */}
          <div className="bg-[#F8FAF9] border border-[#DCE5DF] p-4 sm:p-5 mt-8">
            <div className="flex items-start gap-4">
              <img
                src={currentAuthor.avatar}
                alt={currentAuthor.name}
                className="w-14 h-14 object-cover border border-[#DCE5DF] shadow-xs shrink-0 bg-white"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-[#112216] font-brand-sans">{currentAuthor.name}</h4>
                    {currentAuthor.isPartner && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8] font-mono">
                        Partner
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => openLawyerEditModal(currentAuthor)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#526357] hover:text-[#1B5E34] px-2 py-1 bg-white border border-[#DCE5DF] hover:border-[#1B5E34] transition shrink-0"
                    title="Cập nhật tên, chức danh, vị trí luật sư"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{t.profile.editFirmInfo}</span>
                  </button>
                </div>
                
                <p className="text-xs font-semibold text-[#1B5E34] mt-0.5">{currentAuthor.role}</p>
                
                {currentAuthor.position ? (
                  <p className="text-[11px] text-[#526357] mt-0.5 flex items-center gap-1 font-sans">
                    <Building2 className="w-3 h-3 text-[#798C7F]" />
                    <span>{currentAuthor.position}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-[#798C7F] mt-1 font-mono">DIMAC Law Firm • {categoryName}</p>
                )}

                {currentAuthor.bio && (
                  <p className="text-[11px] text-[#526357] mt-1.5 italic line-clamp-2 leading-relaxed">
                    "{currentAuthor.bio}"
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleConsultLawyer}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B5E34] hover:bg-[#144928] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{t.article.bookWithLawyer}</span>
                  </button>
                  <a
                    href={`mailto:${currentAuthor.email || 'contact@dimac-law.com'}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216] text-xs font-semibold uppercase tracking-wider transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#1B5E34]" />
                    <span>{t.article.sendQuestion}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="bg-[#F6F8F6] px-4 py-3 border-t border-[#DCE5DF] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#526357] hidden sm:inline uppercase tracking-wider font-mono">
            DIMAC Law Firm • Asia Premier Lawyers
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-white hover:bg-[#F1F4F2] border border-[#DCE5DF] text-[#112216] text-xs font-semibold uppercase tracking-wider transition"
          >
            {t.article.closeArticle}
          </button>
        </div>
      </div>
    </div>
  );
};
