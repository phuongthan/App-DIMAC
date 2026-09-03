import { 
  LegalArticle, 
  Author, 
  Voucher, 
  UserVoucherItem, 
  PushNotificationItem, 
  UserProfile, 
  ConsultationLead,
  AdminStats,
  FirmInfo,
  CustomerSegment
} from '../types';

export const DEFAULT_FIRM_INFO: FirmInfo = {
  firmName: 'DIMAC Law Firm',
  tagline: 'Leading Business & Corporate Law Firm in Vietnam',
  description: 'Hãng luật chuyên nghiệp hàng đầu tại Việt Nam cung cấp dịch vụ pháp lý trọn gói cho Doanh nghiệp nội địa và Tập đoàn đa quốc gia (FDI).',
  headquarters: 'Tầng 6, Tòa nhà D-Square, TP. Hồ Chí Minh',
  branches: 'Hà Nội & Đà Nẵng',
  website: 'dimac-law.com',
  hotline: '(+84) 903 888 123',
  email: 'contact@dimac-law.com',
  workingHours: 'Thứ 2 - Thứ 6: 08:30 - 18:00',
  establishedYear: '2015',
  taxId: '0313364952',
};

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'lawyer-mp',
    name: 'LS. Phạm Quốc Tuấn',
    role: 'Managing Partner',
    position: 'Luật sư Điều hành & Trưởng Ban Giải quyết Tranh chấp',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=150&auto=format&fit=crop&q=80',
    email: 'tuan.pham@dimac-law.com',
    phone: '(+84) 903 999 888',
    isPartner: true,
    bio: 'Hơn 20 năm kinh nghiệm tư vấn chiến lược doanh nghiệp, M&A và tranh tụng trọng tài thương mại quốc tế (VIAC, SIAC).'
  },
  {
    id: 'lawyer-1',
    name: 'LS. Nguyễn Danh Công',
    role: 'Partner',
    position: 'Trưởng Ban M&A, FDI & Năng lượng',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    email: 'cong.nguyen@dimac-law.com',
    phone: '(+84) 903 888 123',
    isPartner: true,
    bio: 'Chuyên sâu tái cấu trúc vốn, thẩm định pháp lý (Legal Due Diligence), M&A các dự án năng lượng tái tạo và FDI quy mô lớn.'
  },
  {
    id: 'lawyer-2',
    name: 'LS. Lê Thanh Tùng',
    role: 'Partner',
    position: 'Phụ trách Bất động sản, Xây dựng & Dự án',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'tung.le@dimac-law.com',
    phone: '(+84) 918 666 456',
    isPartner: true,
    bio: 'Chuyên gia pháp lý về chuyển nhượng dự án bất động sản công nghiệp, nhà xưởng cho thuê và cấp phép đầu tư xây dựng.'
  },
  {
    id: 'lawyer-3',
    name: 'LS. Lê Đăng Khoa',
    role: 'Senior Associate',
    position: 'Chuyên viên Cấp cao Thuế, Tài chính & Doanh nghiệp',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'khoa.le@dimac-law.com',
    phone: '(+84) 932 777 890',
    isPartner: false,
    bio: 'Chuyên gia tư vấn chính sách ưu đãi thuế FDI, tuân thủ pháp lý doanh nghiệp và quản trị rủi ro hợp đồng thương mại.'
  },
];

export const INITIAL_ARTICLES: LegalArticle[] = [
  {
    id: 'art-1',
    title_vi: 'Flash Alert: Điểm mới Nghị định 10/2024/NĐ-CP về Quản lý Khu Công nghiệp và Khu Kinh tế',
    title_en: 'Flash Alert: Key Highlights of Decree 10/2024/ND-CP on Industrial and Economic Zones Management',
    category: 'Đầu tư',
    tags: ['#NghịĐịnh10', '#KhuCôngNghiệp', '#FDI2024', '#FlashAlert'],
    isFlashAlert: true,
    status: 'published',
    publishDate: '2024-07-28',
    viewsCount: 1420,
    estimatedReadTime: '4 phút đọc',
    author: INITIAL_AUTHORS[0],
    summary_vi: 'Chính phủ vừa ban hành Nghị định 10/2024/NĐ-CP với nhiều điểm đột phá về ưu đãi đầu tư, phân cấp cấp phép xây dựng và thủ tục thành lập khu công nghiệp sinh thái.',
    summary_en: 'The Government has issued Decree 10/2024/ND-CP featuring major breakthroughs in investment incentives, decentralized construction licensing, and eco-industrial zone establishment.',
    content_vi: `
### 1. Bối cảnh ban hành
Nghị định 10/2024/NĐ-CP được ban hành nhằm tháo gỡ các điểm nghẽn pháp lý kéo dài về thẩm định quy hoạch phân khu và đơn giản hóa thủ tục đầu tư cho các dự án FDI quy mô lớn vào Việt Nam.

### 2. Các điểm sửa đổi trọng yếu
- **Cơ chế ưu đãi cho KCN chuyên sâu & sinh thái:** Doanh nghiệp đầu tư hạ tầng KCN sinh thái được miễn giảm tiền thuê đất thêm 3 năm và ưu tiên tiếp cận vốn vay tín dụng xanh.
- **Rút ngắn thời gian chấp thuận chủ trương đầu tư:** Thủ tục lấy ý kiến các Bộ ngành liên quan được rút ngắn từ 45 ngày xuống còn tối đa 25 ngày làm việc.
- **Quy định rõ ràng về tỷ lệ đất dành cho doanh nghiệp vừa và nhỏ (SMEs):** Tối thiểu 5% quỹ đất công nghiệp phải được ưu tiên cho các doanh nghiệp phụ trợ trong chuỗi cung ứng.

### 3. Khuyến nghị thực tiễn từ DIMAC Law Firm
Các nhà đầu tư nước ngoài chuẩn bị giải ngân hoặc mở rộng nhà xưởng giai đoạn 2024 - 2026 cần rà soát lại phương án tài chính và cơ chế thuê lại đất để tối ưu hóa biểu thuế suất ưu đãi theo quy định mới.
    `,
    content_en: `
### 1. Regulatory Context
Decree 10/2024/ND-CP was enacted to resolve long-standing legal bottlenecks regarding zoning evaluation and simplify investment procedures for large-scale FDI projects in Vietnam.

### 2. Key Regulatory Amendments
- **Incentives for Eco & Specialized Industrial Zones:** Infrastructure developers receive an extra 3-year land rental exemption and priority access to green credit lines.
- **Expedited In-principle Approval:** Ministerial consultation period reduced from 45 days down to a maximum of 25 working days.
- **Dedicated land quota for SMEs:** Minimum 5% industrial land pool must be allocated for ancillary supply chain enterprises.

### 3. Practical Recommendations from DIMAC Law Firm
Foreign investors planning greenfield capital deployments or factory expansions during 2024-2026 should audit financial models and sub-lease structures to secure optimal incentive tax rates.
    `,
    pdfAttachment: {
      id: 'pdf-1',
      title: 'Văn bản gốc: Nghị định số 10/2024/NĐ-CP (Bản PDF Chuẩn + Phân tích DIMAC)',
      fileSize: '3.8 MB',
      pageCount: 24,
      docNumber: '10/2024/NĐ-CP',
      publishedYear: 2024,
      downloadUrl: '#download-decree-10',
      summaryText: 'Văn bản chính thức quy định về khu công nghiệp và khu kinh tế, kèm ghi chú điều khoản so sánh bởi Ban Đầu tư DIMAC.'
    }
  },
  {
    id: 'art-2',
    title_vi: 'Thực thi Luật Đất đai 2024: Tác động đa chiều đến các thương vụ M&A Bất động sản',
    title_en: 'Enforcement of Land Law 2024: Multidimensional Impacts on Real Estate M&A Transactions',
    category: 'Bất động sản',
    tags: ['#LuậtĐấtĐai2024', '#RealEstateMA', '#ThẩmĐịnhPhápLý', '#ThuêĐất'],
    isFlashAlert: false,
    status: 'published',
    publishDate: '2024-08-01',
    viewsCount: 2890,
    estimatedReadTime: '6 phút đọc',
    author: INITIAL_AUTHORS[1],
    summary_vi: 'Phân tích chuyên sâu về cơ chế tính tiền sử dụng đất theo bảng giá đất thị trường, điều kiện chuyển nhượng dự án và bảo đảm pháp lý cho bên mua trong giao dịch M&A.',
    summary_en: 'In-depth analysis of land use fee calculations under market pricing tables, project transfer conditions, and buyer protections in M&A deals.',
    content_vi: `
### 1. Bỏ khung giá đất và áp dụng Bảng giá đất hàng năm
Luật Đất đai 2024 chính thức có hiệu lực sớm từ 01/08/2024 đã loại bỏ khung giá đất cũ, yêu cầu áp dụng nguyên tắc thị trường để định giá đất. Điều này tác động trực tiếp đến chi phí bồi thường và nộp tiền sử dụng đất của dự án.

### 2. Điều kiện chuyển nhượng dự án bất động sản
- **Nghĩa vụ tài chính:** Chủ đầu tư phải hoàn thành toàn bộ nghĩa vụ tài chính về đất đai trước khi chuyển nhượng toàn bộ hoặc một phần dự án.
- **Quyền lựa chọn hình thức trả tiền thuê đất:** Cho phép doanh nghiệp linh hoạt chuyển đổi giữa trả tiền thuê đất một lần và trả hàng năm, tạo thuận lợi cơ cấu dòng tiền.

### 3. Chiến lược phòng ngừa rủi ro cho In-house Counsel
DIMAC khuyến nghị các quỹ đầu tư và doanh nghiệp mua lại cần thực hiện Thẩm định pháp lý chuyên sâu (Legal Due Diligence - LDD) tập trung vào lịch sử cấp GCNQSDĐ và tiến độ giải phóng mặt bằng.
    `,
    content_en: `
### 1. Abolition of Land Price Bracket and Annual Land Pricing Table
Land Law 2024 took early effect on 01/08/2024, abolishing the statutory land price bracket and enforcing market-based valuation. This directly impacts compensation expenses and land use fees.

### 2. Real Estate Project Transfer Conditions
- **Financial Obligations:** Developers must fully fulfill land-related financial liabilities before transferring whole or partial projects.
- **Flexible Land Rental Payment:** Enterprises can shift between lump-sum and annual rental payments to optimize liquidity.

### 3. Risk Mitigation for In-House Legal Teams
DIMAC advises investment funds and acquiring entities to conduct comprehensive Legal Due Diligence (LDD) focusing on land title issuance history and site clearance status.
    `,
    pdfAttachment: {
      id: 'pdf-2',
      title: 'Báo cáo Chuyên khảo: Tác động của Luật Đất đai 2024 đến M&A BĐS (DIMAC Research)',
      fileSize: '4.5 MB',
      pageCount: 36,
      docNumber: 'DIMAC-RES-2024-LL',
      publishedYear: 2024,
      downloadUrl: '#download-landlaw-report',
      summaryText: 'Tổng hợp 15 điểm thay đổi cốt lõi kèm bảng đối chiếu Luật Đất đai 2013 vs 2024.'
    }
  },
  {
    id: 'art-3',
    title_vi: 'Cẩm nang Giải quyết Tranh chấp Hợp đồng Thương mại tại VIAC và Tòa án: Góc nhìn Thực tiễn',
    title_en: 'Commercial Contract Dispute Resolution Guide at VIAC and Courts: Practical Insights',
    category: 'Tranh chấp & Tố tụng',
    tags: ['#TranhChấpThươngMại', '#VIAC', '#TrọngTài', '#HợpĐồng'],
    isFlashAlert: false,
    status: 'published',
    publishDate: '2024-08-15',
    viewsCount: 1650,
    estimatedReadTime: '5 phút đọc',
    author: INITIAL_AUTHORS[1],
    summary_vi: 'So sánh ưu thế của trọng tài thương mại (VIAC) so với Tòa án, kỹ thuật soạn thảo điều khoản giải quyết tranh chấp (Dispute Clause) để bảo vệ quyền lợi doanh nghiệp.',
    summary_en: 'Comparative analysis of commercial arbitration (VIAC) vs Courts, best practices in drafting dispute clauses to safeguard business rights.',
    content_vi: `
### 1. Xu hướng lựa chọn Trọng tài Thương mại tại Việt Nam
Với tính bảo mật cao, tốc độ giải quyết nhanh và phán quyết có hiệu lực chung thẩm, VIAC ngày càng được các doanh nghiệp FDI và tập đoàn nội địa tin tưởng trong việc giải quyết tranh chấp hợp đồng.

### 2. Các sai sót phổ biến trong điều khoản Trọng tài
- Soạn thảo điều khoản trọng tài bất khả thi (Pathological Clauses) như ghi sai tên trung tâm trọng tài.
- Không thỏa thuận rõ ràng về luật áp dụng, ngôn ngữ trọng tài và địa điểm xét xử.
- Lẫn lộn giữa cơ chế hòa giải thương mại và trọng tài bắt buộc.
    `,
    content_en: `
### 1. Growing Preference for Commercial Arbitration in Vietnam
Due to confidentiality, speed, and finality of arbitral awards, VIAC is increasingly trusted by FDI firms and local conglomerates to resolve contract disputes.

### 2. Common Pitfalls in Arbitration Clauses
- Pathological arbitration clauses (e.g. incorrect naming of arbitration centers).
- Ambiguity regarding governing law, arbitration language, and seat of arbitration.
- Conflating commercial mediation with mandatory arbitration procedures.
    `,
    pdfAttachment: {
      id: 'pdf-3',
      title: 'Mẫu Điều khoản Trọng tài Chuẩn & Danh mục Kiểm tra Hợp đồng (Checklist)',
      fileSize: '1.9 MB',
      pageCount: 12,
      docNumber: 'DIMAC-GUIDE-DISP-01',
      publishedYear: 2024,
      downloadUrl: '#download-dispute-guide',
      summaryText: 'Tài liệu hướng dẫn soạn thảo điều khoản trọng tài đa tầng (Multi-tier Dispute Resolution).'
    }
  },
  {
    id: 'art-4',
    title_vi: 'Chiến lược Tái cấu trúc Doanh nghiệp & Rà soát Tuân thủ Thuế dành cho FDI năm 2024 - 2025',
    title_en: 'Corporate Restructuring & Tax Compliance Audit Strategy for FDI Enterprises in 2024 - 2025',
    category: 'Thuế & Tài chính',
    tags: ['#ThuếDoanhNghiệp', '#ChuyểnGiá', '#FDI', '#TáiCấuTrúc'],
    isFlashAlert: false,
    status: 'published',
    publishDate: '2024-08-20',
    viewsCount: 1120,
    estimatedReadTime: '5 phút đọc',
    author: INITIAL_AUTHORS[2],
    summary_vi: 'Hướng dẫn kiểm soát rủi ro giao dịch liên kết, chuẩn bị hồ sơ chuyển giá (Transfer Pricing) và tối ưu hóa chi phí hợp lý khi cơ quan Thuế tăng cường thanh kiểm tra.',
    summary_en: 'Guidance on controlling related-party transaction risks, preparing transfer pricing documentation, and optimizing deductible expenses during enhanced tax audits.',
    content_vi: `
### 1. Xu hướng siết chặt kiểm tra Giao dịch liên kết
Cơ quan thuế các cấp đang đẩy mạnh thanh tra chuyên đề đối với các doanh nghiệp FDI có lỗ lũy kế nhưng vẫn mở rộng quy mô hoạt động hoặc phát sinh chi phí quản lý nội bộ tập đoàn lớn.

### 2. Các rủi ro thường bị truy thu thuế
- Chi phí bản quyền, phí nhượng quyền thương mại và phí hỗ trợ kỹ thuật không chứng minh được tính thực tế và lợi ích kinh tế trực tiếp.
- Lãi vay vượt mức trần 30% EBITDA theo Nghị định 132/2020/NĐ-CP.
    `,
    content_en: `
### 1. Tightening Supervision of Related-Party Transactions
Tax authorities are intensifying audits on FDI companies reporting consecutive tax losses while expanding manufacturing or incurring large group management service fees.

### 2. High-Risk Tax Clawback Areas
- Royalty fees, franchise fees, and tech support fees lacking tangible proof of economic benefits.
- Net loan interest expense exceeding 30% EBITDA cap under Decree 132/2020/ND-CP.
    `,
    pdfAttachment: {
      id: 'pdf-4',
      title: 'Sổ tay: Rà soát Hồ sơ Chuyển giá & Quản trị Rủi ro Thuế FDI',
      fileSize: '2.7 MB',
      pageCount: 18,
      docNumber: 'DIMAC-TAX-TP-24',
      publishedYear: 2024,
      downloadUrl: '#download-tax-handbook',
      summaryText: 'Quy trình 5 bước tự rà soát tuân thủ thuế trước đợt thanh tra doanh nghiệp.'
    }
  },
  {
    id: 'art-5',
    title_vi: 'Quản trị Quan hệ Lao động & Thỏa ước Lao động Tập thể: Bài học thực tiễn cho Doanh nghiệp Sản xuất',
    title_en: 'Labor Relations Management & Collective Bargaining: Practical Lessons for Manufacturing Plants',
    category: 'Lao động',
    tags: ['#LuậtLaoĐộng', '#NộiQuyLaoĐộng', '#HợpĐồngLaoĐộng'],
    isFlashAlert: false,
    status: 'published',
    publishDate: '2024-08-25',
    viewsCount: 940,
    estimatedReadTime: '4 phút đọc',
    author: INITIAL_AUTHORS[0],
    summary_vi: 'Kinh nghiệm đăng ký nội quy lao động, xử lý kỷ luật sa thải đúng trình tự pháp luật để tránh bồi thường thiệt hại tại Tòa án.',
    summary_en: 'Practices in labor regulation registration and lawful disciplinary dismissal procedures to avoid court compensation liabilities.',
    content_vi: `
### 1. Rủi ro pháp lý khi sa thải sai quy trình
Nhiều doanh nghiệp dù có lý do chính đáng nhưng vi phạm thủ tục mời họp xử lý kỷ luật hoặc không có chứng cứ vật chất cụ thể, dẫn đến bị Tòa tuyên hủy quyết định sa thải và buộc bồi thường tiền lương lớn.

### 2. Giải pháp phòng ngừa từ DIMAC
Xây dựng Bản Mô tả Công việc (JD) kèm KPI định lượng minh bạch và quy chế đánh giá mức độ hoàn thành công việc đã được đăng ký hợp pháp với cơ quan quản lý nhà nước.
    `,
    content_en: `
### 1. Legal Risks in Unlawful Disciplinary Dismissal
Many employers with valid causes fail procedural requirements (such as meeting invitation protocols or evidentiary documentation), resulting in court invalidation and heavy back-pay penalties.

### 2. Preventative Measures by DIMAC
Establish transparent job descriptions with quantitative KPIs and lawful performance evaluation policies registered with labor authorities.
    `
  },
  {
    id: 'art-6',
    title_vi: 'Cơ chế Mua bán Điện trực tiếp (DPPA) & Cấu trúc Đầu tư Năng lượng Tái tạo tại Việt Nam',
    title_en: 'Direct Power Purchase Agreement (DPPA) Mechanism & Renewable Energy Investment Structures in Vietnam',
    category: 'Năng lượng',
    tags: ['#DPPA', '#NăngLượngTáiTạo', '#ĐiệnMặtTrời', '#FDI', '#ESG'],
    isFlashAlert: true,
    status: 'published',
    publishDate: '2024-08-29',
    viewsCount: 3120,
    estimatedReadTime: '5 phút đọc',
    author: INITIAL_AUTHORS[0],
    summary_vi: 'Nghị định 80/2024/NĐ-CP chính thức mở đường cho cơ chế mua bán điện trực tiếp (DPPA) giữa đơn vị phát điện năng lượng tái tạo và khách hàng sử dụng điện lớn.',
    summary_en: 'Decree 80/2024/ND-CP officially establishes the Direct Power Purchase Agreement (DPPA) mechanism between renewable power generators and large corporate consumers.',
    content_vi: `
### 1. Ý nghĩa đột phá của Nghị định 80/2024/NĐ-CP
Cơ chế DPPA giải quyết bài toán tiêu thụ điện sạch cho các tập đoàn đa quốc gia cam kết trung hòa carbon (RE100, Net Zero 2050), đồng thời thu hút dòng vốn đầu tư quốc tế vào hạ tầng năng lượng xanh.

### 2. Hai mô hình giao dịch DPPA theo quy định
- **Giao dịch qua đường dây kết nối riêng:** Cho phép bên phát điện và khách hàng trực tiếp đầu tư đường dây và ký kết Hợp đồng mua bán điện không qua lưới điện quốc gia.
- **Giao dịch qua lưới điện quốc gia (Thị trường điện giao ngay):** Bên phát điện bán toàn bộ sản lượng lên thị trường điện và khách hàng ký Hợp đồng Kỳ hạn (CfD) với bên phát điện để bù trừ rủi ro giá.

### 3. Tư vấn từ Ban Năng lượng DIMAC Law Firm
Doanh nghiệp cần rà soát kỹ điều khoản bồi thường vi phạm (Take-or-Pay), phân bổ rủi ro quy hoạch và thỏa thuận chia sẻ chi phí dịch vụ truyền tải điện để tránh phát sinh tranh chấp.
    `,
    content_en: `
### 1. Strategic Impact of Decree 80/2024/ND-CP
The DPPA mechanism enables multinational enterprises to fulfill corporate sustainability mandates (RE100, Net Zero 2050) while catalyzing institutional capital inflows into Vietnam's clean energy sector.

### 2. Two Prescribed DPPA Models
- **Private Grid Connection Model:** Generators and private off-takers directly construct transmission lines and contract power deliveries independently.
- **National Grid Model (Wholesale Electricity Market):** Power is injected into the national grid with bilateral Contracts for Difference (CfD) to hedge spot market price fluctuations.

### 3. Recommendations from DIMAC Energy Practice
Corporates must rigorously structure Take-or-Pay liabilities, curtailment risk allocations, and wheeling charges to prevent future contract disputes.
    `,
    pdfAttachment: {
      id: 'pdf-6',
      title: 'Phân tích Pháp lý Chuyên sâu: Khung Hợp đồng DPPA & Khuyến nghị Nhà đầu tư (DIMAC Energy Team)',
      fileSize: '4.1 MB',
      pageCount: 28,
      docNumber: 'DIMAC-ENERGY-DPPA-2024',
      publishedYear: 2024,
      downloadUrl: '#download-dppa-guide',
      summaryText: 'Tài liệu hướng dẫn thẩm định và soạn thảo hợp đồng DPPA cho doanh nghiệp FDI tại Việt Nam.'
    }
  }
];

export const INITIAL_VOUCHERS: Voucher[] = [
  // 1. ENTERPRISE Exclusive Voucher
  {
    id: 'vouch-ent-ma2h',
    code: 'DIMAC-CORP-MA2H',
    title: 'Miễn phí 2 giờ tư vấn M&A cùng Luật sư Partner',
    title_en: 'Complimentary 2-Hour M&A Consultation with Partner Lawyer',
    description_vi: 'Đặc quyền dành riêng cho Khách hàng Doanh nghiệp / Tập đoàn: Miễn phí 02 giờ tư vấn chiến lược cấu trúc M&A, thẩm định pháp lý (Due Diligence) trực tiếp với Managing Partner.',
    description_en: 'Exclusive to Enterprise Clients: Free 2 hours of strategic M&A structuring & due diligence with Managing Partner.',
    type: 'SERVICE_GIFT',
    giftServiceTitle: 'Miễn phí 02 giờ tư vấn M&A chuyên sâu cùng Luật sư Partner',
    startDate: '2024-08-01',
    endDate: '2026-12-31',
    totalIssued: 100,
    usedCount: 24,
    userLimit: 1,
    minOrderValue: 50000000,
    applicableServices: ['Tư vấn M&A Doanh nghiệp', 'Thẩm định Pháp lý (Due Diligence)', 'Tái cấu trúc Vốn & FDI'],
    terms: [
      'Áp dụng độc quyền cho Khách hàng phân khúc ENTERPRISE có tài khoản định danh.',
      'Cần đăng ký lịch hẹn trước tối thiểu 48 giờ để Ban Thư ký sắp xếp lịch làm việc của Partner phụ trách M&A.',
      'Áp dụng tại trụ sở DIMAC (TP.HCM / Hà Nội / Đà Nẵng) hoặc phòng họp trực tuyến bảo mật cao cấp.'
    ],
    bannerGradient: 'from-[#0A2E1A] via-[#1B5E34] to-[#112216]',
    targetSegments: ['ENTERPRISE'],
    segmentBadgeVi: 'Đặc quyền Doanh nghiệp',
    segmentBadgeEn: 'Enterprise Exclusive'
  },
  // 2. SME Exclusive Voucher
  {
    id: 'vouch-sme-labor20',
    code: 'DIMAC-SME-LABOR20',
    title: 'Ưu đãi 20% gói soát xét Hợp đồng lao động & Nội quy',
    title_en: '20% Off Labor Contracts & Internal Regulations Review',
    description_vi: 'Dành riêng cho Doanh nghiệp vừa và nhỏ (SME): Giảm ngay 20% phí dịch vụ chuẩn hóa hệ thống hợp đồng lao động, thỏa ước lao động tập thể và nội quy doanh nghiệp.',
    description_en: 'Exclusively for SMEs: 20% discount on labor contract standardization, collective bargaining, and workplace regulations.',
    type: 'PERCENTAGE',
    discountPercentage: 20,
    maxDiscountAmount: 8000000,
    minOrderValue: 12000000,
    startDate: '2024-08-15',
    endDate: '2026-12-31',
    totalIssued: 150,
    usedCount: 38,
    userLimit: 1,
    applicableServices: ['Lao động & Việc làm', 'Nội quy Doanh nghiệp', 'Soạn thảo Hợp đồng'],
    terms: [
      'Áp dụng cho các doanh nghiệp quy mô SME đang hoạt động tại Việt Nam.',
      'Giảm tối đa 8.000.000 VNĐ trên tổng giá trị hợp đồng dịch vụ tư vấn lao động.',
      'Không quy đổi thành tiền mặt hoặc áp dụng đồng thời với ưu đãi khác.'
    ],
    bannerGradient: 'from-[#1A365D] via-[#2B6CB0] to-[#0F172A]',
    targetSegments: ['SME'],
    segmentBadgeVi: 'Ưu đãi SME',
    segmentBadgeEn: 'SME Advantage'
  },
  // 3. RETAINER_VIP Exclusive Voucher
  {
    id: 'vouch-vip-retainer30',
    code: 'DIMAC-VIP-RETAINER30',
    title: 'Đặc quyền cố vấn pháp lý 1-1 không giới hạn trong 30 ngày',
    title_en: 'Exclusive Unlimited 1-on-1 Legal Retainer for 30 Days',
    description_vi: 'Đặc quyền tối cao dành riêng cho Thân chủ Hợp đồng Thường xuyên VIP: Tiếp cận đường dây nóng ưu tiên và họp cố vấn pháp trị chiến lược trực tiếp không giới hạn trong 30 ngày.',
    description_en: 'Ultimate privilege for Retainer VIP Clients: Priority hotline and unlimited 1-on-1 strategic advisory sessions for 30 days.',
    type: 'SERVICE_GIFT',
    giftServiceTitle: 'Đặc quyền cố vấn pháp lý thường xuyên không giới hạn trong 30 ngày',
    startDate: '2024-07-01',
    endDate: '2026-12-31',
    totalIssued: 50,
    usedCount: 18,
    userLimit: 1,
    applicableServices: ['Cố vấn Pháp lý Thường xuyên (Retainer)', 'Quản trị Rủi ro HĐQT', 'Hỗ trợ Pháp lý Khẩn cấp'],
    terms: [
      'Chỉ dành cho các Thân chủ đang duy trì Hợp đồng Tư vấn Thường xuyên (Retainer Contract) gói VIP.',
      'Được phân bổ nhóm Luật sư Partner & Senior Associate túc trực phản hồi trong vòng 2 giờ.',
      'Bao gồm miễn phí rà soát nhanh 05 bộ hợp đồng thương mại phát sinh trong tháng.'
    ],
    bannerGradient: 'from-[#581C87] via-[#7E22CE] to-[#1E1B4B]',
    targetSegments: ['RETAINER_VIP'],
    segmentBadgeVi: 'Đặc quyền Retainer VIP',
    segmentBadgeEn: 'VIP Retainer Privilege'
  },
  // 4. Common Voucher for ALL segments
  {
    id: 'vouch-common-dispute10',
    code: 'DIMAC-DISPUTE10',
    title: 'Giảm 10% tư vấn giải quyết tranh chấp',
    title_en: '10% Off Dispute Resolution & Arbitration Services',
    description_vi: 'Ưu đãi chung cho mọi khách hàng: Giảm 10% phí dịch vụ tư vấn chiến lược giải quyết tranh chấp thương mại, đàm phán tiền tố tụng hoặc đại diện tại Trọng tài VIAC/SIAC.',
    description_en: 'Universal voucher: 10% discount on commercial dispute negotiation, arbitration at VIAC/SIAC, or court litigation advisory.',
    type: 'PERCENTAGE',
    discountPercentage: 10,
    maxDiscountAmount: 15000000,
    minOrderValue: 25000000,
    startDate: '2024-08-01',
    endDate: '2026-12-31',
    totalIssued: 300,
    usedCount: 62,
    userLimit: 1,
    applicableServices: ['Tranh chấp & Tố tụng', 'Trọng tài Thương mại VIAC', 'Đàm phán Hợp đồng'],
    terms: [
      'Áp dụng cho mọi phân khúc khách hàng (Doanh nghiệp, SME, Retainer VIP, Cá nhân).',
      'Mức giảm tối đa lên đến 15.000.000 VNĐ cho mỗi vụ việc tranh chấp mới.',
      'Vui lòng xuất trình mã hoặc đọc mã cho Luật sư trước khi ký kết hợp đồng dịch vụ.'
    ],
    bannerGradient: 'from-[#7F1D1D] via-[#A0322D] to-[#450A0A]',
    targetSegments: ['ALL', 'ENTERPRISE', 'SME', 'RETAINER_VIP', 'INDIVIDUAL'],
    segmentBadgeVi: 'Áp dụng Toàn bộ Khách hàng',
    segmentBadgeEn: 'All Clients'
  },
  // 5. ENTERPRISE - Additional
  {
    id: 'vouch-ent-fdi5m',
    code: 'DIMAC-ENT-FDI5M',
    title: 'Tặng 5.000.000 VNĐ gói Thẩm định Đầu tư FDI & Dự án KCN',
    title_en: 'VND 5,000,000 Grant for FDI Due Diligence & Industrial Zone Project',
    description_vi: 'Trợ cấp trực tiếp 5.000.000 VNĐ phí dịch vụ cho các Tập đoàn thực hiện thủ tục thẩm định đầu tư, xin cấp IRC/ERC hoặc thuê đất dự án tại các Khu kinh tế.',
    description_en: 'Direct VND 5,000,000 discount on legal services for investment licensing, industrial land lease, and cross-border transactions.',
    type: 'FIXED_AMOUNT',
    fixedDiscountAmount: 5000000,
    minOrderValue: 35000000,
    startDate: '2024-08-20',
    endDate: '2026-11-30',
    totalIssued: 80,
    usedCount: 19,
    userLimit: 1,
    applicableServices: ['Đầu tư', 'Thủ tục Cấp phép FDI', 'Bất động sản Công nghiệp'],
    terms: [
      'Áp dụng trực tiếp vào tổng hợp đồng dịch vụ tư vấn đầu tư FDI mới.',
      'Có giá trị chuyển giao giữa công ty mẹ và các công ty con trong cùng tập đoàn.'
    ],
    bannerGradient: 'from-[#064E3B] via-[#047857] to-[#022C22]',
    targetSegments: ['ENTERPRISE'],
    segmentBadgeVi: 'Đặc quyền Doanh nghiệp',
    segmentBadgeEn: 'Enterprise Exclusive'
  },
  // 6. SME - Additional
  {
    id: 'vouch-sme-tax30',
    code: 'DIMAC-SME-TAX30',
    title: 'Ưu đãi 30% gói Rà soát Tuân thủ Thuế & Quản trị Nội bộ',
    title_en: '30% Off Tax Compliance Review & Corporate Governance for SMEs',
    description_vi: 'Tối ưu hóa chi phí tuân thủ cho doanh nghiệp SMEs: Giảm 30% phí thẩm định rủi ro hóa đơn, thuế TNDN và các quy chế quản trị nội bộ trước mùa thanh tra.',
    description_en: 'Cost optimization for SMEs: 30% discount on tax audit preparation, corporate governance policies, and statutory compliance.',
    type: 'PERCENTAGE',
    discountPercentage: 30,
    maxDiscountAmount: 6000000,
    minOrderValue: 10000000,
    startDate: '2024-08-10',
    endDate: '2026-12-31',
    totalIssued: 120,
    usedCount: 45,
    userLimit: 1,
    applicableServices: ['Thuế & Tài chính', 'Doanh nghiệp', 'Rà soát Tuân thủ'],
    terms: [
      'Áp dụng cho khách hàng phân khúc SME.',
      'Giảm tối đa 6.000.000 VNĐ cho một đợt rà soát hồ sơ doanh nghiệp.'
    ],
    bannerGradient: 'from-[#0C4A6E] via-[#0284C7] to-[#082F49]',
    targetSegments: ['SME'],
    segmentBadgeVi: 'Ưu đãi SME',
    segmentBadgeEn: 'SME Advantage'
  },
  // 7. INDIVIDUAL Exclusive Voucher
  {
    id: 'vouch-indiv-wealth',
    code: 'DIMAC-INDIV-WEALTH',
    title: 'Tặng 01 buổi Hoạch định Cấu trúc Tài sản & Thừa kế Cổ phần',
    title_en: 'Complimentary Family Wealth & Share Succession Planning Session',
    description_vi: 'Đặc quyền dành cho Khách hàng Cá nhân / Nhà đầu tư: 01 buổi tư vấn chuyên biệt về hoạch định tài sản gia đình, chuyển giao cổ phần cho thế hệ kế thừa và bảo vệ quyền sở hữu.',
    description_en: 'Exclusive for Individual Clients: Free consultation on family wealth structuring, equity succession, and property protection.',
    type: 'SERVICE_GIFT',
    giftServiceTitle: 'Miễn phí 01 buổi tư vấn cấu trúc tài sản cá nhân & thừa kế cổ phần',
    startDate: '2024-08-01',
    endDate: '2026-12-31',
    totalIssued: 100,
    usedCount: 22,
    userLimit: 1,
    applicableServices: ['Thừa kế & Tài sản', 'Đầu tư Cá nhân', 'Hợp đồng Dân sự'],
    terms: [
      'Dành riêng cho khách hàng cá nhân đăng ký tài khoản DIMAC Legal App.',
      'Buổi làm việc trực tiếp hoặc online bảo mật 100% theo đạo đức nghề luật sư.'
    ],
    bannerGradient: 'from-[#78350F] via-[#B45309] to-[#451A03]',
    targetSegments: ['INDIVIDUAL'],
    segmentBadgeVi: 'Khách hàng Cá nhân',
    segmentBadgeEn: 'Individual Privilege'
  },
  // 8. Universal Voucher (ALL)
  {
    id: 'vouch-common-draft15',
    code: 'DIMAC-COMMON15',
    title: 'Giảm 15% Dịch vụ Soạn thảo & Rà soát Hợp đồng Thương mại',
    title_en: '15% Off Commercial Contract Drafting & Vetting',
    description_vi: 'Ưu đãi phổ thông: Giảm 15% phí luật sư soạn thảo hoặc rà soát hợp đồng mua bán, hợp tác kinh doanh, phân phối đại lý và dịch vụ thương mại.',
    description_en: 'General offer: 15% off drafting or reviewing commercial contracts, JV agreements, and distribution terms.',
    type: 'PERCENTAGE',
    discountPercentage: 15,
    maxDiscountAmount: 5000000,
    minOrderValue: 8000000,
    startDate: '2024-07-01',
    endDate: '2026-12-31',
    totalIssued: 250,
    usedCount: 88,
    userLimit: 1,
    applicableServices: ['Doanh nghiệp', 'Rà soát Hợp đồng Thương mại'],
    terms: [
      'Áp dụng chung cho toàn bộ người dùng ứng dụng DIMAC.',
      'Thời hạn sử dụng linh hoạt trong suốt năm 2026.'
    ],
    bannerGradient: 'from-[#14532D] via-[#15803D] to-[#052E16]',
    targetSegments: ['ALL', 'ENTERPRISE', 'SME', 'RETAINER_VIP', 'INDIVIDUAL'],
    segmentBadgeVi: 'Ưu đãi Phổ thông',
    segmentBadgeEn: 'General Voucher'
  },
  // 9. Expired Mock Voucher
  {
    id: 'vouch-expired-test',
    code: 'DIMAC-EXPIRED-2024',
    title: 'Ưu đãi Khởi động Pháp lý Quý 1/2024 (Đã hết hạn)',
    title_en: 'Q1/2024 Legal Kickoff Voucher (Expired)',
    description_vi: 'Chương trình ưu đãi đã kết thúc thời gian áp dụng vào ngày 30/06/2024.',
    type: 'PERCENTAGE',
    discountPercentage: 15,
    maxDiscountAmount: 3000000,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    totalIssued: 100,
    usedCount: 94,
    userLimit: 1,
    applicableServices: ['Doanh nghiệp'],
    terms: ['Mã này đã kết thúc thời gian áp dụng.'],
    bannerGradient: 'from-[#334155] via-[#475569] to-[#1E293B]',
    targetSegments: ['ALL'],
    segmentBadgeVi: 'Đã hết hạn',
    segmentBadgeEn: 'Expired'
  }
];

export const INITIAL_USER_VOUCHERS: UserVoucherItem[] = [
  {
    id: 'uv-1',
    voucherId: 'vouch-ent-ma2h',
    voucher: INITIAL_VOUCHERS[0],
    status: 'AVAILABLE',
    claimedAt: '2024-08-20'
  },
  {
    id: 'uv-2',
    voucherId: 'vouch-common-dispute10',
    voucher: INITIAL_VOUCHERS[3],
    status: 'AVAILABLE',
    claimedAt: '2024-08-22'
  },
  {
    id: 'uv-3',
    voucherId: 'vouch-ent-fdi5m',
    voucher: INITIAL_VOUCHERS[4],
    status: 'AVAILABLE',
    claimedAt: '2024-08-25'
  },
  {
    id: 'uv-4',
    voucherId: 'vouch-common-draft15',
    voucher: INITIAL_VOUCHERS[7],
    status: 'USED',
    claimedAt: '2024-08-05',
    usedAt: '2024-08-18',
    verifiedBy: 'LS. Phạm Quốc Tuấn (Managing Partner)',
    orderRef: 'DIMAC-CONTRACT-2024-088'
  },
  {
    id: 'uv-5',
    voucherId: 'vouch-expired-test',
    voucher: INITIAL_VOUCHERS[8],
    status: 'EXPIRED',
    claimedAt: '2024-02-10'
  }
];

export const INITIAL_PUSH_NOTIFICATIONS: PushNotificationItem[] = [
  {
    id: 'push-1',
    title: '⚡ Flash Alert: Nghị định 10/2024/NĐ-CP về Khu Công Nghiệp',
    body: 'Nhiều chính sách ưu đãi đột phá cho nhà đầu tư hạ tầng và dự án FDI vừa được ban hành. Xem ngay phân tích chi tiết.',
    type: 'breaking_alert',
    targetAudience: 'all',
    targetCategory: 'Đầu tư',
    deepLink: { type: 'article', targetId: 'art-1', label: 'Xem bài viết' },
    createdAt: '2024-07-28T09:00:00Z',
    isRead: false,
    sentCount: 12500,
    openCount: 5210
  },
  {
    id: 'push-2',
    title: '🎁 Quà tặng VIP: Tặng Voucher 20% Rà soát Hợp đồng Doanh nghiệp',
    body: 'DIMAC gửi tặng quý doanh nghiệp mã DIMAC-MA20 giảm tối đa 10.000.000 VNĐ. Đã lưu vào Ví E-Voucher của bạn.',
    type: 'promotion_alert',
    targetAudience: 'enterprise_leads',
    deepLink: { type: 'voucher', targetId: 'vouch-1', label: 'Mở Ví Voucher' },
    createdAt: '2024-08-20T14:30:00Z',
    isRead: false,
    sentCount: 4800,
    openCount: 2310
  },
  {
    id: 'push-3',
    title: '📰 Weekly Legal Digest: Điểm tin Pháp lý Trọng điểm Tuần 34',
    body: 'Tổng hợp phân tích Luật Đất đai 2024, lưu ý thuế chuyển giá và cẩm nang giải quyết tranh chấp tại VIAC.',
    type: 'weekly_digest',
    targetAudience: 'all',
    deepLink: { type: 'article', targetId: 'art-2', label: 'Đọc điểm tin' },
    createdAt: '2024-08-24T08:00:00Z',
    isRead: true,
    sentCount: 15400,
    openCount: 6890
  },
  {
    id: 'push-4',
    title: '📅 Xác nhận Lịch hẹn Tư vấn: LS. Lê Thanh Hòa',
    body: 'Yêu cầu tư vấn M&A của Quý công ty đã được xác nhận vào lúc 09:30 Thứ 5. Luật sư sẽ liên hệ trực tiếp.',
    type: 'personal_message',
    targetAudience: 'in_house_counsel',
    deepLink: { type: 'consultation', label: 'Xem chi tiết lịch hẹn' },
    createdAt: '2024-08-28T16:00:00Z',
    isRead: true,
    sentCount: 1,
    openCount: 1
  }
];

export const DEMO_ACCOUNTS: Record<CustomerSegment, UserProfile> = {
  ENTERPRISE: {
    id: 'usr-ent-01',
    fullName: 'Trần Minh Tuấn',
    email: 'tuan.tran@vanguard-corp.vn',
    phone: '0909 123 456',
    enterpriseName: 'Tập đoàn Đầu tư & Công nghệ Vanguard (Vanguard Group)',
    position: 'Trưởng ban Pháp chế & Đầu tư (Head of Legal)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    customerTier: 'VIP',
    segment: 'ENTERPRISE',
    language: 'vi',
    contractCode: 'DIMAC-CORP-2024-889',
    taxCode: '0102938475',
    retainerPackage: 'Cố vấn M&A, Dự án FDI & Quản trị Rủi ro Doanh nghiệp',
    savedArticleIds: ['art-1', 'art-2', 'art-6'],
    notificationPrefs: {
      breakingAlerts: true,
      weeklyDigest: true,
      promotions: true,
      consultationUpdates: true,
      subscribedCategories: {
        'M&A': true,
        'Đầu tư': true,
        'Bất động sản': true,
        'Năng lượng': true,
        'Tranh chấp & Tố tụng': true,
        'Lao động': false,
        'Thuế & Tài chính': true,
        'Doanh nghiệp': true
      }
    }
  },
  SME: {
    id: 'usr-sme-02',
    fullName: 'Vũ Hải Yến',
    email: 'yen.vu@ecotrans-logistics.vn',
    phone: '0918 333 789',
    enterpriseName: 'Công ty CP Logistics Thông minh EcoTrans',
    position: 'Tổng Giám đốc (CEO & Co-founder)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    customerTier: 'ENTERPRISE',
    segment: 'SME',
    language: 'vi',
    contractCode: 'DIMAC-SME-2025-014',
    taxCode: '0316789123',
    retainerPackage: 'Gói Đồng hành Pháp lý Doanh nghiệp Vừa & Nhỏ (SME Guard)',
    savedArticleIds: ['art-1', 'art-5'],
    notificationPrefs: {
      breakingAlerts: true,
      weeklyDigest: true,
      promotions: true,
      consultationUpdates: true,
      subscribedCategories: {
        'M&A': false,
        'Đầu tư': true,
        'Bất động sản': false,
        'Năng lượng': false,
        'Tranh chấp & Tố tụng': true,
        'Lao động': true,
        'Thuế & Tài chính': true,
        'Doanh nghiệp': true
      }
    }
  },
  RETAILER: {
    id: 'usr-retail-05',
    fullName: 'Rachel Schneider',
    email: 'rachel@schneider-retail.vn',
    phone: '0988 554 321',
    enterpriseName: 'Schneider Retail & Convenience Chain Vietnam',
    position: 'Giám đốc Chuỗi Bán lẻ (Retail Director)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    customerTier: 'ENTERPRISE',
    segment: 'RETAILER',
    language: 'vi',
    contractCode: 'DIMAC-RETAIL-2025-089',
    taxCode: '0318992211',
    retainerPackage: 'Gói Pháp lý Chuỗi Bán lẻ & Nhượng quyền Thương mại',
    savedArticleIds: ['art-1', 'art-2'],
    notificationPrefs: {
      breakingAlerts: true,
      weeklyDigest: true,
      promotions: true,
      consultationUpdates: true,
      subscribedCategories: {
        'M&A': true,
        'Đầu tư': true,
        'Bất động sản': true,
        'Năng lượng': false,
        'Tranh chấp & Tố tụng': true,
        'Lao động': true,
        'Thuế & Tài chính': true,
        'Doanh nghiệp': true
      }
    }
  },
  RETAINER_VIP: {
    id: 'usr-vip-03',
    fullName: 'Nguyễn Hoàng Khang',
    email: 'khang.nguyen@k-holding.vn',
    phone: '0903 888 999',
    enterpriseName: 'Khang Dien Energy & Infrastructure Holding',
    position: 'Chủ tịch Hội đồng Quản trị',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    customerTier: 'VIP',
    segment: 'RETAINER_VIP',
    language: 'vi',
    contractCode: 'DIMAC-RETAINER-VIP-001',
    taxCode: '0301122334',
    retainerPackage: 'Đặc quyền Cố vấn Thường xuyên Diamond Retainer (24/7 Hotline & Partner Priority)',
    savedArticleIds: ['art-1', 'art-2', 'art-6'],
    notificationPrefs: {
      breakingAlerts: true,
      weeklyDigest: true,
      promotions: true,
      consultationUpdates: true,
      subscribedCategories: {
        'M&A': true,
        'Đầu tư': true,
        'Bất động sản': true,
        'Năng lượng': true,
        'Tranh chấp & Tố tụng': true,
        'Lao động': true,
        'Thuế & Tài chính': true,
        'Doanh nghiệp': true
      }
    }
  },
  INDIVIDUAL: {
    id: 'usr-indiv-04',
    fullName: 'Lê Bảo Quốc',
    email: 'quoc.le.investor@gmail.com',
    phone: '0977 555 123',
    enterpriseName: 'Nhà đầu tư Cá nhân (HNWI)',
    position: 'Nhà đầu tư Thiên thần / Cổ đông Sáng lập',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    customerTier: 'LEAD',
    segment: 'INDIVIDUAL',
    language: 'vi',
    contractCode: 'DIMAC-INDIV-2026-90',
    taxCode: '8019283746',
    retainerPackage: 'Tư vấn Hoạch định Cấu trúc Tài sản & Hợp đồng Dân sự',
    savedArticleIds: ['art-2'],
    notificationPrefs: {
      breakingAlerts: true,
      weeklyDigest: true,
      promotions: true,
      consultationUpdates: false,
      subscribedCategories: {
        'M&A': true,
        'Đầu tư': true,
        'Bất động sản': true,
        'Năng lượng': false,
        'Tranh chấp & Tố tụng': true,
        'Lao động': false,
        'Thuế & Tài chính': true,
        'Doanh nghiệp': false
      }
    }
  }
};

export const INITIAL_USER_PROFILE: UserProfile = DEMO_ACCOUNTS.ENTERPRISE;

export const INITIAL_LEADS: ConsultationLead[] = [
  {
    id: 'lead-1',
    customerName: 'Trần Minh Tuấn',
    phone: '0909 123 456',
    email: 'tuan.tran@vanguard-corp.vn',
    enterpriseName: 'Tập đoàn Đầu tư & Công nghệ Vanguard',
    position: 'Trưởng ban Pháp chế',
    practiceArea: 'M&A',
    serviceDetail: 'Tư vấn Thẩm định Pháp lý (LDD) cho thương vụ thâu tóm 65% cổ phần dự án Logistics tại Hải Phòng.',
    notes: 'Khách hàng VIP đã sử dụng mã voucher DIMAC-PARTNER1H để đặt lịch với LS. Lê Thanh Hòa.',
    appliedVoucherCode: 'DIMAC-PARTNER1H',
    status: 'IN_PROGRESS',
    createdAt: '2024-08-28T15:20:00Z',
    assignedLawyerName: 'LS. Lê Thanh Hòa',
    assignedLawyerId: 'lawyer-1',
    priority: 'URGENT',
    customerSegment: 'ENTERPRISE'
  },
  {
    id: 'lead-2',
    customerName: 'Ms. Rachel Schneider',
    phone: '0988 554 321',
    email: 'rachel@schneider-energy.de',
    enterpriseName: 'Schneider Retail & Convenience Chain Vietnam',
    position: 'Giám đốc Chuỗi Bán Lẻ (Retail Director)',
    practiceArea: 'Doanh nghiệp',
    serviceDetail: 'Tư vấn mở rộng hệ thống 50 chuỗi cửa hàng bán lẻ tiện lợi, xin Giấy phép cơ sở bán lẻ (ENT) và hợp đồng nhượng quyền.',
    notes: 'Yêu cầu tư vấn song ngữ Anh - Việt. Cần hoàn tất thẩm định mặt bằng bán lẻ trong tháng này.',
    appliedVoucherCode: 'DIMAC-MA20',
    status: 'NEW',
    createdAt: '2024-08-30T10:15:00Z',
    assignedLawyerName: 'LS. Lê Thanh Hòa',
    assignedLawyerId: 'lawyer-1',
    priority: 'HIGH',
    customerSegment: 'RETAILER'
  },
  {
    id: 'lead-3',
    customerName: 'Hoàng Kim Long',
    phone: '0912 333 789',
    email: 'long.hk@vietphat-realty.vn',
    enterpriseName: 'Công ty Cổ phần Địa ốc & Năng lượng Việt Phát',
    position: 'Chủ tịch HĐQT',
    practiceArea: 'Bất động sản',
    serviceDetail: 'Rà soát pháp lý chuyển nhượng dự án khu đô thị 12ha theo Luật Đất đai 2024. Đang duy trì gói Cố vấn thường xuyên Diamond.',
    notes: 'Đã hoàn tất tư vấn sơ bộ, đang chuẩn bị Phụ lục Hợp đồng dịch vụ pháp lý chính thức.',
    appliedVoucherCode: 'DIMAC-VIP-RETAINER30',
    status: 'SIGNED',
    createdAt: '2024-08-18T09:00:00Z',
    assignedLawyerName: 'LS. Trần Quỳnh Mai',
    assignedLawyerId: 'lawyer-2',
    priority: 'NORMAL',
    customerSegment: 'RETAINER_VIP'
  },
  {
    id: 'lead-4',
    customerName: 'Vũ Hải Yến',
    phone: '0918 333 789',
    email: 'yen.vu@ecotrans-logistics.vn',
    enterpriseName: 'Công ty Cổ phần Logistics Thông minh EcoTrans',
    position: 'Tổng Giám đốc (CEO)',
    practiceArea: 'Lao động',
    serviceDetail: 'Chuẩn hóa thỏa ước lao động tập thể, nội quy công ty và thang bảng lương cho 180 nhân sự.',
    notes: 'Khách hàng phân khúc SME đã kích hoạt voucher giảm 20% gói lao động.',
    appliedVoucherCode: 'DIMAC-SME-LABOR20',
    status: 'NEW',
    createdAt: '2024-08-31T08:45:00Z',
    assignedLawyerName: 'LS. Nguyễn Đình Trung',
    assignedLawyerId: 'lawyer-4',
    priority: 'NORMAL',
    customerSegment: 'SME'
  },
  {
    id: 'lead-5',
    customerName: 'Lê Bảo Quốc',
    phone: '0977 555 123',
    email: 'quoc.le.investor@gmail.com',
    enterpriseName: 'Nhà đầu tư Cá nhân (HNWI)',
    position: 'Nhà đầu tư Bất động sản / Cổ đông sáng lập',
    practiceArea: 'Tranh chấp & Tố tụng',
    serviceDetail: 'Tư vấn giải quyết tranh chấp hợp đồng đặt cọc mua bán bất động sản triệu đô và cơ cấu tài sản gia đình.',
    notes: 'Khách hàng cá nhân cần bảo mật cao. Hẹn gặp trực tiếp tại văn phòng DIMAC.',
    appliedVoucherCode: 'DIMAC-DISPUTE10',
    status: 'IN_PROGRESS',
    createdAt: '2024-08-29T14:10:00Z',
    assignedLawyerName: 'LS. Phạm Quốc Tuấn',
    assignedLawyerId: 'lawyer-3',
    priority: 'HIGH',
    customerSegment: 'INDIVIDUAL'
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalArticles: 14,
  totalViews: 38920,
  totalPushSent: 68500,
  averagePushOpenRate: 42.8,
  totalVouchersIssued: 550,
  totalVouchersUsed: 213,
  activeLeadsCount: 18
};
