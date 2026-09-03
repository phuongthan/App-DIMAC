import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConsultationLead, LeadStatus } from '../../types';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  Calendar, 
  Tag, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  MessageSquare
} from 'lucide-react';

export const LeadManagementCMS: React.FC = () => {
  const { leads, updateLeadStatus, authors } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | LeadStatus>('ALL');
  const [selectedLead, setSelectedLead] = useState<ConsultationLead | null>(leads[0] || null);
  const [noteInput, setNoteInput] = useState('');

  const filteredLeads = leads.filter(l => {
    if (statusFilter !== 'ALL' && l.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.customerName.toLowerCase().includes(q) ||
        l.enterpriseName.toLowerCase().includes(q) ||
        l.phone.includes(q)
      );
    }
    return true;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedLead) return;

    const newNote = `[${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] ${noteInput}`;
    updateLeadStatus(selectedLead.id, selectedLead.status, selectedLead.assignedLawyer, newNote);
    
    // Update local selected
    setSelectedLead({
      ...selectedLead,
      notes: selectedLead.notes ? `${selectedLead.notes}\n${newNote}` : newNote
    });
    setNoteInput('');
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#FDF0EF] text-[#A0322D] border border-[#F5C2BF]">Mới nhận</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Đang tư vấn</span>;
      case 'SIGNED':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]">Đã ký Hợp đồng</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Đã đóng hồ sơ</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title */}
      <div className="pb-4 border-b border-[#DCE5DF]">
        <h2 className="text-xl font-brand-sans font-bold text-[#112216] flex items-center gap-2 uppercase tracking-wide">
          <Users className="w-5 h-5 text-[#1B5E34]" />
          Quản Lý Yêu Cầu Tư Vấn Khách Hàng (Lead CRM & SLA)
        </h2>
        <p className="text-xs text-[#526357] mt-0.5">
          Tiếp nhận hồ sơ từ Mobile App, phân công Luật sư phụ trách và theo dõi tiến độ chốt Hợp đồng dịch vụ.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#798C7F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, doanh nghiệp, số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#DCE5DF] pl-9 pr-4 py-2 text-xs text-[#112216] placeholder-[#798C7F] focus:outline-none focus:border-[#1B5E34]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
          >
            <option value="ALL">Tất cả trạng thái ({leads.length})</option>
            <option value="NEW">Mới nhận</option>
            <option value="IN_PROGRESS">Đang tư vấn</option>
            <option value="SIGNED">Đã ký HĐ</option>
            <option value="CLOSED">Đã đóng</option>
          </select>
        </div>
      </div>

      {/* Main Split: Leads List (5 cols) + Lead Detail & Notes (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Leads List */}
        <div className="lg:col-span-5 bg-white border border-[#DCE5DF] overflow-hidden shadow-xs flex flex-col max-h-[640px]">
          <div className="p-3.5 bg-[#F6F8F6] border-b border-[#DCE5DF] flex items-center justify-between text-xs">
            <span className="font-brand-sans font-bold uppercase tracking-wider text-[#112216]">Danh sách Leads ({filteredLeads.length})</span>
            <span className="text-[10px] text-[#1B5E34] font-mono font-semibold">Mới nhất</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#DCE5DF]">
            {filteredLeads.map(lead => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-3.5 cursor-pointer transition flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-[#EAF4ED] border-l-4 border-[#1B5E34]'
                      : 'hover:bg-[#F8FAF9]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-[#112216] text-xs font-brand-sans">{lead.customerName}</span>
                    {getStatusBadge(lead.status)}
                  </div>

                  <div className="text-[11px] text-[#526357] flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-[#1B5E34]" />
                    <span className="truncate">{lead.enterpriseName}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#798C7F] pt-1">
                    <span className="text-[#1B5E34] font-semibold">{lead.practiceArea}</span>
                    <span className="font-mono">{lead.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Lead Detail View & Lawyer Assignment */}
        {selectedLead ? (
          <div className="lg:col-span-7 bg-white border border-[#DCE5DF] p-5 shadow-xs space-y-4 text-xs">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 border-b border-[#DCE5DF] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-brand-sans font-bold text-[#112216]">{selectedLead.customerName}</h3>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]">
                    {selectedLead.practiceArea}
                  </span>
                </div>
                <p className="text-xs text-[#526357] mt-0.5">
                  {selectedLead.position} tại <strong>{selectedLead.enterpriseName}</strong>
                </p>
              </div>

              <div>
                {getStatusBadge(selectedLead.status)}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F8FAF9] p-3.5 border border-[#DCE5DF]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1B5E34]" />
                <div>
                  <span className="text-[10px] text-[#798C7F] block">Số điện thoại</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-mono font-bold text-[#112216] hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1B5E34]" />
                <div>
                  <span className="text-[10px] text-[#798C7F] block">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-mono text-[#112216] hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Service Requirement */}
            <div>
              <label className="font-bold text-[#112216] uppercase text-[10px] tracking-wider mb-1 block">
                Nội dung yêu cầu tư vấn
              </label>
              <div className="p-3 bg-[#F8FAF9] border border-[#DCE5DF] text-[#112216] leading-relaxed">
                {selectedLead.serviceDetail}
              </div>
            </div>

            {/* Voucher info */}
            {selectedLead.appliedVoucherCode && (
              <div className="flex items-center gap-2 bg-[#EAF4ED] p-2.5 border border-[#C2D5C8] text-[#1B5E34] font-mono text-[11px]">
                <Tag className="w-3.5 h-3.5" />
                <span>Khách hàng có áp dụng Voucher: <strong>{selectedLead.appliedVoucherCode}</strong></span>
              </div>
            )}

            {/* Status update & Lawyer assignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#DCE5DF]">
              <div>
                <label className="font-bold text-[#112216] uppercase text-[10px] tracking-wider mb-1 block">
                  Cập nhật trạng thái
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                >
                  <option value="NEW">Mới nhận (Chưa liên hệ)</option>
                  <option value="IN_PROGRESS">Đang tư vấn & Đàm phán</option>
                  <option value="SIGNED">Đã ký Hợp đồng dịch vụ</option>
                  <option value="CLOSED">Đóng hồ sơ (Từ chối / Hoàn tất)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#112216] uppercase text-[10px] tracking-wider mb-1 block">
                  Phân công Luật sư phụ trách
                </label>
                <select
                  value={selectedLead.assignedLawyer || ''}
                  onChange={(e) => updateLeadStatus(selectedLead.id, selectedLead.status, e.target.value)}
                  className="w-full bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                >
                  {authors.map(a => (
                    <option key={a.id} value={a.name}>{a.name} ({a.role})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Consultation Activity Notes */}
            <div className="pt-2">
              <label className="font-bold text-[#112216] uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#1B5E34]" />
                Nhật ký tư vấn & Tiến độ trao đổi (CRM Notes)
              </label>

              {selectedLead.notes && (
                <div className="bg-[#F8FAF9] p-3 border border-[#DCE5DF] text-[11px] text-[#526357] font-mono whitespace-pre-wrap max-h-32 overflow-y-auto mb-2">
                  {selectedLead.notes}
                </div>
              )}

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ghi chú thêm tiến độ: Đã gọi điện trao đổi, hẹn gặp ngày..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold uppercase tracking-wider text-xs"
                >
                  Lưu Ghi Chú
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white border border-[#DCE5DF] p-12 text-center text-[#798C7F] text-xs">
            Chọn một yêu cầu tư vấn từ danh sách bên trái để xem chi tiết và phân công Luật sư.
          </div>
        )}
      </div>
    </div>
  );
};
