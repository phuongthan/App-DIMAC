import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerSegment } from '../../types';
import { 
  Building2, 
  Building, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  ChevronDown, 
  UserX,
  Sparkles,
  Lock
} from 'lucide-react';

interface Props {
  variant?: 'compact' | 'floating' | 'bar';
}

export const DemoRoleSwitcher: React.FC<Props> = ({ variant = 'compact' }) => {
  const { 
    isAuthenticated, 
    currentUserSegment, 
    switchDemoSegment, 
    logout, 
    userProfile,
    setIsAuthModalOpen 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const getSegmentConfig = (seg: CustomerSegment | 'GUEST' | null) => {
    switch (seg) {
      case 'ENTERPRISE':
        return {
          label: 'ENTERPRISE',
          title: 'Tập đoàn Vanguard (M&A)',
          badgeColor: 'bg-[#0A2E1A] text-emerald-300 border-[#1B5E34]',
          icon: Building2
        };
      case 'SME':
        return {
          label: 'SME',
          title: 'EcoTrans Logistics (CEO)',
          badgeColor: 'bg-[#1A365D] text-blue-200 border-[#2B6CB0]',
          icon: Building
        };
      case 'RETAINER_VIP':
        return {
          label: 'RETAINER VIP',
          title: 'Khang Dien Holding (HĐQT)',
          badgeColor: 'bg-[#3B0764] text-purple-200 border-[#7E22CE]',
          icon: ShieldCheck
        };
      case 'INDIVIDUAL':
        return {
          label: 'CÁ NHÂN',
          title: 'Lê Bảo Quốc (HNWI)',
          badgeColor: 'bg-[#451A03] text-amber-200 border-[#B45309]',
          icon: UserCheck
        };
      case 'GUEST':
      default:
        return {
          label: 'CHƯA ĐĂNG NHẬP',
          title: 'Khách vãng lai (Guest)',
          badgeColor: 'bg-slate-800 text-slate-300 border-slate-600',
          icon: UserX
        };
    }
  };

  const currentConfig = getSegmentConfig(isAuthenticated ? currentUserSegment : 'GUEST');
  const IconComponent = currentConfig.icon;

  return (
    <div className="relative inline-block text-left" id="demo-role-switcher-container">
      <button
        type="button"
        id="btn-demo-role-switcher"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#112216] hover:bg-[#1B3624] text-white border border-[#2D5A3C] text-xs font-bold rounded shadow-xs transition"
        title="Chuyển đổi phân khúc khách hàng mẫu để kiểm thử Auth Guard & Ví Voucher"
      >
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
          <Sparkles className="w-3 h-3 text-[#E2B13C]" />
          <span>Role:</span>
        </span>

        <span className={`px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded border ${currentConfig.badgeColor}`}>
          {currentConfig.label}
        </span>

        <ChevronDown className="w-3 h-3 text-emerald-400/80" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-[#CBD5E1] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E34] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#A0322D]" />
                  Demo Role Switcher
                </span>
                <span className="text-[9px] text-[#64748B]">Mô phỏng Phân khúc</span>
              </div>
              <p className="text-[11px] text-[#526357] mt-0.5">
                Kiểm tra Auth Guard & Bộ lọc voucher động theo 4 nhóm khách hàng DIMAC.
              </p>
            </div>

            <div className="p-1 space-y-1">
              {/* Segment 1: ENTERPRISE */}
              <button
                type="button"
                onClick={() => {
                  switchDemoSegment('ENTERPRISE');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded text-left transition ${
                  isAuthenticated && currentUserSegment === 'ENTERPRISE'
                    ? 'bg-[#EAF4ED] border border-[#1B5E34]'
                    : 'hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#0A2E1A] text-emerald-300 flex items-center justify-center font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#112216]">ENTERPRISE</div>
                    <div className="text-[10px] text-[#526357]">Tập đoàn Vanguard (M&A)</div>
                  </div>
                </div>
                <span className="text-[9px] bg-emerald-100 text-[#1B5E34] font-bold px-1.5 py-0.5 rounded">
                  M&A 2H
                </span>
              </button>

              {/* Segment 2: SME */}
              <button
                type="button"
                onClick={() => {
                  switchDemoSegment('SME');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded text-left transition ${
                  isAuthenticated && currentUserSegment === 'SME'
                    ? 'bg-[#EBF8FF] border border-[#2B6CB0]'
                    : 'hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#1A365D] text-blue-200 flex items-center justify-center font-bold text-xs">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#112216]">SME</div>
                    <div className="text-[10px] text-[#526357]">EcoTrans Logistics (CEO)</div>
                  </div>
                </div>
                <span className="text-[9px] bg-blue-100 text-[#2B6CB0] font-bold px-1.5 py-0.5 rounded">
                  Labor 20%
                </span>
              </button>

              {/* Segment 3: RETAINER_VIP */}
              <button
                type="button"
                onClick={() => {
                  switchDemoSegment('RETAINER_VIP');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded text-left transition ${
                  isAuthenticated && currentUserSegment === 'RETAINER_VIP'
                    ? 'bg-[#FAF5FF] border border-[#7E22CE]'
                    : 'hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#3B0764] text-purple-200 flex items-center justify-center font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#112216]">RETAINER VIP</div>
                    <div className="text-[10px] text-[#526357]">Khang Dien Holding (HĐQT)</div>
                  </div>
                </div>
                <span className="text-[9px] bg-purple-100 text-[#7E22CE] font-bold px-1.5 py-0.5 rounded">
                  VIP 30D
                </span>
              </button>

              {/* Segment 4: INDIVIDUAL */}
              <button
                type="button"
                onClick={() => {
                  switchDemoSegment('INDIVIDUAL');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded text-left transition ${
                  isAuthenticated && currentUserSegment === 'INDIVIDUAL'
                    ? 'bg-[#FFFBEB] border border-[#B45309]'
                    : 'hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#451A03] text-amber-200 flex items-center justify-center font-bold text-xs">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#112216]">INDIVIDUAL</div>
                    <div className="text-[10px] text-[#526357]">Lê Bảo Quốc (HNWI)</div>
                  </div>
                </div>
                <span className="text-[9px] bg-amber-100 text-[#B45309] font-bold px-1.5 py-0.5 rounded">
                  Wealth
                </span>
              </button>
            </div>

            {/* Guest / Unauthenticated Mode - Test Auth Guard */}
            <div className="p-1 border-t border-[#E2E8F0] mt-1 space-y-1">
              <button
                type="button"
                id="btn-switch-to-guest"
                onClick={() => {
                  switchDemoSegment('GUEST');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded text-left transition ${
                  !isAuthenticated
                    ? 'bg-red-50 border border-red-300 text-red-800'
                    : 'hover:bg-red-50/50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Chưa đăng nhập (Guest)</div>
                    <div className="text-[10px] text-[#64748B]">Kiểm tra chặn tab Tài khoản</div>
                  </div>
                </div>
                <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                  Auth Guard
                </span>
              </button>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded text-left hover:bg-slate-100 text-slate-600 text-xs font-semibold transition"
                >
                  <LogOut className="w-4 h-4 text-slate-500" />
                  <span>Đăng xuất khỏi tài khoản</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
