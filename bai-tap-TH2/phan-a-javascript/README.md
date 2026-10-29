# Phần A — JavaScript thuần

Đây là dự án độc lập, có package.json, mã nguồn và dữ liệu riêng; không cần thư mục của hai phần còn lại.

## Xem ngay

Tải mã nguồn về, nhấp đúp Thu-vien.html trong thư mục này. Không mở đường dẫn localhost nếu chưa chạy máy chủ. Bản React có sẵn 20 sách trong src/books.js và không gọi API. Bản JS/TS cần Internet để lấy sách từ MockAPI.

## Chạy và sửa mã nguồn

Cài Node.js 22.12 trở lên, mở terminal tại thư mục này:

```sh
npm install
npm run dev
```

Địa chỉ mặc định: http://127.0.0.1:5173/. Giữ terminal đang chạy khi sử dụng địa chỉ này. Có pnpm thì dùng pnpm install và pnpm dev.

## Build

```sh
npm run build
npm run preview
```

Build tạo dist và cập nhật Thu-vien.html. Nếu thay mã nguồn hoặc URL API, cần build lại để cập nhật bản mở nhanh.

## Dữ liệu và chức năng

URL MockAPI ở api-config.js. Có GET, POST, DELETE; tạo thẻ sách bằng createElement/textContent; event delegation; JSON/localStorage; validate form và hỏi xác nhận trước khi xóa. Bỏ URL về chuỗi rỗng để dùng src/books.json trong phiên hiện tại.

Có 20 sách mẫu thuộc 3 thể loại. Ba sách gợi ý hiển thị ngay đầu trang; bấm bìa để tìm đúng sách. Tìm kiếm hỗ trợ không dấu. Sáng/tối và yêu thích lưu ở trình duyệt. Bìa chữ được tự thiết kế bằng CSS; dữ liệu dùng cho bài tập, chưa đối chiếu ISBN/ấn bản.

Xem ../README.md để đối chiếu đề và so sánh các phần. File đó chỉ là tài liệu, ứng dụng không phụ thuộc vào nó.
