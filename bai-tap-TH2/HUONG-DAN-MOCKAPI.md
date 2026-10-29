# Kết nối MockAPI

Kho hiện tại đã có 20 sách: https://6ad8d859f89c5702ed9a3331.mockapi.io/books

| Dự án | Cấu hình |
| --- | --- |
| phan-a-javascript | api-config.js |
| phan-a-typescript | api-config.ts |
| phan-b-react | Không gọi API; dữ liệu ở src/books.js theo đề |

Để tạo kho khác, đăng nhập mockapi.io, vào dự án và tạo resource books. Giữ id mặc định; thêm title, author, genre kiểu String và year kiểu Number. Sao chép URL resource đầy đủ kết thúc bằng /books, thay BOOKS_API_URL trong cấu hình của phần muốn dùng. Mỗi phần A có cấu hình riêng để chạy độc lập.

POST gửi JSON gồm title, author, genre, year và lấy id từ phản hồi. DELETE gửi đến URL /books/:id sau khi người dùng xác nhận. Mã kiểm tra response.ok, dữ liệu trả về và giới hạn thời gian chờ 15 giây. Khi lỗi không tự thay kho bằng dữ liệu mẫu.

Đổi URL thành chuỗi rỗng để lấy src/books.json. Khi dùng JSON, thêm/xóa chỉ có hiệu lực trong phiên; tải lại sẽ lấy dữ liệu gốc. Yêu thích và sáng/tối lưu vào localStorage.

Sau khi đổi cấu hình, chạy npm run build trong đúng phần để cập nhật Thu-vien.html. Kho hiện tại đã có dữ liệu, không nạp lại 20 sách để tránh trùng. Đây là dữ liệu minh họa, không lưu thông tin cá nhân hoặc thông tin mật.

Nguồn: [Quick start guide chính thức](https://github.com/mockapi-io/docs/wiki/Quick-start-guide).
