import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LegalArticle, LegalCategory, ArticleStatus } from '../../types';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Zap, 
  Upload, 
  X, 
  Paperclip,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

const CATEGORIES: LegalCategory[] = [
  'M&A',
  'Đầu tư',
  'Bất động sản',
  'Năng lượng',
  'Tranh chấp & Tố tụng',
  'Thuế & Tài chính',
  'Lao động',
  'Doanh nghiệp'
];

export const ArticleCMS: React.FC = () => {
  const { 
    articles, 
    authors,
    openLawyerEditModal,
    addArticle, 
    updateArticle, 
    deleteArticle,
    setSelectedArticle,
    setViewingPdfArticle 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<LegalArticle | null>(null);

  // Form State
  const [formLangTab, setFormLangTab] = useState<'vi' | 'en'>('vi');
  const [titleVi, setTitleVi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<LegalCategory>('M&A');
  const [tagsInput, setTagsInput] = useState('#DoanhNghiệp, #PhápLý2026');
  const [summaryVi, setSummaryVi] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [contentVi, setContentVi] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [isFlashAlert, setIsFlashAlert] = useState(false);
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [scheduledDate, setScheduledDate] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState(authors[0]?.id || 'lawyer-mp');
  const [estimatedReadTime, setEstimatedReadTime] = useState('5 phút đọc');

  // PDF attachment fields
  const [hasPdf, setHasPdf] = useState(false);
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfDocNumber, setPdfDocNumber] = useState('');
  const [pdfSize, setPdfSize] = useState('2.5 MB');
  const [pdfPages, setPdfPages] = useState(16);

  const resetForm = () => {
    setTitleVi('');
    setTitleEn('');
    setCategory('M&A');
    setTagsInput('#DoanhNghiệp, #PhápLý2026');
    setSummaryVi('');
    setSummaryEn('');
    setContentVi('');
    setContentEn('');
    setIsFlashAlert(false);
    setStatus('published');
    setScheduledDate('');
    setSelectedAuthorId(authors[0]?.id || 'lawyer-mp');
    setHasPdf(false);
    setPdfTitle('');
    setPdfDocNumber('');
    setEditingArticle(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (article: LegalArticle) => {
    setEditingArticle(article);
    setTitleVi(article.title_vi);
    setTitleEn(article.title_en || '');
    setCategory(article.category);
    setTagsInput(article.tags.join(', '));
    setSummaryVi(article.summary_vi);
    setSummaryEn(article.summary_en || '');
    setContentVi(article.content_vi);
    setContentEn(article.content_en || '');
    setIsFlashAlert(article.isFlashAlert);
    setStatus(article.status);
    setSelectedAuthorId(article.author.id);
    setEstimatedReadTime(article.estimatedReadTime);

    if (article.pdfAttachment) {
      setHasPdf(true);
      setPdfTitle(article.pdfAttachment.title);
      setPdfDocNumber(article.pdfAttachment.docNumber);
      setPdfSize(article.pdfAttachment.fileSize);
      setPdfPages(article.pdfAttachment.pageCount);
    } else {
      setHasPdf(false);
      setPdfTitle('');
      setPdfDocNumber('');
    }

    setIsCreateModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleVi || !summaryVi) return;

    const author = authors.find(a => a.id === selectedAuthorId) || authors[0];
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const pdfAttachment = hasPdf && pdfTitle ? {
      id: `pdf-${Date.now()}`,
      title: pdfTitle,
      docNumber: pdfDocNumber || 'DIMAC-DOC',
      fileSize: pdfSize,
      pageCount: Number(pdfPages) || 12,
      publishedYear: new Date().getFullYear(),
      downloadUrl: '#pdf-download',
      summaryText: `Văn bản chính thức do Ban ${category} DIMAC Law Firm thẩm định.`
    } : undefined;

    if (editingArticle) {
      updateArticle({
        ...editingArticle,
        title_vi: titleVi,
        title_en: titleEn || titleVi,
        category,
        tags,
        summary_vi: summaryVi,
        summary_en: summaryEn || summaryVi,
        content_vi: contentVi || summaryVi,
        content_en: contentEn || summaryEn || summaryVi,
        author,
        isFlashAlert,
        status,
        scheduledFor: scheduledDate || undefined,
        pdfAttachment,
        estimatedReadTime
      });
    } else {
      addArticle({
        title_vi: titleVi,
        title_en: titleEn || titleVi,
        category,
        tags,
        summary_vi: summaryVi,
        summary_en: summaryEn || summaryVi,
        content_vi: contentVi || summaryVi,
        content_en: contentEn || summaryEn || summaryVi,
        author,
        publishDate: new Date().toISOString().split('T')[0],
        isFlashAlert,
        status,
        scheduledFor: scheduledDate || undefined,
        pdfAttachment,
        estimatedReadTime
      });
    }

    setIsCreateModalOpen(false);
    resetForm();
  };

  const filtered = articles.filter(a => {
    if (selectedCategory !== 'ALL' && a.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return a.title_vi.toLowerCase().includes(q) || a.summary_vi.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DCE5DF]">
        <div>
          <h2 className="text-xl font-brand-sans font-bold text-[#112216] flex items-center gap-2 uppercase tracking-wide">
            <FileText className="w-5 h-5 text-[#1B5E34]" />
            Quản Lý Bài Viết & Tin Tức Pháp Lý
          </h2>
          <p className="text-xs text-[#526357] mt-0.5">
            Biên tập bài phân tích chuyên sâu, đính kèm tệp PDF pháp quy, lên lịch xuất bản và quản lý song ngữ.
          </p>
        </div>

        <button
          id="btn-create-new-article"
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Soạn Bài Viết Mới</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#798C7F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết theo tiêu đề, từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#DCE5DF] pl-9 pr-4 py-2 text-xs text-[#112216] placeholder-[#798C7F] focus:outline-none focus:border-[#1B5E34]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
          >
            <option value="ALL">Tất cả chuyên ngành</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-[#DCE5DF] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#112216]">
            <thead className="bg-[#F6F8F6] text-[#526357] uppercase font-bold text-[9px] tracking-[0.15em] border-b border-[#DCE5DF]">
              <tr>
                <th className="py-3 px-4">Bài viết & Tiêu đề</th>
                <th className="py-3 px-4">Chuyên ngành</th>
                <th className="py-3 px-4">Tác giả</th>
                <th className="py-3 px-4">Đính kèm PDF</th>
                <th className="py-3 px-4">Lượt đọc</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5DF]">
              {filtered.map(article => (
                <tr key={article.id} className="hover:bg-[#F8FAF9] transition">
                  <td className="py-3 px-4 max-w-sm">
                    <div className="flex items-start gap-2">
                      {article.isFlashAlert && (
                        <span className="p-1 bg-[#FDF0EF] text-[#A0322D] border border-[#F5C2BF] shrink-0" title="Flash Alert">
                          <Zap className="w-3 h-3 fill-[#A0322D]" />
                        </span>
                      )}
                      <div>
                        <h4 className="font-bold text-[#112216] line-clamp-1 hover:text-[#1B5E34] cursor-pointer" onClick={() => setSelectedArticle(article)}>
                          {article.title_vi}
                        </h4>
                        <p className="text-[11px] text-[#526357] line-clamp-1 mt-0.5">
                          {article.summary_vi}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]">
                      {article.category}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <img src={article.author.avatar} alt="" className="w-5 h-5 object-cover border border-[#DCE5DF]" />
                      <span className="font-medium text-[#112216]">{article.author.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {article.pdfAttachment ? (
                      <button
                        onClick={() => setViewingPdfArticle(article)}
                        className="flex items-center gap-1 text-[11px] text-[#1B5E34] hover:underline font-mono"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{article.pdfAttachment.pageCount} tr ({article.pdfAttachment.fileSize})</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#798C7F] italic">Không có</span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-[#526357]">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#798C7F]" />
                      <span>{article.viewsCount.toLocaleString()}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      article.status === 'published' ? 'bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]' :
                      article.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {article.status === 'published' ? 'Đã xuất bản' : article.status === 'scheduled' ? 'Lên lịch' : 'Bản nháp'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(article)}
                        className="p-1.5 bg-[#F6F8F6] text-[#526357] hover:text-[#112216] hover:bg-[#E8EFEA] border border-[#DCE5DF] transition"
                        title="Chỉnh sửa"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="p-1.5 bg-[#FDF0EF] text-[#A0322D] hover:bg-[#FCE2E0] border border-[#F5C2BF] transition"
                        title="Xóa bài"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white text-[#112216] w-full max-w-4xl border border-[#DCE5DF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-[#F6F8F6] px-6 py-4 border-b border-[#DCE5DF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1B5E34]" />
                <h3 className="text-sm font-brand-sans font-bold text-[#112216] uppercase tracking-wider">
                  {editingArticle ? 'Chỉnh Sửa Bài Viết Chuyên Sâu' : 'Soạn Thảo Bài Viết Pháp Lý Mới'}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 bg-white text-[#526357] hover:text-[#112216] border border-[#DCE5DF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto space-y-4 text-xs bg-white">
              {/* Language Switch Tabs */}
              <div className="flex items-center gap-2 border-b border-[#DCE5DF] pb-2">
                <button
                  type="button"
                  onClick={() => setFormLangTab('vi')}
                  className={`px-3 py-1.5 font-bold uppercase tracking-wider text-xs border ${
                    formLangTab === 'vi'
                      ? 'bg-[#1B5E34] text-white border-[#1B5E34]'
                      : 'bg-[#F8FAF9] text-[#526357] border-[#DCE5DF]'
                  }`}
                >
                  🇻🇳 Tiếng Việt (Bắt buộc)
                </button>
                <button
                  type="button"
                  onClick={() => setFormLangTab('en')}
                  className={`px-3 py-1.5 font-bold uppercase tracking-wider text-xs border ${
                    formLangTab === 'en'
                      ? 'bg-[#1B5E34] text-white border-[#1B5E34]'
                      : 'bg-[#F8FAF9] text-[#526357] border-[#DCE5DF]'
                  }`}
                >
                  🇬🇧 English Translation
                </button>
              </div>

              {/* Title & Summary */}
              {formLangTab === 'vi' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-[#112216] mb-1">
                      Tiêu đề bài viết (Tiếng Việt) <span className="text-[#A0322D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={titleVi}
                      onChange={(e) => setTitleVi(e.target.value)}
                      placeholder="VD: Cập nhật Nghị định mới về phát triển thị trường mua bán điện trực tiếp (DPPA)..."
                      className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#112216] mb-1">
                      Tóm tắt nội dung (Lead paragraph) <span className="text-[#A0322D]">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={summaryVi}
                      onChange={(e) => setSummaryVi(e.target.value)}
                      placeholder="Tóm tắt 2-3 câu ngắn gọn về bối cảnh pháp lý, tác động doanh nghiệp..."
                      className="w-full bg-[#F8FAF9] border border-[#DCE5DF] p-3 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#112216] mb-1">Nội dung chi tiết (Markdown / HTML)</label>
                    <textarea
                      rows={6}
                      value={contentVi}
                      onChange={(e) => setContentVi(e.target.value)}
                      placeholder="Toàn văn bài phân tích của Luật sư DIMAC..."
                      className="w-full bg-[#F8FAF9] border border-[#DCE5DF] p-3 text-xs text-[#112216] font-mono focus:outline-none focus:border-[#1B5E34]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-[#112216] mb-1">Article Title (English)</label>
                    <input
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Legal update on the new Decree regarding Direct Power Purchase Agreements (DPPA)..."
                      className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#112216] mb-1">Summary (English)</label>
                    <textarea
                      rows={2}
                      value={summaryEn}
                      onChange={(e) => setSummaryEn(e.target.value)}
                      placeholder="Executive summary of legal implications for foreign invested enterprises..."
                      className="w-full bg-[#F8FAF9] border border-[#DCE5DF] p-3 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#112216] mb-1">Full Content (English)</label>
                    <textarea
                      rows={6}
                      value={contentEn}
                      onChange={(e) => setContentEn(e.target.value)}
                      placeholder="Full English text for overseas clients and FDI investors..."
                      className="w-full bg-[#F8FAF9] border border-[#DCE5DF] p-3 text-xs text-[#112216] font-mono focus:outline-none focus:border-[#1B5E34]"
                    />
                  </div>
                </div>
              )}

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-[#112216] mb-1">Chuyên ngành</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as LegalCategory)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-[#112216]">Luật sư Tác giả</label>
                    <button
                      type="button"
                      onClick={() => {
                        const cur = authors.find(a => a.id === selectedAuthorId);
                        openLawyerEditModal(cur);
                      }}
                      className="text-[10px] text-[#1B5E34] hover:underline font-bold"
                    >
                      + Sửa / Thêm Luật sư
                    </button>
                  </div>
                  <select
                    value={selectedAuthorId}
                    onChange={(e) => setSelectedAuthorId(e.target.value)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  >
                    {authors.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#112216] mb-1">Trạng thái bài</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                    className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                  >
                    <option value="published">Xuất bản ngay (Live)</option>
                    <option value="draft">Bản nháp (Draft)</option>
                    <option value="scheduled">Lên lịch tự động (Schedule)</option>
                  </select>
                </div>
              </div>

              {/* PDF Attachment Section */}
              <div className="bg-[#F8FAF9] p-4 border border-[#DCE5DF] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="hasPdfCheck"
                      checked={hasPdf}
                      onChange={(e) => setHasPdf(e.target.checked)}
                      className="w-4 h-4 accent-[#1B5E34]"
                    />
                    <label htmlFor="hasPdfCheck" className="font-bold text-[#112216] cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-[#1B5E34]" />
                      Đính kèm file PDF pháp quy / Toàn văn văn bản (PDF Viewer Mobile)
                    </label>
                  </div>
                </div>

                {hasPdf && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#DCE5DF]">
                    <div>
                      <label className="block text-[10px] text-[#526357] mb-0.5">Tên văn bản đính kèm</label>
                      <input
                        type="text"
                        value={pdfTitle}
                        onChange={(e) => setPdfTitle(e.target.value)}
                        placeholder="VD: Toàn văn Nghị định 80/2024/NĐ-CP"
                        className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#526357] mb-0.5">Số hiệu văn bản</label>
                      <input
                        type="text"
                        value={pdfDocNumber}
                        onChange={(e) => setPdfDocNumber(e.target.value)}
                        placeholder="VD: 80/2024/NĐ-CP"
                        className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] font-mono focus:outline-none focus:border-[#1B5E34]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#526357] mb-0.5">Số trang tài liệu</label>
                      <input
                        type="number"
                        value={pdfPages}
                        onChange={(e) => setPdfPages(Number(e.target.value))}
                        className="w-full bg-white border border-[#DCE5DF] px-2.5 py-1.5 text-xs text-[#112216] font-mono focus:outline-none focus:border-[#1B5E34]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Flash Alert checkbox */}
              <div className="flex items-center gap-2 bg-[#FDF0EF] p-3 border border-[#F5C2BF]">
                <input
                  type="checkbox"
                  id="flashAlertCheck"
                  checked={isFlashAlert}
                  onChange={(e) => setIsFlashAlert(e.target.checked)}
                  className="w-4 h-4 accent-[#A0322D]"
                />
                <label htmlFor="flashAlertCheck" className="text-xs text-[#A0322D] font-bold cursor-pointer flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-[#A0322D]" />
                  Đánh dấu Cảnh báo khẩn (Flash Alert) — Tự động hiển thị nổi bật với viền Crimson
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DCE5DF]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-white text-[#526357] hover:text-[#112216] border border-[#DCE5DF] font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold uppercase tracking-wider transition"
                >
                  Lưu & Xuất Bản Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
