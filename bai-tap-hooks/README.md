# Quản lý sinh viên bằng Hooks

Chạy `npm install` rồi `npm run dev` trong thư mục này. Build bằng `npm run build`.

Tạo resource students trên MockAPI với các trường studentCode, name, email, className kiểu String. Dán URL HTTPS của resource vào phần Kết nối dữ liệu. Ứng dụng không chứa URL hoặc dữ liệu giả mặc định.

Các chức năng: tải danh sách qua useFetch, thêm/sửa/xóa qua API, tìm kiếm, kiểm tra trường bắt buộc và mã trùng trong danh sách hiện tại. ThemeContext quản lý sáng/tối và lưu lựa chọn trên trình duyệt. Có trạng thái tải, lỗi và xác nhận xóa. Không có icon hoặc comment trong mã nguồn bài này.

Chưa có mã bài Buổi 8 và endpoint thực tế để đối chiếu yêu cầu gốc hoặc kiểm thử với dữ liệu thật. Kiểm tra mã trùng phía trình duyệt không thay thế ràng buộc duy nhất phía máy chủ.
