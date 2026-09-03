import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DimacLogo } from './DimacLogo';
import { CustomerSegment } from '../../types';
import { 
  X, 
  Lock, 
  Mail, 
  KeyRound, 
  ShieldCheck, 
  Building, 
  Building2, 
  Sparkles, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Eye,
  EyeOff
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    login, 
    switchDemoSegment,
    setMobileTab,
    language
  } = useApp();

  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('tuan.tran@vanguard-corp.vn');
  const [password, setPassword] = useState('DimacLegal@2025');
  const [emailOtp, setEmailOtp] = useState('tuan.tran@vanguard-corp.vn');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Reset countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  if (!isAuthModalOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!email.trim() || !password.trim()) {
      setLoginError('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Determine segment from email or default to ENTERPRISE
      let seg: CustomerSegment = 'ENTERPRISE';
      if (email.includes('ecotrans') || email.includes('sme')) seg = 'SME';
      else if (email.includes('k-holding') || email.includes('vip')) seg = 'RETAINER_VIP';
      else if (email.includes('gmail') || email.includes('indiv')) seg = 'INDIVIDUAL';

      switchDemoSegment(seg);
      setMobileTab('profile');
    }, 600);
  };

  const handleSendOtp = () => {
    if (!emailOtp.trim() || !emailOtp.includes('@')) {
      setLoginError('Vui lòng nhập địa chỉ Email hợp lệ để nhận mã xác thực OTP.');
      return;
    }
    setLoginError('');
    setIsOtpSent(true);
    setOtpCountdown(45);
    setOtpCode('682914'); // Auto fill convenient mock OTP
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setLoginError('Mã OTP xác thực không hợp lệ.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let seg: CustomerSegment = 'ENTERPRISE';
      if (emailOtp.includes('ecotrans') || emailOtp.includes('sme')) seg = 'SME';
      else if (emailOtp.includes('k-holding') || emailOtp.includes('vip')) seg = 'RETAINER_VIP';
      else if (emailOtp.includes('gmail') || emailOtp.includes('indiv')) seg = 'INDIVIDUAL';

      switchDemoSegment(seg);
      setMobileTab('profile');
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switchDemoSegment('ENTERPRISE');
      setMobileTab('profile');
    }, 700);
  };

  const handleQuickSegmentLogin = (seg: CustomerSegment) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switchDemoSegment(seg);
      setMobileTab('profile');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white border border-[#CBD5E1] shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Header with DIMAC Branding */}
        <div className="bg-gradient-to-r from-[#0A2314] via-[#165A31] to-[#0D2E1A] p-5 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-white p-1.5 flex items-center justify-center shadow-md">
              <DimacLogo variant="symbol" size="xs" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                CỔNG BẢO MẬT KHÁCH HÀNG & THÂN CHỦ
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                DIMAC Law Firm Portal
              </h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 font-light leading-relaxed">
            Đăng nhập để quản lý hợp đồng pháp lý thường xuyên, hồ sơ vụ việc và ví ưu đãi dành riêng cho doanh nghiệp của bạn.
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-[#112216]">
          {/* Auth Tab Mode Switcher */}
          <div className="grid grid-cols-2 bg-[#F1F4F2] p-1 rounded-lg border border-[#DCE5DF]">
            <button
              type="button"
              onClick={() => { setAuthMode('password'); setLoginError(''); }}
              className={`py-2 text-xs font-bold rounded transition text-center ${
                authMode === 'password'
                  ? 'bg-[#1B5E34] text-white shadow-xs'
                  : 'text-[#526357] hover:text-[#112216]'
              }`}
            >
              Email & Mật khẩu
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('otp'); setLoginError(''); }}
              className={`py-2 text-xs font-bold rounded transition text-center ${
                authMode === 'otp'
                  ? 'bg-[#1B5E34] text-white shadow-xs'
                  : 'text-[#526357] hover:text-[#112216]'
              }`}
            >
              Mã OTP Email
            </button>
          </div>

          {loginError && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <Lock className="w-4 h-4 text-red-500 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form: Password */}
          {authMode === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#112216] mb-1">
                  Email Thân chủ / Doanh nghiệp:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#CBD5E1] rounded focus:ring-2 focus:ring-[#1B5E34] focus:border-[#1B5E34] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#112216]">
                    Mật khẩu:
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Liên hệ Ban Quản trị DIMAC (+84 28 3910 3888) hoặc sử dụng tính năng Đăng nhập Demo bên dưới.'); }} className="text-[11px] text-[#1B5E34] hover:underline font-medium">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-9 py-2 text-xs border border-[#CBD5E1] rounded focus:ring-2 focus:ring-[#1B5E34] focus:border-[#1B5E34] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#64748B] hover:text-[#112216]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#1B5E34] hover:bg-[#154b2a] text-white text-xs uppercase font-bold tracking-wider rounded transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Đăng nhập Cổng Thân chủ</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Form: OTP */}
          {authMode === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#112216] mb-1">
                  Email nhận mã xác thực OTP:
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="name@company.com hoặc email..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-[#CBD5E1] rounded focus:ring-2 focus:ring-[#1B5E34] outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpCountdown > 0}
                    className="px-3 py-2 bg-[#EAF4ED] border border-[#1B5E34] text-[#1B5E34] hover:bg-[#DCEDE0] text-xs font-bold rounded transition shrink-0 disabled:opacity-50"
                  >
                    {otpCountdown > 0 ? `${otpCountdown}s` : 'Gửi mã OTP'}
                  </button>
                </div>
              </div>

              {isOtpSent && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#112216]">
                      Mã xác thực 6 chữ số:
                    </label>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
                      Mã demo: 682914
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="682914"
                    className="w-full text-center tracking-[0.4em] font-mono text-base font-bold py-2 border border-[#1B5E34] rounded bg-emerald-50/40 focus:ring-2 focus:ring-[#1B5E34] outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isOtpSent}
                className="w-full py-2.5 bg-[#1B5E34] hover:bg-[#154b2a] text-white text-xs uppercase font-bold tracking-wider rounded transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Xác nhận & Đăng nhập</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social / Google Quick Sign-In */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-[#64748B] font-semibold">Hoặc đăng nhập nhanh</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-3 bg-white border border-[#CBD5E1] hover:bg-[#F8FAF9] text-[#1E293B] text-xs font-semibold rounded transition flex items-center justify-center gap-2.5 shadow-2xs hover:border-[#94A3B8]"
          >
            {/* Standard Google Multi-color G icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Tiếp tục bằng tài khoản Google Workspace</span>
          </button>

          {/* Quick Demo Segment Switcher in Modal */}
          <div className="pt-3 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#1B5E34] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#A0322D]" />
                Demo Role Switcher (Chọn tài khoản mẫu)
              </span>
              <span className="text-[9px] text-[#64748B]">1-Click Test</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSegmentLogin('ENTERPRISE')}
                className="p-2 border border-[#CBD5E1] hover:border-[#1B5E34] bg-[#F8FAF9] hover:bg-[#EAF4ED] rounded text-left transition group"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#1B5E34]" />
                  <span className="text-[11px] font-bold text-[#112216] group-hover:text-[#1B5E34]">
                    ENTERPRISE
                  </span>
                </div>
                <div className="text-[10px] text-[#526357] line-clamp-1">Tập đoàn Vanguard (M&A)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSegmentLogin('SME')}
                className="p-2 border border-[#CBD5E1] hover:border-[#2B6CB0] bg-[#F8FAF9] hover:bg-[#EBF8FF] rounded text-left transition group"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Building className="w-3.5 h-3.5 text-[#2B6CB0]" />
                  <span className="text-[11px] font-bold text-[#112216] group-hover:text-[#2B6CB0]">
                    SME
                  </span>
                </div>
                <div className="text-[10px] text-[#526357] line-clamp-1">EcoTrans Logistics (CEO)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSegmentLogin('RETAINER_VIP')}
                className="p-2 border border-[#CBD5E1] hover:border-[#7E22CE] bg-[#F8FAF9] hover:bg-[#FAF5FF] rounded text-left transition group"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7E22CE]" />
                  <span className="text-[11px] font-bold text-[#112216] group-hover:text-[#7E22CE]">
                    RETAINER VIP
                  </span>
                </div>
                <div className="text-[10px] text-[#526357] line-clamp-1">Khang Dien Holding (HĐQT)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSegmentLogin('INDIVIDUAL')}
                className="p-2 border border-[#CBD5E1] hover:border-[#B45309] bg-[#F8FAF9] hover:bg-[#FFFBEB] rounded text-left transition group"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#B45309]" />
                  <span className="text-[11px] font-bold text-[#112216] group-hover:text-[#B45309]">
                    INDIVIDUAL
                  </span>
                </div>
                <div className="text-[10px] text-[#526357] line-clamp-1">Nhà đầu tư HNWI (Cá nhân)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer Notice */}
        <div className="bg-[#F8FAF9] px-5 py-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B]">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#1B5E34]" />
            Bảo mật SSL 256-bit chuẩn Hãng Luật
          </span>
          <span>Luật Luật sư số 65/2006/QH11</span>
        </div>
      </div>
    </div>
  );
};
