import React, { useState, useMemo } from 'react';
import { LegalCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { FilterArticlesModal } from './FilterArticlesModal';
import { TRANSLATIONS } from '../../utils/translations';
import { 
  Search, 
  Filter, 
  FileText, 
  Zap, 
  Bookmark, 
  Clock, 
  ArrowRight, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const CATEGORIES: (LegalCategory | 'ALL')[] = [
  'ALL',
  'M&A',
  'Đầu tư',
  'Bất động sản',
  'Năng lượng',
  'Tranh chấp & Tố tụng',
  'Thuế & Tài chính',
  'Lao động',
  'Doanh nghiệp'
];

export const LegalInsightsView: React.FC = () => {
  const { 
    articles, 
    authors,
    setSelectedArticle, 
    setViewingPdfArticle,
    userProfile, 
    toggleBookmarkArticle, 
    language 
  } = useApp();

  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory | 'ALL'>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [hasPdfOnly, setHasPdfOnly] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Infinite scroll simulation state (FR-01: 10 bài/lượt)
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      // Category match
      if (selectedCategory !== 'ALL' && art.category !== selectedCategory) {
        return false;
      }
      
      // Year match
      if (selectedYear !== 'ALL' && !art.publishDate.startsWith(selectedYear)) {
        return false;
      }

      // Has PDF filter
      if (hasPdfOnly && !art.pdfAttachment) {
        return false;
      }

      // Full-text search (Title, Summary, Tags, Content)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitleVi = art.title_vi.toLowerCase().includes(q);
        const inTitleEn = art.title_en?.toLowerCase().includes(q) || false;
        const inSummary = art.summary_vi.toLowerCase().includes(q) || art.summary_en?.toLowerCase().includes(q);
        const inTags = art.tags.some(t => t.toLowerCase().includes(q));
        const inCategory = art.category.toLowerCase().includes(q);
        if (!inTitleVi && !inTitleEn && !inSummary && !inTags && !inCategory) {
          return false;
        }
      }

      return true;
    });
  }, [articles, selectedCategory, selectedYear, hasPdfOnly, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 10);
      setIsLoadingMore(false);
    }, 600);
  };

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedYear('ALL');
    setHasPdfOnly(false);
    setSearchQuery('');
  };

  const activeFilterCount = (selectedCategory !== 'ALL' ? 1 : 0) + 
                            (selectedYear !== 'ALL' ? 1 : 0) + 
                            (hasPdfOnly ? 1 : 0);

  const flashAlertArticle = articles.find(a => a.isFlashAlert);

  const getCategoryName = (cat: LegalCategory | 'ALL') => {
    if (cat === 'ALL') return t.categories.ALL;
    return t.categories[cat] || cat;
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F6F8F6] text-[#112216] pb-20">
      {/* Top Search & Filter Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 pt-3 pb-2.5 border-b border-[#DCE5DF] space-y-2.5 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Full-text Search Bar */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#526357] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.insights.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F6F8F6] border border-[#DCE5DF] focus:border-[#1B5E34] pl-9 pr-3 py-2 text-xs text-[#112216] placeholder-[#798C7F] focus:outline-none transition rounded-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#798C7F] hover:text-[#112216] text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Modal Trigger */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider font-bold transition border ${
              activeFilterCount > 0
                ? 'bg-[#1B5E34] text-white border-[#1B5E34]'
                : 'bg-[#F6F8F6] text-[#526357] border-[#DCE5DF] hover:border-[#1B5E34]'
            }`}
            title="Mở bộ lọc nâng cao"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.insights.filterBtn}</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-[#A0322D] text-white text-[9px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Category Horizontal Scroll Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap transition shrink-0 border ${
                selectedCategory === cat
                  ? 'bg-[#1B5E34] text-white border-[#1B5E34] font-bold shadow-xs'
                  : 'bg-white text-[#526357] border-[#DCE5DF] hover:text-[#112216] hover:border-[#1B5E34]'
              }`}
            >
              {getCategoryName(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Feed */}
      <div className="px-4 py-4 space-y-4">
        {/* Flash Alert Highlight Banner (If any) */}
        {flashAlertArticle && selectedCategory === 'ALL' && !searchQuery && (
          <div 
            onClick={() => setSelectedArticle(flashAlertArticle)}
            className="bg-[#FDF2F2] border-2 border-[#A0322D] p-4 cursor-pointer hover:shadow-md transition relative overflow-hidden group"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] bg-[#A0322D] text-white">
                <Zap className="w-3 h-3 fill-white text-white" />
                {t.insights.flashAlertBadge}
              </span>
              <span className="text-[10px] text-[#A0322D] font-mono font-bold">
                {flashAlertArticle.publishDate}
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#112216] group-hover:text-[#A0322D] transition leading-snug font-brand-sans">
              {language === 'vi' ? flashAlertArticle.title_vi : flashAlertArticle.title_en}
            </h3>

            <p className="text-xs text-[#526357] mt-1.5 line-clamp-2 leading-relaxed">
              {language === 'vi' ? flashAlertArticle.summary_vi : flashAlertArticle.summary_en}
            </p>

            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#A0322D]/20">
              <span className="text-[10px] uppercase tracking-wider text-[#7A2622] flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A0322D]" />
                DIMAC Law Firm
              </span>
              <span className="text-[#A0322D] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition text-[10px]">
                {t.insights.viewDetails} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* Section Heading & Result count */}
        <div className="flex items-center justify-between text-xs text-[#526357] px-0.5 border-b border-[#DCE5DF] pb-2">
          <span className="font-bold uppercase tracking-wider text-[#112216] text-[11px]">
            {t.insights.insightsTitle} ({filteredArticles.length})
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#1B5E34] font-mono font-bold">
            DIMAC PRACTICE
          </span>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 px-4 bg-white border border-[#DCE5DF]">
            <Search className="w-8 h-8 text-[#A0B0A5] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#112216] uppercase tracking-wider">{t.insights.noArticlesFound}</h4>
            <p className="text-xs text-[#526357] mt-1">
              {t.insights.resetFilterPrompt}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-3 px-4 py-1.5 bg-[#EAF4ED] text-[#1B5E34] hover:bg-[#1B5E34] hover:text-white border border-[#C2D5C8] text-xs font-bold uppercase tracking-wider transition"
            >
              {t.insights.resetFilterPrompt}
            </button>
          </div>
        )}

        {/* Articles List */}
        <div className="space-y-3">
          {displayedArticles.map(article => {
            const isSaved = userProfile.savedArticleIds.includes(article.id);
            const isVi = language === 'vi';
            const title = isVi ? article.title_vi : (article.title_en || article.title_vi);
            const summary = isVi ? article.summary_vi : (article.summary_en || article.summary_vi);
            const categoryName = t.categories[article.category] || article.category;

            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white border border-[#DCE5DF] hover:border-[#1B5E34] p-4 cursor-pointer transition shadow-xs hover:shadow-md group relative flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Category & Bookmark */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8] font-mono">
                        {categoryName}
                      </span>
                      {article.pdfAttachment && (
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingPdfArticle(article);
                          }}
                          className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#FDF0EF] text-[#A0322D] border border-[#F5C2BF] hover:bg-[#A0322D] hover:text-white transition"
                          title={t.insights.viewPdf}
                        >
                          <FileText className="w-2.5 h-2.5" />
                          PDF ({article.pdfAttachment.fileSize})
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmarkArticle(article.id);
                      }}
                      className={`p-1.5 border transition ${
                        isSaved 
                          ? 'bg-[#EAF4ED] border-[#1B5E34] text-[#1B5E34]' 
                          : 'bg-[#F6F8F6] border-[#DCE5DF] text-[#798C7F] hover:text-[#112216] hover:border-[#1B5E34]'
                      }`}
                      title={isSaved ? t.insights.savedArticle : t.insights.saveArticle}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#1B5E34]' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-[#112216] group-hover:text-[#1B5E34] transition leading-snug font-brand-sans">
                    {title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[#526357] mt-2 line-clamp-2 leading-relaxed font-normal">
                    {summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] font-medium text-[#526357] bg-[#F1F4F2] px-1.5 py-0.5 border border-[#DCE5DF]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                {(() => {
                  const cardAuthor = authors.find(a => a.id === article.author.id) || article.author;
                  return (
                    <div className="mt-3.5 pt-3 border-t border-[#E8EFEA] flex items-center justify-between text-[11px] text-[#526357]">
                      <div className="flex items-center gap-2">
                        <img 
                          src={cardAuthor.avatar} 
                          alt={cardAuthor.name}
                          className="w-5 h-5 object-cover border border-[#DCE5DF] rounded-none bg-white" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80';
                          }}
                        />
                        <span className="truncate max-w-[120px] font-medium text-[#112216] text-[11px]">{cardAuthor.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[#798C7F] text-[10px] font-mono">
                          <Clock className="w-3 h-3" />
                          {article.estimatedReadTime} {t.insights.readTimePrefix}
                        </span>
                        <span className="text-[#1B5E34] font-bold uppercase tracking-wider flex items-center gap-0.5 group-hover:translate-x-0.5 transition text-[10px]">
                          {t.insights.viewDetails} <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>

        {/* Infinite Scroll / Load More Action (FR-01) */}
        {hasMore && (
          <div className="pt-2 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="w-full py-2.5 bg-white border border-[#DCE5DF] hover:border-[#1B5E34] text-xs font-bold uppercase tracking-wider text-[#112216] hover:bg-[#F6F8F6] transition flex items-center justify-center gap-2 shadow-xs"
            >
              {isLoadingMore ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#1B5E34] border-t-transparent rounded-full animate-spin" />
                  <span>{t.insights.loadingMore}</span>
                </>
              ) : (
                <span>{t.insights.loadMore} ({filteredArticles.length - visibleCount})</span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterArticlesModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        hasPdfOnly={hasPdfOnly}
        onToggleHasPdfOnly={setHasPdfOnly}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};

