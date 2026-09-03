import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LegalArticle, 
  Author,
  PushNotificationItem, 
  Voucher, 
  UserVoucherItem, 
  UserProfile, 
  ConsultationLead, 
  AdminStats, 
  Language, 
  LegalCategory,
  NotificationPreferences,
  UserVoucherStatus,
  LogoConfig,
  LogoColorTheme,
  AdminRole,
  FirmInfo,
  CustomerSegment
} from '../types';
import { 
  INITIAL_ARTICLES, 
  INITIAL_PUSH_NOTIFICATIONS, 
  INITIAL_VOUCHERS, 
  INITIAL_USER_VOUCHERS, 
  INITIAL_USER_PROFILE, 
  INITIAL_LEADS, 
  INITIAL_ADMIN_STATS,
  INITIAL_AUTHORS,
  DEFAULT_FIRM_INFO,
  DEMO_ACCOUNTS
} from '../data/initialData';

export type AppViewMode = 'mobile' | 'admin' | 'split';
export type MobileTab = 'insights' | 'vouchers' | 'notifications' | 'profile';
export type AdminTab = 'dashboard' | 'analytics' | 'articles' | 'lawyers' | 'push' | 'vouchers' | 'leads';

interface AppContextType {
  // Global & View Mode
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  mobileTab: MobileTab;
  setMobileTab: (tab: MobileTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Lawyers & Authors Management
  authors: Author[];
  updateAuthor: (author: Author) => void;
  addAuthor: (newAuthor: Omit<Author, 'id'>) => Author;
  deleteAuthor: (id: string) => void;
  resetAuthorsToDefault: () => void;
  isLawyerEditModalOpen: boolean;
  setIsLawyerEditModalOpen: (open: boolean) => void;
  editingLawyer: Author | null;
  openLawyerEditModal: (lawyer?: Author | null) => void;
  closeLawyerEditModal: () => void;
  
  // Articles
  articles: LegalArticle[];
  selectedArticle: LegalArticle | null;
  setSelectedArticle: (article: LegalArticle | null) => void;
  viewingPdfArticle: LegalArticle | null;
  setViewingPdfArticle: (article: LegalArticle | null) => void;
  toggleBookmarkArticle: (articleId: string) => void;
  addArticle: (newArticle: Omit<LegalArticle, 'id' | 'viewsCount'>) => void;
  updateArticle: (article: LegalArticle) => void;
  deleteArticle: (id: string) => void;
  
  // Notifications & Push
  notifications: PushNotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  sendPushNotification: (push: Omit<PushNotificationItem, 'id' | 'createdAt' | 'isRead' | 'sentCount' | 'openCount'>) => void;
  activeToastPush: PushNotificationItem | null;
  dismissToastPush: () => void;
  updateNotificationPrefs: (prefs: NotificationPreferences) => void;
  
  // Vouchers & Wallet
  vouchers: Voucher[];
  userVouchers: UserVoucherItem[];
  selectedVoucherForQr: UserVoucherItem | null;
  setSelectedVoucherForQr: (voucher: UserVoucherItem | null) => void;
  redeemVoucherCode: (code: string) => { success: boolean; message: string; voucher?: UserVoucherItem };
  verifyAndUseVoucher: (voucherCodeOrId: string, orderRef?: string) => { success: boolean; message: string; voucher?: UserVoucherItem };
  createVoucher: (voucher: Omit<Voucher, 'id' | 'usedCount'>) => void;
  
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Leads & Consultations
  leads: ConsultationLead[];
  createLead: (leadData: Omit<ConsultationLead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: ConsultationLead['status'], assignedLawyer?: string, notes?: string, segment?: CustomerSegment) => void;
  updateLead: (id: string, updates: Partial<ConsultationLead>) => void;
  
  // Admin & Stats
  adminStats: AdminStats;
  
  // Navigation helper (Deep linking)
  handleDeepLink: (type: string, targetId?: string) => void;
  
  // Booking modal open trigger
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  preselectedServiceForBooking: LegalCategory | null;
  setPreselectedServiceForBooking: (category: LegalCategory | null) => void;
  preselectedVoucherCodeForBooking: string | null;
  setPreselectedVoucherCodeForBooking: (code: string | null) => void;

  // DIMAC Logo & Brand Configuration
  logoConfig: LogoConfig;
  updateLogoConfig: (config: Partial<LogoConfig>) => void;
  resetLogoToDefault: () => void;
  isLogoModalOpen: boolean;
  setIsLogoModalOpen: (open: boolean) => void;

  // DIMAC Firm / Office Information Configuration
  firmInfo: FirmInfo;
  updateFirmInfo: (info: Partial<FirmInfo>) => void;
  resetFirmInfoToDefault: () => void;
  isFirmInfoModalOpen: boolean;
  setIsFirmInfoModalOpen: (open: boolean) => void;
  openFirmInfoModal: () => void;
  closeFirmInfoModal: () => void;

  // Auth Guard & Customer Segmentation
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (profileOrCredentials?: Partial<UserProfile>) => void;
  logout: () => void;
  switchDemoSegment: (segment: CustomerSegment | 'GUEST') => void;
  currentUserSegment: CustomerSegment | null;
  filteredUserVouchers: UserVoucherItem[];
  allSegmentVouchers: Voucher[];
}

export const DEFAULT_LOGO_CONFIG: LogoConfig = {
  customImageUrl: '/assets/dimac-logo-official.svg',
  brandName: 'DIMAC',
  tagline: 'ASIA PREMIER LAWYERS',
  showTagline: true,
  colorTheme: 'official',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [viewMode, setViewMode] = useState<AppViewMode>('mobile');
  const [mobileTab, setMobileTab] = useState<MobileTab>('insights');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<AdminRole>('admin');
  const [language, setLanguage] = useState<Language>('vi');

  // DIMAC Logo & Brand Customizer
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(() => {
    const local = localStorage.getItem('dimac_logo_config');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (!parsed.customImageUrl) {
          parsed.customImageUrl = '/assets/dimac-logo-official.svg';
        }
        if (!parsed.tagline) {
          parsed.tagline = 'ASIA PREMIER LAWYERS';
        }
        return { ...DEFAULT_LOGO_CONFIG, ...parsed };
      } catch (e) {
        return DEFAULT_LOGO_CONFIG;
      }
    }
    return DEFAULT_LOGO_CONFIG;
  });
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  // DIMAC Firm Information State
  const [firmInfo, setFirmInfo] = useState<FirmInfo>(() => {
    const local = localStorage.getItem('dimac_firm_info');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return { ...DEFAULT_FIRM_INFO, ...parsed };
      } catch (e) {
        return DEFAULT_FIRM_INFO;
      }
    }
    return DEFAULT_FIRM_INFO;
  });
  const [isFirmInfoModalOpen, setIsFirmInfoModalOpen] = useState(false);

  const updateFirmInfo = (newInfo: Partial<FirmInfo>) => {
    setFirmInfo(prev => ({ ...prev, ...newInfo }));
  };

  const resetFirmInfoToDefault = () => {
    setFirmInfo(DEFAULT_FIRM_INFO);
    localStorage.removeItem('dimac_firm_info');
  };

  const openFirmInfoModal = () => setIsFirmInfoModalOpen(true);
  const closeFirmInfoModal = () => setIsFirmInfoModalOpen(false);

  // Lawyers & Authors Management State
  const [authors, setAuthors] = useState<Author[]>(() => {
    const local = localStorage.getItem('dimac_authors');
    if (local) {
      try {
        const parsed: Author[] = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with INITIAL_AUTHORS to keep any updated names / positions
          return parsed.map(p => {
            const init = INITIAL_AUTHORS.find(ia => ia.id === p.id);
            if (init) {
              return {
                ...init,
                ...p,
                name: p.name || init.name,
                role: p.role || init.role,
                position: p.position || init.position,
                avatar: p.avatar || init.avatar,
                bio: p.bio || init.bio,
              };
            }
            return p;
          });
        }
      } catch (e) {
        return INITIAL_AUTHORS;
      }
    }
    return INITIAL_AUTHORS;
  });

  const [isLawyerEditModalOpen, setIsLawyerEditModalOpen] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Author | null>(null);

  const openLawyerEditModal = (lawyer?: Author | null) => {
    setEditingLawyer(lawyer || null);
    setIsLawyerEditModalOpen(true);
  };

  const closeLawyerEditModal = () => {
    setIsLawyerEditModalOpen(false);
    setEditingLawyer(null);
  };

  const updateAuthor = (updated: Author) => {
    setAuthors(prev => prev.map(a => (a.id === updated.id ? updated : a)));

    // Synchronize articles authored by this lawyer
    setArticles(prevArticles =>
      prevArticles.map(art => {
        if (art.author && art.author.id === updated.id) {
          return {
            ...art,
            author: updated,
          };
        }
        return art;
      })
    );

    // Synchronize selected article if open
    setSelectedArticle(prev => {
      if (prev && prev.author && prev.author.id === updated.id) {
        return {
          ...prev,
          author: updated,
        };
      }
      return prev;
    });
  };

  const addAuthor = (newAuthorData: Omit<Author, 'id'>): Author => {
    const newAuthor: Author = {
      ...newAuthorData,
      id: `lawyer-${Date.now()}`,
    };
    setAuthors(prev => [...prev, newAuthor]);
    return newAuthor;
  };

  const deleteAuthor = (id: string) => {
    setAuthors(prev => prev.filter(a => a.id !== id));
  };

  const resetAuthorsToDefault = () => {
    setAuthors(INITIAL_AUTHORS);
    localStorage.removeItem('dimac_authors');
  };

  const [articles, setArticles] = useState<LegalArticle[]>(() => {
    const local = localStorage.getItem('dimac_articles');
    return local ? JSON.parse(local) : INITIAL_ARTICLES;
  });
  
  const [selectedArticle, setSelectedArticle] = useState<LegalArticle | null>(null);
  const [viewingPdfArticle, setViewingPdfArticle] = useState<LegalArticle | null>(null);
  
  const [notifications, setNotifications] = useState<PushNotificationItem[]>(() => {
    const local = localStorage.getItem('dimac_notifications');
    return local ? JSON.parse(local) : INITIAL_PUSH_NOTIFICATIONS;
  });
  
  const [activeToastPush, setActiveToastPush] = useState<PushNotificationItem | null>(null);
  
  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    const local = localStorage.getItem('dimac_vouchers');
    return local ? JSON.parse(local) : INITIAL_VOUCHERS;
  });
  
  const [userVouchers, setUserVouchers] = useState<UserVoucherItem[]>(() => {
    const local = localStorage.getItem('dimac_user_vouchers');
    return local ? JSON.parse(local) : INITIAL_USER_VOUCHERS;
  });
  
  const [selectedVoucherForQr, setSelectedVoucherForQr] = useState<UserVoucherItem | null>(null);
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const local = localStorage.getItem('dimac_user_profile');
    return local ? JSON.parse(local) : INITIAL_USER_PROFILE;
  });
  
  const [leads, setLeads] = useState<ConsultationLead[]>(() => {
    const local = localStorage.getItem('dimac_leads');
    if (local) {
      try {
        const parsed: ConsultationLead[] = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(lead => {
            if (!lead.customerSegment) {
              const init = INITIAL_LEADS.find(il => il.id === lead.id);
              return { ...lead, customerSegment: init?.customerSegment || 'ENTERPRISE' };
            }
            return lead;
          });
        }
      } catch (e) {}
    }
    return INITIAL_LEADS;
  });
  
  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);

  // Authentication & Customer Segmentation State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const local = localStorage.getItem('dimac_auth_status');
    return local !== 'false';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync auth status
  useEffect(() => {
    localStorage.setItem('dimac_auth_status', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const currentUserSegment: CustomerSegment | null = isAuthenticated ? (userProfile.segment || 'ENTERPRISE') : null;

  const login = (profileOrCredentials?: Partial<UserProfile>) => {
    setIsAuthenticated(true);
    if (profileOrCredentials) {
      setUserProfile(prev => ({ ...prev, ...profileOrCredentials }));
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(false);
    if (mobileTab === 'profile') {
      setMobileTab('insights');
    }
    setActiveToastPush({
      id: `toast-auth-${Date.now()}`,
      title: 'Đã đăng xuất',
      body: 'Bạn đã đăng xuất an toàn khỏi tài khoản Khách hàng DIMAC.',
      type: 'breaking_alert',
      targetAudience: 'all',
      createdAt: new Date().toISOString(),
      isRead: true,
      sentCount: 1,
      openCount: 1
    });
  };

  const switchDemoSegment = (segment: CustomerSegment | 'GUEST') => {
    if (segment === 'GUEST') {
      setIsAuthenticated(false);
      setIsAuthModalOpen(true);
      return;
    }

    const demoAcc = DEMO_ACCOUNTS[segment];
    if (demoAcc) {
      setUserProfile(demoAcc);
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);

      // Populate user's wallet with relevant vouchers for this segment
      const relevantVouchers = vouchers.filter(v => 
        !v.targetSegments || 
        v.targetSegments.includes('ALL') || 
        v.targetSegments.includes(segment)
      );

      setUserVouchers(prev => {
        const existingVoucherIds = new Set(prev.map(uv => uv.voucherId));
        const newItems: UserVoucherItem[] = relevantVouchers
          .filter(v => !existingVoucherIds.has(v.id))
          .map(v => ({
            id: `uv-${v.id}-${Date.now()}`,
            voucherId: v.id,
            voucher: v,
            status: 'AVAILABLE' as UserVoucherStatus,
            claimedAt: new Date().toISOString().split('T')[0]
          }));
        return [...prev, ...newItems];
      });
    }
  };

  // Segment-filtered Vouchers
  const allSegmentVouchers = vouchers.filter(v => {
    if (!currentUserSegment) {
      return !v.targetSegments || v.targetSegments.includes('ALL');
    }
    return !v.targetSegments || v.targetSegments.includes('ALL') || v.targetSegments.includes(currentUserSegment);
  });

  const filteredUserVouchers = userVouchers.filter(uv => {
    if (!currentUserSegment) {
      return !uv.voucher.targetSegments || uv.voucher.targetSegments.includes('ALL');
    }
    return !uv.voucher.targetSegments || 
      uv.voucher.targetSegments.includes('ALL') || 
      uv.voucher.targetSegments.includes(currentUserSegment);
  });
  
  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceForBooking, setPreselectedServiceForBooking] = useState<LegalCategory | null>(null);
  const [preselectedVoucherCodeForBooking, setPreselectedVoucherCodeForBooking] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dimac_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('dimac_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('dimac_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('dimac_user_vouchers', JSON.stringify(userVouchers));
  }, [userVouchers]);

  useEffect(() => {
    localStorage.setItem('dimac_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('dimac_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('dimac_authors', JSON.stringify(authors));
  }, [authors]);

  useEffect(() => {
    localStorage.setItem('dimac_logo_config', JSON.stringify(logoConfig));
  }, [logoConfig]);

  useEffect(() => {
    localStorage.setItem('dimac_firm_info', JSON.stringify(firmInfo));
  }, [firmInfo]);

  const updateLogoConfig = (newConfig: Partial<LogoConfig>) => {
    setLogoConfig(prev => ({ ...prev, ...newConfig }));
  };

  const resetLogoToDefault = () => {
    setLogoConfig(DEFAULT_LOGO_CONFIG);
  };

  // Derived unread count
  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  // Article Actions
  const toggleBookmarkArticle = (articleId: string) => {
    setUserProfile(prev => {
      const isSaved = prev.savedArticleIds.includes(articleId);
      const newSaved = isSaved 
        ? prev.savedArticleIds.filter(id => id !== articleId)
        : [...prev.savedArticleIds, articleId];
      return { ...prev, savedArticleIds: newSaved };
    });
  };

  const addArticle = (newArticleData: Omit<LegalArticle, 'id' | 'viewsCount'>) => {
    const newId = `art-${Date.now()}`;
    const newArticle: LegalArticle = {
      ...newArticleData,
      id: newId,
      viewsCount: 1
    };
    setArticles(prev => [newArticle, ...prev]);
    setAdminStats(prev => ({ ...prev, totalArticles: prev.totalArticles + 1 }));
  };

  const updateArticle = (updated: LegalArticle) => {
    setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
    if (selectedArticle?.id === updated.id) {
      setSelectedArticle(updated);
    }
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    if (selectedArticle?.id === id) setSelectedArticle(null);
    setAdminStats(prev => ({ ...prev, totalArticles: Math.max(0, prev.totalArticles - 1) }));
  };

  // Notification Actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const sendPushNotification = (pushData: Omit<PushNotificationItem, 'id' | 'createdAt' | 'isRead' | 'sentCount' | 'openCount'>) => {
    const newId = `push-${Date.now()}`;
    
    // Estimate recipients based on audience
    let sentCount = 12000;
    if (pushData.targetAudience === 'vip_clients') sentCount = 850;
    else if (pushData.targetAudience === 'enterprise_leads') sentCount = 4200;
    else if (pushData.targetAudience === 'category_interest') sentCount = 3100;

    const newPush: PushNotificationItem = {
      ...pushData,
      id: newId,
      createdAt: new Date().toISOString(),
      isRead: false,
      sentCount,
      openCount: 0
    };

    setNotifications(prev => [newPush, ...prev]);
    setAdminStats(prev => ({ ...prev, totalPushSent: prev.totalPushSent + sentCount }));

    // Show simulated in-app Toast banner on mobile view
    setActiveToastPush(newPush);

    // If push is a promotion with voucher, auto-add voucher to wallet if applicable
    if (pushData.type === 'promotion_alert' && pushData.deepLink?.type === 'voucher' && pushData.deepLink.targetId) {
      const targetV = vouchers.find(v => v.id === pushData.deepLink?.targetId);
      if (targetV && !userVouchers.some(uv => uv.voucherId === targetV.id)) {
        const newUserVoucher: UserVoucherItem = {
          id: `uv-${Date.now()}`,
          voucherId: targetV.id,
          voucher: targetV,
          status: 'AVAILABLE',
          claimedAt: new Date().toISOString().split('T')[0]
        };
        setUserVouchers(prev => [newUserVoucher, ...prev]);
      }
    }
  };

  const dismissToastPush = () => {
    setActiveToastPush(null);
  };

  const updateNotificationPrefs = (prefs: NotificationPreferences) => {
    setUserProfile(prev => ({ ...prev, notificationPrefs: prefs }));
  };

  // Voucher Actions
  const redeemVoucherCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const foundVoucher = vouchers.find(v => v.code.toUpperCase() === cleanCode);
    
    if (!foundVoucher) {
      return { success: false, message: 'Mã ưu đãi không tồn tại hoặc đã hết hạn.' };
    }

    // Check if expired
    const isExpired = new Date(foundVoucher.endDate) < new Date();
    if (isExpired) {
      return { success: false, message: 'Mã ưu đãi này đã hết hạn sử dụng.' };
    }

    // Customer Segmentation Check: Block if voucher does not match user's segment
    if (!isAuthenticated) {
      return {
        success: false,
        message: 'Vui lòng đăng nhập tài khoản Thân chủ DIMAC để áp dụng và quy đổi mã ưu đãi này.'
      };
    }

    const userSegment = userProfile.segment || 'ENTERPRISE';
    const isSegmentAllowed = !foundVoucher.targetSegments || 
      foundVoucher.targetSegments.includes('ALL') || 
      foundVoucher.targetSegments.includes(userSegment);

    if (!isSegmentAllowed) {
      const allowedNames = (foundVoucher.targetSegments || [])
        .filter(s => s !== 'ALL')
        .map(s => {
          if (s === 'ENTERPRISE') return 'Doanh nghiệp / Tập đoàn (ENTERPRISE)';
          if (s === 'SME') return 'Doanh nghiệp vừa & nhỏ (SME)';
          if (s === 'RETAINER_VIP') return 'Thân chủ Thường xuyên VIP (RETAINER_VIP)';
          if (s === 'INDIVIDUAL') return 'Cá nhân / Nhà đầu tư (INDIVIDUAL)';
          return s;
        })
        .join(', ');

      return {
        success: false,
        message: `Mã ưu đãi này chỉ áp dụng độc quyền cho phân khúc ${allowedNames}. Tài khoản hiện tại của quý khách thuộc phân khúc "${userSegment}".`
      };
    }

    // Check if already in user wallet
    const existing = userVouchers.find(uv => uv.voucherId === foundVoucher.id);
    if (existing) {
      if (existing.status === 'USED') {
        return { success: false, message: 'Mã ưu đãi này đã được bạn sử dụng trước đó.' };
      }
      return { success: false, message: 'Mã ưu đãi này đã có sẵn trong Ví Voucher của bạn.' };
    }

    const newUserVoucher: UserVoucherItem = {
      id: `uv-${Date.now()}`,
      voucherId: foundVoucher.id,
      voucher: foundVoucher,
      status: 'AVAILABLE',
      claimedAt: new Date().toISOString().split('T')[0]
    };

    setUserVouchers(prev => [newUserVoucher, ...prev]);
    return { 
      success: true, 
      message: `Đã thêm thành công voucher "${foundVoucher.code}" vào Ví của bạn!`,
      voucher: newUserVoucher 
    };
  };

  const verifyAndUseVoucher = (voucherCodeOrId: string, orderRef?: string) => {
    const target = userVouchers.find(
      uv => uv.voucher.code.toUpperCase() === voucherCodeOrId.trim().toUpperCase() || 
            uv.id === voucherCodeOrId || 
            uv.voucherId === voucherCodeOrId
    );

    if (!target) {
      return { success: false, message: 'Không tìm thấy voucher trong hệ thống.' };
    }

    if (target.status === 'USED') {
      return { success: false, message: `Voucher đã được đối soát & sử dụng vào lúc ${target.usedAt || 'trước đó'}.` };
    }

    if (target.status === 'EXPIRED') {
      return { success: false, message: 'Voucher đã hết hạn hiệu lực.' };
    }

    const updatedUserVoucher: UserVoucherItem = {
      ...target,
      status: 'USED',
      usedAt: new Date().toLocaleString('vi-VN'),
      verifiedBy: 'DIMAC Lawyer/Staff',
      orderRef: orderRef || `DIMAC-SRV-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setUserVouchers(prev => prev.map(uv => uv.id === target.id ? updatedUserVoucher : uv));
    
    // Update voucher total used in system
    setVouchers(prev => prev.map(v => v.id === target.voucherId ? { ...v, usedCount: v.usedCount + 1 } : v));
    setAdminStats(prev => ({ ...prev, totalVouchersUsed: prev.totalVouchersUsed + 1 }));

    if (selectedVoucherForQr?.id === target.id) {
      setSelectedVoucherForQr(updatedUserVoucher);
    }

    return { 
      success: true, 
      message: `Đã xác nhận & đối soát thành công mã "${target.voucher.code}". Trạng thái chuyển thành ĐÃ SỬ DỤNG.`,
      voucher: updatedUserVoucher 
    };
  };

  const createVoucher = (newVoucherData: Omit<Voucher, 'id' | 'usedCount'>) => {
    const newId = `vouch-${Date.now()}`;
    const newV: Voucher = {
      ...newVoucherData,
      id: newId,
      usedCount: 0
    };
    setVouchers(prev => [newV, ...prev]);
    setAdminStats(prev => ({ ...prev, totalVouchersIssued: prev.totalVouchersIssued + newV.totalIssued }));

    // Auto-provision to current user's wallet if segment matches
    if (currentUserSegment) {
      const isApplicable = !newV.targetSegments || 
        newV.targetSegments.includes('ALL') || 
        newV.targetSegments.includes(currentUserSegment);

      if (isApplicable) {
        setUserVouchers(prev => {
          if (!prev.some(uv => uv.voucherId === newV.id)) {
            const newUserVoucher: UserVoucherItem = {
              id: `uv-${newV.id}-${Date.now()}`,
              voucherId: newV.id,
              voucher: newV,
              status: 'AVAILABLE',
              claimedAt: new Date().toISOString().split('T')[0]
            };
            return [newUserVoucher, ...prev];
          }
          return prev;
        });
      }
    }
  };

  // User Profile
  const updateUserProfile = (profilePartial: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profilePartial }));
  };

  // Lead / Consultation Booking
  const createLead = (leadData: Omit<ConsultationLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: ConsultationLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
    setAdminStats(prev => ({ ...prev, activeLeadsCount: prev.activeLeadsCount + 1 }));
  };

  const updateLeadStatus = (id: string, status: ConsultationLead['status'], assignedLawyer?: string, notes?: string, segment?: CustomerSegment) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status,
          ...(assignedLawyer !== undefined ? { assignedLawyerName: assignedLawyer } : {}),
          ...(notes !== undefined ? { notes } : {}),
          ...(segment !== undefined ? { customerSegment: segment } : {})
        };
      }
      return l;
    }));
  };

  const updateLead = (id: string, updates: Partial<ConsultationLead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  // Deep Link Handler
  const handleDeepLink = (type: string, targetId?: string) => {
    if (type === 'article' && targetId) {
      const art = articles.find(a => a.id === targetId);
      if (art) {
        setSelectedArticle(art);
        setMobileTab('insights');
      }
    } else if (type === 'voucher') {
      setMobileTab('vouchers');
      if (targetId) {
        const uv = userVouchers.find(v => v.voucherId === targetId || v.id === targetId);
        if (uv) {
          setSelectedVoucherForQr(uv);
        }
      }
    } else if (type === 'consultation') {
      setMobileTab('profile');
      setIsBookingModalOpen(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        mobileTab,
        setMobileTab,
        adminTab,
        setAdminTab,
        currentRole,
        setCurrentRole,
        language,
        setLanguage,

        // Lawyers & Authors Management
        authors,
        updateAuthor,
        addAuthor,
        deleteAuthor,
        resetAuthorsToDefault,
        isLawyerEditModalOpen,
        setIsLawyerEditModalOpen,
        editingLawyer,
        openLawyerEditModal,
        closeLawyerEditModal,
        
        articles,
        selectedArticle,
        setSelectedArticle,
        viewingPdfArticle,
        setViewingPdfArticle,
        toggleBookmarkArticle,
        addArticle,
        updateArticle,
        deleteArticle,
        
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendPushNotification,
        activeToastPush,
        dismissToastPush,
        updateNotificationPrefs,
        
        vouchers,
        userVouchers,
        selectedVoucherForQr,
        setSelectedVoucherForQr,
        redeemVoucherCode,
        verifyAndUseVoucher,
        createVoucher,
        
        userProfile,
        updateUserProfile,
        
        leads,
        createLead,
        updateLeadStatus,
        updateLead,
        
        adminStats,
        handleDeepLink,

        isBookingModalOpen,
        setIsBookingModalOpen,
        preselectedServiceForBooking,
        setPreselectedServiceForBooking,
        preselectedVoucherCodeForBooking,
        setPreselectedVoucherCodeForBooking,

        // Logo & Brand Customizer
        logoConfig,
        updateLogoConfig,
        resetLogoToDefault,
        isLogoModalOpen,
        setIsLogoModalOpen,

        // DIMAC Firm Info Configuration
        firmInfo,
        updateFirmInfo,
        resetFirmInfoToDefault,
        isFirmInfoModalOpen,
        setIsFirmInfoModalOpen,
        openFirmInfoModal,
        closeFirmInfoModal,

        // Auth Guard & Customer Segmentation
        isAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        switchDemoSegment,
        currentUserSegment,
        filteredUserVouchers,
        allSegmentVouchers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
