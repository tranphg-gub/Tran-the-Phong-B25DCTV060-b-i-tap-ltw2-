# Bài tập Buổi 9: Quản lý sinh viên bằng Hooks

## Chạy bài

Trong thư mục bai-tap-hooks:

```
npm install
npm run dev
```

Build bằng `npm run build`.

## Cấu hình MockAPI

Tạo resource students trên MockAPI với các trường:

| Trường | Kiểu |
| --- | --- |
| studentCode | String |
| name | String |
| email | String |
| className | String |
| gpa | Number |

MockAPI tự cấp id. Dán URL HTTPS đầy đủ của resource vào phần Kết nối dữ liệu. URL được lưu trong trình duyệt; không có endpoint hoặc dữ liệu giả mặc định. Không nhập mật khẩu hoặc token vào URL.

## Nội dung bài

Kế thừa Buổi 8: thêm, sửa, xóa có xác nhận; tìm theo tên; GPA bắt buộc từ 0 đến 4; mã sinh viên không trùng trong danh sách hiện tại. Bổ sung email và lớp, cho phép tìm theo cả mã, email và lớp.

useState quản lý form và trạng thái giao diện. useMemo lọc danh sách. Custom hook useFetch dùng useEffect và AbortController để tải danh sách từ MockAPI, xử lý đang tải, lỗi và hủy request khi đổi URL hoặc unmount. POST, PUT, DELETE ghi lên API và tải lại danh sách sau khi thành công.

ThemeContext cung cấp sáng/tối qua useContext; lựa chọn được lưu bằng localStorage. Mã nguồn bài không có icon hoặc comment.

## Kiểm tra

Thêm GPA 0 và 4; chặn GPA âm, lớn hơn 4 và trường trống. Sửa sinh viên GPA 0 phải giữ nguyên số 0. Thử mã trùng, tìm tên, hủy xóa và xác nhận xóa. Kiểm tra tải lại dữ liệu, endpoint sai, chuyển theme và tải lại trang.

Build đã được kiểm tra trong môi trường hiện tại. Chưa có endpoint MockAPI thật nên chưa xác minh CRUD trực tiếp với dịch vụ. Kiểm tra mã trùng ở trình duyệt không thay thế ràng buộc duy nhất phía máy chủ.

Chế độ dùng thử: mặc định tải public/data/students.json qua useFetch với 3 sinh viên hư cấu. Thêm/sửa/xóa lưu trong localStorage, không ghi lại file JSON gốc. Chế độ này dùng thử local; để đáp ứng phần MockAPI của đề vẫn cần kết nối resource thật.

Đã cấu hình MockAPI mặc định: https://6ad8d859f89c5702ed9a3331.mockapi.io/students . Resource đã có 3 sinh viên hư cấu từ file mẫu. Mặc định bài tải dữ liệu thật từ MockAPI qua useFetch; file JSON chỉ dùng khi chủ động chọn chế độ mẫu.
