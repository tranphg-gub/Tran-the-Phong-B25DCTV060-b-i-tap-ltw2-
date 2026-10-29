# TH2 — Thư viện lớp học

Ba dự án độc lập, được tách từ bài thư viện Góc Đọc. Mỗi dự án có package.json, index.html, style.css, src/, script build và dữ liệu riêng. Không dùng liên kết mã nguồn hay tài nguyên sang dự án bên cạnh.

| Phần | Thư mục | Dữ liệu | Cổng chạy mặc định |
| --- | --- | --- | --- |
| A — JavaScript thuần | phan-a-javascript | MockAPI hoặc src/books.json | 5173 |
| A nâng cao — TypeScript | phan-a-typescript | MockAPI hoặc src/books.json | 5174 |
| B — React cơ bản | phan-b-react | src/books.js, không gọi API | 5175 |

## Cách mở

**Xem ngay:** tải repository về máy, vào một trong ba thư mục và nhấp đúp Thu-vien.html. Không cần cài thư viện để xem bản đóng gói. Link file HTML trên GitHub chỉ hiển thị mã nguồn; cần tải file về trước.

**Chạy mã nguồn:** mở terminal trong thư mục của đúng phần muốn chạy:

```sh
npm install
npm run dev
```

Cài Node.js 22.12 trở lên. Nếu dùng pnpm, chạy pnpm install và pnpm dev. Giữ terminal mở khi truy cập địa chỉ localhost. Ba phần dùng ba cổng khác nhau nên có thể chạy đồng thời.

**Build:** npm run build tạo dist/ và cập nhật Thu-vien.html. Bản TypeScript còn có npm run check. Sau khi sửa mã hoặc URL MockAPI, cần build lại để cập nhật bản mở nhanh.

## Đối chiếu đề

| Yêu cầu | Cách thực hiện |
| --- | --- |
| A: semantic, Flexbox, responsive, chia module | HTML từng dự án; style.css; src/api, render, storage, validation, search, main |
| A: fetch + async/await, trạng thái tải/lỗi | api và init trong main; nút Thử lại |
| A: createElement và textContent | render; không dùng innerHTML |
| A: tìm khi gõ, thể loại bằng Set, kết hợp điều kiện, x/y | search, renderGenres và render trong main |
| A: yêu thích/Xóa event delegation, localStorage, header đếm, xác nhận xóa | Một listener trên #book-list; storage; dialog Giữ lại/Xóa sách |
| A: validate nhập và gửi | Tên >= 3 ký tự; tác giả bắt buộc; chọn thể loại; năm nguyên 1900–năm hiện tại; lỗi dưới ô |
| A: thêm vào đầu; POST nếu dùng MockAPI | createBook rồi unshift khi API thành công |
| Nâng cao: TypeScript, DELETE MockAPI, sáng/tối | phan-a-typescript; deleteBook; setupTheme |
| B: Vite, file JS dữ liệu riêng, chưa gọi API | package.json; src/books.js |
| B: Header, Section(children), GenreFilter, BookList, BookCard, Footer | src/components/; App dùng Section bao nội dung |
| B: props, key, App giữ state và truyền hàm; header đếm | App → Header/GenreFilter/BookList → BookCard; key theo id |
| B: lọc bằng nút | GenreFilter; selectedGenre trong App |
| README so sánh A/B | Bảng bên dưới |

Giao diện có 20 sách mẫu, 3 thể loại; ba bìa sách gợi ý ở đầu trang; tìm kiếm không dấu; xóa bộ lọc; trạng thái không có kết quả; kệ yêu thích; sáng/tối. Bìa chữ tạo bằng CSS, dữ liệu chỉ phục vụ bài tập và chưa đối chiếu ISBN/ấn bản cụ thể.

## So sánh A và B

| Nội dung | A — DOM | B — React |
| --- | --- | --- |
| Tạo giao diện | createElement, textContent | JSX, component |
| Cập nhật | Gọi render và thay DOM | useState để React cập nhật |
| Sự kiện | addEventListener, event delegation | onClick, onChange và hàm qua props |
| Dữ liệu theo đề | fetch MockAPI/JSON | Import books.js |
| Tái sử dụng | Các hàm trong module | Component, props, children |

TypeScript nâng cao của phần A vẫn thao tác DOM; có Book, NewBook, BookField, kiểu phần tử DOM và Promise<Book[]>. Không dùng React trong bản JS/TS. Không dùng thư viện giao diện hay thư viện gọi API.

## MockAPI

Hai bản A có file cấu hình riêng: api-config.js hoặc api-config.ts. Cả hai đang trỏ tới cùng kho 20 sách:

https://6ad8d859f89c5702ed9a3331.mockapi.io/books

GET lấy sách, POST thêm sách, DELETE /books/:id xóa sau xác nhận. Thay đổi trên một bản A sẽ hiện ở bản kia sau khi tải lại. React giữ dữ liệu riêng theo đề. Yêu thích lưu trong trình duyệt, riêng cho từng phiên bản.

Xem HUONG-DAN-MOCKAPI.md để thay URL hoặc chuyển về JSON mẫu. Không đưa thông tin cá nhân hay dữ liệu mật vào kho mẫu này.

## Kiểm tra

Ba dự án được cài phụ thuộc và build riêng. TypeScript kiểm tra strict. Bản mở nhanh được đóng gói thành một HTML, không còn import JS/CSS ngoài. Việc tách không thay đổi chức năng đã kiểm tra trước đó: tìm/lọc, form, yêu thích, POST/DELETE MockAPI và chế độ sáng/tối.

Công cụ trình duyệt chặn truy cập file://, nên kiểm tra tương tác chạy qua HTTP. Cần tải mã về để tự mở Thu-vien.html trên máy. Chưa kiểm tra điện thoại vật lý. Chưa nộp SLink.
