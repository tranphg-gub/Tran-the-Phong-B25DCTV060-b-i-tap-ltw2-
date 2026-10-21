# Bài tập Buổi 8

## Chạy bài

Trong thư mục bai-tap-buoi-8 chạy:

```
npm install
npm run dev
```

Build: `npm run build`.

## Nội dung

- React Class Components, không dùng Hooks.
- Thêm, sửa, xóa sinh viên; tìm theo tên không phân biệt hoa thường.
- GPA bắt buộc là số trong khoảng 0 đến 4; mã sinh viên không trùng trong danh sách.
- Xóa có hộp xác nhận; danh sách dùng id ổn định làm key.
- Clock cập nhật mỗi giây, Ẩn/Hiện để quan sát mount/unmount; log các phương thức lifecycle đã triển khai trong Console.
- Nút đếm dùng setState dạng hàm và cập nhật document.title.
- Ba ghi chú Class vs Hooks hiển thị ngay trên trang.

Dữ liệu sinh viên được giữ trong state và mất khi tải lại trang. Đề ảnh Buổi 8 không yêu cầu MockAPI. Chưa có mã bài tại lớp để đối chiếu thêm các trường hoặc hành vi ngoài ảnh.

Trong môi trường development, StrictMode có thể gọi render và chu trình mount/dọn nhiều lần để kiểm tra tác dụng phụ. Đây là lý do một số log xuất hiện lặp.

## Kiểm tra khi chạy

Thêm GPA 0 và 4 phải thành công; -1, 4.1 và trường trống bị chặn. Thử mã trùng, sửa, hủy sửa, tìm tên, hủy xác nhận xóa và xác nhận xóa. Ẩn/hiện đồng hồ rồi xem Console; bấm đếm và quan sát tiêu đề tab. Kiểm tra trang ở màn hình hẹp.
