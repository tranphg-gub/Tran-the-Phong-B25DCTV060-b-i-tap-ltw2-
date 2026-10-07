export const skills = [
  {
    id: 'teaching',
    icon: 'Aa',
    title: 'Giảng dạy & sư phạm',
    description: 'Thiết kế lộ trình, đơn giản hóa kiến thức khó và phản hồi theo tiến độ học sinh.',
    tags: ['Thiết kế bài học', 'Đánh giá năng lực', 'Học liệu số'],
  },
  {
    id: 'content',
    icon: '▶',
    title: 'Nội dung video',
    description: 'Phát triển ý tưởng, kịch bản và quy trình sản xuất nội dung giáo dục cho nền tảng số.',
    tags: ['Storytelling', 'Kịch bản ngắn', 'Hậu kỳ nội dung'],
  },
  {
    id: 'web',
    icon: '</>',
    title: 'Phát triển web',
    description: 'Xây giao diện responsive và sản phẩm học tập chạy tốt trên nhiều thiết bị.',
    tags: ['React', 'HTML / CSS / JS', 'UI/UX'],
  },
  {
    id: 'ai',
    icon: 'AI',
    title: 'Nghiên cứu AI',
    description: 'Khảo sát công cụ, thử nghiệm quy trình và đánh giá khả năng ứng dụng AI thực tế.',
    tags: ['Prompt design', 'Tự động hóa', 'Đánh giá đầu ra'],
  },
]

export const projects = [
  {
    id: 1,
    code: 'LW',
    title: 'Nền tảng học tập cá nhân',
    description: 'Không gian học mỗi ngày, theo dõi tiến độ và ôn tập theo kế hoạch cá nhân.',
    categories: ['education', 'technology'],
    label: 'Giáo dục · Web',
  },
  {
    id: 2,
    code: '60″',
    title: 'Chuỗi video kiến thức ngắn',
    description: 'Biến chủ đề khó thành kịch bản cô đọng, trực quan và phù hợp mạng xã hội.',
    categories: ['content', 'education'],
    label: 'Nội dung · Giáo dục',
  },
  {
    id: 3,
    code: 'AI',
    title: 'Trợ lý nghiên cứu tài liệu',
    description: 'Quy trình khai thác nguồn, tổng hợp có truy vết và kiểm tra thông tin trước khi sử dụng.',
    categories: ['technology'],
    label: 'AI · Công nghệ',
  },
  {
    id: 4,
    code: 'Q?',
    title: 'Bộ học liệu tương tác',
    description: 'Bài học, câu hỏi và phản hồi được tổ chức thành trải nghiệm học rõ ràng trên điện thoại.',
    categories: ['education', 'content'],
    label: 'Giáo dục · Nội dung',
  },
]

export const filters = [
  { value: 'all', label: 'Tất cả' },
  { value: 'education', label: 'Giáo dục' },
  { value: 'content', label: 'Nội dung' },
  { value: 'technology', label: 'Công nghệ' },
]
