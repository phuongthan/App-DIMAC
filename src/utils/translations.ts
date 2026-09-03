import { LegalCategory, Language, UserVoucherStatus, NotificationType } from '../types';

export interface AppTranslations {
  // Navigation
  nav: {
    insights: string;
    vouchers: string;
    notifications: string;
    account: string;
    consultation: string;
    langBtn: string;
  };
  
  // Categories mapping
  categories: Record<LegalCategory | 'ALL', string>;

  // Legal Insights View
  insights: {
    searchPlaceholder: string;
    filterBtn: string;
    allPractices: string;
    flashAlertBadge: string;
    insightsTitle: string;
    readTimePrefix: string;
    viewDetails: string;
    viewPdf: string;
    saveArticle: string;
    savedArticle: string;
    loadMore: string;
    loadingMore: string;
    allLoaded: string;
    noArticlesFound: string;
    resetFilterPrompt: string;
    publishedOn: string;
    viewsCount: string;
  };

  // Article details (article & articleDetail for backward compatibility)
  article: {
    savedBookmark: string;
    saveBookmark: string;
    shareArticle: string;
    closeArticle: string;
    views: string;
    executiveSummary: string;
    officialAttachment: string;
    pages: string;
    viewPdfDirectly: string;
    bookWithLawyer: string;
    sendQuestion: string;
    flashAlert: string;
    readVi: string;
    readEn: string;
    tableOfContents: string;
    authorSectionTitle: string;
  };

  articleDetail: {
    flashAlert: string;
    readVi: string;
    readEn: string;
    saveOffline: string;
    saved: string;
    shareBtn: string;
    copiedLink: string;
    pdfAttachedTitle: string;
    pdfDocNum: string;
    openPdfViewer: string;
    authorSectionTitle: string;
    consultThisLawyer: string;
    editAuthor: string;
    bookNowBtn: string;
    tableOfContents: string;
  };

  // Voucher Wallet
  vouchers: {
    headerSub: string;
    headerTitle: string;
    availableTab: string;
    usedTab: string;
    expiredTab: string;
    inputPlaceholder: string;
    redeemBtn: string;
    codeCopied: string;
    copyCode: string;
    showQr: string;
    useNow: string;
    maxDiscount: string;
    directDiscount: string;
    freePartnerHour: string;
    expiresOn: string;
    usedOn: string;
    expiredOn: string;
    termsTitle: string;
    emptyAvailable: string;
    emptyAvailableSub: string;
    emptyUsed: string;
    emptyExpired: string;
    qrTitle: string;
    qrInstruction: string;
    termsConditions: string;
    statusAvailable: string;
    statusUsed: string;
    statusExpired: string;
    redeemedTitle: string;
    redeemedTime: string;
    orderRef: string;
    copyCodeBtn: string;
    applyConsultationBtn: string;
    confirmUsedBtn: string;
    closeBtn: string;
  };

  // Notifications
  notifications: {
    headerSub: string;
    headerTitle: string;
    markAllRead: string;
    allTab: string;
    breakingTab: string;
    promoTab: string;
    personalTab: string;
    emptyList: string;
    emptyListSub: string;
    viewDetail: string;
    justNow: string;
    today: string;
    yesterday: string;
    prefSettings: string;
  };

  // Profile View
  profile: {
    headerSub: string;
    headerTitle: string;
    companyClient: string;
    tier: string;
    tierBadge: string;
    retainerPlan: string;
    editProfile: string;
    editProfileBtn: string;
    savedArticlesTitle: string;
    noSavedArticles: string;
    emptySavedArticles: string;
    consultHistoryTitle: string;
    emptyConsultHistory: string;
    aboutFirmTitle: string;
    headquarters: string;
    headquartersLabel: string;
    branches: string;
    branchesLabel: string;
    website: string;
    websiteLabel: string;
    hotline: string;
    hotlineLabel: string;
    email: string;
    emailLabel: string;
    workingHours: string;
    workingHoursLabel: string;
    editFirmInfo: string;
    editFirmInfoBtn: string;
    emergencyCardTitle: string;
    emergencyCardSub: string;
    emergencyCardCallBtn: string;
    bookConsultation: string;
    bookConsultBtn: string;
    changeLanguageLabel: string;
    fullName: string;
    enterprise: string;
    position: string;
    phone: string;
    saveBtn: string;
  };

  // Book Consultation Modal
  booking: {
    modalTitle: string;
    modalSubtitle: string;
    fullName: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phone: string;
    phoneLabel: string;
    phonePlaceholder: string;
    email: string;
    emailLabel: string;
    emailPlaceholder: string;
    enterprise: string;
    position: string;
    practiceArea: string;
    categoryLabel: string;
    serviceDetail: string;
    detailLabel: string;
    detailPlaceholder: string;
    voucherLabel: string;
    voucherPlaceholder: string;
    applyVoucher: string;
    availableVouchers: string;
    lawyerLabel: string;
    assignedLawyer: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successSub: string;
    cancelBtn: string;
    closeBtn: string;
  };

  // Filter Modal
  filters: {
    title: string;
    practiceArea: string;
    practiceAreaLabel: string;
    allPractices: string;
    yearOfPub: string;
    yearLabel: string;
    allYears: string;
    hasPdfOnly: string;
    hasPdfOnlySub: string;
    hasPdfOnlyLabel: string;
    resetBtn: string;
    applyBtn: string;
    closeBtn: string;
  };
  filterModal: {
    title: string;
    practiceAreaLabel: string;
    allPractices: string;
    yearLabel: string;
    allYears: string;
    hasPdfOnlyLabel: string;
    resetBtn: string;
    applyBtn: string;
    closeBtn: string;
  };

  // PDF Document Modal
  pdfModal: {
    docHeader: string;
    zoomLabel: string;
    searchPlaceholder: string;
    downloadBtn: string;
    downloadSuccess: string;
    closeBtn: string;
    officialStamp: string;
    verifiedArchive: string;
  };
}

export const TRANSLATIONS: Record<Language, AppTranslations> = {
  vi: {
    nav: {
      insights: 'Tin tức',
      vouchers: 'Ví Voucher',
      notifications: 'Thông báo',
      account: 'Tài khoản',
      consultation: 'Tư vấn',
      langBtn: 'VI',
    },
    categories: {
      ALL: 'Tất cả chuyên mục',
      'M&A': 'M&A & Mua bán sáp nhập',
      'Đầu tư': 'Đầu tư & Dự án FDI',
      'Bất động sản': 'Bất động sản & Xây dựng',
      'Năng lượng': 'Năng lượng & Tái tạo',
      'Tranh chấp & Tố tụng': 'Tranh chấp & Tố tụng',
      'Thuế & Tài chính': 'Thuế & Tài chính doanh nghiệp',
      'Lao động': 'Lao động & Việc làm',
      'Doanh nghiệp': 'Pháp chế Doanh nghiệp'
    },
    insights: {
      searchPlaceholder: 'Tìm bài viết, nghị định, thông tư...',
      filterBtn: 'Lọc',
      allPractices: 'Tất cả chuyên mục',
      flashAlertBadge: 'Nổi bật',
      insightsTitle: 'Bản tin Pháp lý & Chuyên khảo',
      readTimePrefix: 'phút đọc',
      viewDetails: 'Chi tiết',
      viewPdf: 'Xem PDF Văn bản',
      saveArticle: 'Lưu đọc',
      savedArticle: 'Đã lưu',
      loadMore: 'Tải thêm bài viết',
      loadingMore: 'Đang tải...',
      allLoaded: 'Đã hiển thị toàn bộ bài viết',
      noArticlesFound: 'Không tìm thấy bài viết nào phù hợp với bộ lọc tìm kiếm',
      resetFilterPrompt: 'Khôi phục bộ lọc',
      publishedOn: 'Ngày đăng',
      viewsCount: 'lượt đọc'
    },
    article: {
      savedBookmark: 'Đã lưu bài viết',
      saveBookmark: 'Lưu đọc offline',
      shareArticle: 'Chia sẻ bài viết',
      closeArticle: 'Đóng',
      views: 'lượt đọc',
      executiveSummary: 'Tóm tắt điều hành',
      officialAttachment: 'Văn bản pháp lý chính thức',
      pages: 'trang',
      viewPdfDirectly: 'Xem PDF Trực Tiếp',
      bookWithLawyer: 'Đặt hẹn Luật sư tư vấn vụ việc',
      sendQuestion: 'Gửi câu hỏi qua Email',
      flashAlert: '⚡ Flash Alert Khẩn',
      readVi: 'Tiếng Việt',
      readEn: 'English',
      tableOfContents: 'Mục lục nội dung',
      authorSectionTitle: 'Tác giả & Luật sư phụ trách'
    },
    articleDetail: {
      flashAlert: '⚡ Flash Alert Khẩn',
      readVi: 'Tiếng Việt',
      readEn: 'English',
      saveOffline: 'Lưu đọc offline',
      saved: 'Đã lưu',
      shareBtn: 'Chia sẻ bài viết',
      copiedLink: 'Đã sao chép liên kết!',
      pdfAttachedTitle: 'Tài Liệu Văn Bản Pháp Lý Đính Kèm',
      pdfDocNum: 'Số hiệu văn bản:',
      openPdfViewer: 'Xem Toàn Văn PDF',
      authorSectionTitle: 'Tác giả & Luật sư phụ trách',
      consultThisLawyer: 'Đặt hẹn tư vấn cùng Luật sư này',
      editAuthor: 'Sửa hồ sơ',
      bookNowBtn: 'ĐẶT LỊCH TƯ VẤN VỚI LUẬT SƯ NGAY',
      tableOfContents: 'Mục lục nội dung'
    },
    vouchers: {
      headerSub: 'DIMAC E-Voucher Wallet',
      headerTitle: 'Ví Ưu Đãi Pháp Lý',
      availableTab: 'Khả dụng',
      usedTab: 'Đã dùng',
      expiredTab: 'Hết hạn',
      inputPlaceholder: 'Nhập mã voucher (VD: LAW2026)...',
      redeemBtn: 'Áp dụng mã',
      codeCopied: 'Đã sao chép mã!',
      copyCode: 'Sao chép mã',
      showQr: 'Mã QR & Đặt hẹn',
      useNow: 'Sử dụng ngay',
      maxDiscount: 'Tối đa',
      directDiscount: 'VNĐ trực tiếp',
      freePartnerHour: 'Tặng 01h Luật sư Partner',
      expiresOn: 'Hạn sử dụng:',
      usedOn: 'Đã sử dụng lúc:',
      expiredOn: 'Đã hết hạn lúc:',
      termsTitle: 'Điều kiện & Điều khoản áp dụng:',
      emptyAvailable: 'Chưa có voucher khả dụng',
      emptyAvailableSub: 'Đọc thêm các bài viết pháp lý để nhận mã quà tặng đặc quyền từ DIMAC',
      emptyUsed: 'Chưa có voucher nào đã sử dụng',
      emptyExpired: 'Không có voucher hết hạn',
      qrTitle: 'MÃ ƯU ĐÃI & QR ĐỐI SOÁT',
      qrInstruction: 'Xuất trình mã QR này cho Thư ký / Luật sư DIMAC khi thanh toán hoặc ký kết Hợp đồng dịch vụ pháp lý',
      termsConditions: 'Điều kiện & Phạm vi áp dụng',
      statusAvailable: 'Khả dụng',
      statusUsed: 'Đã sử dụng',
      statusExpired: 'Đã hết hạn',
      redeemedTitle: 'VOUCHER ĐÃ ĐƯỢC ĐỐI SOÁT',
      redeemedTime: 'Thời gian:',
      orderRef: 'Mã HĐ:',
      copyCodeBtn: 'Sao chép',
      applyConsultationBtn: 'Đặt lịch tư vấn & Áp dụng voucher này ngay',
      confirmUsedBtn: 'Xác nhận đã sử dụng trực tiếp tại quầy?',
      closeBtn: 'Đóng'
    },
    notifications: {
      headerSub: 'DIMAC Notification Center',
      headerTitle: 'Trung Tâm Thông Báo',
      markAllRead: 'Đã đọc hết',
      allTab: 'Tất cả',
      breakingTab: 'Khẩn cấp',
      promoTab: 'Ưu đãi',
      personalTab: 'Cá nhân',
      emptyList: 'Chưa có thông báo nào',
      emptyListSub: 'Các cảnh báo pháp lý và ưu đãi mới nhất sẽ hiển thị tại đây',
      viewDetail: 'Xem chi tiết',
      justNow: 'Vừa xong',
      today: 'Hôm nay',
      yesterday: 'Hôm qua',
      prefSettings: 'Tùy chỉnh nhận tin'
    },
    profile: {
      headerSub: 'DIMAC Corporate Account',
      headerTitle: 'Hồ Sơ Doanh Nghiệp',
      companyClient: 'Doanh nghiệp / Khách hàng',
      tier: 'Hạng',
      tierBadge: 'CLIENT',
      retainerPlan: 'Gói Dịch Vụ',
      editProfile: 'Chỉnh sửa hồ sơ',
      editProfileBtn: 'Sửa thông tin',
      savedArticlesTitle: 'Bài Viết Đã Lưu Đọc Offline',
      noSavedArticles: 'Bạn chưa lưu bài viết nào để đọc offline.',
      emptySavedArticles: 'Chưa lưu bài viết nào. Nhấn biểu tượng Bookmark ở các bài viết để lưu đọc lại.',
      consultHistoryTitle: 'Lịch Sử Yêu Cầu Tư Vấn',
      emptyConsultHistory: 'Chưa có lịch hẹn tư vấn nào được ghi nhận.',
      aboutFirmTitle: 'Về DIMAC Law Firm',
      headquarters: 'Trụ sở chính',
      headquartersLabel: 'Trụ sở chính',
      branches: 'Chi nhánh',
      branchesLabel: 'Chi nhánh',
      website: 'Website chính thức',
      websiteLabel: 'Website chính thức',
      hotline: 'Hotline 24/7',
      hotlineLabel: 'Hotline 24/7',
      email: 'Email liên hệ',
      emailLabel: 'Email liên hệ',
      workingHours: 'Giờ làm việc',
      workingHoursLabel: 'Giờ làm việc',
      editFirmInfo: 'Sửa thông tin',
      editFirmInfoBtn: 'Sửa thông tin',
      emergencyCardTitle: 'Hotline Hỗ Trợ Khẩn Cấp 24/7',
      emergencyCardSub: 'Kết nối nhanh chóng với Luật sư Thường trực khi có phát sinh thanh tra, tranh chấp đột xuất',
      emergencyCardCallBtn: 'Gọi Hotline Khẩn Cấp',
      bookConsultation: 'Đặt lịch tư vấn',
      bookConsultBtn: 'Đặt Lịch Tư Vấn',
      changeLanguageLabel: 'Ngôn ngữ ứng dụng',
      fullName: 'Họ và tên',
      enterprise: 'Doanh nghiệp / Tổ chức',
      position: 'Chức vụ / Vị trí',
      phone: 'Số điện thoại',
      saveBtn: 'Lưu thay đổi'
    },
    booking: {
      modalTitle: 'ĐẶT LỊCH TƯ VẤN PHÁP LÝ',
      modalSubtitle: 'Kết nối trực tiếp cùng Luật sư Partner & Chuyên gia DIMAC',
      fullName: 'Họ và tên người liên hệ',
      fullNameLabel: 'Họ và tên người liên hệ',
      fullNamePlaceholder: 'VD: Nguyễn Văn A',
      phone: 'Số điện thoại liên hệ',
      phoneLabel: 'Số điện thoại liên hệ',
      phonePlaceholder: 'VD: 0901 234 567',
      email: 'Email nhận thông tin phản hồi',
      emailLabel: 'Email nhận thông tin phản hồi',
      emailPlaceholder: 'VD: contact@company.com',
      enterprise: 'Doanh nghiệp / Tổ chức',
      position: 'Chức vụ / Vị trí',
      practiceArea: 'Lĩnh vực pháp lý cần tư vấn',
      categoryLabel: 'Lĩnh vực pháp lý cần tư vấn',
      serviceDetail: 'Nội dung vướng mắc / Nhu cầu tư vấn cụ thể',
      detailLabel: 'Nội dung vướng mắc / Nhu cầu tư vấn cụ thể',
      detailPlaceholder: 'Mô tả tóm tắt vấn đề pháp lý hoặc dịch vụ cần DIMAC hỗ trợ...',
      voucherLabel: 'Mã voucher ưu đãi (nếu có)',
      voucherPlaceholder: 'Nhập mã voucher (VD: LAW2026)',
      applyVoucher: 'Mã ưu đãi / E-Voucher',
      availableVouchers: 'Voucher khả dụng',
      lawyerLabel: 'Luật sư phụ trách mong muốn',
      assignedLawyer: 'Luật sư Partner chuyên trách',
      notesLabel: 'Ghi chú thời gian mong muốn tư vấn',
      notesPlaceholder: 'VD: Sáng Thứ 4 tuần tới lúc 09:30...',
      submitBtn: 'GỬI YÊU CẦU TƯ VẤN',
      submittingBtn: 'ĐANG XỬ LÝ GỬI...',
      successTitle: 'GỬI YÊU CẦU THÀNH CÔNG!',
      successSub: 'Luật sư phụ trách sẽ chủ động liên hệ lại Quý khách trong vòng 30 phút làm việc.',
      cancelBtn: 'Hủy',
      closeBtn: 'ĐÓNG CỬA SỔ'
    },
    filters: {
      title: 'BỘ LỌC TÌM KIẾM BÀI VIẾT',
      practiceArea: 'Chuyên ngành Luật (Practice Area)',
      practiceAreaLabel: 'Chuyên ngành Luật (Practice Area)',
      allPractices: 'Tất cả chuyên ngành',
      yearOfPub: 'Năm ban hành / xuất bản',
      yearLabel: 'Năm ban hành / xuất bản',
      allYears: 'Tất cả các năm',
      hasPdfOnly: 'Chỉ hiển thị bài có File PDF',
      hasPdfOnlySub: 'Lọc các ấn phẩm có tệp toàn văn văn bản đính kèm',
      hasPdfOnlyLabel: 'Chỉ hiển thị bài có file PDF văn bản đính kèm',
      resetBtn: 'Khôi phục mặc định',
      applyBtn: 'Áp dụng bộ lọc',
      closeBtn: 'Đóng'
    },
    filterModal: {
      title: 'Bộ Lọc & Tìm Kiếm Thông Minh',
      practiceAreaLabel: 'Chuyên ngành Luật (Practice Area)',
      allPractices: 'Tất cả chuyên ngành',
      yearLabel: 'Năm ban hành / xuất bản',
      allYears: 'Tất cả các năm',
      hasPdfOnlyLabel: 'Chỉ hiển thị bài có file PDF văn bản đính kèm',
      resetBtn: 'Khôi phục mặc định',
      applyBtn: 'Áp dụng bộ lọc',
      closeBtn: 'Đóng'
    },
    pdfModal: {
      docHeader: 'Tài Liệu Văn Bản Pháp Lý',
      zoomLabel: 'Độ thu phóng',
      searchPlaceholder: 'Tìm kiếm từ khóa trong văn bản...',
      downloadBtn: 'Tải PDF về máy',
      downloadSuccess: 'Đã tải xuống thành công!',
      closeBtn: 'Đóng',
      officialStamp: 'VĂN BẢN ĐÃ ĐỐI CHIẾU PHÁP LÝ',
      verifiedArchive: 'Lưu trữ điện tử chính thức DIMAC Law Firm'
    }
  },
  en: {
    nav: {
      insights: 'Insights',
      vouchers: 'Vouchers',
      notifications: 'Alerts',
      account: 'Account',
      consultation: 'Consult',
      langBtn: 'EN',
    },
    categories: {
      ALL: 'All Practice Areas',
      'M&A': 'M&A & Corporate Transactions',
      'Đầu tư': 'Foreign Direct Investment (FDI)',
      'Bất động sản': 'Real Estate & Construction',
      'Năng lượng': 'Renewable Energy & Infrastructure',
      'Tranh chấp & Tố tụng': 'Dispute Resolution & Litigation',
      'Thuế & Tài chính': 'Corporate Tax & Finance',
      'Lao động': 'Labor & Employment',
      'Doanh nghiệp': 'Corporate Governance & Compliance'
    },
    insights: {
      searchPlaceholder: 'Search articles, decrees, circulars...',
      filterBtn: 'Filter',
      allPractices: 'All Practices',
      flashAlertBadge: 'Featured',
      insightsTitle: 'Legal Insights & Publications',
      readTimePrefix: 'min read',
      viewDetails: 'Read Full',
      viewPdf: 'View PDF Document',
      saveArticle: 'Bookmark',
      savedArticle: 'Saved',
      loadMore: 'Load More Articles',
      loadingMore: 'Loading...',
      allLoaded: 'All articles loaded',
      noArticlesFound: 'No legal insights matched your search criteria',
      resetFilterPrompt: 'Reset Filters',
      publishedOn: 'Published:',
      viewsCount: 'views'
    },
    article: {
      savedBookmark: 'Saved Article',
      saveBookmark: 'Save for offline',
      shareArticle: 'Share Article',
      closeArticle: 'Close',
      views: 'views',
      executiveSummary: 'Executive Summary',
      officialAttachment: 'Official Attached PDF Document',
      pages: 'pages',
      viewPdfDirectly: 'View PDF Document',
      bookWithLawyer: 'Book Partner Consultation for this Case',
      sendQuestion: 'Send Question via Email',
      flashAlert: '⚡ Flash Legal Alert',
      readVi: 'Tiếng Việt',
      readEn: 'English',
      tableOfContents: 'Table of Contents',
      authorSectionTitle: 'Author & Lead Counsel'
    },
    articleDetail: {
      flashAlert: '⚡ Flash Legal Alert',
      readVi: 'Tiếng Việt',
      readEn: 'English',
      saveOffline: 'Save for offline',
      saved: 'Saved',
      shareBtn: 'Share Insight',
      copiedLink: 'Link copied to clipboard!',
      pdfAttachedTitle: 'Official Attached PDF Document',
      pdfDocNum: 'Document No:',
      openPdfViewer: 'View Full PDF Document',
      authorSectionTitle: 'Author & Lead Counsel',
      consultThisLawyer: 'Schedule appointment with this Counsel',
      editAuthor: 'Edit Profile',
      bookNowBtn: 'BOOK CONSULTATION WITH COUNSEL NOW',
      tableOfContents: 'Table of Contents'
    },
    vouchers: {
      headerSub: 'DIMAC E-Voucher Wallet',
      headerTitle: 'Legal Benefits & Vouchers',
      availableTab: 'Available',
      usedTab: 'Redeemed',
      expiredTab: 'Expired',
      inputPlaceholder: 'Enter voucher code (e.g. LAW2026)...',
      redeemBtn: 'Apply Code',
      codeCopied: 'Voucher code copied!',
      copyCode: 'Copy Code',
      showQr: 'QR Code & Booking',
      useNow: 'Redeem Now',
      maxDiscount: 'Up to',
      directDiscount: 'VND directly',
      freePartnerHour: 'Complimentary 1-hr Partner Consultation',
      expiresOn: 'Expires on:',
      usedOn: 'Redeemed on:',
      expiredOn: 'Expired on:',
      termsTitle: 'Terms & Conditions:',
      emptyAvailable: 'No available vouchers',
      emptyAvailableSub: 'Read more legal insights to unlock exclusive benefits from DIMAC Law Firm',
      emptyUsed: 'No redeemed vouchers yet',
      emptyExpired: 'No expired vouchers',
      qrTitle: 'VOUCHER QR CODE & VERIFICATION',
      qrInstruction: 'Present this QR code to DIMAC legal secretary or counsel when executing legal agreements',
      termsConditions: 'Terms & Scope of Application',
      statusAvailable: 'Available',
      statusUsed: 'Redeemed',
      statusExpired: 'Expired',
      redeemedTitle: 'VOUCHER HAS BEEN REDEEMED',
      redeemedTime: 'Time:',
      orderRef: 'Order Ref:',
      copyCodeBtn: 'Copy',
      applyConsultationBtn: 'Book Consultation & Apply this Voucher',
      confirmUsedBtn: 'Confirm redeemed in-person?',
      closeBtn: 'Close'
    },
    notifications: {
      headerSub: 'DIMAC Notification Center',
      headerTitle: 'Notifications & Alerts',
      markAllRead: 'Mark All Read',
      allTab: 'All',
      breakingTab: 'Breaking',
      promoTab: 'Vouchers',
      personalTab: 'Personal',
      emptyList: 'No notifications',
      emptyListSub: 'New legal alerts and partner promotions will appear here',
      viewDetail: 'View Details',
      justNow: 'Just now',
      today: 'Today',
      yesterday: 'Yesterday',
      prefSettings: 'Preferences'
    },
    profile: {
      headerSub: 'DIMAC Corporate Account',
      headerTitle: 'Corporate Client Profile',
      companyClient: 'Corporate Client',
      tier: 'Tier',
      tierBadge: 'CLIENT',
      retainerPlan: 'Retainer Plan',
      editProfile: 'Edit Profile',
      editProfileBtn: 'Edit Profile',
      savedArticlesTitle: 'Saved Offline Articles',
      noSavedArticles: 'No saved articles yet. Tap the bookmark icon on any article to save for offline reading.',
      emptySavedArticles: 'No saved articles yet. Tap the bookmark icon on any article to save for offline reading.',
      consultHistoryTitle: 'Consultation Request History',
      emptyConsultHistory: 'No consultation history recorded yet.',
      aboutFirmTitle: 'About DIMAC Law Firm',
      headquarters: 'Headquarters',
      headquartersLabel: 'Headquarters',
      branches: 'Branches',
      branchesLabel: 'Branches',
      website: 'Official Website',
      websiteLabel: 'Official Website',
      hotline: '24/7 Hotline',
      hotlineLabel: '24/7 Hotline',
      email: 'Contact Email',
      emailLabel: 'Contact Email',
      workingHours: 'Working Hours',
      workingHoursLabel: 'Working Hours',
      editFirmInfo: 'Edit Info',
      editFirmInfoBtn: 'Edit Info',
      emergencyCardTitle: '24/7 Emergency Legal Hotline',
      emergencyCardSub: 'Direct fast-track contact with Senior Counsel for urgent audits, regulatory inspections, or disputes',
      emergencyCardCallBtn: 'Call Emergency Hotline',
      bookConsultation: 'Book Consultation',
      bookConsultBtn: 'Book Consultation',
      changeLanguageLabel: 'App Language',
      fullName: 'Full Name',
      enterprise: 'Enterprise / Organization',
      position: 'Position / Role',
      phone: 'Phone Number',
      saveBtn: 'Save Changes'
    },
    booking: {
      modalTitle: 'SCHEDULE LEGAL CONSULTATION',
      modalSubtitle: 'Connect directly with DIMAC Partners & Senior Counsel',
      fullName: 'Full Contact Name',
      fullNameLabel: 'Full Contact Name',
      fullNamePlaceholder: 'e.g. John Doe / Nguyen Van A',
      phone: 'Phone Number',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'e.g. (+84) 901 234 567',
      email: 'Response Email Address',
      emailLabel: 'Response Email Address',
      emailPlaceholder: 'e.g. contact@company.com',
      enterprise: 'Enterprise / Organization',
      position: 'Position / Role',
      practiceArea: 'Practice Area / Legal Domain',
      categoryLabel: 'Practice Area / Legal Domain',
      serviceDetail: 'Case Details & Specific Advisory Needs',
      detailLabel: 'Case Details & Specific Advisory Needs',
      detailPlaceholder: 'Briefly summarize your legal inquiry or the assistance requested...',
      voucherLabel: 'Applied Voucher Code (Optional)',
      voucherPlaceholder: 'Enter voucher code (e.g. LAW2026)',
      applyVoucher: 'E-Voucher Benefit',
      availableVouchers: 'Available Vouchers',
      lawyerLabel: 'Preferred Lead Counsel / Partner',
      assignedLawyer: 'Assigned Partner Counsel',
      notesLabel: 'Preferred Schedule / Date & Time',
      notesPlaceholder: 'e.g. Next Wednesday morning at 09:30 AM...',
      submitBtn: 'SUBMIT CONSULTATION REQUEST',
      submittingBtn: 'PROCESSING SUBMISSION...',
      successTitle: 'REQUEST SUBMITTED SUCCESSFULLY!',
      successSub: 'Our designated Partner will contact you within 30 business minutes.',
      cancelBtn: 'Cancel',
      closeBtn: 'CLOSE WINDOW'
    },
    filters: {
      title: 'FILTER LEGAL ARTICLES',
      practiceArea: 'Legal Practice Area',
      practiceAreaLabel: 'Legal Practice Area',
      allPractices: 'All Practice Areas',
      yearOfPub: 'Year of Publication',
      yearLabel: 'Year of Enactment / Publication',
      allYears: 'All Years',
      hasPdfOnly: 'Only Show Articles with PDF',
      hasPdfOnlySub: 'Filter publications with attached full-text legal document',
      hasPdfOnlyLabel: 'Only show insights with official attached PDF',
      resetBtn: 'Reset to Defaults',
      applyBtn: 'Apply Filters',
      closeBtn: 'Close'
    },
    filterModal: {
      title: 'Smart Legal Filter & Search',
      practiceAreaLabel: 'Legal Practice Area',
      allPractices: 'All Practice Areas',
      yearLabel: 'Year of Enactment / Publication',
      allYears: 'All Years',
      hasPdfOnlyLabel: 'Only show insights with official attached PDF',
      resetBtn: 'Reset to Defaults',
      applyBtn: 'Apply Filters',
      closeBtn: 'Close'
    },
    pdfModal: {
      docHeader: 'Official Legal Document',
      zoomLabel: 'Zoom Level',
      searchPlaceholder: 'Search keyword within document...',
      downloadBtn: 'Download PDF',
      downloadSuccess: 'Downloaded successfully!',
      closeBtn: 'Close',
      officialStamp: 'LEGALLY VERIFIED DOCUMENT',
      verifiedArchive: 'Official Electronic Archive of DIMAC Law Firm'
    }
  }
};
