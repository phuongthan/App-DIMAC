/**
 * DIMAC Legal App & CMS Portal Data Types
 * SRS / BRD Compliance
 */

export type Language = 'vi' | 'en';

export type LegalCategory = 
  | 'M&A' 
  | 'Đầu tư' 
  | 'Bất động sản' 
  | 'Năng lượng' 
  | 'Tranh chấp & Tố tụng' 
  | 'Lao động' 
  | 'Thuế & Tài chính' 
  | 'Doanh nghiệp';

export type ArticleStatus = 'published' | 'draft' | 'scheduled';

export interface Author {
  id: string;
  name: string;
  role: string;
  position?: string;
  avatar: string;
  email?: string;
  phone?: string;
  isPartner?: boolean;
  bio?: string;
}

export interface PdfAttachment {
  id: string;
  title: string;
  fileSize: string; // e.g. "2.4 MB"
  pageCount: number;
  docNumber: string; // e.g. "Nghị định số 10/2024/NĐ-CP"
  publishedYear: number;
  downloadUrl: string;
  summaryText?: string;
}

export interface LegalArticle {
  id: string;
  title_vi: string;
  title_en: string;
  category: LegalCategory;
  tags: string[];
  summary_vi: string;
  summary_en: string;
  content_vi: string;
  content_en: string;
  author: Author;
  publishDate: string; // ISO or YYYY-MM-DD
  viewsCount: number;
  isFlashAlert: boolean;
  status: ArticleStatus;
  scheduledFor?: string;
  pdfAttachment?: PdfAttachment;
  estimatedReadTime: string; // e.g. "4 phút đọc"
}

export type NotificationType = 
  | 'breaking_alert' 
  | 'weekly_digest' 
  | 'promotion_alert' 
  | 'personal_message';

export type TargetAudience = 
  | 'all' 
  | 'enterprise_leads' 
  | 'vip_clients' 
  | 'in_house_counsel' 
  | 'category_interest';

export interface DeepLink {
  type: 'article' | 'voucher' | 'consultation' | 'hotline';
  targetId?: string;
  label?: string;
}

export interface PushNotificationItem {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  targetAudience: TargetAudience;
  targetCategory?: LegalCategory;
  deepLink?: DeepLink;
  createdAt: string;
  scheduledAt?: string;
  isRead: boolean;
  sentCount: number;
  openCount: number;
}

export interface NotificationPreferences {
  breakingAlerts: boolean;
  weeklyDigest: boolean;
  promotions: boolean;
  consultationUpdates: boolean;
  subscribedCategories: Record<LegalCategory, boolean>;
}

export type VoucherType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'SERVICE_GIFT';

export type CustomerSegment = 'ENTERPRISE' | 'SME' | 'RETAINER_VIP' | 'INDIVIDUAL';

export interface Voucher {
  id: string;
  code: string; // Unique uppercase, e.g. "DIMAC-MA-2026"
  title: string;
  title_en?: string;
  description_vi: string;
  description_en?: string;
  type: VoucherType;
  discountPercentage?: number; // e.g. 20
  maxDiscountAmount?: number; // in VND, e.g. 10,000,000
  fixedDiscountAmount?: number; // in VND, e.g. 2,000,000
  giftServiceTitle?: string; // e.g. "Miễn phí 01 giờ tư vấn trực tiếp cùng Luật sư Partner"
  startDate: string;
  endDate: string;
  totalIssued: number;
  usedCount: number;
  userLimit: number; // e.g. 1
  minOrderValue?: number;
  applicableServices: string[];
  terms: string[];
  bannerGradient: string;
  // Customer Segmentation (SRS/BRD)
  targetSegments?: (CustomerSegment | 'ALL')[];
  segmentBadgeVi?: string;
  segmentBadgeEn?: string;
}

export type UserVoucherStatus = 'AVAILABLE' | 'USED' | 'EXPIRED';

export interface UserVoucherItem {
  id: string;
  voucherId: string;
  voucher: Voucher;
  status: UserVoucherStatus;
  claimedAt: string;
  usedAt?: string;
  verifiedBy?: string; // Lawyer/Admin name
  orderRef?: string;
}

export type CustomerTier = 'LEAD' | 'ENTERPRISE' | 'VIP' | 'IN_HOUSE';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  enterpriseName: string;
  position: string;
  avatar: string;
  customerTier: CustomerTier;
  segment: CustomerSegment;
  language: Language;
  notificationPrefs: NotificationPreferences;
  savedArticleIds: string[];
  contractCode?: string;
  taxCode?: string;
  retainerPackage?: string;
}

export type LeadStatus = 'NEW' | 'IN_PROGRESS' | 'SIGNED' | 'CLOSED';

export interface ConsultationLead {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  enterpriseName: string;
  position: string;
  practiceArea: LegalCategory;
  serviceDetail: string;
  notes: string;
  appliedVoucherCode?: string;
  status: LeadStatus;
  createdAt: string;
  assignedLawyerName?: string;
  assignedLawyerId?: string;
  priority: 'HIGH' | 'NORMAL' | 'URGENT';
}

export interface AdminStats {
  totalArticles: number;
  totalViews: number;
  totalPushSent: number;
  averagePushOpenRate: number; // percentage
  totalVouchersIssued: number;
  totalVouchersUsed: number;
  activeLeadsCount: number;
}

export type AdminRole = 'admin' | 'editor' | 'marketing';

export type LogoColorTheme = 'official' | 'gold' | 'monochrome' | 'emerald';

export interface LogoConfig {
  customImageUrl?: string | null;
  brandName: string;
  tagline: string;
  showTagline: boolean;
  colorTheme: LogoColorTheme;
}

export interface FirmInfo {
  firmName: string;
  tagline: string;
  description: string;
  headquarters: string;
  branches: string;
  website: string;
  hotline: string;
  email: string;
  workingHours: string;
  establishedYear: string;
  taxId?: string;
}
