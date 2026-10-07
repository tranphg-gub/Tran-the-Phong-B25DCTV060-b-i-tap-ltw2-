# Bài tập React — Trần Thế Phong

Mã sinh viên: **B25DCTV060**

## Chạy dự án

```bash
npm install
npm run dev
```

## Nội dung

### 1. Virtual Calculator

- `CalculatorDisplay` hiển thị biểu thức và kết quả.
- `CalculatorButton` nhận nội dung, kiểu nút và hàm xử lý qua props.
- State lưu số hiện tại, toán tử, số trung gian và trạng thái nhập.
- Hỗ trợ cộng, trừ, nhân, chia, số thập phân, đổi dấu, phần trăm, xóa và bằng.
- Có xử lý trường hợp chia cho 0.

### 2. CV bằng React

- CV được chia thành nhiều component: `CVPage`, `Hero`, `Section`, `SkillGrid`, `ProjectList`, `ContactForm`.
- Dữ liệu kỹ năng và dự án nằm trong các mảng tại `src/data/portfolio.js`.
- Dữ liệu được truyền qua props; `Section` nhận nội dung qua `children`.
- Có tìm kiếm/lọc dự án, dark mode và kiểm tra biểu mẫu liên hệ.

## Build

```bash
npm run build
```
