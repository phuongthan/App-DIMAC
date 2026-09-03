import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Author } from '../../types';
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  Scale, 
  RotateCcw, 
  Search, 
  FileText, 
  Check, 
  Award, 
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

export const LawyersCMS: React.FC = () => {
  const { 
    authors, 
    articles, 
    openLawyerEditModal, 
    deleteAuthor, 
    resetAuthorsToDefault,
    updateAuthor
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredAuthors = authors.filter(author => {
    const matchesSearch = 
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (author.position && author.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (author.email && author.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = 
      filterRole === 'all' ? true :
      filterRole === 'partner' ? Boolean(author.isPartner) :
      filterRole === 'associate' ? !author.isPartner : true;

    return matchesSearch && matchesRole;
  });

  const getArticleCountForAuthor = (authorId: string) => {
    return articles.filter(a => a.author && a.author.id === authorId).length;
  };

  const handleTogglePartner = (author: Author) => {
    updateAuthor({
      ...author,
      isPartner: !author.isPartner
    });
  };

  const handleDelete = (id: string) => {
    deleteAuthor(id);
    setConfirmDeleteId(null);
  };

  return (
    <div id="lawyers-cms-container" className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#DCE5DF] p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#1B5E34] text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-[#112216] font-brand-sans uppercase tracking-wider">
              Quản Lý Đội Ngũ Luật Sư & Chuyên Gia
            </h2>
          </div>
          <p className="text-xs text-[#526357] mt-1">
            Cập nhật tên, chức danh, ban chuyên trách, liên hệ và quyền tác giả của các Luật sư DIMAC Law Firm.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn khôi phục danh sách Luật sư mặc định của DIMAC không?')) {
                resetAuthorsToDefault();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#DCE5DF] text-[#526357] hover:text-[#112216] hover:bg-[#F1F4F2] text-xs font-semibold uppercase tracking-wider transition"
            title="Khôi phục danh sách luật sư chuẩn ban đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục chuẩn</span>
          </button>

          <button
            onClick={() => openLawyerEditModal(null)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm Luật Sư Mới</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#DCE5DF] p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-[#798C7F] font-mono tracking-wider">Tổng số nhân sự pháp lý</p>
            <p className="text-2xl font-bold text-[#112216] mt-1 font-mono">{authors.length}</p>
          </div>
          <div className="w-10 h-10 bg-[#F1F4F2] text-[#1B5E34] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#DCE5DF] p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-[#798C7F] font-mono tracking-wider">Thành viên Hợp danh (Partners)</p>
            <p className="text-2xl font-bold text-[#1B5E34] mt-1 font-mono">
              {authors.filter(a => a.isPartner).length}
            </p>
          </div>
          <div className="w-10 h-10 bg-[#EAF4ED] text-[#1B5E34] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#DCE5DF] p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-[#798C7F] font-mono tracking-wider">Bài viết / Flash Alerts đã xuất bản</p>
            <p className="text-2xl font-bold text-[#A02B2D] mt-1 font-mono">{articles.length}</p>
          </div>
          <div className="w-10 h-10 bg-[#FDF0EF] text-[#A02B2D] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#DCE5DF] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#798C7F] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên, chức danh, ban chuyên trách..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#DCE5DF] bg-[#F8FAF9] focus:bg-white focus:outline-none focus:border-[#1B5E34]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
              filterRole === 'all'
                ? 'bg-[#1B5E34] text-white'
                : 'bg-[#F1F4F2] text-[#526357] hover:bg-[#EAEFEA]'
            }`}
          >
            Tất cả ({authors.length})
          </button>
          <button
            onClick={() => setFilterRole('partner')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
              filterRole === 'partner'
                ? 'bg-[#1B5E34] text-white'
                : 'bg-[#F1F4F2] text-[#526357] hover:bg-[#EAEFEA]'
            }`}
          >
            Partners ({authors.filter(a => a.isPartner).length})
          </button>
          <button
            onClick={() => setFilterRole('associate')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
              filterRole === 'associate'
                ? 'bg-[#1B5E34] text-white'
                : 'bg-[#F1F4F2] text-[#526357] hover:bg-[#EAEFEA]'
            }`}
          >
            Associates & Chuyên gia ({authors.filter(a => !a.isPartner).length})
          </button>
        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAuthors.map((author) => {
          const articleCount = getArticleCountForAuthor(author.id);
          const isDeleting = confirmDeleteId === author.id;

          return (
            <div
              key={author.id}
              className="bg-white border border-[#DCE5DF] p-5 flex flex-col justify-between hover:border-[#1B5E34] transition shadow-xs group"
            >
              <div>
                {/* Top Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-14 h-14 object-cover border border-[#DCE5DF] shrink-0 bg-[#F1F4F2]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#112216] font-brand-sans">
                          {author.name}
                        </h3>
                        {author.isPartner && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8] font-mono">
                            Partner
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#1B5E34] mt-0.5">
                        {author.role}
                      </p>
                      {author.position && (
                        <p className="text-[11px] text-[#526357] mt-0.5 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-[#798C7F]" />
                          <span>{author.position}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick Edit button */}
                  <button
                    onClick={() => openLawyerEditModal(author)}
                    className="p-1.5 bg-[#F1F4F2] hover:bg-[#EAF4ED] text-[#526357] hover:text-[#1B5E34] border border-[#DCE5DF] transition"
                    title="Chỉnh sửa thông tin luật sư này"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Contact & Bio Info */}
                <div className="mt-4 pt-3 border-t border-[#F1F4F2] space-y-1.5 text-xs text-[#526357]">
                  {author.email && (
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <Mail className="w-3.5 h-3.5 text-[#798C7F]" />
                      <span className="text-[#112216]">{author.email}</span>
                    </div>
                  )}
                  {author.phone && (
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-[#798C7F]" />
                      <span>{author.phone}</span>
                    </div>
                  )}
                  {author.bio && (
                    <p className="text-[11px] text-[#526357] italic pt-1 line-clamp-2 leading-relaxed">
                      "{author.bio}"
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="mt-4 pt-3 border-t border-[#DCE5DF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#798C7F] flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#1B5E34]" />
                    <span>{articleCount} bài viết</span>
                  </span>
                  <button
                    onClick={() => handleTogglePartner(author)}
                    className={`text-[10px] px-2 py-0.5 border font-semibold transition ${
                      author.isPartner
                        ? 'bg-[#EAF4ED] text-[#1B5E34] border-[#C2D5C8]'
                        : 'bg-[#F8FAF9] text-[#798C7F] border-[#DCE5DF] hover:text-[#112216]'
                    }`}
                    title="Bật/tắt huy hiệu Partner"
                  >
                    {author.isPartner ? '✓ Là Partner' : '+ Gắn Partner'}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {isDeleting ? (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[#A0322D] font-bold">Xác nhận xóa?</span>
                      <button
                        onClick={() => handleDelete(author.id)}
                        className="px-2 py-1 bg-[#A0322D] text-white text-[10px] font-bold"
                      >
                        Có
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2 py-1 bg-[#F1F4F2] text-[#526357] text-[10px]"
                      >
                        Không
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => openLawyerEditModal(author)}
                        className="px-3 py-1 bg-[#1B5E34] hover:bg-[#144928] text-white text-[11px] font-bold uppercase tracking-wider transition flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Cập nhật</span>
                      </button>
                      {authors.length > 1 && (
                        <button
                          onClick={() => setConfirmDeleteId(author.id)}
                          className="p-1 text-[#798C7F] hover:text-[#A0322D] hover:bg-[#FDF0EF] transition"
                          title="Xóa luật sư khỏi danh sách"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
