import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConsultationLead, LeadStatus, CustomerSegment } from '../../types';
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
  MessageSquare,
  Download,
  Filter,
  Layers,
  Store,
  Crown,
  Briefcase,
  User,
  Check,
  AlertCircle
} from 'lucide-react';

interface SegmentOption {
  id: CustomerSegment;
  label: string;
  shortLabel: string;
  desc: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  activeBg: string;
  activeText: string;
  activeBorder: string;
  activeRing: string;
}

const SEGMENT_OPTIONS: SegmentOption[] = [
  {
    id: 'ENTERPRISE',
    label: 'Enterprise (Doanh nghiệp lớn & FDI)',
    shortLabel: 'Enterprise',
    desc: 'Tập đoàn & Doanh nghiệp FDI',
    badgeBg: 'bg-[#EAF4ED]',
    badgeText: 'text-[#1B5E34]',
    badgeBorder: 'border-[#C2D5C8]',
    activeBg: 'bg-[#EAF4ED]',
    activeText: 'text-[#1B5E34]',
    activeBorder: 'border-[#1B5E34]',
    activeRing: 'ring-[#1B5E34]'
  },
  {
    id: 'RETAILER',
    label: 'Retailer (Chuỗi bán lẻ & F&B)',
    shortLabel: 'Retailer',
    desc: 'Chuỗi bán lẻ, siêu thị & phân phối',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-800',
    badgeBorder: 'border-orange-200',
    activeBg: 'bg-orange-50',
    activeText: 'text-orange-800',
    activeBorder: 'border-orange-600',
    activeRing: 'ring-orange-500'
  },
  {
    id: 'RETAINER_VIP',
    label: 'Retainer VIP (HĐ Thường xuyên VIP)',
    shortLabel: 'Retainer VIP',
    desc: 'Khách hàng Cố vấn Thường xuyên',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-800',
    badgeBorder: 'border-purple-200',
    activeBg: 'bg-purple-50',
    activeText: 'text-purple-800',
    activeBorder: 'border-purple-600',
    activeRing: 'ring-purple-500'
  },
  {
    id: 'SME',
    label: 'SME (Doanh nghiệp vừa & nhỏ)',
    shortLabel: 'SME',
    desc: 'Doanh nghiệp quy mô SME',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800',
    badgeBorder: 'border-blue-200',
    activeBg: 'bg-blue-50',
    activeText: 'text-blue-800',
    activeBorder: 'border-blue-600',
    activeRing: 'ring-blue-500'
  },
  {
    id: 'INDIVIDUAL',
    label: 'Individual (Khách hàng Cá nhân)',
    shortLabel: 'Individual',
    desc: 'Cá nhân, nhà đầu tư & HNWI',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-200',
    activeBg: 'bg-amber-50',
    activeText: 'text-amber-900',
    activeBorder: 'border-amber-600',
    activeRing: 'ring-amber-500'
  }
];

export const LeadManagementCMS: React.FC = () => {
  const { leads, updateLead, authors } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | LeadStatus>('ALL');
  const [segmentFilter, setSegmentFilter] = useState<'ALL' | CustomerSegment>('ALL');
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [noteInput, setNoteInput] = useState('');
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  // Active selected lead from state
  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0] || null;

  const filteredLeads = leads.filter(l => {
    if (statusFilter !== 'ALL' && l.status !== statusFilter) return false;
    if (segmentFilter !== 'ALL' && l.customerSegment !== segmentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.customerName.toLowerCase().includes(q) ||
        l.enterpriseName.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.serviceDetail && l.serviceDetail.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleUpdateSegment = (segment: CustomerSegment) => {
    if (!selectedLead) return;
    updateLead(selectedLead.id, { customerSegment: segment });
  };

  const handleUpdateStatus = (status: LeadStatus) => {
    if (!selectedLead) return;
    updateLead(selectedLead.id, { status });
  };

  const handleAssignLawyer = (lawyerName: string) => {
    if (!selectedLead) return;
    const author = authors.find(a => a.name === lawyerName);
    updateLead(selectedLead.id, {
      assignedLawyerName: lawyerName,
      assignedLawyerId: author?.id
    });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedLead) return;

    const timestamp = `[${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]`;
    const newNote = selectedLead.notes 
      ? `${selectedLead.notes}\n${timestamp} ${noteInput}` 
      : `${timestamp} ${noteInput}`;

    updateLead(selectedLead.id, { notes: newNote });
    setNoteInput('');
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FDF0EF] text-[#A0322D] border border-[#F5C2BF] shrink-0">Mới nhận</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">Đang tư vấn</span>;
      case 'SIGNED':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8] shrink-0">Đã ký HĐ</span>;
      case 'CLOSED':
        return <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 shrink-0">Đã đóng</span>;
    }
  };

  const getSegmentBadge = (segment?: CustomerSegment) => {
    const config = SEGMENT_OPTIONS.find(s => s.id === segment);
    if (!config) {
      return (
        <span className="px-1.5 py-0.5 text-[9px] font-medium bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
          Chưa phân loại
        </span>
      );
    }
    return (
      <span className={`px-1.5 py-0.5 text-[9px] font-bold ${config.badgeBg} ${config.badgeText} border ${config.badgeBorder} shrink-0`}>
        {config.shortLabel}
      </span>
    );
  };

  // CSV Export
  const handleExportCsv = () => {
    if (leads.length === 0) {
      alert('Không có dữ liệu yêu cầu tư vấn để tải về.');
      return;
    }

    const leadsToExport = filteredLeads.length > 0 ? filteredLeads : leads;

    const headers = [
      'Mã hồ sơ',
      'Họ và tên khách hàng',
      'Doanh nghiệp / Đơn vị',
      'Chức vụ',
      'Phân khúc khách hàng',
      'Số điện thoại',
      'Email',
      'Lĩnh vực pháp lý',
      'Nội dung yêu cầu tư vấn',
      'Mã Voucher áp dụng',
      'Trạng thái',
      'Mức độ ưu tiên',
      'Luật sư phụ trách',
      'Ngày tiếp nhận',
      'Nhật ký ghi chú CRM'
    ];

    const escapeCsv = (str: any) => {
      if (str === undefined || str === null) return '""';
      const cleanStr = String(str).replace(/"/g, '""').replace(/\r\n|\r|\n/g, ' | ');
      return `"${cleanStr}"`;
    };

    const getSegmentName = (seg?: CustomerSegment) => {
      const found = SEGMENT_OPTIONS.find(s => s.id === seg);
      return found ? found.label : (seg || 'Chưa phân loại');
    };

    const getStatusName = (status: LeadStatus) => {
      switch (status) {
        case 'NEW': return 'Mới nhận';
        case 'IN_PROGRESS': return 'Đang tư vấn';
        case 'SIGNED': return 'Đã ký Hợp đồng';
        case 'CLOSED': return 'Đã đóng hồ sơ';
        default: return status;
      }
    };

    const rows = leadsToExport.map(l => [
      escapeCsv(l.id),
      escapeCsv(l.customerName),
      escapeCsv(l.enterpriseName),
      escapeCsv(l.position),
      escapeCsv(getSegmentName(l.customerSegment)),
      escapeCsv(l.phone),
      escapeCsv(l.email),
      escapeCsv(l.practiceArea),
      escapeCsv(l.serviceDetail),
      escapeCsv(l.appliedVoucherCode || 'Không có'),
      escapeCsv(getStatusName(l.status)),
      escapeCsv(l.priority === 'URGENT' ? 'Khẩn cấp' : l.priority === 'HIGH' ? 'Ưu tiên cao' : 'Bình thường'),
      escapeCsv(l.assignedLawyerName || (l as any).assignedLawyer || 'Chưa phân công'),
      escapeCsv(l.createdAt),
      escapeCsv(l.notes || '')
    ]);

    // \uFEFF ensures Excel displays UTF-8 Vietnamese characters correctly
    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    const fileName = `DIMAC_CRM_YeuCauTuVan_${dateStr}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportSuccessMsg(`Đã tải xuống file "${fileName}" (${leadsToExport.length} yêu cầu tư vấn)!`);
    setTimeout(() => {
      setExportSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="space-y-5">
      {/* Top Title & Quick Actions */}
      <div className="pb-4 border-b border-[#DCE5DF] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-brand-sans font-bold text-[#112216] flex items-center gap-2 uppercase tracking-wide">
            <Users className="w-5 h-5 text-[#1B5E34]" />
            Quản Lý Yêu Cầu Tư Vấn Khách Hàng (CRM & Lead SLA)
          </h2>
          <p className="text-xs text-[#526357] mt-0.5">
            Tiếp nhận hồ sơ từ Mobile App, phân loại phân khúc (Segmentation), phân công Luật sư và theo dõi ký kết Hợp đồng.
          </p>
        </div>

        {/* CSV Export Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white text-xs font-bold uppercase tracking-wider transition shadow-xs cursor-pointer shrink-0"
            title="Tải toàn bộ danh sách hồ sơ tư vấn định dạng CSV tương thích Microsoft Excel"
          >
            <Download className="w-4 h-4" />
            <span>Tải file CSV ({filteredLeads.length})</span>
          </button>
        </div>
      </div>

      {/* CSV Export Success Banner */}
      {exportSuccessMsg && (
        <div className="p-3 bg-[#EAF4ED] border border-[#1B5E34] text-[#1B5E34] text-xs font-medium flex items-center justify-between gap-2 shadow-xs transition animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1B5E34] shrink-0" />
            <span>{exportSuccessMsg}</span>
          </div>
          <button 
            onClick={() => setExportSuccessMsg(null)}
            className="text-[#1B5E34] hover:underline text-[11px] font-bold"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#798C7F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, doanh nghiệp, số điện thoại, email, yêu cầu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#DCE5DF] pl-9 pr-4 py-2 text-xs text-[#112216] placeholder-[#798C7F] focus:outline-none focus:border-[#1B5E34]"
          />
        </div>

        {/* Customer Segmentation Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-[#526357] font-medium hidden sm:inline">Phân khúc:</span>
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value as any)}
            className="bg-white border border-[#DCE5DF] px-2.5 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
          >
            <option value="ALL">Tất cả phân khúc ({leads.length})</option>
            <option value="ENTERPRISE">Enterprise (Doanh nghiệp lớn)</option>
            <option value="RETAILER">Retailer (Chuỗi bán lẻ)</option>
            <option value="RETAINER_VIP">Retainer VIP (HĐ Thường xuyên)</option>
            <option value="SME">SME (Doanh nghiệp vừa & nhỏ)</option>
            <option value="INDIVIDUAL">Individual (Khách hàng Cá nhân)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-[#526357] font-medium hidden sm:inline">Trạng thái:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-[#DCE5DF] px-2.5 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
          >
            <option value="ALL">Tất cả trạng thái</option>
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
        <div className="lg:col-span-5 bg-white border border-[#DCE5DF] overflow-hidden shadow-xs flex flex-col max-h-[660px]">
          <div className="p-3 bg-[#F6F8F6] border-b border-[#DCE5DF] flex items-center justify-between text-xs">
            <span className="font-brand-sans font-bold uppercase tracking-wider text-[#112216]">
              Danh sách Leads ({filteredLeads.length})
            </span>
            <span className="text-[10px] text-[#1B5E34] font-mono font-semibold">Mới nhất</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#DCE5DF]">
            {filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#798C7F]">
                Không có yêu cầu tư vấn nào phù hợp với bộ lọc.
              </div>
            ) : (
              filteredLeads.map(lead => {
                const isSelected = selectedLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-3.5 cursor-pointer transition flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-[#EAF4ED] border-l-4 border-[#1B5E34]'
                        : 'hover:bg-[#F8FAF9]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-[#112216] text-xs font-brand-sans block">{lead.customerName}</span>
                        <span className="text-[10px] text-[#798C7F]">{lead.position}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(lead.status)}
                        {getSegmentBadge(lead.customerSegment)}
                      </div>
                    </div>

                    <div className="text-[11px] text-[#526357] flex items-center gap-1.5 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-[#1B5E34] shrink-0" />
                      <span className="truncate">{lead.enterpriseName}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#798C7F] pt-1 border-t border-[#E8EEEA]">
                      <span className="text-[#1B5E34] font-semibold">{lead.practiceArea}</span>
                      <span className="font-mono">{lead.createdAt?.slice(0, 10)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Lead Detail View & Lawyer Assignment */}
        {selectedLead ? (
          <div className="lg:col-span-7 bg-white border border-[#DCE5DF] p-5 shadow-xs space-y-4 text-xs">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 border-b border-[#DCE5DF] pb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-base font-brand-sans font-bold text-[#112216]">{selectedLead.customerName}</h3>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-[#EAF4ED] text-[#1B5E34] border border-[#C2D5C8]">
                    {selectedLead.practiceArea}
                  </span>
                  {getSegmentBadge(selectedLead.customerSegment)}
                </div>
                <p className="text-xs text-[#526357]">
                  {selectedLead.position} tại <strong>{selectedLead.enterpriseName}</strong>
                </p>
              </div>

              <div className="shrink-0">
                {getStatusBadge(selectedLead.status)}
              </div>
            </div>

            {/* Customer Segmentation Selector */}
            <div className="bg-[#F8FAF9] p-3.5 border border-[#DCE5DF] space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <label className="font-bold text-[#112216] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#1B5E34]" />
                  Phân Khúc Khách Hàng (Customer Segmentation)
                </label>
                <span className="text-[10px] text-[#526357]">
                  Chọn nhóm để áp dụng voucher & chính sách phí tương ứng
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {SEGMENT_OPTIONS.map(opt => {
                  const isSelected = (selectedLead.customerSegment || 'ENTERPRISE') === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleUpdateSegment(opt.id)}
                      className={`p-2 text-left border transition flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? `${opt.activeBg} ${opt.activeBorder} ${opt.activeText} font-bold shadow-xs ring-1 ${opt.activeRing}`
                          : 'bg-white border-[#DCE5DF] text-[#526357] hover:bg-[#F0F5F2] hover:border-[#1B5E34]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider">{opt.shortLabel}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-3 h-3 text-current shrink-0" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        )}
                      </div>
                      <span className="text-[9px] leading-tight opacity-80 block font-normal">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F8FAF9] p-3.5 border border-[#DCE5DF]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1B5E34] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#798C7F] block">Số điện thoại</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-mono font-bold text-[#112216] hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1B5E34] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#798C7F] block">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-mono text-[#112216] hover:underline truncate block">
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
                <Tag className="w-3.5 h-3.5 shrink-0" />
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
                  onChange={(e) => handleUpdateStatus(e.target.value as LeadStatus)}
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
                  value={selectedLead.assignedLawyerName || (selectedLead as any).assignedLawyer || ''}
                  onChange={(e) => handleAssignLawyer(e.target.value)}
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
                  placeholder="Ghi chú thêm tiến độ: Đã gọi điện trao đổi, gửi báo giá, hẹn gặp..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 bg-[#F8FAF9] border border-[#DCE5DF] px-3 py-2 text-xs text-[#112216] focus:outline-none focus:border-[#1B5E34]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1B5E34] hover:bg-[#144928] text-white font-bold uppercase tracking-wider text-xs cursor-pointer shrink-0"
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
