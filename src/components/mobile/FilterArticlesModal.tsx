import React from 'react';
import { LegalCategory } from '../../types';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../utils/translations';
import { X, Filter, FileText, Calendar, Tag, Check, RotateCcw } from 'lucide-react';

interface FilterArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: LegalCategory | 'ALL';
  onSelectCategory: (cat: LegalCategory | 'ALL') => void;
  selectedYear: string;
  onSelectYear: (year: string) => void;
  hasPdfOnly: boolean;
  onToggleHasPdfOnly: (val: boolean) => void;
  onResetFilters: () => void;
}

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

const YEARS = ['ALL', '2026', '2025', '2024', '2023'];

export const FilterArticlesModal: React.FC<FilterArticlesModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedYear,
  onSelectYear,
  hasPdfOnly,
  onToggleHasPdfOnly,
  onResetFilters
}) => {
  const { language } = useApp();
  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  if (!isOpen) return null;

  const getCategoryName = (cat: LegalCategory | 'ALL') => {
    if (cat === 'ALL') return t.categories.ALL;
    return t.categories[cat] || cat;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#112216] w-full max-w-md border border-[#DCE5DF] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#F6F8F6] px-5 py-4 border-b border-[#DCE5DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#1B5E34]" />
            <h3 className="text-sm font-brand-sans font-bold text-[#112216] uppercase tracking-wider">{t.filters.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Practice Area Filter */}
          <div>
            <label className="font-bold text-[#112216] mb-2 flex items-center gap-1.5 uppercase text-[10px] tracking-wider font-mono">
              <Tag className="w-3.5 h-3.5 text-[#1B5E34]" />
              {t.filters.practiceArea}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`p-2 text-left font-medium transition border flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#EAF4ED] border-[#1B5E34] text-[#1B5E34] font-bold shadow-xs'
                      : 'bg-[#F8FAF9] border-[#DCE5DF] text-[#526357] hover:border-[#1B5E34] hover:text-[#112216]'
                  }`}
                >
                  <span className="truncate">{getCategoryName(cat)}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#1B5E34] shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Year of Publication */}
          <div>
            <label className="font-bold text-[#112216] mb-2 flex items-center gap-1.5 uppercase text-[10px] tracking-wider font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#1B5E34]" />
              {t.filters.yearOfPub}
            </label>
            <div className="flex flex-wrap gap-2">
              {YEARS.map(y => (
                <button
                  key={y}
                  onClick={() => onSelectYear(y)}
                  className={`px-3 py-1.5 font-mono text-xs transition border ${
                    selectedYear === y
                      ? 'bg-[#1B5E34] text-white border-[#1B5E34] font-bold'
                      : 'bg-[#F8FAF9] border-[#DCE5DF] text-[#526357] hover:border-[#1B5E34] hover:text-[#112216]'
                  }`}
                >
                  {y === 'ALL' ? t.filters.allYears : (language === 'vi' ? `Năm ${y}` : `Year ${y}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Has PDF Attachment Toggle */}
          <div className="bg-[#F8FAF9] p-3.5 border border-[#DCE5DF] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#FDF0EF] border border-[#F5C2BF] flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#A0322D]" />
              </div>
              <div>
                <p className="font-bold text-[#112216] uppercase text-[10px] tracking-wider font-brand-sans">{t.filters.hasPdfOnly}</p>
                <p className="text-[11px] text-[#526357]">{t.filters.hasPdfOnlySub}</p>
              </div>
            </div>

            <button
              onClick={() => onToggleHasPdfOnly(!hasPdfOnly)}
              className={`w-11 h-6 transition relative ${
                hasPdfOnly ? 'bg-[#1B5E34]' : 'bg-[#E2E8F0] border border-[#CBD5E1]'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white transition transform ${
                  hasPdfOnly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F6F8F6] p-4 border-t border-[#DCE5DF] flex items-center justify-between gap-3">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F1F4F2] border border-[#DCE5DF] text-[#526357] hover:text-[#112216] text-xs font-semibold uppercase tracking-wider transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.filters.resetBtn}</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition text-center"
          >
            {t.filters.applyBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
